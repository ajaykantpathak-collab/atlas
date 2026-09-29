import type { SimDef } from '../../engine/types';
import C11_PhysicsRefrigeratorCoefficientPerformanceSim from '../../../simulations/c6_12/C11_PhysicsRefrigeratorCoefficientPerformanceSim';

/** v3 wrapped master — C11_PhysicsRefrigeratorCoefficientPerformanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsrefrigeratorcoefficientperformancesim: SimDef = {
    id: 'v3w_c11_physicsrefrigeratorcoefficientperformancesim',
    title: 'Second Law of Thermodynamics: Kelvin-Planck and Clausius',
    subtitle: 'This node covers the two classical statements of the Second Law, their physical.',
    classLevel: 11, subject: 'physics', topic: 'Second Law of Thermodynamics: Kelvin-Planck and Clausius',
    chapters: [],
    nodeIds: ['c11_phy_cbse_11_009', 'c11_phy_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a hot cup of chai left on a table in a Delhi winter: it spontaneously cools down, transferring heat.', goal: 'Master Second Law of Thermodynamics: Kelvin-Planck and Clausius.' },
    discovery: {
        question: 'An inventor proposes a refrigerator that transfers 500 J of heat from a cold compartment at 270 K to a hot room at 300 K *without any external electricity or.',
        options: ['Yes, it violates the Clausius statement', 'No, energy is conserved', 'sole result'],
        answer: 'Yes, it violates the Clausius statement',
        hook: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal*.',
    },
    teaching: [
        { title: 'The Second Law of Thermodynamics introduces.', text: 'The Second Law of Thermodynamics introduces a fundamental directionality to natural processes that the First Law (energy conservation) alone cannot explain.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_009', title: 'The Second Law of Thermodynamics.',
          scaffold: { problem: 'A scientist claims to have designed a cyclic heat engine that operates between a hot reservoir at 500 K and a cold reservoir at 300 K.',
            steps: [
            { text: 'Identify given quantities: T₁ = 500 K (hot), T₂ = 300 K (cold), Q₁ = 2000 J (heat absorbed), W_claimed = 2000 J (work.' },
            { text: 'State the Kelvin-Planck statement: No cyclic process can have the sole effect of converting heat from a single.' },
            { text: 'Check the claim: The claimed engine has Q₂ = 0, meaning its sole effect is conversion of 2000 J heat into 2000 J work.' },
            { text: 'Calculate the maximum possible efficiency (Carnot efficiency) for the given temperatures: η_max = 1 - T₂/T₁ = 1 -.' },
            { text: 'Calculate the maximum work possible for Q₁ = 2000 J at η_max: W_max = η_max × Q₁ = 0.4 × 2000 J = 800 J.' },
            { text: 'Apply First Law (ΔU = 0 for cycle): Q₁ = W + Q₂ → Q₂_min = Q₁ - W_max = 2000 J - 800 J = 1200 J.' },
            { text: 'Conclude: At least 1200 J of heat must be rejected to the cold reservoir per cycle.', faded: true, blankAnswer: 'The claim is invalid; it violates the Kelvin-Planck.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_11_012', title: 'The Coefficient of Performance (COP) of.',
          scaffold: { problem: 'A domestic refrigerator maintains an internal temperature of 4°C in a kitchen at 30°C.',
            steps: [
            { text: 'Identify given quantities and convert temperatures to Kelvin. T₂ = 4°C = 277 K; T₁ = 30°C = 303 K.' },
            { text: 'Calculate Carnot COP using α_Carnot = T₂/(T₁ - T₂) = 277 K / (303 K - 277 K) = 277 / 26 ≈ 10.65.' },
            { text: 'Calculate actual COP: α_actual = 0.60 × 10.65 ≈ 6.39.' },
            { text: 'Use definition of COP: α = (Q₂/t) / (W/t) → Power input W/t = (Q₂/t) / α = 200 W / 6.39 ≈ 31.3 W.' },
            { text: 'Verify units: (J/s) / (dimensionless) = J/s = W. Check physical reasonableness: A 200 W cooling capacity with ~31 W.' },
            { text: 'State final answer with units.', faded: true, blankAnswer: '31.3 W' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_11_012', title: 'Identify each idea',
          dissect: { specimen: 'Second Law of Thermodynamics: Kelvin-Planck and Clausius', spots: [
            { id: 's1', label: 'The Second Law of Thermodynamics', prompt: 'Which idea is this? — The Second Law of Thermodynamics introduces a fundamental directionality to natural.', answer: 'The Second Law of Thermodynamics', options: ['The Second Law of Thermodynamics', 'The Coefficient of Performance COP'] },
            { id: 's2', label: 'The Coefficient of Performance COP', prompt: 'Which idea is this? — The Coefficient of Performance (COP) of a refrigerator, denoted by α (alpha), is a.', answer: 'The Coefficient of Performance COP', options: ['The Coefficient of Performance COP', 'The Second Law of Thermodynamics'] }
          ] } }
    ],
    explore: { component: C11_PhysicsRefrigeratorCoefficientPerformanceSim, prompt: 'Explore the interactive — Second Law of Thermodynamics: Kelvin-Planck and Clausius' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_009', difficulty: 'standard',
          question: 'The Second Law of Thermodynamics introduces a fundamental directionality to.',
          hint: 'If stuck, revisit c11_phy_cbse_11_003 (First Law) and practice drawing energy flow.',
          misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal*.',
          parts: [
                { id: 'a', prompt: 'An inventor proposes a refrigerator that transfers 500 J of heat from a cold compartment at 270 K to a hot room at 300 K *without any external electricity or.', answer: 'Yes, it violates the Clausius statement',
                  options: ['Yes, it violates the Clausius statement', 'No, energy is conserved', 'sole result'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal* engine could achieve.' }
          ],
            remediations: { 'the-second-law-only-applies': { steps: ['If a student holds this misconception, guide them through the following steps: 1.', 'Re-read the Kelvin-Planck statement carefully: "No process is possible whose *sole result* is absorption of heat from a.', 'Recall the Carnot engine derivation (next node) which shows η_Carnot = 1 - T₂/T₁ < 1 *even for a reversible,.', 'The efficiency is limited by the *temperature ratio*, not by friction.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal*.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "The Kelvin-Planck and Clausius statements are equivalent." Evaluate this claim by outlining the logical steps to prove that a violation of.', answer: 'Proof outline: 1',
                  options: ['Proof outline: 1', 'they are equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Second Law only applies to "real" engines with friction, and that a *frictionless, ideal* engine could achieve.' }
          ],
            remediations: { 'the-second-law-only-applies': { steps: ['If a student holds this misconception, guide them through the following steps: 1.', 'Re-read the Kelvin-Planck statement carefully: "No process is possible whose *sole result* is absorption of heat from a.', 'Recall the Carnot engine derivation (next node) which shows η_Carnot = 1 - T₂/T₁ < 1 *even for a reversible,.', 'The efficiency is limited by the *temperature ratio*, not by friction.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_012', difficulty: 'standard',
          question: 'The Coefficient of Performance (COP) of a refrigerator, denoted by α (alpha),.',
          hint: 'If stuck, revisit the Carnot engine node (c11_phy_cbse_11_011) to review the derivation.',
          misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine.',
          parts: [
                { id: 'a', prompt: 'Two refrigerators A and B operate between the same two reservoirs at T₁ = 300 K and T₂ = 250 K. Refrigerator A is a Carnot (reversible) refrigerator.', answer: 'Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0',
                  options: ['Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0', 'closer to 1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine efficiency limit (η ≤.' }
          ],
            remediations: { 'the-cop-of-a-refrigerator': { steps: ['If a student insists COP ≤ 1, guide them through this stepwise remediation: 1.', 'Revisit the First Law for a cyclic refrigerator: Q₁ = Q₂ + W.', 'Ask: "Which is larger, Q₁ or W?" (Answer: Q₁, because Q₂ > 0).', 'Ask: "If Q₁ = Q₂ + W, can Q₂ be larger than W?" (Answer: Yes, e.g., Q₁=400J, W=100J → Q₂=300J).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_11_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine.',
          parts: [
                { id: 'a', prompt: 'A refrigerator has a COP of 5.0. It removes 1000 J of heat from the cold compartment in one cycle.', answer: 'The statement is incorrect in its wording',
                  options: ['The statement is incorrect in its wording', 'work done by refrigerator is 200 J'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine efficiency limit (η ≤.' },
                { id: 'b', prompt: 'Two refrigerators A and B operate between the same two reservoirs at T₁ = 300 K and T₂ = 250 K. Refrigerator A is a Carnot (reversible) refrigerator.', answer: 'Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0',
                  options: ['Carnot COP α_A = T₂/(T₁ - T₂) = 250/(300-250) = 5.0', 'closer to 1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the COP of a refrigerator cannot exceed 1 because they incorrectly apply the heat engine efficiency limit (η ≤.' }
          ],
            remediations: { 'the-cop-of-a-refrigerator': { steps: ['If a student insists COP ≤ 1, guide them through this stepwise remediation: 1.', 'Revisit the First Law for a cyclic refrigerator: Q₁ = Q₂ + W.', 'Ask: "Which is larger, Q₁ or W?" (Answer: Q₁, because Q₂ > 0).', 'Ask: "If Q₁ = Q₂ + W, can Q₂ be larger than W?" (Answer: Yes, e.g., Q₁=400J, W=100J → Q₂=300J).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
