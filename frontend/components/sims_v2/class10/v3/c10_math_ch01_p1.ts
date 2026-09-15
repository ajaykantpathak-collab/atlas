import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch01_p1: SimDef = {
    id: 'v3_c10_math_ch01_p1',
    title: 'Real Numbers · Part 1/2',
    subtitle: 'Break numbers into atoms and catch irrationals red-handed',
    classLevel: 10, subject: 'mathematics', topic: 'Real Numbers · Part 1/2',
    chapters: ['c10_math_ch01'],
    nodeIds: ['c10_math_cbse_01_001', 'c10_math_cbse_01_002', 'c10_math_cbse_01_003', 'c10_math_cbse_01_004', 'c10_math_cbse_01_005', 'c10_math_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a number detective', intro: 'Someone claims √2 is just a fraction nobody has found yet. Your job: use the unique-prime-factorisation law to prove them mathematically impossible.', goal: 'Apply the Fundamental Theorem of Arithmetic and Euclid\'s division lemma to find HCF/LCM and to prove irrationality.' },
    discovery: {
        question: 'Take any number — 60, 867, even a million — and break it into primes. The Fundamental Theorem of Arithmetic swears you\'ll always land on the exact same set of primes, no matter how you split it. Why is this \'obvious\' fact actually powerful?',
        options: ['Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty', 'Because it proves every number is secretly prime', 'Because it shows multiplication and division are the same operation', 'Because without it, calculators couldn\'t multiply'],
        answer: 'Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty',
        hook: 'Primes are the atoms of arithmetic — and this theorem says every number has exactly ONE chemical formula. That uniqueness is what makes proofs about irrational numbers possible.',
    },
    teaching: [
        { title: 'Fundamental Theorem of Arithmetic: Statement and Meaning', text: 'The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be expressed as a product of prime numbers in exactly one way, apart from the order of the factors.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_01_001', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Put numbers on trial: crack them into prime factors, use Euclid\'s lemma to hunt HCFs, and then prove — with airtight logic — that √2 can never be written as a fraction.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'case', nodeId: 'c10_math_cbse_01_001', title: 'Fundamental Theorem of Arithmetic: Statement and Meaning',
          caseStudy: { intro: 'Imagine you have 60 marbles and you want to arrange them in identical groups such that each group has a prime number of marbles.',
            decisions: [{ prompt: 'State the Fundamental Theorem of Arithmetic in your own words.', options: [
                { text: 'The theorem states that every integer greater than 1 is either a prime number or can be', outcome: 'The theorem states that every integer greater than 1 is either a prime number or can be uniquely.' },
                { text: 'every number can be written as a product of primes', outcome: 'Not quite — Students often think that the order of prime factors matters for uniqueness, so they might say 2.', reveals: 'the-order-of-prime-factors' },
                { text: 'unique', outcome: 'Not quite — Students often think that the order of prime factors matters for uniqueness, so they might say 2.', reveals: 'the-order-of-prime-factors' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_002', title: 'HCF and LCM by Prime Factorisation Method',
          scaffold: { problem: 'A school has 378 girls and 672 boys. They are to be divided into groups such that each group has the same number of girls and the same.',
            steps: [
            { text: 'Identify that we need the HCF of 378 and 672 to find the maximum number of identical groups.' },
            { text: 'Find prime factorisation of 378: 378 ÷ 2 = 189; 189 ÷ 3 = 63; 63 ÷ 3 = 21; 21 ÷ 3 = 7; 7 ÷ 7 = 1.' },
            { text: 'Find prime factorisation of 672: 672 ÷ 2 = 336; 336 ÷ 2 = 168; 168 ÷ 2 = 84; 84 ÷ 2 = 42; 42 ÷ 2 = 21; 21 ÷ 3 = 7; 7.' },
            { text: 'Identify common prime factors: 2, 3, 7. For HCF, take the smallest exponent for each: 2^1, 3^1, 7^1.' },
            { text: 'Compute HCF = 2^1 × 3^1 × 7^1 = 2 × 3 × 7 = 42. So maximum groups = 42.' },
            { text: 'Girls per group = 378 ÷ 42 = 9; Boys per group = 672 ÷ 42 = 16. Verify: 42 × 9 = 378, 42 × 16 = 672.', faded: true, blankAnswer: 'Maximum 42 groups, each with 9 girls and 16 boys.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_003', title: 'Relationship HCF x LCM = Product of Two Numbers',
          scaffold: { problem: 'A school library has 144 Mathematics books and 192 Science books.',
            steps: [
            { text: 'Identify the given values: a = 144, b = 192, HCF = 48. We need to find LCM.' },
            { text: 'Recall the formula: HCF(a, b) × LCM(a, b) = a × b.' },
            { text: 'Substitute the known values: 48 × LCM = 144 × 192.' },
            { text: 'Compute the product 144 × 192 = 27648. Then divide by 48: LCM = 27648 ÷ 48 = 576.' },
            { text: 'Verify by prime factorisation: 144 = 2⁴ × 3², 192 = 2⁶ × 3¹. HCF = 2⁴ × 3¹ = 16 × 3 = 48. LCM = 2⁶ × 3² = 64 × 9 = 576.' },
            { text: 'Given a=144, b=192, HCF=48. We need LCM (least number of books per stack that works for both).' },
            { text: 'Use HCF × LCM = a × b.' },
            { text: '48 × LCM = 144 × 192.' },
            { text: '144 × 192 = 27648. LCM = 27648 ÷ 48 = 576.' },
            { text: 'Verify: 144 = 2⁴×3², 192 = 2⁶×3¹. LCM = 2⁶×3² = 64×9 = 576. HCF=2⁴×3¹=48. Product=48×576=27648=144×192. ✓', faded: true, blankAnswer: 'LCM = 576. So each stack would have 576 books if the number.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_004', title: 'Application: Proving 12n Cannot End with Digit Zero',
          scaffold: { problem: 'Prove that 12^n cannot end with the digit 0 for any natural number n.',
            steps: [
            { text: 'Recall the condition for a number to end in digit 0 — it must be divisible by 10.' },
            { text: 'Write the prime factorisation of the base 12. We know 12 = 2 × 2 × 3 = 2^2 × 3.' },
            { text: 'Raise the factorisation to the power n. By exponent laws, 12^n = (2^2 × 3)^n = (2^2)^n × 3^n = 2^(2n) × 3^n.' },
            { text: 'Analyse the prime factors of 12^n. The expression 2^(2n) × 3^n contains only the primes 2 and 3.' },
            { text: 'Apply the Fundamental Theorem of Arithmetic (c10_math_cbse_01_001) — the prime factorisation of any integer is unique.' },
            { text: 'Conclude: Therefore, 12^n cannot end with the digit 0 for any natural number n.', faded: true, blankAnswer: '12^n cannot end with digit 0 for any n ∈ ℕ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_005', title: 'Theorem: If p is Prime and p Divides a-squared Then p Divides a',
          scaffold: { problem: 'Prove that if a prime p divides the square of a positive integer a, then p divides a. Use the Fundamental Theorem of Arithmetic.',
            steps: [
            { text: 'Write the given: Let p be a prime number and a be a positive integer such that p divides a².' },
            { text: 'By the Fundamental Theorem of Arithmetic, every positive integer has a unique prime factorization.' },
            { text: 'Then a² = (p₁ × p₂ × ... × pₙ) × (p₁ × p₂ × ... × pₙ) = p₁² × p₂² × ... × pₙ².' },
            { text: 'Since p divides a², p must appear in the prime factorization of a².' },
            { text: 'Therefore, p divides a (since a contains p as a factor). This completes the proof.', faded: true, blankAnswer: 'Proved.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_006', title: 'Proof by Contradiction: sqrt(2) is Irrational',
          scaffold: { problem: 'Prove that √2 is irrational using the method of contradiction.',
            steps: [
            { text: 'Assume the contrary, that √2 is rational. Then we can write √2 = a/b where a and b are integers, b ≠ 0, and HCF(a, b).' },
            { text: 'Square both sides: (√2)² = (a/b)² ⇒ 2 = a²/b² ⇒ a² = 2b².' },
            { text: 'From a² = 2b², we see that a² is divisible by 2. Since 2 is a prime number, by the theorem "If a prime p divides a².' },
            { text: 'Since a is even, we can write a = 2k for some integer k. Substitute into a² = 2b²: (2k)² = 2b² ⇒ 4k² = 2b² ⇒ b² = 2k².' },
            { text: 'From b² = 2k², b² is divisible by 2. Again by the same theorem (p=2), 2 divides b. Hence b is also even.' },
            { text: 'We have shown that both a and b are even, so they have a common factor 2.' },
            { text: 'Therefore, our assumption that √2 is rational is false. Hence √2 is irrational.', faded: true, blankAnswer: '√2 is irrational. (Proof completed as above.)' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_01_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For sports day, 72 students must be split into identical teams. A classmate writes \'72 = 8 × 9\' on the board and declares that the prime factorisation is done, so teams of 8 or 9 are the \'prime\' options.',
            decisions: [{ prompt: 'Has he actually found the prime factorisation, and what does it tell the organisers?', options: [
                { text: 'No — 8 and 9 are factors but neither is prime (8 = 2×2×2, 9 = 3×3). The prime factorisation is 72 = 2³ × 3², and it is the only one — the Fundamental Theorem of Arithmetic guarantees every number breaks into primes in exactly one way. Prime-sized teams must come from those primes: only 2 or 3 students per team.', outcome: 'Checking that every factor is prime, and knowing the answer is unique, is what makes prime factorisation a tool rather than just any multiplication that works.' },
                { text: 'He is right — any two numbers that multiply to 72 count as its prime factorisation.', outcome: 'A factorisation is only \'prime\' if every factor is itself prime; 8 × 9 hides the real primes inside composite numbers.', reveals: 'any-factorisation-is-prime' },
                { text: 'There is no single prime factorisation — different people can break 72 into different primes.', outcome: 'The Fundamental Theorem of Arithmetic rules this out: the list of primes is unique, only the order of writing can differ.', reveals: 'many-prime-factorisations' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every integer is a one-of-a-kind prime recipe. Once you see that, irrational numbers stop being mysterious — they\'re just numbers that can\'t fit the recipe.',
            decisions: [{ prompt: 'What comes next? Real Numbers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Real Numbers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_01_001', difficulty: 'standard',
          question: 'The Fundamental Theorem of Arithmetic states that every integer greater than 1.',
          hint: 'If stuck, revisit prime factorisation using the factor tree method (Class 6 node.',
          misconception: 'Students often think that the order of prime factors matters for uniqueness, so they might say 2 × 3 × 5 and 5 × 3 × 2.',
          parts: [
                { id: 'a', prompt: 'Two students factor 360. Student A writes 360 = 2 × 2 × 2 × 3 × 3 × 5. Student B writes 360 = 2³ × 3² × 5. Are both factorizations correct?', answer: 'Yes, both are correct',
                  options: ['Yes, both are correct', 'only one is correct'],
                  hint: 'If stuck, revisit prime factorisation using the factor tree method (Class 6 node c6_math_ch01_015).',
                  misconception: 'Students often think that the order of prime factors matters for uniqueness, so they might say 2 × 3 × 5 and 5 × 3 × 2 are different.' }
          ],
            remediations: { 'the-order-of-prime-factors': { steps: ['If a student confuses order with uniqueness, have them list all permutations of 2, 3, 5 and verify they multiply to the.', 'Emphasize that the theorem says "unique up to order." If they include composite factors, ask them to factor the.', 'If they include 1, remind them that 1 has no prime factors and the theorem starts at 2.', 'Practice with numbers like 30, 60, 100 until they consistently produce only primes.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_002', difficulty: 'standard',
          question: 'The Highest Common Factor (HCF) of two or more positive integers is the product.',
          hint: 'If stuck, revisit c7_math_ch11_004 and c7_math_ch11_008 for the step-by-step.',
          misconception: 'Students often write the prime factorisation without exponential notation (e.g., 2 × 2 × 2 × 3 × 3) and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Highest Common Factor (HCF) of two or more positive integers is the product of the',
                  options: ['The Highest Common Factor (HCF) of two or more positive integers is the product of the', 'The Fundamental Theorem of Arithmetic states that every integer greater than 1 can be', 'For any two positive integers a and b, the product of their Highest Common Factor (HCF)', 'A natural number ends with digit zero if and only if it is divisible by 10'],
                  hint: 'If stuck, revisit c7_math_ch11_004 and c7_math_ch11_008 for the step-by-step factorisation.',
                  misconception: 'Students often write the prime factorisation without exponential notation (e.g., 2 × 2 × 2 × 3 × 3) and then incorrectly count common.' }
          ],
            remediations: { 'students-often-write-the-prime': { steps: ['If a student makes the above error, immediately have them rewrite the factorisation in exponential form for both.', 'Then use a table: list all prime bases that appear in either number (2,3,5,7...).', 'For each base, write the exponent in first number, exponent in second number.', 'Then ask: "For HCF, which exponent can we take so that the factor divides both?'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_003', difficulty: 'standard',
          question: 'For any two positive integers a and b, the product of their Highest Common.',
          hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and the prime factorisation.',
          misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.',
          parts: [
                { id: 'a', prompt: 'State the relationship between HCF and LCM of two positive integers a and b.', answer: 'The relationship is HCF(a, b) × LCM(a, b) = a × b',
                  options: ['The relationship is HCF(a, b) × LCM(a, b) = a × b', 'the relationship HCF × LCM = a × b holds for three or more numbers'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and the prime factorisation method for HCF.',
                  misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.' },
                { id: 'b', prompt: 'The HCF of two numbers is 12 and their LCM is 72. If one of the numbers is 24, find the other number.', answer: 'Given: HCF = 12, LCM = 72, one number = 24',
                  options: ['Given: HCF = 12, LCM = 72, one number = 24', 'the relationship HCF × LCM = a × b holds for three or more numbers'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and the prime factorisation method for HCF.',
                  misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.' },
                { id: 'c', prompt: 'Two numbers are such that their HCF is 15 and their product is 6300. Find their LCM. Then, determine if the numbers could be 45 and 140. Justify your answer.', answer: 'LCM = Product ÷ HCF = 6300 ÷ 15 = 420',
                  options: ['LCM = Product ÷ HCF = 6300 ÷ 15 = 420', 'the relationship HCF × LCM = a × b holds for three or more numbers'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and the prime factorisation method for HCF.',
                  misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.' }
          ],
            remediations: { 'the-relationship-hcf-lcm-a': { steps: ['If a student applies the formula to three numbers, immediately give a counterexample: 4, 6, 8.', 'HCF=2, LCM=24, product=192, but 2×24=48 ≠ 192.', 'Explain that for three numbers, HCF × LCM ≠ product.', 'Then, for verification failure: give a problem where HCF=6, LCM=120, one number=24 → other=30.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.',
          parts: [
                { id: 'a', prompt: 'A student solves: "HCF of two numbers is 8, LCM is 120. One number is 24. Find the other." The student writes: 8 × 120 = 24 × x → 960 = 24x → x = 40.', answer: 'The student\'s computation is correct (40), but the solution is incomplete',
                  options: ['The student\'s computation is correct (40), but the solution is incomplete', 'yes, correct because formula gives 40', 'the relationship HCF × LCM = a × b holds for three or more numbers'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and the prime factorisation method for HCF.',
                  misconception: 'Students often assume the relationship HCF × LCM = a × b holds for three or more numbers.' }
          ],
            remediations: { 'the-relationship-hcf-lcm-a': { steps: ['If a student applies the formula to three numbers, immediately give a counterexample: 4, 6, 8.', 'HCF=2, LCM=24, product=192, but 2×24=48 ≠ 192.', 'Explain that for three numbers, HCF × LCM ≠ product.', 'Then, for verification failure: give a problem where HCF=6, LCM=120, one number=24 → other=30.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_004', difficulty: 'standard',
          question: 'A natural number ends with digit zero if and only if it is divisible by 10.',
          hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and.',
          misconception: 'Students often try to prove this by computing the last digit pattern of 12^n (2, 4, 8, 6, 2, ...) and observing 0 never.',
          parts: [
                { id: 'a', prompt: 'A student claims: "12^1 = 12, 12^2 = 144, 12^3 = 1728 — none end in zero, so 12^n never ends in zero." Why is this reasoning insufficient for a mathematical.', answer: 'Checking a few values is inductive reasoning, not a proof',
                  options: ['Checking a few values is inductive reasoning, not a proof', 'checking 3-4 cases is enough confuses empirical observation with deductive proof'],
                  hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and c6_math_ch01_015.',
                  misconception: 'Students often try to prove this by computing the last digit pattern of 12^n (2, 4, 8, 6, 2, ...) and observing 0 never appears.' },
                { id: 'b', prompt: 'Prove that 6^n cannot end with the digit 0 for any natural number n. Show all steps clearly.', answer: 'Step 1: Prime factorise 6 = 2 × 3',
                  options: ['Step 1: Prime factorise 6 = 2 × 3', '6^n ends in 6, so not 0'],
                  hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and c6_math_ch01_015.',
                  misconception: 'Students often try to prove this by computing the last digit pattern of 12^n (2, 4, 8, 6, 2, ...) and observing 0 never appears.' }
          ],
            remediations: { 'students-often-try-to-prove': { steps: ['If a student falls into the pattern-spotting trap, do this: (1) Ask them to prove 2^n never ends in 0 using their.', '(2) Remind them of the divisibility rule for 10 from Class 6 (c6_math_ch01_014): a number is divisible by 10 iff its.', '(3) Connect to prime factors: 10 = 2 × 5, so divisibility by 10 requires both 2 and 5.', '(4) Have them write the prime factorisation of 12^n and circle the missing prime.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_005', difficulty: 'standard',
          question: 'If p is a prime number and p divides a² (where a is a positive integer), then.',
          hint: 'If stuck, revisit prime factorization of numbers up to 100 (Class 6 node.',
          misconception: 'Students often forget the condition "p is prime" and apply the theorem to composite numbers.',
          parts: [
                { id: 'a', prompt: 'State the theorem: "If p is a prime number and p divides a², then p divides a." Is the converse true? That is, if p divides a, does p always divide a²?', answer: 'Yes, the converse is true',
                  options: ['Yes, the converse is true', 'if p divides a then p divides a²'],
                  hint: 'If stuck, revisit prime factorization of numbers up to 100 (Class 6 node c6_math_ch01_015) and the.',
                  misconception: 'Students often forget the condition "p is prime" and apply the theorem to composite numbers.' },
                { id: 'b', prompt: 'Why does the theorem require p to be prime? Give a counterexample showing the statement fails if p is composite.', answer: 'The theorem fails for composites',
                  options: ['The theorem fails for composites', 'it works for all numbers', 'if p divides a then p divides a²'],
                  hint: 'If stuck, revisit prime factorization of numbers up to 100 (Class 6 node c6_math_ch01_015) and the.',
                  misconception: 'Students often forget the condition "p is prime" and apply the theorem to composite numbers.' },
                { id: 'c', prompt: 'Let a = 180. Find all prime numbers p such that p divides a². For each such p, verify that p divides a.', answer: 'a = 180 = 2² × 3² × 5¹',
                  options: ['a = 180 = 2² × 3² × 5¹', 'if p divides a then p divides a²'],
                  hint: 'If stuck, revisit prime factorization of numbers up to 100 (Class 6 node c6_math_ch01_015) and the.',
                  misconception: 'Students often forget the condition "p is prime" and apply the theorem to composite numbers.' },
                { id: 'd', prompt: 'Suppose p is a prime and p divides a² + b². Can we conclude that p divides a and p divides b? Justify your answer with an example or proof.', answer: 'No, we cannot conclude that',
                  options: ['No, we cannot conclude that', 'if p divides a then p divides a²'],
                  hint: 'If stuck, revisit prime factorization of numbers up to 100 (Class 6 node c6_math_ch01_015) and the.',
                  misconception: 'Students often forget the condition "p is prime" and apply the theorem to composite numbers.' }
          ],
            remediations: { 'students-often-forget-the-condition': { steps: ['If the student forgets the prime condition, ask: "Does 4 divide 6²?', 'So why does the theorem not apply?" Then guide them to write the prime factorization of 6 and 36, and see that 4 = 2².', 'Emphasize: The theorem is about a SINGLE prime factor appearing in the square.', 'Have them re-state the theorem aloud with emphasis on "p is prime".'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_006', difficulty: 'standard',
          question: 'Proof by contradiction (reductio ad absurdum) for the irrationality of √2.',
          hint: 'Revisit the proof of the prime divisibility theorem (node c10_math_cbse_01_005) and.',
          misconception: 'Students often write: "a² = 2b² ⇒ a² is even ⇒ a is even" without justifying the implication.',
          parts: [
                { id: 'a', prompt: 'In the proof, after we deduce a² = 2b², we conclude "a is even". Explain why this step is valid, referencing a specific theorem from Class 10 Real Numbers.', answer: 'Since a² = 2b², a² is divisible by 2',
                  options: ['Since a² = 2b², a² is divisible by 2', 'because a² is even'],
                  hint: 'Revisit the proof of the prime divisibility theorem (node c10_math_cbse_01_005) and practice.',
                  misconception: 'Students often write: "a² = 2b² ⇒ a² is even ⇒ a is even" without justifying the implication.' }
          ],
            remediations: { 'students-often-write-a-2b': { steps: ['If the student omits the theorem citation: 1) Ask: "Why does a² even imply a even?', 'Give an example where x² is divisible by 4 but x is not divisible by 4 (x=2).', 'So why does it work for 2?" 2) Guide them to state the theorem: "For prime p, p|a² ⇒ p|a." 3) Have them rewrite the.', 'How does \'both even\' break it?" Make them write the full contradiction sentence.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
