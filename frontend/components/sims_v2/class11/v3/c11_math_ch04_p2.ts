import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch04_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch04_p2: SimDef = {
    id: 'v3_c11_math_ch04_p2',
    title: 'Principle of Mathematical Induction · Part 2/2',
    subtitle: 'Learn the two dominoes of induction — and the one faulty step that fakes a proof.',
    classLevel: 11, subject: 'mathematics', topic: 'Principle of Mathematical Induction · Part 2/2',
    chapters: ['c11_math_ch04'],
    nodeIds: ['c11_math_cbse_04_007', 'c11_math_cbse_04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a prover checking whether a staircase can be climbed forever', intro: 'You don\'t verify 1+3+5+...=n² for every n — you verify the first tile stands and that each tile tips the next.', goal: 'Execute the base case and inductive step correctly and spot invalid induction arguments.' },
    discovery: {
        question: 'Induction \'proves\' all horses share one colour: true for 1 horse; removing different horses always leaves same-coloured sets. Where does it break?',
        options: ['At k = 1 → k = 2 — the two reduced sets share no horse, so the colour can\'t transfer between them', 'At the base case — one horse can be two colours', 'At the hypothesis — induction never works on animals', 'Nowhere — the proof is correct'],
        answer: 'At k = 1 → k = 2 — the two reduced sets share no horse, so the colour can\'t transfer between them',
        hook: 'And \'assume P(k) is true for all k\' is circular — the hypothesis is one arbitrary, fixed k; the domino only needs to fall once per step.',
    },
    teaching: [
        { title: 'Common Pitfalls in Mathematical Induction', text: 'Common pitfalls in mathematical induction refer to the typical logical, algebraic, and structural errors students make while constructing proofs by induction, such as omitting the base case.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_04_007', title: 'Your mission',
          mission: { widget: 'emag', validate: 'emag:speed=80',
            instruction: 'On the lab: move the magnet fast — is a still magnet enough to make current?.',
        context: 'Anchor a base case at the right starting value (2ⁿ > n² begins at n = 5, not n = 1), then drive P(k) → P(k+1) without assuming the conclusion.',
            observePrompt: 'What did the emag interactive show you?' } },
        { type: 'case', nodeId: 'c11_math_cbse_04_007', title: 'Common Pitfalls in Mathematical Induction',
          caseStudy: { intro: 'Imagine you are helping your younger sibling check their math homework: they claim to have proved that 1 + 2 + ...',
            decisions: [{ prompt: 'State the precise logical structure of the inductive hypothesis in a standard mathematical induction proof.', options: [
                { text: 'The inductive hypothesis assumes that the statement P(k) is true for **some arbitrary but', outcome: 'The inductive hypothesis assumes that the statement P(k) is true for **some arbitrary but fixed**.' },
                { text: 'assume P(k) is true for all k', outcome: 'Not quite — **The "Two-Sides Manipulation" Pitfall:** In the inductive step, students often write the target.', reveals: 'the-two-sides-manipulation-pitfall' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_008', title: 'Applications of Mathematical Induction',
          scaffold: { problem: 'A school organizes a tree-planting drive. On day 1, they plant 1 tree. On day 2, they plant 3 trees.',
            steps: [
            { text: 'Identify the statement P(n): Sum of first n odd numbers = 1 + 3 + 5 + ... + (2n-1) = n².' },
            { text: 'Verify base case n=1: LHS = 1 (first odd number), RHS = 1² = 1. P(1) is true.' },
            { text: 'Inductive hypothesis: Assume P(k) is true for some k ∈ ℕ, i.e., 1 + 3 + 5 + ... + (2k-1) = k².' },
            { text: 'Prove P(k+1): LHS of P(k+1) = 1 + 3 + 5 + ... + (2k-1) + [2(k+1)-1] = [1 + 3 + ... + (2k-1)] + (2k+1).' },
            { text: 'By induction, P(n) true for all n ∈ ℕ. For n=30 days: total trees = 30² = 900 trees.', faded: true, blankAnswer: '900 trees' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_04_008', title: 'Rapid check',
          drill: { kind: 'exponent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a proof-writing workshop, a student proves 1+2+…+n = n(n+1)/2 by induction but writes \'Assume the formula true for ALL n\' and, for the base case of a series, adds the first two terms because \'… means at least two terms exist.\'',
            decisions: [{ prompt: 'Which two moves invalidate his proof?', options: [
                { text: 'Correct the logic and the count: the hypothesis assumes P(k) for an arbitrary FIXED k — \'true for all n\' assumes the conclusion itself (circular). Then you derive P(k+1) FROM P(k), never manipulate P(k+1) down to 0=0. And at n=1 the series has exactly one term — the ellipsis vanishes: LHS is just 1/(1×2) = 1/2, matching RHS 1/2.', outcome: 'The proof is repaired at both hinges: the staircase works because step 1 is checked and each step legitimately passes weight to the next.' },
                { text: 'Let \'assume for all n\' stand — it\'s just strong wording for the hypothesis.', outcome: 'It\'s not wording, it\'s circularity: assuming the claim for all n is assuming what you\'re proving — the hypothesis must be one arbitrary fixed k.', reveals: 'assume-for-all-n' },
                { text: 'Keep two terms in the base case — a series can\'t consist of a single term.', outcome: 'At n=1 the pattern produces exactly one term — the \'…\' is a continuation marker, not a guarantee of multiple terms; extra terms falsify the check.', reveals: 'base-case-needs-two-terms' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_04_008', title: 'You made it',
          caseStudy: { intro: 'Prove step one exists and that every step hands off to the next — the infinite staircase is then climbed without climbing.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'emag', prompt: 'Explore the emag interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'emag', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_04_007', difficulty: 'standard',
          question: 'Common pitfalls in mathematical induction refer to the typical logical.',
          hint: 'If stuck, revisit the inductive step template in c11_math_cbse_04_003 and practice the.',
          misconception: '**The "Two-Sides Manipulation" Pitfall:** In the inductive step, students often write the target equation P(k+1) and.',
          parts: [
                { id: 'a', prompt: 'A student attempts to prove n! > 2ⁿ for n ≥ 4 by induction. Their base case: 4! = 24 > 16 = 2⁴ ✓. Inductive step: Assume k! > 2ᵏ. Then (k+1)! = (k+1)k!', answer: 'The proof is **incomplete**',
                  options: ['The proof is **incomplete**', 'it\'s complete'],
                  hint: 'If stuck, revisit the inductive step template in c11_math_cbse_04_003 and practice the "LHS_{k+1}.',
                  misconception: '**The "Two-Sides Manipulation" Pitfall:** In the inductive step, students often write the target equation P(k+1) and then perform identical.' }
          ],
            remediations: { 'the-two-sides-manipulation-pitfall': { steps: ['**Stop the student** and ask: "Which direction are you reasoning?', 'Are you starting from what you know (P(k)) and moving toward what you want (P(k+1)), or are you starting from P(k+1).', '**Demonstrate the correct flow**: Write P(k) clearly.', 'Then write "We want to show P(k+1): [statement]." Then say: "Start with the LHS of P(k+1).'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Two-Sides Manipulation" Pitfall:** In the inductive step, students often write the target equation P(k+1) and.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s proof that 7ⁿ - 3ⁿ is divisible by 4 for all n ∈ ℕ: "Base: n=1, 7-3=4 divisible by 4 ✓. Assume 7ᵏ - 3ᵏ = 4m.', answer: 'The proof is **correct and exemplary**',
                  options: ['The proof is **correct and exemplary**', 'it\'s wrong because they used 7ᵏ = 4m+3ᵏ instead of 7ᵏ = 3ᵏ+4m'],
                  hint: 'If stuck, revisit the inductive step template in c11_math_cbse_04_003 and practice the "LHS_{k+1}.',
                  misconception: '**The "Two-Sides Manipulation" Pitfall:** In the inductive step, students often write the target equation P(k+1) and then perform identical.' }
          ],
            remediations: { 'the-two-sides-manipulation-pitfall': { steps: ['**Stop the student** and ask: "Which direction are you reasoning?', 'Are you starting from what you know (P(k)) and moving toward what you want (P(k+1)), or are you starting from P(k+1).', '**Demonstrate the correct flow**: Write P(k) clearly.', 'Then write "We want to show P(k+1): [statement]." Then say: "Start with the LHS of P(k+1).'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_008', difficulty: 'standard',
          question: 'Mathematical induction is a deductive proof technique used to establish that.',
          hint: 'If stuck, revisit c11_math_cbse_04_003 (Inductive Step) for hypothesis formulation, and.',
          misconception: '**The "Reverse Engineering" Trap**: Students start the inductive step by writing P(k+1) and simplifying it to a known.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mathematical induction is a deductive proof technique used to establish that a statement',
                  options: ['Mathematical induction is a deductive proof technique used to establish that a statement', 'The base case in mathematical induction is the verification that the statement P(n) holds', 'The inductive step in mathematical induction is the logical implication where we assume', 'Proving summation formulas by induction is the process of establishing that a closed-form'],
                  hint: 'If stuck, revisit c11_math_cbse_04_003 (Inductive Step) for hypothesis formulation, and.',
                  misconception: '**The "Reverse Engineering" Trap**: Students start the inductive step by writing P(k+1) and simplifying it to a known true statement (like.' }
          ],
            remediations: { 'the-reverse-engineering-trap-students': { steps: ['**Identify the error**: Ask the student to read their proof aloud and point to where they used the inductive hypothesis.', '**Demonstrate correct flow**: Write P(k) on the left, P(k+1) on the right.', 'Show that we must start with the LHS of P(k+1), break it into LHS of P(k) + next term, substitute the RHS of P(k) (from.', '**Practice with a simple equality**: Use 1+3+5+...+(2n-1) = n².'], labTask: { instruction: 'On the interactive: move the magnet fast — is a still magnet enough to make current? — then check.', widget: 'emag', validate: 'emag:speed=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
