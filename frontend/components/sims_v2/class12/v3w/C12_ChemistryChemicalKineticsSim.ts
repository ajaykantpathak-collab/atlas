import type { SimDef } from '../../engine/types';
import C12_ChemistryChemicalKineticsSim from '../../../simulations/c6_12/C12_ChemistryChemicalKineticsSim';

/** v3 wrapped master — C12_ChemistryChemicalKineticsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrychemicalkineticssim: SimDef = {
    id: 'v3w_c12_chemistrychemicalkineticssim',
    title: 'Rate of a Chemical Reaction: Definition',
    subtitle: 'This node covers the definition of average and instantaneous rate, their mathematical.',
    classLevel: 12, subject: 'chemistry', topic: 'Rate of a Chemical Reaction: Definition',
    chapters: [],
    nodeIds: ['c12_chem_cbse_03_001', 'c12_chem_cbse_03_002', 'c12_chem_cbse_03_003', 'c12_chem_cbse_03_004', 'c12_chem_cbse_03_005', 'c12_chem_cbse_03_006', 'c12_chem_cbse_03_007', 'c12_chem_cbse_03_008', 'c12_chem_cbse_03_009', 'c12_chem_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a slice of apple turning brown in air — the colour change is slow.', goal: 'Master Rate of a Chemical Reaction: Definition.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The rate of a chemical reaction is defined.', text: 'The rate of a chemical reaction is defined as the change in molar concentration of a reactant or product per unit time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_001', title: 'The rate of a chemical reaction is.',
          scaffold: { problem: 'In a closed vessel at 300 K, the reaction 2NO(g) + O₂(g) → 2NO₂(g) is monitored.',
            steps: [
            { text: 'Write the balanced equation and note stoichiometric coefficients: 2 for NO, 1 for O₂, 2 for NO₂.' },
            { text: 'Use the definition of average rate in terms of a reactant: rate = –(1/2) Δp(NO)/Δt.' },
            { text: 'Compute Δp(NO) = 0.60 – 0.80 = –0.20 atm; Δt = 50 s.' },
            { text: 'Substitute: rate = –(1/2) × (–0.20/50) = –(1/2) × (–0.004) = 0.002 atm s⁻¹.' },
            { text: 'Rate of appearance of NO₂ = (1/2) Δp(NO₂)/Δt = rate of reaction = 0.002 atm s⁻¹.', faded: true, blankAnswer: 'Average rate = 2.0 × 10⁻³ atm s⁻¹; rate of appearance of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_002', title: 'The rate law (or rate expression) for a.',
          scaffold: { problem: 'The reaction \\(2\\text{NO}(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}_2(g)\\) was studied at 298 K.',
            steps: [
            { text: 'Compare Experiments 1 and 2 where [O₂] is constant. [NO] doubles (0.30 → 0.60), rate increases from 0.096 to 0.384 →.' },
            { text: 'Compare Experiments 1 and 3 where [NO] is constant. [O₂] doubles (0.30 → 0.60), rate increases from 0.096 to 0.192 →.' },
            { text: 'Write the rate law: Rate = k [NO]² [O₂]. Overall order = 2 + 1 = 3 (third order).' },
            { text: 'Calculate k using Experiment 1: 0.096 = k (0.30)² (0.30) = k × 0.027 → k = 0.096 / 0.027 = 3.56 L² mol⁻² s⁻¹.' },
            { text: 'Verify with Experiment 2: Rate = 3.56 × (0.60)² × 0.30 = 3.56 × 0.108 = 0.384 ✓.', faded: true, blankAnswer: 'Rate law = k [NO]² [O₂]; overall order = 3; k = 3.56 L².' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_003', title: 'A zero-order reaction is a chemical.',
          scaffold: { problem: 'The thermal decomposition of HI on a gold surface is zero-order.',
            steps: [
            { text: 'Convert initial pressure to concentration using ideal gas law.' },
            { text: 'Apply zero-order integrated equation: [HI] = [HI]₀ – kt = 6.41×10⁻³ – (1.2×10⁻⁴)(500) = 6.41×10⁻³ – 6.0×10⁻² = negative.' },
            { text: 'Half-life t₁/₂ = [HI]₀/2k = 6.41×10⁻³ / (2 × 1.2×10⁻⁴) = 6.41×10⁻³ / 2.4×10⁻⁴ = 26.7 s.' },
            { text: 'For part (c), doubling volume at same moles halves initial concentration: [HI]₀\' = 3.205 × 10⁻³ mol L⁻¹.' },
            { text: 'Verify units: k in mol L⁻¹ s⁻¹, [R]₀ in mol L⁻¹ → t in s. Consistent.', faded: true, blankAnswer: '(a) 0 mm Hg (reaction complete at 53.4 s) (b) 26.7 s (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_004', title: 'A first order reaction is a chemical.',
          scaffold: { problem: 'The gas phase decomposition of dinitrogen pentoxide follows the rate law: rate = k[N₂O₅].',
            steps: [
            { text: 'Identify the given rate law: rate = k[N₂O₅]. This confirms a first order reaction with respect to N₂O₅.' },
            { text: 'Write the formula for k from the differential rate law: k = rate / [N₂O₅].' },
            { text: 'Substitute the given values with units: k = (6.79 × 10⁻⁴ mol L⁻¹ min⁻¹) / (2.15 mol L⁻¹).' },
            { text: 'Perform division: k = 3.158 × 10⁻⁴ min⁻¹.' },
            { text: 'Convert min⁻¹ to s⁻¹ using 1 min = 60 s: k = (3.158 × 10⁻⁴ min⁻¹) × (1 min / 60 s) = 5.26 × 10⁻⁶ s⁻¹.' },
            { text: 'Verify units: mol L⁻¹ cancels, leaving time⁻¹. The result is positive as required for a rate constant.', faded: true, blankAnswer: 'k = 5.26 × 10⁻⁶ s⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_005', title: 'For a zero order reaction, the rate of.',
          scaffold: { problem: 'The decomposition of ammonia on a hot platinum surface follows zero order kinetics.',
            steps: [
            { text: 'Identify that for a zero order gas phase reaction, pressure can replace concentration in the integrated rate equation:.' },
            { text: 'Plug in known values: P₀ = 200 Pa, P = 150 Pa at t = 500 s. So 150 = 200 - k(500).' },
            { text: 'Solve for k: k = (200 - 150) / 500 = 50 / 500 = 0.10 Pa s⁻¹.' },
            { text: 'Use this k to find pressure at t = 1000 s: P = 200 - (0.10)(1000) = 200 - 100 = 100 Pa.' },
            { text: 'Verify units: k in Pa s⁻¹ (pressure/time), consistent with zero order. The pressure drops linearly, as expected.', faded: true, blankAnswer: 'k = 0.10 Pa s⁻¹; Pressure at 1000 s = 100 Pa.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_006', title: 'The integrated rate equation for a.',
          scaffold: { problem: 'The decomposition of N₂O₅ in CCl₄ at 318 K is first order. The initial concentration of N₂O₅ is 1.24 × 10⁻² mol L⁻¹.',
            steps: [
            { text: 'Identify the given data: [R]₀ = 1.24 × 10⁻² M, [R] = 0.20 × 10⁻² M, t = 60 min. The reaction is first order.' },
            { text: 'Write the integrated rate equation in base-10 log form: k = (2.303/t) log([R]₀/[R]).' },
            { text: 'Substitute values: k = (2.303/60) log(1.24 × 10⁻² / 0.20 × 10⁻²) = (2.303/60) log(6.2).' },
            { text: 'Calculate log(6.2) ≈ 0.7924. Then k = (0.03838) × 0.7924 = 0.0304 min⁻¹.' },
            { text: 'Convert to s⁻¹: k = 0.0304 min⁻¹ / 60 = 5.07 × 10⁻⁴ s⁻¹. Verify units: min⁻¹ for min, s⁻¹ for seconds.', faded: true, blankAnswer: 'k = 0.0304 min⁻¹ = 5.07 × 10⁻⁴ s⁻¹.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Rate of a Chemical Reaction: Definition', spots: [
            { id: 's1', label: 'The rate of a chemical', prompt: 'Which idea is this? — The rate of a chemical reaction is defined as the change in molar concentration of a.', answer: 'The rate of a chemical', options: ['The rate of a chemical', 'The rate law or rate', 'A zero-order reaction is a', 'A first order reaction is'] },
            { id: 's2', label: 'The rate law or rate', prompt: 'Which idea is this? — The rate law (or rate expression) for a chemical reaction expresses the reaction rate as.', answer: 'The rate law or rate', options: ['The rate law or rate', 'The rate of a chemical', 'A zero-order reaction is a', 'A first order reaction is'] },
            { id: 's3', label: 'A zero-order reaction is a', prompt: 'Which idea is this? — A zero-order reaction is a chemical reaction whose rate is independent of the.', answer: 'A zero-order reaction is a', options: ['A zero-order reaction is a', 'The rate of a chemical', 'The rate law or rate', 'A first order reaction is'] },
            { id: 's4', label: 'A first order reaction is', prompt: 'Which idea is this? — A first order reaction is a chemical reaction whose rate is directly proportional to the.', answer: 'A first order reaction is', options: ['A first order reaction is', 'The rate of a chemical', 'The rate law or rate', 'A zero-order reaction is a'] },
            { id: 's5', label: 'For a zero order reaction', prompt: 'Which idea is this? — For a zero order reaction, the rate of reaction is independent of the concentration of.', answer: 'For a zero order reaction', options: ['For a zero order reaction', 'The rate of a chemical', 'The rate law or rate', 'A zero-order reaction is a'] },
            { id: 's6', label: 'The integrated rate equation for', prompt: 'Which idea is this? — The integrated rate equation for a first-order reaction relates the concentration of a.', answer: 'The integrated rate equation for', options: ['The integrated rate equation for', 'The rate of a chemical', 'The rate law or rate', 'A zero-order reaction is a'] }
          ] } }
    ],
    explore: { component: C12_ChemistryChemicalKineticsSim, prompt: 'Explore the interactive — Rate of a Chemical Reaction: Definition' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_001', difficulty: 'standard',
          question: 'The rate of a chemical reaction is defined as the change in molar concentration.',
          hint: 'If stuck, revise balancing equations (Class 10) and molarity calculations (Class 11.',
          misconception: 'Students often think the rate of reaction equals the rate of change of concentration of any species (Δ[species]/Δt).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rate of a chemical reaction is defined as the change in molar concentration of a',
                  options: ['The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the', 'A first order reaction is a chemical reaction whose rate is directly proportional to the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the rate of reaction equals the rate of change of concentration of any species (Δ[species]/Δt) without the.' }
          ],
            remediations: { 'the-rate-of-reaction-equals': { steps: ['Revisit the balanced equation for a simple reaction like H₂ + I₂ → 2HI.', 'Write the rate expressions for each species side by side.', 'Numerically verify that –Δ[H₂]/Δt, –Δ[I₂]/Δt, and (1/2)Δ[HI]/Δt are equal only when the 1/coefficient factor is.', 'Practice 5 problems from NCERT Intext Questions 3.1 and 3.2, explicitly writing the factor each time.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_002', difficulty: 'standard',
          question: 'The rate law (or rate expression) for a chemical reaction expresses the.',
          hint: 'If stuck on concentration calculations, revisit Class 11 mole concept and molarity.',
          misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as',
                  options: ['The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'A zero-order reaction is a chemical reaction whose rate is independent of the', 'A first order reaction is a chemical reaction whose rate is directly proportional to the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 +.' }
          ],
            remediations: { 'students-often-write-the-rate': { steps: ['If a student cannot determine orders from initial-rate data, have them revisit c12_chem_cbse_03_001 (rate definition).', 'Then do a guided worksheet with 3–4 data tables, explicitly writing the ratio equations step by step.', 'Finally, ask them to state the rate law and compute \\(k\\) with units for each.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow.',
          parts: [
                { id: 'a', prompt: 'The rate constant for a reaction is reported as \\(k = 3.5 \\times 10^{-3}\\ \\text{mol}^{-1}\\ \\text{L}\\ \\text{s}^{-1}\\).', answer: 'Units of \\(k\\) for overall order \\(n\\): \\(\\text{mol}^{1-n}\\ \\text{L}^{n-1}\\',
                  options: ['Units of \\(k\\) for overall order \\(n\\): \\(\\text{mol}^{1-n}\\ \\text{L}^{n-1}\\', 'yes it must be elementary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 +.' }
          ],
            remediations: { 'students-often-write-the-rate': { steps: ['If a student cannot determine orders from initial-rate data, have them revisit c12_chem_cbse_03_001 (rate definition).', 'Then do a guided worksheet with 3–4 data tables, explicitly writing the ratio equations step by step.', 'Finally, ask them to state the rate law and compute \\(k\\) with units for each.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_003', difficulty: 'standard',
          question: 'A zero-order reaction is a chemical reaction whose rate is independent of the.',
          hint: 'If stuck, review the table of "Units of rate constant" in NCERT Section 3.2.2 (Table 3.3).',
          misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order.',
          parts: [
                { id: 'a', prompt: 'A student plots concentration of reactant vs time for a zero-order reaction and gets a straight line with positive slope.', answer: 'For a reactant, concentration decreases with time, so d[R]/dt is negative',
                  options: ['For a reactant, concentration decreases with time, so d[R]/dt is negative', 'positive slope'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order integrated equation ln[R] =.' },
                { id: 'b', prompt: 'For a zero-order reaction, the half-life is 50 s when [R]₀ = 0.2 mol L⁻¹. What will be the half-life if [R]₀ is doubled to 0.4 mol L⁻¹?', answer: 't₁/₂ = [R]₀/2k',
                  options: ['t₁/₂ = [R]₀/2k', 'half-life stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order integrated equation ln[R] =.' }
          ],
            remediations: { 'students-often-write-the-zero': { steps: ['Revisit node c12_chem_cbse_03_002 (Rate Law and Rate Constant) — practice writing Rate = k[A]ˣ with x = 0, 1, 2 and.', 'Re-derive the integrated equation from d[R]/dt = –k step by step: separate variables → ∫d[R] = –k∫dt → [R] = –kt + C →.', 'Draw the [R] vs t graph for zero-order and first-order side by side; label slope and intercept.', 'Solve 5 numerical problems using only t₁/₂ = [R]₀/2k; check that doubling [R]₀ doubles t₁/₂.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order.',
          parts: [
                { id: 'a', prompt: 'For a zero-order reaction, the half-life is 50 s when [R]₀ = 0.2 mol L⁻¹. What will be the half-life if [R]₀ is doubled to 0.4 mol L⁻¹?', answer: 't₁/₂ = [R]₀/2k',
                  options: ['t₁/₂ = [R]₀/2k', 'half-life stays the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order integrated equation ln[R] =.' }
          ],
            remediations: { 'students-often-write-the-zero': { steps: ['Revisit node c12_chem_cbse_03_002 (Rate Law and Rate Constant) — practice writing Rate = k[A]ˣ with x = 0, 1, 2 and.', 'Re-derive the integrated equation from d[R]/dt = –k step by step: separate variables → ∫d[R] = –k∫dt → [R] = –kt + C →.', 'Draw the [R] vs t graph for zero-order and first-order side by side; label slope and intercept.', 'Solve 5 numerical problems using only t₁/₂ = [R]₀/2k; check that doubling [R]₀ doubles t₁/₂.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_004', difficulty: 'standard',
          question: 'A first order reaction is a chemical reaction whose rate is directly.',
          hint: 'Review rate law determination from concentration-rate data (node c12_chem_cbse_03_002).',
          misconception: 'Students often write the integrated rate law as [A] = [A]₀ - kt (zero order form) for first order reactions, especially.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A first order reaction is a chemical reaction whose rate is directly proportional to the',
                  options: ['A first order reaction is a chemical reaction whose rate is directly proportional to the', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the integrated rate law as [A] = [A]₀ - kt (zero order form) for first order reactions, especially under exam.' }
          ],
            remediations: { 'students-often-write-the-integrated': { steps: ['Revisit the derivation of the integrated rate law from -d[A]/dt = k[A] → ∫d[A]/[A] = -k∫dt → ln[A] = -kt + ln[A]₀.', 'Practice logarithm properties: ln(x) = 2.303 log(x).', 'Do 5 numerical problems using both ln and log forms.', 'Review the graphical interpretation: ln[A] vs t is linear with slope -k; log[A] vs t is linear with slope -k/2.303.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_005', difficulty: 'standard',
          question: 'For a zero order reaction, the rate of reaction is independent of the.',
          hint: 'If stuck, review the definition of zero order reaction (c12_chem_cbse_03_003) and the.',
          misconception: 'Students often write the integrated rate equation as \\([R] = kt + [R]_0\\) (missing the negative sign) because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a zero order reaction, the rate of reaction is independent of the concentration of',
                  options: ['For a zero order reaction, the rate of reaction is independent of the concentration of', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the integrated rate equation as \\([R] = kt + [R]_0\\) (missing the negative sign) because they forget that.' }
          ],
            remediations: { 'students-often-write-the-integrated': { steps: ['Revisit the derivation in NCERT (section 3.3.1): integrate \\(d[R] = -k dt\\) step by step, explicitly writing the.', 'Practice the straight-line plot: draw \\([R]\\) vs \\(t\\) for a made-up zero order reaction, label slope and intercept.', 'Do 3 numerical problems using only \\([R] = [R]_0 - kt\\) and check units of \\(k\\) each time.', 'Compare with first order integrated equation side-by-side to cement the difference.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_006', difficulty: 'standard',
          question: 'The integrated rate equation for a first-order reaction relates the.',
          hint: 'If stuck, review the integration of 1/x (Class 11 Maths, derivative of ln *x*) and the.',
          misconception: 'Students often confuse the natural logarithm (ln) and base-10 logarithm (log) forms, writing k = (2.303/t) ln([R]₀/[R]).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The integrated rate equation for a first-order reaction relates the concentration of a',
                  options: ['The integrated rate equation for a first-order reaction relates the concentration of a', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the natural logarithm (ln) and base-10 logarithm (log) forms, writing k = (2.303/t) ln([R]₀/[R]) instead of k =.' }
          ],
            remediations: { 'students-often-confuse-the-natural': { steps: ['Revisit the integration step: ∫ d[R]/[R] = ln[R] (node c11_math_cbse_13_008 for derivative/integral of 1/x).', 'Practice converting between ln and log using ln *x* = 2.303 log *x* (Class 11 math: logarithmic identities).', 'For gaseous reactions, re-derive the pressure–concentration relation from the balanced equation (node.', 'Solve at least three numerical problems each for (a) concentration data, (b) pressure data, and (c) graphical.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
