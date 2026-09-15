import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch04_p1: SimDef = {
    id: 'v3_c11_math_ch04_p1',
    title: 'Principle of Mathematical Induction · Part 1/2',
    subtitle: 'Learn the two dominoes of induction — and the one faulty step that fakes a proof.',
    classLevel: 11, subject: 'mathematics', topic: 'Principle of Mathematical Induction · Part 1/2',
    chapters: ['c11_math_ch04'],
    nodeIds: ['c11_math_cbse_04_001', 'c11_math_cbse_04_002', 'c11_math_cbse_04_003', 'c11_math_cbse_04_004', 'c11_math_cbse_04_005', 'c11_math_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prover checking whether a staircase can be climbed forever', intro: 'You don\'t verify 1+3+5+...=n² for every n — you verify the first tile stands and that each tile tips the next.', goal: 'Execute the base case and inductive step correctly and spot invalid induction arguments.' },
    discovery: {
        question: 'Induction \'proves\' all horses share one colour: true for 1 horse; removing different horses always leaves same-coloured sets. Where does it break?',
        options: ['At k = 1 → k = 2 — the two reduced sets share no horse, so the colour can\'t transfer between them', 'At the base case — one horse can be two colours', 'At the hypothesis — induction never works on animals', 'Nowhere — the proof is correct'],
        answer: 'At k = 1 → k = 2 — the two reduced sets share no horse, so the colour can\'t transfer between them',
        hook: 'And \'assume P(k) is true for all k\' is circular — the hypothesis is one arbitrary, fixed k; the domino only needs to fall once per step.',
    },
    teaching: [
        { title: 'Mathematical Induction: Principle and Motivation', text: 'Mathematical induction is a deductive proof technique used to establish that a statement P(n) holds for every natural number n ∈ ℕ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_04_001', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'Anchor a base case at the right starting value (2ⁿ > n² begins at n = 5, not n = 1), then drive P(k) → P(k+1) without assuming the conclusion.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_04_001', title: 'Mathematical Induction: Principle and Motivation',
          caseStudy: { intro: 'Imagine you are standing at the bottom of the infinite staircase of the Qutub Minar. You want to prove you can reach every step.',
            decisions: [{ prompt: 'State the Principle of Mathematical Induction precisely, naming the two required conditions and the conclusion.', options: [
                { text: 'Correct answer: Let P(n) be a statement involving natural number n', outcome: 'Correct answer: Let P(n) be a statement involving natural number n.' },
                { text: 'checking P(1), P(2), P(3) is enough', outcome: 'Not quite — Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for.', reveals: 'students-treat-the-inductive-hypothesis' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_002', title: 'Base Case: Verifying for n=1',
          scaffold: { problem: 'Verify the base case for the statement P(n): 1 + 2 + 3 + ... + n = n(n+1)/2 for all n ∈ ℕ.',
            steps: [
            { text: 'Write the statement P(n) clearly: "Sum of first n natural numbers equals n(n+1)/2."' },
            { text: 'Identify the base case value: Since domain is ℕ = {1,2,3,...}, base case is n = 1.' },
            { text: 'Compute LHS for n=1: The series has only one term when n=1, which is the first term "1". So LHS = 1.' },
            { text: 'Compute RHS for n=1: Substitute n=1 into n(n+1)/2 = 1(1+1)/2 = 1×2/2 = 1.' },
            { text: 'Compare: LHS = 1, RHS = 1. Since LHS = RHS, P(1) is true.' },
            { text: 'Write the concluding statement: "Therefore, the base case P(1) is verified."', faded: true, blankAnswer: 'P(1) is true because LHS = 1 and RHS = 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_003', title: 'Inductive Step: Assuming True for k',
          scaffold: { problem: 'Prove by mathematical induction that for all n ∈ ℕ, the sum of the first n even natural numbers is n(n+1). That is, P(n): 2 + 4 + 6 + ...',
            steps: [
            { text: 'Write the inductive hypothesis P(k) by replacing n with k in the given statement. P(k): 2 + 4 + 6 + ... + 2k = k(k+1).' },
            { text: 'Write the statement P(k+1) that we need to prove by replacing n with k+1. P(k+1): 2 + 4 + 6 + ...' },
            { text: 'Start with the left-hand side (LHS) of P(k+1) and split it into the sum up to k plus the (k+1)th term.' },
            { text: 'Apply the inductive hypothesis P(k) to replace the bracketed sum with k(k+1). LHS = k(k+1) + 2(k+1).' },
            { text: 'Factor out the common factor (k+1) from the expression. LHS = (k+1)[k + 2] = (k+1)(k+2).' },
            { text: 'Observe that this equals the right-hand side (RHS) of P(k+1), which is (k+1)(k+2). Therefore, P(k) ⇒ P(k+1) is proved.', faded: true, blankAnswer: 'Inductive hypothesis: P(k): 2 + 4 + ... + 2k = k(k+1).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_004', title: 'Proving Summation Formulas by Induction',
          scaffold: { problem: 'Prove by mathematical induction that the sum of the first n natural numbers is n(n+1)/2. That is, prove 1 + 2 + 3 + ...',
            steps: [
            { text: 'Define the statement P(n): 1 + 2 + 3 + ... + n = n(n+1)/2.' },
            { text: 'Base case (n=1): Left-hand side (LHS) = 1. Right-hand side (RHS) = 1(1+1)/2 = 1. Since LHS = RHS, P(1) is true.' },
            { text: 'Inductive hypothesis: Assume P(k) is true for some arbitrary natural number k. That is, 1 + 2 + 3 + ... + k = k(k+1)/2.' },
            { text: 'Inductive step: Prove P(k+1) is true, i.e., 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2.' },
            { text: 'Conclusion: Since P(1) is true and P(k) ⇒ P(k+1), by the principle of mathematical induction, P(n) is true for all.', faded: true, blankAnswer: 'The formula is proved for all n ∈ ℕ.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_005', title: 'Proving Divisibility by Induction',
          scaffold: { problem: 'Prove by mathematical induction that \\( n^3 + 5n \\) is divisible by 6 for all \\( n \\in \\mathbb{N} \\).',
            steps: [
            { text: 'Define the statement \\( P(n) \\): "\\( n^3 + 5n \\) is divisible by 6" i.e., \\( n^3 + 5n = 6 \\times \\text{integer} \\).' },
            { text: 'Verify base case \\( n=1 \\): \\( 1^3 + 5 \\times 1 = 6 = 6 \\times 1 \\). So \\( P(1) \\) is true.' },
            { text: 'Write the induction hypothesis: Assume \\( P(k) \\) is true for some \\( k \\in \\mathbb{N} \\), i.e., \\( k^3 + 5k = 6M \\).' },
            { text: 'Consider \\( P(k+1) \\): \\( (k+1)^3 + 5(k+1) = k^3 + 3k^2 + 3k + 1 + 5k + 5 = (k^3 + 5k) + 3k^2 + 3k + 6 \\).' },
            { text: 'Substitute the hypothesis \\( k^3 + 5k = 6M \\): expression becomes \\( 6M + 3k^2 + 3k + 6 = 6(M+1) + 3k(k+1) \\).' },
            { text: 'Prove \\( 3k(k+1) \\) is divisible by 6: \\( k(k+1) \\) is product of two consecutive integers, so one is even → \\( k(k+1).' },
            { text: 'Combine: \\( (k+1)^3 + 5(k+1) = 6(M+1) + 6L = 6(M+L+1) \\), which is a multiple of 6.' },
            { text: 'Conclude: \\( P(k+1) \\) is true whenever \\( P(k) \\) is true. By induction, \\( P(n) \\) is true for all \\( n \\in.', faded: true, blankAnswer: 'Proved. \\( n^3 + 5n \\) is divisible by 6 for all \\( n \\in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_006', title: 'Proving Inequalities by Induction',
          scaffold: { problem: 'Prove by mathematical induction that 3ⁿ > n³ for all integers n ≥ 4.',
            steps: [
            { text: 'Identify the statement P(n): 3ⁿ > n³. Check base case n=4: 3⁴ = 81, 4³ = 64. Since 81 > 64, P(4) is true.' },
            { text: 'Write inductive hypothesis: Assume P(k) is true for some integer k ≥ 4, i.e., 3ᵏ > k³.' },
            { text: 'Prove P(k+1): 3ᵏ⁺¹ > (k+1)³. Start with LHS: 3ᵏ⁺¹ = 3·3ᵏ.' },
            { text: 'Use inductive hypothesis: 3·3ᵏ > 3·k³ (multiplying both sides by 3 > 0 preserves inequality).' },
            { text: 'Show 3k³ ≥ (k+1)³ for k ≥ 4. Expand: (k+1)³ = k³ + 3k² + 3k + 1. Need 3k³ ≥ k³ + 3k² + 3k + 1 ⇔ 2k³ - 3k² - 3k - 1 ≥ 0.' },
            { text: 'Verify helper inequality for k ≥ 4. For k=4: 2(64) - 3(16) - 12 - 1 = 128 - 48 - 13 = 67 > 0.' },
            { text: 'Chain: 3ᵏ⁺¹ = 3·3ᵏ > 3·k³ > (k+1)³. Therefore P(k+1) true.' },
            { text: 'By principle of mathematical induction, 3ⁿ > n³ for all n ≥ 4.', faded: true, blankAnswer: 'Proved. 3ⁿ > n³ for all integers n ≥ 4.' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_04_006', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a proof-writing workshop, a student proves 1+2+…+n = n(n+1)/2 by induction but writes \'Assume the formula true for ALL n\' and, for the base case of a series, adds the first two terms because \'… means at least two terms exist.\'',
            decisions: [{ prompt: 'Which two moves invalidate his proof?', options: [
                { text: 'Correct the logic and the count: the hypothesis assumes P(k) for an arbitrary FIXED k — \'true for all n\' assumes the conclusion itself (circular). Then you derive P(k+1) FROM P(k), never manipulate P(k+1) down to 0=0. And at n=1 the series has exactly one term — the ellipsis vanishes: LHS is just 1/(1×2) = 1/2, matching RHS 1/2.', outcome: 'The proof is repaired at both hinges: the staircase works because step 1 is checked and each step legitimately passes weight to the next.' },
                { text: 'Let \'assume for all n\' stand — it\'s just strong wording for the hypothesis.', outcome: 'It\'s not wording, it\'s circularity: assuming the claim for all n is assuming what you\'re proving — the hypothesis must be one arbitrary fixed k.', reveals: 'assume-for-all-n' },
                { text: 'Keep two terms in the base case — a series can\'t consist of a single term.', outcome: 'At n=1 the pattern produces exactly one term — the \'…\' is a continuation marker, not a guarantee of multiple terms; extra terms falsify the check.', reveals: 'base-case-needs-two-terms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Prove step one exists and that every step hands off to the next — the infinite staircase is then climbed without climbing.',
            decisions: [{ prompt: 'What comes next? Principle of Mathematical Induction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Principle of Mathematical Induction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_04_001', difficulty: 'standard',
          question: 'Mathematical induction is a deductive proof technique used to establish that.',
          hint: 'Revisit Class 9 sequences (c9_math_ch8_1, c9_math_ch8_2) to practice writing explicit and.',
          misconception: 'Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for some arbitrary but.',
          parts: [
                { id: 'a', prompt: 'State the Principle of Mathematical Induction precisely, naming the two required conditions and the conclusion.', answer: 'Correct answer: Let P(n) be a statement involving natural number n',
                  options: ['Correct answer: Let P(n) be a statement involving natural number n', 'checking P(1), P(2), P(3) is enough'],
                  hint: 'Revisit Class 9 sequences (c9_math_ch8_1, c9_math_ch8_2) to practice writing explicit and recursive.',
                  misconception: 'Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for some arbitrary but fixed k".' },
                { id: 'b', prompt: 'Consider the statement P(n): "n² + n + 41 is prime for all n ∈ ℕ." Identify the base case P(1) and the inductive hypothesis P(k) that would be assumed in.', answer: 'Correct answer: Base case P(1): 1² + 1 + 41 = 43',
                  options: ['Correct answer: Base case P(1): 1² + 1 + 41 = 43', 'for all k', 'for some arbitrary k'],
                  hint: 'Revisit Class 9 sequences (c9_math_ch8_1, c9_math_ch8_2) to practice writing explicit and recursive.',
                  misconception: 'Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for some arbitrary but fixed k".' }
          ],
            remediations: { 'students-treat-the-inductive-hypothesis': { steps: ['If a student writes "Assume P(k) is true for all k", stop them and ask: "If it\'s true for all k, what is left.', 'Assume P(k) is true for this specific k." For backwards proofs, use the "domino" analogy: "You must show domino.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for some arbitrary but.',
          parts: [
                { id: 'a', prompt: 'A faulty induction proof claims: "All horses are the same colour. Base case: 1 horse has same colour. Inductive step: Assume any k horses have same colour.', answer: 'Correct answer: The flaw is in the transition from k=1 to k=2',
                  options: ['Correct answer: The flaw is in the transition from k=1 to k=2', 'base case is wrong', 'inductive hypothesis is false'],
                  hint: 'Revisit Class 9 sequences (c9_math_ch8_1, c9_math_ch8_2) to practice writing explicit and recursive.',
                  misconception: 'Students treat the inductive hypothesis as "P(k) is true for all k" rather than "P(k) is true for some arbitrary but fixed k".' }
          ],
            remediations: { 'students-treat-the-inductive-hypothesis': { steps: ['If a student writes "Assume P(k) is true for all k", stop them and ask: "If it\'s true for all k, what is left.', 'Assume P(k) is true for this specific k." For backwards proofs, use the "domino" analogy: "You must show domino.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_002', difficulty: 'standard',
          question: 'The base case in mathematical induction is the verification that the statement.',
          hint: 'If stuck, revisit c9_math_ch8_2 (explicit rules for sequences) to practice writing the.',
          misconception: 'Students incorrectly compute the LHS for n=1 by including multiple terms. For P(n): 1/(1×2) + 1/(2×3) + ...',
          parts: [
                { id: 'a', prompt: 'Explain why verifying P(1) for the statement "n³ - n is divisible by 3" requires computing 1³ - 1, and what the result 0 tells us about divisibility.', answer: 'For n=1, 1³ - 1 = 0',
                  options: ['For n=1, 1³ - 1 = 0', '0 is not divisible by 3', 'we cannot divide by 0'],
                  hint: 'If stuck, revisit c9_math_ch8_2 (explicit rules for sequences) to practice writing the k-th term.',
                  misconception: 'Students incorrectly compute the LHS for n=1 by including multiple terms. For P(n): 1/(1×2) + 1/(2×3) + ...' }
          ],
            remediations: { 'students-incorrectly-compute-the-lhs': { steps: ['Ask the student to write the general term T_k = 1/(k(k+1)).', 'Ask "What is k when n=1?" (Answer: k=1 only).', 'Have them write the sum Σ_{k=1}^{1} T_k explicitly.', 'Show that the upper limit of summation equals the lower limit, meaning exactly one term.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_003', difficulty: 'standard',
          question: 'The inductive step in mathematical induction is the logical implication where.',
          hint: 'If stuck, revisit c7_math_ch04_005 (generalising patterns with variables) and.',
          misconception: 'Students treat the inductive hypothesis as a statement they must prove, writing "Proof of P(k): ..." and attempting.',
          parts: [
                { id: 'a', prompt: 'Explain why we are allowed to "assume P(k) is true" in the inductive step without having proven it first. Isn\'t this circular reasoning?', answer: 'We are not proving P(k)',
                  options: ['We are not proving P(k)', 'We assume it because we already proved it for k=1', 'the base case proves P(k) for all k, missing the role of the implication'],
                  hint: 'If stuck, revisit c7_math_ch04_005 (generalising patterns with variables) and c6_math_ch05_057.',
                  misconception: 'Students treat the inductive hypothesis as a statement they must prove, writing "Proof of P(k): ..." and attempting to verify P(k).' },
                { id: 'b', prompt: 'For the statement P(n): 1 + 3 + 5 + ... + (2n-1) = n², write down the inductive hypothesis P(k) and the statement P(k+1) that needs to be proved.', answer: 'P(k): 1 + 3 + 5 +',
                  options: ['P(k): 1 + 3 + 5 +', '1 + 3 +'],
                  hint: 'If stuck, revisit c7_math_ch04_005 (generalising patterns with variables) and c6_math_ch05_057.',
                  misconception: 'Students treat the inductive hypothesis as a statement they must prove, writing "Proof of P(k): ..." and attempting to verify P(k).' }
          ],
            remediations: { 'students-treat-the-inductive-hypothesis': { steps: ['If a student tries to prove P(k), immediately stop them and ask: "What is the logical structure of induction?', 'Then we prove: IF P(k) is true, THEN P(k+1) is true.', 'To prove an \'if-then\' statement, what do we do?" Guide them to: "We assume the \'if\' part (P(k)) and derive the \'then\'.', 'Then [algebraic manipulation using P(k)] ...'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_004', difficulty: 'standard',
          question: 'Proving summation formulas by induction is the process of establishing that.',
          hint: 'If stuck, revisit Class 10 Arithmetic Progressions (sum formula) and Class 9 Algebraic.',
          misconception: 'Students often incorrectly write the (k+1)th term when moving from P(k) to P(k+1).',
          parts: [
                { id: 'a', prompt: 'Why is it necessary to prove the base case (usually n=1) before doing the inductive step when proving a summation formula?', answer: 'The base case anchors the induction',
                  options: ['The base case anchors the induction', 'base case is not needed', 'inductive step proves base case'],
                  hint: 'If stuck, revisit Class 10 Arithmetic Progressions (sum formula) and Class 9 Algebraic Identities.',
                  misconception: 'Students often incorrectly write the (k+1)th term when moving from P(k) to P(k+1).' }
          ],
            remediations: { 'students-often-incorrectly-write-the': { steps: ['If a student makes the error of adding the wrong term, guide them to write the general term of the series explicitly.', 'Have them practice identifying the general term for various series.', 'For factoring difficulties, provide a step-by-step factoring guide: factor out (k+1) first, then factor the remaining.', 'Use the identity (k+1)(k+2)(2k+3) as a target to work backwards.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_005', difficulty: 'standard',
          question: 'Proving divisibility by mathematical induction is the process of establishing.',
          hint: 'If stuck, revisit c11_math_cbse_04_003 (Inductive Step structure) and c6_math_ch01_014.',
          misconception: 'Students treat the induction hypothesis as "assume \\( f(k) \\) is divisible by \\( m \\)" but then in the inductive step.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Proving divisibility by mathematical induction is the process of establishing that an',
                  options: ['Proving divisibility by mathematical induction is the process of establishing that an', 'Mathematical induction is a deductive proof technique used to establish that a statement', 'The base case in mathematical induction is the verification that the statement P(n) holds', 'The inductive step in mathematical induction is the logical implication where we assume'],
                  hint: 'If stuck, revisit c11_math_cbse_04_003 (Inductive Step structure) and c6_math_ch01_014.',
                  misconception: 'Students treat the induction hypothesis as "assume \\( f(k) \\) is divisible by \\( m \\)" but then in the inductive step, they expand \\.' }
          ],
            remediations: { 'students-treat-the-induction-hypothesis': { steps: ['When a student cannot form the inductive step, guide them through this 3-step repair: (1) Write \\( f(k) \\) and \\.', '(2) Identify the "extra" factor in \\( f(k+1) \\) — e.g., for \\( a^{k+1} - b^{k+1} \\), the extra factors are \\( a \\) and.', '(3) Perform the "add and subtract" maneuver: \\( a \\cdot a^k - b \\cdot b^k = a \\cdot a^k - a \\cdot b^k + a \\cdot b^k -.', 'Now the first term uses the hypothesis, the second term is visibly divisible by \\( (a-b) \\).'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_006', difficulty: 'standard',
          question: 'Proving inequalities by mathematical induction involves establishing that.',
          hint: 'Review inequality properties (Class 10 Chapter 6: Linear Inequalities) specifically: "If.',
          misconception: 'Students treat inequalities like equations during the inductive step, performing invalid operations such as: (1).',
          parts: [
                { id: 'a', prompt: 'Explain why proving 2ⁿ > n² for all n ∈ ℕ requires starting the base case at n = 5 rather than n = 1. What happens if you try n = 1, 2, 3, 4?', answer: 'For n=1: 2¹=2 > 1²=1 (true)',
                  options: ['For n=1: 2¹=2 > 1²=1 (true)', 'induction can "fix" a false base case'],
                  hint: 'Review inequality properties (Class 10 Chapter 6: Linear Inequalities) specifically: "If a > b and.',
                  misconception: 'Students treat inequalities like equations during the inductive step, performing invalid operations such as: (1) Subtracting inequalities.' },
                { id: 'b', prompt: 'Compare the inductive step for proving ∑ᵢ₌₁ⁿ 1/i² < 2 versus proving ∑ᵢ₌₁ⁿ 1/i² < 2 - 1/n.', answer: 'For ∑ 1/i² < 2: Inductive step needs ∑₁ᵏ 1/i² + 1/(k+1)² < 2',
                  options: ['For ∑ 1/i² < 2: Inductive step needs ∑₁ᵏ 1/i² + 1/(k+1)² < 2', 'strengthening the induction hypothesis'],
                  hint: 'Review inequality properties (Class 10 Chapter 6: Linear Inequalities) specifically: "If a > b and.',
                  misconception: 'Students treat inequalities like equations during the inductive step, performing invalid operations such as: (1) Subtracting inequalities.' }
          ],
            remediations: { 'students-treat-inequalities-like-equations': { steps: ['If a student makes these errors: (1) Have them write the inequality property being used at each step: "Since k ≥ 5, k-2.', '(3) When stuck at inductive step, guide them to check if a stronger statement P\'(n): [original] + [slack term] works.', '(4) Always verify the algebraic condition (e.g., k² - 2k - 1 ≥ 0) holds for the base case value and beyond.'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
