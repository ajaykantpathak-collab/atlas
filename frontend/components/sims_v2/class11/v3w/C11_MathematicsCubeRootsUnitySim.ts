import type { SimDef } from '../../engine/types';
import C11_MathematicsCubeRootsUnitySim from '../../../simulations/c6_12/C11_MathematicsCubeRootsUnitySim';

/** v3 wrapped master — C11_MathematicsCubeRootsUnitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathematicscuberootsunitysim: SimDef = {
    id: 'v3w_c11_mathematicscuberootsunitysim',
    title: 'Sum of Special Series: n, n^2, n^3',
    subtitle: 'Covers only the three standard sums Σk, Σk², Σk³ and their direct applications in.',
    classLevel: 11, subject: 'mathematics', topic: 'Sum of Special Series: n, n^2, n^3',
    chapters: [],
    nodeIds: ['c11_math_cbse_09_010', 'c11_math_cbse_04_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a school auditorium where chairs are arranged in rows: the first row has 1 chair, second has 2, third.', goal: 'Master Sum of Special Series: n, n^2, n^3.' },
    discovery: {
        question: 'Why is it necessary to prove the base case (usually n=1) before doing the inductive step when proving a summation formula?',
        options: ['The base case anchors the induction', 'base case is not needed', 'inductive step proves base case'],
        answer: 'The base case anchors the induction',
        hook: 'Students often incorrectly write the (k+1)th term when moving from P(k) to P(k+1).',
    },
    teaching: [
        { title: 'The sum of special series refers to.', text: 'The sum of special series refers to closed-form formulas for the summation of the first n natural numbers (Σk), their squares (Σk²), and their cubes (Σk³), where k ranges from 1 to n.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_09_010', title: 'The sum of special series refers to.',
          scaffold: { problem: 'A school is constructing a triangular seating arrangement for an assembly.',
            steps: [
            { text: 'Identify the pattern: Row k has k seats, for k = 1 to 25. Total seats = Σₖ₌₁²⁵ k.' },
            { text: 'Recall the formula for sum of first n natural numbers: Σₖ₌₁ⁿ k = n(n+1)/2.' },
            { text: 'Substitute n = 25: Total seats = 25 × 26 / 2 = 325 seats.' },
            { text: 'Calculate total cost: Cost per seat = ₹120. Total cost = 325 × 120.' },
            { text: 'Compute: 325 × 120 = 325 × 12 × 10 = 3900 × 10 = ₹39,000.' },
            { text: 'Verify: Average seats per row = (1+25)/2 = 13. Total seats = 13 × 25 = 325. Matches.', faded: true, blankAnswer: '₹39,000' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_04_004', title: 'Proving summation formulas by induction.',
          scaffold: { problem: 'Prove by mathematical induction that the sum of the first n natural numbers is n(n+1)/2. That is, prove 1 + 2 + 3 + ...',
            steps: [
            { text: 'Define the statement P(n): 1 + 2 + 3 + ... + n = n(n+1)/2.' },
            { text: 'Base case (n=1): Left-hand side (LHS) = 1. Right-hand side (RHS) = 1(1+1)/2 = 1. Since LHS = RHS, P(1) is true.' },
            { text: 'Inductive hypothesis: Assume P(k) is true for some arbitrary natural number k. That is, 1 + 2 + 3 + ... + k = k(k+1)/2.' },
            { text: 'Inductive step: Prove P(k+1) is true, i.e., 1 + 2 + ... + k + (k+1) = (k+1)(k+2)/2.' },
            { text: 'Conclusion: Since P(1) is true and P(k) ⇒ P(k+1), by the principle of mathematical induction, P(n) is true for all.', faded: true, blankAnswer: 'The formula is proved for all n ∈ ℕ.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_04_004', title: 'Identify each idea',
          dissect: { specimen: 'Sum of Special Series: n, n^2, n^3', spots: [
            { id: 's1', label: 'The sum of special series', prompt: 'Which idea is this? — The sum of special series refers to closed-form formulas for the summation of the first n.', answer: 'The sum of special series', options: ['The sum of special series', 'Proving summation formulas by induction'] },
            { id: 's2', label: 'Proving summation formulas by induction', prompt: 'Which idea is this? — Proving summation formulas by induction is the process of establishing that a closed-form.', answer: 'Proving summation formulas by induction', options: ['Proving summation formulas by induction', 'The sum of special series'] }
          ] } }
    ],
    explore: { component: C11_MathematicsCubeRootsUnitySim, prompt: 'Explore the interactive — Sum of Special Series: n, n^2, n^3' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_09_010', difficulty: 'standard',
          question: 'The sum of special series refers to closed-form formulas for the summation of.',
          hint: 'If stuck, revisit binomial expansion (Class 11 Binomial Theorem chapter) and the.',
          misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.',
          parts: [
                { id: 'a', prompt: 'Explain why the formula for Σk³ equals the square of the formula for Σk. Is this a coincidence or is there a structural reason?', answer: 'It is not a coincidence',
                  options: ['It is not a coincidence', 'it\'s just a pattern'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.' },
                { id: 'b', prompt: 'Compare the growth rates of Σk, Σk², and Σk³ as n → ∞. Which dominates and by what factor asymptotically?', answer: 'Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4',
                  options: ['Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4', 'they all grow at the same rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.' }
          ],
            remediations: { 'students-write-k-k': { steps: ['Have the student compute both sides for n=3 explicitly: 1²+2²+3² = 14 vs (1+2+3)² = 36.', 'Show the algebraic expansion (1+2+3)² = 1²+2²+3² + 2(1·2+1·3+2·3) to prove cross-terms are missing.', 'For the constant term error, make them write Σₖ₌₁ⁿ 5 as 5+5+...+5 (n times) = 5n, not 5.', 'Create a 3×3 table: Column 1: k, Column 2: k², Column 3: Σk² so far.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_09_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.',
          parts: [
                { id: 'a', prompt: 'Compare the growth rates of Σk, Σk², and Σk³ as n → ∞. Which dominates and by what factor asymptotically?', answer: 'Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4',
                  options: ['Σk ~ n²/2, Σk² ~ n³/3, Σk³ ~ n⁴/4', 'they all grow at the same rate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write Σ(k²) = (Σk)², i.e., they believe the sum of squares equals the square of the sum.' }
          ],
            remediations: { 'students-write-k-k': { steps: ['Have the student compute both sides for n=3 explicitly: 1²+2²+3² = 14 vs (1+2+3)² = 36.', 'Show the algebraic expansion (1+2+3)² = 1²+2²+3² + 2(1·2+1·3+2·3) to prove cross-terms are missing.', 'For the constant term error, make them write Σₖ₌₁ⁿ 5 as 5+5+...+5 (n times) = 5n, not 5.', 'Create a 3×3 table: Column 1: k, Column 2: k², Column 3: Σk² so far.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_04_004', difficulty: 'standard',
          question: 'Proving summation formulas by induction is the process of establishing that a.',
          hint: 'If stuck, revisit Class 10 Arithmetic Progressions (sum formula) and Class 9 Algebraic.',
          misconception: 'Students often incorrectly write the (k+1)th term when moving from P(k) to P(k+1).',
          parts: [
                { id: 'a', prompt: 'Why is it necessary to prove the base case (usually n=1) before doing the inductive step when proving a summation formula?', answer: 'The base case anchors the induction',
                  options: ['The base case anchors the induction', 'base case is not needed', 'inductive step proves base case'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly write the (k+1)th term when moving from P(k) to P(k+1).' }
          ],
            remediations: { 'students-often-incorrectly-write-the': { steps: ['If a student makes the error of adding the wrong term, guide them to write the general term of the series explicitly:.', 'Have them practice identifying the general term for various series.', 'For factoring difficulties, provide a step-by-step factoring guide: factor out (k+1) first, then factor the remaining.', 'Use the identity (k+1)(k+2)(2k+3) as a target to work backwards.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
