import type { SimDef } from '../../engine/types';
import C12_MathematicsWallisFormulaReductionSim from '../../../simulations/c6_12/C12_MathematicsWallisFormulaReductionSim';

/** v3 wrapped master — C12_MathematicsWallisFormulaReductionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicswallisformulareductionsim: SimDef = {
    id: 'v3w_c12_mathematicswallisformulareductionsim',
    title: 'Integration by Parts: Rule and Formula',
    subtitle: 'Covers indefinite and definite integration by parts for products of algebraic,.',
    classLevel: 12, subject: 'mathematics', topic: 'Integration by Parts: Rule and Formula',
    chapters: [],
    nodeIds: ['c12_math_cbse_07_004', 'c12_math_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are a civil engineering intern in Bengaluru calculating the bending moment in a simply supported.', goal: 'Master Integration by Parts: Rule and Formula.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Integration by parts is a technique derived.', text: 'Integration by parts is a technique derived from the product rule of differentiation that transforms the integral of a product of two functions into a simpler integral.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_004', title: 'Integration by parts is a technique.',
          scaffold: { problem: 'A startup in Pune models its monthly revenue rate as R\'(t) = t e^(0.1t) lakh rupees per month, where t is months since launch.',
            steps: [
            { text: 'Total revenue = ∫₀¹⁰ R\'(t) dt = ∫₀¹⁰ t e^(0.1t) dt. Identify u = t (algebraic), dv = e^(0.1t) dt (exponential).' },
            { text: 'Compute du = dt, v = ∫ e^(0.1t) dt = 10 e^(0.1t).' },
            { text: 'Apply integration by parts: ∫ t e^(0.1t) dt = t·10e^(0.1t) - ∫ 10e^(0.1t) dt = 10t e^(0.1t) - 100 e^(0.1t).' },
            { text: 'Evaluate definite integral: [10t e^(0.1t) - 100 e^(0.1t)]₀¹⁰ = (100e¹ - 100e¹) - (0 - 100e⁰) = 0 - (-100) = 100.' },
            { text: 'Total revenue = 100 lakh rupees = ₹1 crore.', faded: true, blankAnswer: '₹1 crore' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_03_010', title: 'Elementary transformations (or.',
          scaffold: { problem: 'A small factory in Pune produces three products (P₁, P₂, P₃) using three raw materials (R₁, R₂, R₃).',
            steps: [
            { text: 'Identify the operations in order: (i) Swap product order so P₃ is first → this is R₁ ↔ R₃.' },
            { text: 'Start with M = [[2, 3, 1], [1, 2, 2], [3, 1, 3]]. Apply R₁ ↔ R₃: new matrix = [[3, 1, 3], [1, 2, 2], [2, 3, 1]].' },
            { text: 'Apply R₂ → 2R₂: multiply second row by 2 → [[3, 1, 3], [2, 4, 4], [2, 3, 1]].' },
            { text: 'Apply R₃ → R₃ - 2R₁: new R₃ = [2,3,1] - 2×[3,1,3] = [2-6, 3-2, 1-6] = [-4, 1, -5].' },
            { text: 'Verify each operation was applied to the current matrix, not the original.', faded: true, blankAnswer: 'Final matrix = [[3, 1, 3], [2, 4, 4], [-4, 1, -5]]' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_03_010', title: 'Identify each idea',
          dissect: { specimen: 'Integration by Parts: Rule and Formula', spots: [
            { id: 's1', label: 'Integration by parts is a', prompt: 'Which idea is this? — Integration by parts is a technique derived from the product rule of differentiation that.', answer: 'Integration by parts is a', options: ['Integration by parts is a', 'Elementary transformations or elementary operations'] },
            { id: 's2', label: 'Elementary transformations or elementary operations', prompt: 'Which idea is this? — Elementary transformations (or elementary operations) of a matrix are three specific.', answer: 'Elementary transformations or elementary operations', options: ['Elementary transformations or elementary operations', 'Integration by parts is a'] }
          ] } }
    ],
    explore: { component: C12_MathematicsWallisFormulaReductionSim, prompt: 'Explore the interactive — Integration by Parts: Rule and Formula' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_03_010', difficulty: 'standard',
          question: 'Elementary transformations (or elementary operations) of a matrix are three.',
          hint: 'If stuck, revisit c12_math_cbse_03_006 (Scalar Multiplication) and c12_math_cbse_03_004.',
          misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.',
          parts: [
                { id: 'a', prompt: 'What are the three elementary row operations on a matrix? Write the standard notation for each.', answer: 'The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ',
                  options: ['The three elementary row operations are: (1) Interchange of two rows: Rᵢ ↔ Rⱼ', 'non-zero'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' },
                { id: 'b', prompt: 'Explain why multiplying a row by zero (Rᵢ → 0·Rᵢ) is NOT allowed as an elementary transformation, even though it seems like a special case of Rᵢ → kRᵢ.', answer: 'Multiplying a row by zero destroys information',
                  options: ['Multiplying a row by zero destroys information', 'it\'s allowed because k can be any number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' }
          ],
            remediations: { 'students-often-write-r-r': { steps: ['If a student struggles with the non-zero scalar condition or sequential application: 1.', 'Have them revisit c12_math_cbse_03_004 (Matrix Addition) and c12_math_cbse_03_006 (Scalar Multiplication) to reinforce.', 'Practice with a 2×2 matrix: write A, apply R₁ → 0·R₁, then ask "Can you get back A?" — physically demonstrate.', 'For sequential errors: give a 3-step sequence on a 3×3 matrix; have them circle which matrix each operation acts on.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I apply R₁ → R₁ + 2R₂ and then R₂ → R₂ - 3R₁ to a matrix, the net effect is the same as applying R₂ → R₂ - 3R₁ first and then R₁ → R₁ +.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'they\'re the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write Rᵢ → Rᵢ + Rⱼ (without a scalar multiplier) and treat it as a valid elementary operation.' }
          ],
            remediations: { 'students-often-write-r-r': { steps: ['If a student struggles with the non-zero scalar condition or sequential application: 1.', 'Have them revisit c12_math_cbse_03_004 (Matrix Addition) and c12_math_cbse_03_006 (Scalar Multiplication) to reinforce.', 'Practice with a 2×2 matrix: write A, apply R₁ → 0·R₁, then ask "Can you get back A?" — physically demonstrate.', 'For sequential errors: give a 3-step sequence on a 3×3 matrix; have them circle which matrix each operation acts on.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
