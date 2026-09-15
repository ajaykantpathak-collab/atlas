import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch01_p2: SimDef = {
    id: 'v3_c10_math_ch01_p2',
    title: 'Real Numbers · Part 2/2',
    subtitle: 'Break numbers into atoms and catch irrationals red-handed',
    classLevel: 10, subject: 'mathematics', topic: 'Real Numbers · Part 2/2',
    chapters: ['c10_math_ch01'],
    nodeIds: ['c10_math_cbse_01_007', 'c10_math_cbse_01_008', 'c10_math_cbse_01_009', 'c10_math_cbse_01_010', 'c10_math_cbse_01_011', 'c10_math_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a number detective', intro: 'Someone claims √2 is just a fraction nobody has found yet. Your job: use the unique-prime-factorisation law to prove them mathematically impossible.', goal: 'Apply the Fundamental Theorem of Arithmetic and Euclid\'s division lemma to find HCF/LCM and to prove irrationality.' },
    discovery: {
        question: 'Take any number — 60, 867, even a million — and break it into primes. The Fundamental Theorem of Arithmetic swears you\'ll always land on the exact same set of primes, no matter how you split it. Why is this \'obvious\' fact actually powerful?',
        options: ['Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty', 'Because it proves every number is secretly prime', 'Because it shows multiplication and division are the same operation', 'Because without it, calculators couldn\'t multiply'],
        answer: 'Because unique prime factorisation lets us prove things like √2 is irrational and compute HCF and LCM with certainty',
        hook: 'Primes are the atoms of arithmetic — and this theorem says every number has exactly ONE chemical formula. That uniqueness is what makes proofs about irrational numbers possible.',
    },
    teaching: [
        { title: 'Proof by Contradiction: sqrt(3) is Irrational', text: 'Proof by contradiction for the irrationality of √3: Assume √3 is rational, so it can be expressed as a fraction a/b in lowest terms where a and b are integers with no common factors other than 1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_01_007', title: 'Your mission',
          mission: { widget: 'fraction', validate: 'fraction:parts=4',
            instruction: 'On the lab: split into 4 parts — what fraction is each part?.',
        context: 'Put numbers on trial: crack them into prime factors, use Euclid\'s lemma to hunt HCFs, and then prove — with airtight logic — that √2 can never be written as a fraction.',
            observePrompt: 'What did the fraction interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_007', title: 'Proof by Contradiction: sqrt(3) is Irrational',
          scaffold: { problem: 'Prove that √3 is an irrational number. (This is a standard 3-mark question in CBSE board exams.)',
            steps: [
            { text: 'Assume, to the contrary, that √3 is rational. Then there exist integers a and b (b ≠ 0) such that √3 = a/b, where a and.' },
            { text: 'Square both sides: 3 = a²/b² ⇒ 3b² = a².' },
            { text: 'From 3b² = a², we see that a² is divisible by 3. Since 3 is a prime number, by the theorem "if a prime p divides a².' },
            { text: 'Write a = 3k for some integer k. Substitute into 3b² = a²: 3b² = (3k)² = 9k² ⇒ b² = 3k².' },
            { text: 'This shows b² is divisible by 3. Again, since 3 is prime, by the same theorem, 3 divides b.' },
            { text: 'Thus 3 divides both a and b, contradicting the assumption that a and b are coprime (gcd=1).', faded: true, blankAnswer: '√3 is irrational. (Proof completed as above.)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_008', title: 'Proving 5 minus sqrt(3) is Irrational (Sum/Difference Property)',
          scaffold: { problem: 'Prove that 5 − √3 is irrational. (Standard 3-mark CBSE board question.)',
            steps: [
            { text: 'Assume, to the contrary, that 5 − √3 is rational. Let 5 − √3 = r, where r is a rational number.' },
            { text: 'Rearrange to isolate √3: √3 = 5 − r.' },
            { text: 'Since 5 is rational and r is rational (by assumption), and rational numbers are closed under subtraction, 5 − r.' },
            { text: 'Therefore √3 = 5 − r is rational. But this contradicts the proven fact that √3 is irrational (c10_math_cbse_01_007).' },
            { text: 'The contradiction arose from our assumption that 5 − √3 is rational. Hence 5 − √3 is irrational.', faded: true, blankAnswer: '5 − √3 is irrational.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_009', title: 'Proving 3sqrt(2) is Irrational (Product Property)',
          scaffold: { problem: 'Prove that \\( 3\\sqrt{2} \\) is irrational. (CBSE 2-mark question format)',
            steps: [
            { text: 'Recall the known result: √2 is irrational (proved in Class 10, Chapter 1, Theorem 1.3). Write this as a given fact.' },
            { text: 'Assume the opposite of what we want to prove. Assume \\( 3\\sqrt{2} \\) is rational.' },
            { text: 'By definition of rational numbers, there exist integers p and q (q ≠ 0) such that \\( 3\\sqrt{2} = \\frac{p}{q} \\) and.' },
            { text: 'Isolate √2 by dividing both sides by 3: \\( \\sqrt{2} = \\frac{p}{q} \\div 3 = \\frac{p}{q} \\times \\frac{1}{3}.' },
            { text: 'Verify the RHS is rational: p is integer, 3q is integer (product of integers), and 3q ≠ 0 because q ≠ 0 and 3 ≠ 0.' },
            { text: 'But this means √2 is rational, which contradicts Step 1 (√2 is irrational).' },
            { text: 'Therefore, our assumption in Step 2 is false. Hence \\( 3\\sqrt{2} \\) is irrational.', faded: true, blankAnswer: '\\( 3\\sqrt{2} \\) is irrational. (Proved by contradiction)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_010', title: 'HCF and LCM for Three Numbers Using Prime Factorisation',
          scaffold: { problem: 'Three pieces of ribbon have lengths 45 cm, 60 cm, and 75 cm. They are to be cut into smaller pieces of equal length such that each piece.',
            steps: [
            { text: 'Identify that we need the **HCF** of 45, 60, 75 because we want the longest possible equal length that divides all.' },
            { text: 'Write prime factorisation of each number:' },
            { text: 'Identify primes common to **all three**: 3 and 5. (2 is not in 45 or 75).' },
            { text: 'Compute HCF = \\(3^1 \\times 5^1 = 15\\). So each piece is 15 cm long.' },
            { text: 'Find number of pieces:', faded: true, blankAnswer: 'Length of each piece = 15 cm. Total pieces = 12.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_011', title: 'Decimal Expansion of Rational Numbers: Terminating vs Non-Terminating',
          scaffold: { problem: 'A ribbon of length 7.5 metres is cut into 12 equal pieces. Without performing long division, determine whether the length of each piece.',
            steps: [
            { text: 'Express the length of each piece as a rational number. Total length = 7.5 m = 75/10 m = 15/2 m. Number of pieces = 12.' },
            { text: 'Reduce the fraction to lowest terms. HCF(15, 24) = 3. Divide numerator and denominator by 3: 15/24 = 5/8.' },
            { text: 'Factorise the denominator q into primes. 8 = 2 × 2 × 2 = 2³. Write in the form 2^m × 5^n: here m=3, n=0.' },
            { text: 'Apply the theorem. Since the denominator contains only the prime factors 2 and 5 (no other primes), the decimal.' },
            { text: 'Find the number of decimal places. Number of places = max(m, n) = max(3, 0) = 3.' },
            { text: 'Verify by actual division (optional check). 5 ÷ 8 = 0.625 — terminates after 3 decimal places. The answer matches.', faded: true, blankAnswer: 'Terminating decimal expansion; terminates after 3 decimal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_01_012', title: 'Finding HCF and LCM from Word Problems',
          scaffold: { problem: 'A school has 144 chocolate bars and 192 juice boxes for a picnic. They want to make identical gift packs using all items with no leftovers.',
            steps: [
            { text: 'Identify the given numbers: 144 chocolates, 192 juice boxes. The phrase "identical packs with no leftovers" means.' },
            { text: 'Write prime factorisation of each number. 144 = 2 × 2 × 2 × 2 × 3 × 3 = 2⁴ × 3².' },
            { text: 'For HCF, take each common prime factor with the smallest exponent. Common primes: 2 and 3.' },
            { text: 'Maximum number of packs = HCF = 48. Chocolates per pack = 144 ÷ 48 = 3. Juice boxes per pack = 192 ÷ 48 = 4.' },
            { text: 'Verify: 48 packs × 3 chocolates = 144; 48 packs × 4 juice boxes = 192. No leftovers. Answer with units.', faded: true, blankAnswer: 'Maximum number of packs = 48. Each pack contains 3.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_01_012', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For sports day, 72 students must be split into identical teams. A classmate writes \'72 = 8 × 9\' on the board and declares that the prime factorisation is done, so teams of 8 or 9 are the \'prime\' options.',
            decisions: [{ prompt: 'Has he actually found the prime factorisation, and what does it tell the organisers?', options: [
                { text: 'No — 8 and 9 are factors but neither is prime (8 = 2×2×2, 9 = 3×3). The prime factorisation is 72 = 2³ × 3², and it is the only one — the Fundamental Theorem of Arithmetic guarantees every number breaks into primes in exactly one way. Prime-sized teams must come from those primes: only 2 or 3 students per team.', outcome: 'Checking that every factor is prime, and knowing the answer is unique, is what makes prime factorisation a tool rather than just any multiplication that works.' },
                { text: 'He is right — any two numbers that multiply to 72 count as its prime factorisation.', outcome: 'A factorisation is only \'prime\' if every factor is itself prime; 8 × 9 hides the real primes inside composite numbers.', reveals: 'any-factorisation-is-prime' },
                { text: 'There is no single prime factorisation — different people can break 72 into different primes.', outcome: 'The Fundamental Theorem of Arithmetic rules this out: the list of primes is unique, only the order of writing can differ.', reveals: 'many-prime-factorisations' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_01_012', title: 'You made it',
          caseStudy: { intro: 'Every integer is a one-of-a-kind prime recipe. Once you see that, irrational numbers stop being mysterious — they\'re just numbers that can\'t fit the recipe.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'fraction', prompt: 'Explore the fraction interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'fraction', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_01_007', difficulty: 'standard',
          question: 'Proof by contradiction for the irrationality of √3: Assume √3 is rational,.',
          hint: 'Review the proof of the prime divisibility theorem (c10_math_cbse_01_005) and the.',
          misconception: 'Students often write "3 divides a², therefore 3 divides a" without explicitly stating the theorem "if a prime p divides.',
          parts: [
                { id: 'a', prompt: 'State the theorem about prime divisibility that is essential for proving √3 is irrational. Write it in your own words.', answer: 'The theorem: If p is a prime number and p divides a², then p divides a',
                  options: ['The theorem: If p is a prime number and p divides a², then p divides a', 'if p divides a then p divides a²', 'the theorem is specific to √2'],
                  hint: 'Review the proof of the prime divisibility theorem (c10_math_cbse_01_005) and the step-by-step.',
                  misconception: 'Students often write "3 divides a², therefore 3 divides a" without explicitly stating the theorem "if a prime p divides a² then p divides.' },
                { id: 'b', prompt: 'Compare the proofs that √2 and √3 are irrational. What is the exact algebraic step where the number 2 is replaced by 3, and why does the same logic work for.', answer: 'The replacement occurs when we write p b² = a² (with p=2 or p=3)',
                  options: ['The replacement occurs when we write p b² = a² (with p=2 or p=3)', 'it works because 2 and 3 are both small'],
                  hint: 'Review the proof of the prime divisibility theorem (c10_math_cbse_01_005) and the step-by-step.',
                  misconception: 'Students often write "3 divides a², therefore 3 divides a" without explicitly stating the theorem "if a prime p divides a² then p divides.' }
          ],
            remediations: { 'students-often-write-3-divides': { steps: ['If a student omits the theorem citation, ask: "Why can we say 3 divides a just because 3 divides a²?', '(4 divides 6² but 4 does not divide 6)." Guide them to recall the theorem from c10_math_cbse_01_005 and insist they.', 'If they miss the final contradiction, have them circle the two statements "3 divides a" and "3 divides b" and ask what.', 'Make them write the concluding sentence: "This contradicts our assumption that a and b are coprime.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_008', difficulty: 'standard',
          question: 'The number 5 − √3 is irrational. This is proved by contradiction using the.',
          hint: 'Review the closure properties of rationals (c9_math_ch3_3) and the proof that √3.',
          misconception: 'Students often assert "rational minus irrational is irrational" as an obvious fact without proof.',
          parts: [
                { id: 'a', prompt: 'State the closure property of rational numbers under subtraction that is used in this proof.', answer: 'If a and b are rational numbers, then a − b is also rational',
                  options: ['If a and b are rational numbers, then a − b is also rational', 'rational minus irrational is rational'],
                  hint: 'Review the closure properties of rationals (c9_math_ch3_3) and the proof that √3 is irrational.',
                  misconception: 'Students often assert "rational minus irrational is irrational" as an obvious fact without proof.' },
                { id: 'b', prompt: 'In the proof, after assuming 5 − √3 = r (rational), we write √3 = 5 − r. Explain why this step is valid and why it leads to a contradiction.', answer: 'The step is valid',
                  options: ['The step is valid', 'we assumed √3 is irrational so it stays irrational'],
                  hint: 'Review the closure properties of rationals (c9_math_ch3_3) and the proof that √3 is irrational.',
                  misconception: 'Students often assert "rational minus irrational is irrational" as an obvious fact without proof.' }
          ],
            remediations: { 'students-often-assert-rational-minus': { steps: ['Revisit the closure properties of rational numbers (c9_math_ch3_3): sum, difference, product, and quotient (by.', 'Walk through a concrete example: if 5 − √3 = 3.2 (a rational), then √3 = 5 − 3.2 = 1.8, which is rational — but √3 ≈.', 'Practice the template with 3 − √2, 4 + √5, and 6 − 2√7 to internalise the isolation-and-contradiction method.', 'Emphasise: the assumption "5 − √3 is rational" is what we DISPROVE; we do not assume √3 is rational directly.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assert "rational minus irrational is irrational" as an obvious fact without proof.',
          parts: [
                { id: 'a', prompt: 'Is √3 − 5 irrational? How does this differ from 5 − √3?', answer: 'Yes, √3 − 5 is irrational',
                  options: ['Yes, √3 − 5 is irrational', '√3 − 5 = −(5 − √3) so it\'s rational if 5 − √3 is rational'],
                  hint: 'Review the closure properties of rationals (c9_math_ch3_3) and the proof that √3 is irrational.',
                  misconception: 'Students often assert "rational minus irrational is irrational" as an obvious fact without proof.' }
          ],
            remediations: { 'students-often-assert-rational-minus': { steps: ['Revisit the closure properties of rational numbers (c9_math_ch3_3): sum, difference, product, and quotient (by.', 'Walk through a concrete example: if 5 − √3 = 3.2 (a rational), then √3 = 5 − 3.2 = 1.8, which is rational — but √3 ≈.', 'Practice the template with 3 − √2, 4 + √5, and 6 − 2√7 to internalise the isolation-and-contradiction method.', 'Emphasise: the assumption "5 − √3 is rational" is what we DISPROVE; we do not assume √3 is rational directly.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_009', difficulty: 'standard',
          question: 'The product of a non-zero rational number and an irrational number is always.',
          hint: 'Revisit c10_math_cbse_01_006 (√2 irrational proof) and c9_math_ch3_10 (rational closure.',
          misconception: 'Students often write the isolation step incorrectly: from \\( 3\\sqrt{2} = \\frac{p}{q} \\), they write \\( \\sqrt{2}.',
          parts: [
                { id: 'a', prompt: 'Explain why the assumption "3√2 is rational" leads to a contradiction.', answer: 'Assume 3√2 = a/b where a,b ∈ ℤ, b ≠ 0, gcd(a,b)=1',
                  options: ['Assume 3√2 = a/b where a,b ∈ ℤ, b ≠ 0, gcd(a,b)=1', 'divide by 3', 'take reciprocal of the whole fraction'],
                  hint: 'Revisit c10_math_cbse_01_006 (√2 irrational proof) and c9_math_ch3_10 (rational closure under.',
                  misconception: 'Students often write the isolation step incorrectly: from \\( 3\\sqrt{2} = \\frac{p}{q} \\), they write \\( \\sqrt{2} = \\frac{3q}{p} \\) (taking.' },
                { id: 'b', prompt: 'Prove that \\( \\frac{7}{5}\\sqrt{3} \\) is irrational. Show all steps clearly as required in a 2-mark CBSE board question.', answer: '**Proof:** Assume \\( \\frac{7}{5}\\sqrt{3} \\) is rational',
                  options: ['**Proof:** Assume \\( \\frac{7}{5}\\sqrt{3} \\) is rational', '7q ≠ 0', 'divide by 3', 'take reciprocal of the whole fraction'],
                  hint: 'Revisit c10_math_cbse_01_006 (√2 irrational proof) and c9_math_ch3_10 (rational closure under.',
                  misconception: 'Students often write the isolation step incorrectly: from \\( 3\\sqrt{2} = \\frac{p}{q} \\), they write \\( \\sqrt{2} = \\frac{3q}{p} \\) (taking.' },
                { id: 'c', prompt: 'Compare the proofs for: (i) 5 - √3 is irrational (sum/difference property) and (ii) 3√2 is irrational (product property).', answer: 'Both use proof by contradiction and rely on a known irrational (√3 or √2)',
                  options: ['Both use proof by contradiction and rely on a known irrational (√3 or √2)', 'both use division', 'both use subtraction', 'divide by 3'],
                  hint: 'Revisit c10_math_cbse_01_006 (√2 irrational proof) and c9_math_ch3_10 (rational closure under.',
                  misconception: 'Students often write the isolation step incorrectly: from \\( 3\\sqrt{2} = \\frac{p}{q} \\), they write \\( \\sqrt{2} = \\frac{3q}{p} \\) (taking.' }
          ],
            remediations: { 'students-often-write-the-isolation': { steps: ['If a student makes the reciprocal error: (1) Write \\( 3\\sqrt{2} = \\frac{p}{q} \\) on board.', '(2) Ask: "What operation undoes multiplication by 3?" (Division).', '(3) Show: divide both sides by 3 → \\( \\sqrt{2} = \\frac{p}{q} \\div 3 = \\frac{p}{q} \\times \\frac{1}{3} = \\frac{p}{3q} \\).', '(4) Contrast with reciprocal: \\( \\frac{q}{p} \\) would come from \\( \\frac{1}{3\\sqrt{2}} = \\frac{q}{p} \\), a different.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_010', difficulty: 'standard',
          question: 'For three positive integers \\(a, b, c\\) expressed in prime factorisation form.',
          hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method for two.',
          misconception: '**Specific error:** Students often write the HCF of three numbers by taking the smallest exponent of each prime **among.',
          parts: [
                { id: 'a', prompt: 'Explain why, when finding the LCM of three numbers, we take the highest power of each prime factor that appears in any of the three numbers, even if that prime.', answer: '**Correct answer:** The LCM must be a multiple of each of the three numbers',
                  options: ['**Correct answer:** The LCM must be a multiple of each of the three numbers', 'we take the highest power', 'we only consider primes present in all three'],
                  hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method for two numbers).',
                  misconception: '**Specific error:** Students often write the HCF of three numbers by taking the smallest exponent of each prime **among the numbers where.' }
          ],
            remediations: { 'specific-error-students-often-write': { steps: ['**Re-visualise the definition:** Write three numbers\' prime factorisations in a three-row table with columns for each.', 'Highlight: HCF column = primes where all three rows have exponent > 0; take min.', 'LCM column = all primes that appear in any row; take max.', '**Contrast with two-number case:** Show side-by-side: for two numbers, a prime is common if in both; for three, must.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_011', difficulty: 'standard',
          question: 'A rational number \\( \\frac{p}{q} \\) (where \\( p \\) and \\( q \\) are integers, \\.',
          hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and.',
          misconception: 'Students often check if the **original** denominator (before simplifying) has only 2 and 5 as factors.',
          parts: [
                { id: 'a', prompt: 'Without performing long division, determine whether \\( \\frac{14587}{1250} \\) has a terminating or non-terminating recurring decimal expansion.', answer: 'Step 1: Check if fraction is in lowest terms',
                  options: ['Step 1: Check if fraction is in lowest terms', '3 places', '5 places'],
                  hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and c6_math_ch01_015.',
                  misconception: 'Students often check if the **original** denominator (before simplifying) has only 2 and 5 as factors.' },
                { id: 'b', prompt: 'The rational numbers \\( \\frac{a}{b} \\) and \\( \\frac{c}{d} \\) (both in lowest terms) have terminating decimal expansions.', answer: 'Yes, the sum will always have a terminating decimal expansion',
                  options: ['Yes, the sum will always have a terminating decimal expansion', 'not always'],
                  hint: 'If stuck, revisit c10_math_cbse_01_001 (Fundamental Theorem of Arithmetic) and c6_math_ch01_015.',
                  misconception: 'Students often check if the **original** denominator (before simplifying) has only 2 and 5 as factors.' }
          ],
            remediations: { 'students-often-check-if-the': { steps: ['If a student makes the "forget to simplify first" error: (1) Give them \\( \\frac{12}{30} \\) and ask them to predict the.', 'They will likely factorise 30 = 2 × 3 × 5 and say "recurring".', '(2) Make them do the long division: \\( 12 \\div 30 = 0.4 \\) — it terminates!', '(3) Ask: "Why did our rule fail?" Guide them to see \\( \\frac{12}{30} = \\frac{2}{5} \\) after dividing by HCF 6.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_01_012', difficulty: 'standard',
          question: 'Finding HCF and LCM from word problems involves translating a real-life.',
          hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method) and.',
          misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM.',
          parts: [
                { id: 'a', prompt: 'An APPLY level question: Three traffic lights change after 48 seconds, 72 seconds, and 108 seconds respectively.', answer: 'Step 1: Identify numbers: 48, 72, 108',
                  options: ['Step 1: Identify numbers: 48, 72, 108', 'simultaneous repetition', 'maximum grouping'],
                  hint: 'If stuck, revisit c10_math_cbse_01_002 (HCF and LCM by Prime Factorisation Method) and.',
                  misconception: 'Students often see the phrase "greatest number" and automatically choose HCF, or "smallest number" and choose LCM, without reading the.' }
          ],
            remediations: { 'students-often-see-the-phrase': { steps: ['Ask the student to circle the keywords: "divisible by", "leaves remainder", "identical groups", "simultaneously".', 'Make a decision table: "Divisible by / multiple of / together again" → LCM; "Divides / groups / packs / greatest number.', 'Practice 5 problems where the only task is to write "HCF" or "LCM" and explain why, without computing.', 'Re-attempt the failed problem using the table.'], labTask: { instruction: 'On the interactive: split into 4 parts — what fraction is each part? — then check.', widget: 'fraction', validate: 'fraction:parts=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
