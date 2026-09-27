import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch01_p1: SimDef = {
    id: 'v3_c11_app_ch01_p1',
    title: 'Numbers Quantification · Part 1/2',
    subtitle: 'This node covers the *overview and connective tissue* of Chapter 1 only — it does NOT.',
    classLevel: 11, subject: 'app', topic: 'Numbers Quantification · Part 1/2',
    chapters: ['c11_app_ch01'],
    nodeIds: ['c11_app_cbse_01_001', 'c11_app_cbse_01_002', 'c11_app_cbse_01_003', 'c11_app_cbse_01_004', 'c11_app_cbse_01_005', 'c11_app_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Imagine you send a WhatsApp message — it travels as 0s and 1s (binary), gets scrambled using giant prime.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Compare the role of "uniqueness" in the Fundamental Theorem of Arithmetic (prime factorization) and in binary representation of integers.',
        options: ['Similarity: Both guarantee a **unique representation**', 'both are unique', 'miscellaneous bag'],
        answer: 'Similarity: Both guarantee a **unique representation**',
        hook: 'Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary, complex, logs) with.',
    },
    teaching: [
        { title: 'Introduction:', text: 'This introductory node provides a conceptual map for Chapter 1 (Numbers and Quantification), outlining the scope and interconnections between prime numbers, binary systems, complex numbers.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_app_cbse_01_001', title: 'Introduction:',
          caseStudy: { intro: 'Imagine you send a WhatsApp message — it travels as 0s and 1s (binary), gets scrambled using giant prime numbers (RSA encryption), and the signal strength.',
            decisions: [{ prompt: 'List the five major mathematical concepts introduced in Chapter 1 (Numbers and Quantification) as per the NCERT concept map.', options: [
                { text: 'The five concepts are: (1) Prime Numbers & Factorisation, (2) Binary Numbers, (3) Complex', outcome: 'The five concepts are: (1) Prime Numbers & Factorisation, (2) Binary Numbers, (3) Complex Numbers.' },
                { text: 'quadratic equations', outcome: 'Not quite — Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary.', reveals: 'chapter-1-is-a-miscellaneous' },
                { text: 'trigonometry', outcome: 'Not quite — Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary.', reveals: 'chapter-1-is-a-miscellaneous' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_002', title: 'Prime Numbers',
          scaffold: { problem: 'A school has 4680 students and 15708 books. The principal wants to distribute books equally among students such that each student gets the.',
            steps: [
            { text: 'Identify that "maximum books per student with no remainder" means finding the greatest common divisor (gcd) of 4680 and.' },
            { text: 'Compute prime factorizations: 4680 = 2³ × 3² × 5 × 13; 15708 = 2² × 3 × 7 × 11 × 17.' },
            { text: 'Apply gcd formula using minimum exponents of common primes: common primes are 2 and 3.' },
            { text: 'Interpret: Each student gets 12 books. Total students who receive books = 4680 / 12 = 390 students (or 15708 / 12.' },
            { text: 'Verify: 1309 × 12 = 15708 ✓. 1309 ≤ 4680 ✓. Prime factorization uniqueness ensures this is the maximum possible equal.', faded: true, blankAnswer: 'Maximum books per student = 12. Number of students who.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_003', title: 'Why prime numbers are important?: Encryptions using Prime Numbers',
          scaffold: { problem: 'Alice chooses primes *p* = 47 and *q* = 59 for her RSA system. She selects *e* = 17.',
            steps: [
            { text: 'Compute modulus *n* = *p* × *q* = 47 × 59 = 2773. This is public.' },
            { text: 'Compute Euler\'s totient *φ(n)* = (*p* - 1)(*q* - 1) = 46 × 58 = 2668. This must be kept secret.' },
            { text: 'Verify *e* = 17 is valid: check gcd(17, 2668) = 1. 2668 ÷ 17 = 156 remainder 16; 17 ÷ 16 = 1 r 1; 16 ÷ 1 = 16 r 0 → gcd.' },
            { text: 'Find *d* = *e⁻¹* mod *φ(n)* i.e., solve 17*d* ≡ 1 (mod 2668). Use Extended Euclidean Algorithm:' },
            { text: 'Verify *e* × *d* = 17 × 157 = 2669 = 1 + 1 × 2668 ≡ 1 (mod 2668). Correct.', faded: true, blankAnswer: 'Public Key = (2773, 17); Private Key = 157.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_004', title: 'Binary Numbers',
          scaffold: { problem: 'A UPI transaction ID is generated as a 16-bit binary number. If the ID is 1010011010010110, what is its decimal equivalent?',
            steps: [
            { text: 'Identify the bits and their positions. Write the 16-bit number with position indices from rightmost (position 0).' },
            { text: 'List only positions where bit = 1: positions 15, 13, 10, 9, 6, 3, 2, 1.' },
            { text: 'Compute 2^position for each: 2¹⁵=32768, 2¹³=8192, 2¹⁰=1024, 2⁹=512, 2⁶=64, 2³=8, 2²=4, 2¹=2.' },
            { text: 'Sum these powers: 32768 + 8192 + 1024 + 512 + 64 + 8 + 4 + 2 = 42574.' },
            { text: 'Verify by converting 42574 back to binary using repeated division: 42574÷2=21287 R0, 21287÷2=10643 R1, 10643÷2=5321 R1.', faded: true, blankAnswer: '42574 (decimal)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_005', title: 'Complex Numbers (Preliminary Idea only)',
          scaffold: { problem: '** In an AC circuit analysis, the impedance of a resistor is **Z_R = 3 Ω** and of an inductor is **Z_L = 4i Ω** (reactance).',
            steps: [
            { text: 'Identify given quantities — **Z_R = 3 + 0i** (purely real), **Z_L = 0 + 4i** (purely imaginary).' },
            { text: 'Add complex numbers: **Z = (3 + 0i) + (0 + 4i) = 3 + 4i**. Real part = 3, Imaginary part = 4.' },
            { text: 'Compute modulus: **|Z| = √(3² + 4²) = √(9 + 16) = √25 = 5 Ω**.' },
            { text: 'Interpret — **|Z| = 5 Ω** is the magnitude of total opposition to current; the phase angle **θ = tan⁻¹(4/3) ≈ 53°**.' },
            { text: 'Verify using conjugate: **Z·Z̅ = (3+4i)(3-4i) = 9 - 12i + 12i - 16i² = 9 + 16 = 25 = |Z|²**. Consistent.', faded: true, blankAnswer: '** **Z = 3 + 4i Ω**, **|Z| = 5 Ω**. The circuit\'s total.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_app_cbse_01_006', title: 'Indices, Logarithm and Antilogarithm',
          scaffold: { problem: 'The intensity of an earthquake wave is recorded as 10⁻⁴ times the reference intensity. Find the Richter scale magnitude R = log₁₀(I/I₀).',
            steps: [
            { text: 'Identify given: I/I₀ = 10⁻⁴ for first quake; R₂ = 5.5 for second quake.' },
            { text: 'Apply definition: R = log₁₀(I/I₀). For first quake, R₁ = log₁₀(10⁻⁴).' },
            { text: 'Use log_b(bˣ) = x: R₁ = -4. (Magnitude -4 means very small, below detection).' },
            { text: 'For second quake: 5.5 = log₁₀(I₂/I₀) → I₂/I₀ = 10⁵·⁵ = 10⁵ × 10⁰·⁵ ≈ 100000 × 3.162 = 316,227.76.' },
            { text: 'Compare: Second quake is 316,228 times reference intensity; first is 0.0001 times.', faded: true, blankAnswer: 'First quake magnitude = -4; Second quake intensity ratio.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Numbers Quantification like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Numbers Quantification · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Numbers Quantification · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_01_001', difficulty: 'standard',
          question: 'This introductory node provides a conceptual map for Chapter 1 (Numbers and.',
          hint: 'Review Class 10 NCERT Mathematics Chapter 1 (Real Numbers), specifically Exercises 1.1.',
          misconception: 'Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary, complex, logs) with.',
          parts: [
                { id: 'a', prompt: 'Compare the role of "uniqueness" in the Fundamental Theorem of Arithmetic (prime factorization) and in binary representation of integers.', answer: 'Similarity: Both guarantee a **unique representation**',
                  options: ['Similarity: Both guarantee a **unique representation**', 'both are unique', 'miscellaneous bag'],
                  hint: 'Review Class 10 NCERT Mathematics Chapter 1 (Real Numbers), specifically Exercises 1.1 and 1.2.',
                  misconception: 'Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary, complex, logs) with no unifying theme.' }
          ],
            remediations: { 'chapter-1-is-a-miscellaneous': { steps: ['Have the student draw a **concept map** on paper with the five sub-topics as nodes; force them to draw at least 3.', 'Ask them to re-read the NCERT "Concept Map" on page [2] and write one sentence per edge explaining the link.', 'Assign a 10-minute "explain to a peer" task: "Teach your friend why binary and primes are both needed for WhatsApp.', 'If still stuck, revisit Class 10 Real Numbers (Fundamental Theorem of Arithmetic) and Class 9 Number Systems.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary, complex, logs) with.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Complex numbers (Section 1.4) are included in this chapter only for mathematical completeness; they have no connection to primes.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'miscellaneous bag'],
                  hint: 'Review Class 10 NCERT Mathematics Chapter 1 (Real Numbers), specifically Exercises 1.1 and 1.2.',
                  misconception: 'Students believe Chapter 1 is a "miscellaneous bag" of unrelated number systems (primes, binary, complex, logs) with no unifying theme.' }
          ],
            remediations: { 'chapter-1-is-a-miscellaneous': { steps: ['Have the student draw a **concept map** on paper with the five sub-topics as nodes; force them to draw at least 3.', 'Ask them to re-read the NCERT "Concept Map" on page [2] and write one sentence per edge explaining the link.', 'Assign a 10-minute "explain to a peer" task: "Teach your friend why binary and primes are both needed for WhatsApp.', 'If still stuck, revisit Class 10 Real Numbers (Fundamental Theorem of Arithmetic) and Class 9 Number Systems.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_002', difficulty: 'standard',
          question: 'A **prime number** is a positive integer p > 1 whose only positive divisors are.',
          hint: 'If stuck, review "divisibility rules for 2, 3, 5, 7, 11" and practice finding all factor.',
          misconception: '**Misconception:** "To check if n is prime, I must test divisibility by *all* primes less than n." **Why it happens:**.',
          parts: [
                { id: 'a', prompt: 'Using the Sieve of Eratosthenes logic, explain why we only need to cross out multiples of primes up to √100 to find all primes ≤ 100.', answer: 'Any composite n ≤ 100 has a prime factor p ≤ √n ≤ √100 = 10',
                  options: ['Any composite n ≤ 100 has a prime factor p ≤ √n ≤ √100 = 10', 'we stop at 7 because 7 is the largest prime ≤ 10'],
                  hint: 'If stuck, review "divisibility rules for 2, 3, 5, 7, 11" and practice finding all factor pairs.',
                  misconception: '**Misconception:** "To check if n is prime, I must test divisibility by *all* primes less than n." **Why it happens:** Students see the.' },
                { id: 'b', prompt: 'Euclid\'s proof assumes a finite list of primes p₁, p₂, …, pᵣ and constructs N = p₁p₂…pᵣ + 1.', answer: 'The flaw: If N is composite, it has a prime divisor p',
                  options: ['The flaw: If N is composite, it has a prime divisor p', 'N is prime'],
                  hint: 'If stuck, review "divisibility rules for 2, 3, 5, 7, 11" and practice finding all factor pairs.',
                  misconception: '**Misconception:** "To check if n is prime, I must test divisibility by *all* primes less than n." **Why it happens:** Students see the.' }
          ],
            remediations: { 'misconception-to-check-if-n': { steps: ['**Re-derive the bound:** Take a composite n = a×b with a ≤ b.', 'Then a² ≤ a×b = n ⇒ a ≤ √n.', 'Since a has a prime factor p ≤ a, we get p ≤ √n.', '**Practice with edge cases:** Test n = 121 (√121=11, prime factor 11), n = 143 (√143≈11.9, factors 11×13), n = 169.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_003', difficulty: 'standard',
          question: 'Prime numbers are the foundational building blocks of the RSA cryptosystem.',
          hint: 'If stuck on modular inverse computation, review **Extended Euclidean Algorithm** (node.',
          misconception: '**Misconception:** "The security of RSA relies on the secrecy of the encryption algorithm." **Why students think.',
          parts: [
                { id: 'a', prompt: 'In the textbook example, *p* = 71, *q* = 101, *n* = 7171, *φ(n)* = 7000, *e* = 37, *d* = 3973.', answer: 'The student incorrectly used the modulus **n = 7171** instead of **φ(n) = 7000**',
                  options: ['The student incorrectly used the modulus **n = 7171** instead of **φ(n) = 7000**', 'The security of RSA relies on the secrecy of the encryption algorithm', 'cryptography', 'secret codes'],
                  hint: 'If stuck on modular inverse computation, review **Extended Euclidean Algorithm** (node.',
                  misconception: '**Misconception:** "The security of RSA relies on the secrecy of the encryption algorithm." **Why students think this:** They equate.' },
                { id: 'b', prompt: 'Alice chooses primes *p* = 17, *q* = 23. She computes *n* = 391 and *φ(n)* = 352. She wants to use *e* = 11 as her public exponent.', answer: '**Step 1:** Check gcd(*e*, *φ(n)*) = gcd(11, 352)',
                  options: ['**Step 1:** Check gcd(*e*, *φ(n)*) = gcd(11, 352)', 'The security of RSA relies on the secrecy of the encryption algorithm', 'cryptography', 'secret codes'],
                  hint: 'If stuck on modular inverse computation, review **Extended Euclidean Algorithm** (node.',
                  misconception: '**Misconception:** "The security of RSA relies on the secrecy of the encryption algorithm." **Why students think this:** They equate.' },
                { id: 'c', prompt: 'Bob wants to send message *M* = 88 to Alice using her public key (*n* = 391, *e* = 3) from the previous question. Compute the ciphertext *C*.', answer: '**Encryption:** *C* ≡ *M^e* (mod *n*) = 88³ mod 391',
                  options: ['**Encryption:** *C* ≡ *M^e* (mod *n*) = 88³ mod 391', 'Eve doesn\'t know the algorithm', 'The security of RSA relies on the secrecy of the encryption algorithm', 'cryptography'],
                  hint: 'If stuck on modular inverse computation, review **Extended Euclidean Algorithm** (node.',
                  misconception: '**Misconception:** "The security of RSA relies on the secrecy of the encryption algorithm." **Why students think this:** They equate.' }
          ],
            remediations: { 'misconception-the-security-of-rsa': { steps: ['**Clarify the Kerckhoffs\'s Principle:** "A cryptosystem should be secure even if everything about the system, except.', 'The strength of the cryptographic algorithm and the secrecy of the key." 2.', '**Role-play:** Act as attacker.', 'Give the student a public key (*n*=7171, *e*=37) and ciphertext *C*=227.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_004', difficulty: 'standard',
          question: 'Binary numbers are base-2 positional numeral system representations using only.',
          hint: 'Review "Introduction" (c11_app_cbse_01_001) place-value examples — practice expanding 3-4.',
          misconception: 'Students consistently write binary digits in reverse order (LSB first) when using the repeated division method.',
          parts: [
                { id: 'a', prompt: 'Explain why the binary number 100000 has exactly five trailing zeros, and what this tells you about its divisibility by powers of 2.', answer: '100000₂ = 2⁵ = 32',
                  options: ['100000₂ = 2⁵ = 32', 'it\'s divisible by 5'],
                  hint: 'Review "Introduction" (c11_app_cbse_01_001) place-value examples — practice expanding 3-4 digit.',
                  misconception: 'Students consistently write binary digits in reverse order (LSB first) when using the repeated division method.' },
                { id: 'b', prompt: 'Compare the binary representations of 27 and 54. What pattern do you notice? Use this to explain how multiplying by 2 affects a binary number.', answer: '27₁₀ = 11011₂; 54₁₀ = 110110₂',
                  options: ['27₁₀ = 11011₂; 54₁₀ = 110110₂', 'digits double'],
                  hint: 'Review "Introduction" (c11_app_cbse_01_001) place-value examples — practice expanding 3-4 digit.',
                  misconception: 'Students consistently write binary digits in reverse order (LSB first) when using the repeated division method.' }
          ],
            remediations: { 'students-consistently-write-binary-digits': { steps: ['Have the student write the division steps vertically with remainder column on the RIGHT.', 'Label each remainder with its power of 2: first remainder = 2⁰, second = 2¹, third = 2²...', 'Ask: "Which power of 2 is the MOST significant?" (highest power).', 'Have them build the binary number by placing bits at labeled positions from highest to lowest power.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_005', difficulty: 'standard',
          question: 'A complex number is an expression of the form **z = a + bi**, where **a** and.',
          hint: 'Review binomial expansion **(a+b)(c+d) = ac+ad+bc+bd** and the definition of square root.',
          misconception: '**Misconception:** "The imaginary part of **z = a + bi** is **bi** (including **i**), and the modulus is **|a| + |b|**.',
          parts: [
                { id: 'a', prompt: 'Explain why the product **(3 + 2i)(3 - 2i)** is a *real number* (no **i** term). What property of conjugates does this illustrate?', answer: '**Answer:** **(3 + 2i)(3 - 2i) = 9 - 6i + 6i - 4i² = 9 - 4(-1) = 9 + 4 = 13**',
                  options: ['**Answer:** **(3 + 2i)(3 - 2i) = 9 - 6i + 6i - 4i² = 9 - 4(-1) = 9 + 4 = 13**', 'because they are conjugates'],
                  hint: 'Review binomial expansion **(a+b)(c+d) = ac+ad+bc+bd** and the definition of square root **√(x²).',
                  misconception: '**Misconception:** "The imaginary part of **z = a + bi** is **bi** (including **i**), and the modulus is **|a| + |b|** or **√a² + √b²**.".' }
          ],
            remediations: { 'misconception-the-imaginary-part-of': { steps: ['**Re-anchor definitions:** Write **z = a + bi** on board.', 'Point to **a**: "This is Re(z), a real number." Point to **b**: "This is Im(z), also a real number — **not** **bi**.".', '**Fix modulus:** Draw right triangle with legs **|a|, |b|** and hypotenuse **|z|**.', 'Compute **|3-4i|** via Pythagoras (**5**) vs sum (**7**).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_01_006', difficulty: 'standard',
          question: 'A logarithm of a positive real number N to a given base b (b > 0, b ≠ 1) is the.',
          hint: 'Review Class 8/9 exponent rules: practice converting between radical form (ⁿ√a) and.',
          misconception: 'Students treat the base of a logarithm as a variable to solve for, e.g., in logₓ(8) = 3, they write x = 8/3 instead.',
          parts: [
                { id: 'a', prompt: 'Write the logarithmic form of 5⁻² = 1/25 and the exponential form of log₃(1/27) = -3.', answer: 'log₅(1/25) = -2 and 3⁻³ = 1/27',
                  options: ['log₅(1/25) = -2 and 3⁻³ = 1/27', 'move the base across', 'the exponent becomes the base or argument'],
                  hint: 'Review Class 8/9 exponent rules: practice converting between radical form (ⁿ√a) and fractional.',
                  misconception: 'Students treat the base of a logarithm as a variable to solve for, e.g., in logₓ(8) = 3, they write x = 8/3 instead of x³ = 8 → x = 2.' },
                { id: 'b', prompt: 'Explain why log₁₀(0) is undefined, but log₁₀(0.001) = -3. Use the definition of logarithm as an exponent to justify.', answer: 'log₁₀(0) asks: "10 raised to what power gives 0?" No real exponent works',
                  options: ['log₁₀(0) asks: "10 raised to what power gives 0?" No real exponent works', 'move the base across'],
                  hint: 'Review Class 8/9 exponent rules: practice converting between radical form (ⁿ√a) and fractional.',
                  misconception: 'Students treat the base of a logarithm as a variable to solve for, e.g., in logₓ(8) = 3, they write x = 8/3 instead of x³ = 8 → x = 2.' },
                { id: 'c', prompt: 'Evaluate without a calculator: log₄(8) + log₈(4). Show all steps using the definition of logarithm.', answer: 'Let log₄(8) = x → 4ˣ = 8 → (2²)ˣ = 2³ → 2²ˣ = 2³ → 2x = 3 → x = 3/2',
                  options: ['Let log₄(8) = x → 4ˣ = 8 → (2²)ˣ = 2³ → 2²ˣ = 2³ → 2x = 3 → x = 3/2', 'move the base across'],
                  hint: 'Review Class 8/9 exponent rules: practice converting between radical form (ⁿ√a) and fractional.',
                  misconception: 'Students treat the base of a logarithm as a variable to solve for, e.g., in logₓ(8) = 3, they write x = 8/3 instead of x³ = 8 → x = 2.' },
                { id: 'd', prompt: 'Compare: log₂(16) vs log₄(16). Which is larger? Justify using the definition, not computation.', answer: 'log₂(16) = 4 because 2⁴ = 16',
                  options: ['log₂(16) = 4 because 2⁴ = 16', 'both give 16', 'move the base across'],
                  hint: 'Review Class 8/9 exponent rules: practice converting between radical form (ⁿ√a) and fractional.',
                  misconception: 'Students treat the base of a logarithm as a variable to solve for, e.g., in logₓ(8) = 3, they write x = 8/3 instead of x³ = 8 → x = 2.' }
          ],
            remediations: { 'students-treat-the-base-of': { steps: ['Have the student write 5 exponential equations (e.g., 2³=8, 10⁻²=0.01, 4¹/²=2) and convert each to logarithmic form.', 'Give 5 logarithmic equations and have them convert to exponential form, emphasizing "the base stays the base."', 'Use a number line: plot 10ˣ for x = -2, -1, 0, 1, 2 and show the output is always positive; then ask "what x gives.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
