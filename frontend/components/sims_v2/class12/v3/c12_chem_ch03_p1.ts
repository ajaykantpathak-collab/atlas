import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch03_p1: SimDef = {
    id: 'v3_c12_chem_ch03_p1',
    title: 'Chemical Kinetics · Part 1/2',
    subtitle: 'One reaction, three different \'rates\' — unless you know the rule',
    classLevel: 12, subject: 'chemistry', topic: 'Chemical Kinetics · Part 1/2',
    chapters: ['c12_chem_ch03'],
    nodeIds: ['c12_chem_cbse_03_001', 'c12_chem_cbse_03_002', 'c12_chem_cbse_03_003', 'c12_chem_cbse_03_004', 'c12_chem_cbse_03_005', 'c12_chem_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Chemical kinetician', intro: 'An apple browns in minutes, a tablet fizzes in seconds. Kinetics is the science of that difference — and of controlling it.', goal: 'Define and calculate reaction rates, apply rate laws and order, and explain the factors controlling reaction speed.' },
    discovery: {
        question: 'In 2N₂O₅ → 4NO₂ + O₂, NO₂ appears four times faster than O₂. Two students report different \'rates\' for the same reaction. Who\'s wrong?',
        options: ['Both — the true rate divides each species\' change by its coefficient, giving one unique number for the whole reaction', 'The O₂ tracker — product rates are always slower', 'The NO₂ tracker — bigger coefficient means bigger error', 'Neither — every species legitimately has its own rate'],
        answer: 'Both — the true rate divides each species\' change by its coefficient, giving one unique number for the whole reaction',
        hook: 'Without the 1/coefficient factor, one reaction yields three different \'rates\' — a nonsense result. Divide by stoichiometric coefficients and every observer agrees on a single speed. Forgetting this is the classic first slip in kinetics.',
    },
    teaching: [
        { title: 'Rate of a Chemical Reaction: Definition', text: 'The rate of a chemical reaction is defined as the change in molar concentration of a reactant or product per unit time.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_03_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Measure how fast reactions actually move: compute average and instantaneous rates from real data, then chase the levers — concentration, temperature, catalysts — through rate laws, order and the Arrhenius equation.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_001', title: 'Rate of a Chemical Reaction: Definition',
          scaffold: { problem: 'In a closed vessel at 300 K, the reaction 2NO(g) + O₂(g) → 2NO₂(g) is monitored.',
            steps: [
            { text: 'Write the balanced equation and note stoichiometric coefficients: 2 for NO, 1 for O₂, 2 for NO₂.' },
            { text: 'Use the definition of average rate in terms of a reactant: rate = –(1/2) Δp(NO)/Δt.' },
            { text: 'Compute Δp(NO) = 0.60 – 0.80 = –0.20 atm; Δt = 50 s.' },
            { text: 'Substitute: rate = –(1/2) × (–0.20/50) = –(1/2) × (–0.004) = 0.002 atm s⁻¹.' },
            { text: 'Rate of appearance of NO₂ = (1/2) Δp(NO₂)/Δt = rate of reaction = 0.002 atm s⁻¹.', faded: true, blankAnswer: 'Average rate = 2.0 × 10⁻³ atm s⁻¹; rate of appearance.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_002', title: 'Rate Law and Rate Constant',
          scaffold: { problem: 'The reaction \\(2\\text{NO}(g) + \\text{O}_2(g) \\rightarrow 2\\text{NO}_2(g)\\) was studied at 298 K.',
            steps: [
            { text: 'Compare Experiments 1 and 2 where [O₂] is constant. [NO] doubles (0.30 → 0.60), rate increases from 0.096 to 0.384 →.' },
            { text: 'Compare Experiments 1 and 3 where [NO] is constant. [O₂] doubles (0.30 → 0.60), rate increases from 0.096 to 0.192 →.' },
            { text: 'Write the rate law: Rate = k [NO]² [O₂]. Overall order = 2 + 1 = 3 (third order).' },
            { text: 'Calculate k using Experiment 1: 0.096 = k (0.30)² (0.30) = k × 0.027 → k = 0.096 / 0.027 = 3.56 L² mol⁻² s⁻¹.' },
            { text: 'Verify with Experiment 2: Rate = 3.56 × (0.60)² × 0.30 = 3.56 × 0.108 = 0.384 ✓.', faded: true, blankAnswer: 'Rate law = k [NO]² [O₂]; overall order = 3; k = 3.56 L².' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_003', title: 'Order of Reaction: Zero Order',
          scaffold: { problem: 'The thermal decomposition of HI on a gold surface is zero-order.',
            steps: [
            { text: 'Convert initial pressure to concentration using ideal gas law.' },
            { text: 'Apply zero-order integrated equation: [HI] = [HI]₀ – kt = 6.41×10⁻³ – (1.2×10⁻⁴)(500) = 6.41×10⁻³ – 6.0×10⁻² = negative.' },
            { text: 'Half-life t₁/₂ = [HI]₀/2k = 6.41×10⁻³ / (2 × 1.2×10⁻⁴) = 6.41×10⁻³ / 2.4×10⁻⁴ = 26.7 s.' },
            { text: 'For part (c), doubling volume at same moles halves initial concentration: [HI]₀\' = 3.205 × 10⁻³ mol L⁻¹.' },
            { text: 'Verify units: k in mol L⁻¹ s⁻¹, [R]₀ in mol L⁻¹ → t in s. Consistent.', faded: true, blankAnswer: '(a) 0 mm Hg (reaction complete at 53.4 s) (b) 26.7 s (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_004', title: 'Order of Reaction: First Order',
          scaffold: { problem: 'The gas phase decomposition of dinitrogen pentoxide follows the rate law: rate = k[N₂O₅].',
            steps: [
            { text: 'Identify the given rate law: rate = k[N₂O₅]. This confirms a first order reaction with respect to N₂O₅.' },
            { text: 'Write the formula for k from the differential rate law: k = rate / [N₂O₅].' },
            { text: 'Substitute the given values with units: k = (6.79 × 10⁻⁴ mol L⁻¹ min⁻¹) / (2.15 mol L⁻¹).' },
            { text: 'Perform division: k = 3.158 × 10⁻⁴ min⁻¹.' },
            { text: 'Convert min⁻¹ to s⁻¹ using 1 min = 60 s: k = (3.158 × 10⁻⁴ min⁻¹) × (1 min / 60 s) = 5.26 × 10⁻⁶ s⁻¹.' },
            { text: 'Verify units: mol L⁻¹ cancels, leaving time⁻¹. The result is positive as required for a rate constant.', faded: true, blankAnswer: 'k = 5.26 × 10⁻⁶ s⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_005', title: 'Integrated Rate Equations: Zero Order',
          scaffold: { problem: 'The decomposition of ammonia on a hot platinum surface follows zero order kinetics.',
            steps: [
            { text: 'Identify that for a zero order gas phase reaction, pressure can replace concentration in the integrated rate equation.' },
            { text: 'Plug in known values: P₀ = 200 Pa, P = 150 Pa at t = 500 s. So 150 = 200 - k(500).' },
            { text: 'Solve for k: k = (200 - 150) / 500 = 50 / 500 = 0.10 Pa s⁻¹.' },
            { text: 'Use this k to find pressure at t = 1000 s: P = 200 - (0.10)(1000) = 200 - 100 = 100 Pa.' },
            { text: 'Verify units: k in Pa s⁻¹ (pressure/time), consistent with zero order. The pressure drops linearly, as expected.', faded: true, blankAnswer: 'k = 0.10 Pa s⁻¹; Pressure at 1000 s = 100 Pa.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_006', title: 'Integrated Rate Equations: First Order',
          scaffold: { problem: 'The decomposition of N₂O₅ in CCl₄ at 318 K is first order. The initial concentration of N₂O₅ is 1.24 × 10⁻² mol L⁻¹.',
            steps: [
            { text: 'Identify the given data: [R]₀ = 1.24 × 10⁻² M, [R] = 0.20 × 10⁻² M, t = 60 min. The reaction is first order.' },
            { text: 'Write the integrated rate equation in base-10 log form: k = (2.303/t) log([R]₀/[R]).' },
            { text: 'Substitute values: k = (2.303/60) log(1.24 × 10⁻² / 0.20 × 10⁻²) = (2.303/60) log(6.2).' },
            { text: 'Calculate log(6.2) ≈ 0.7924. Then k = (0.03838) × 0.7924 = 0.0304 min⁻¹.' },
            { text: 'Convert to s⁻¹: k = 0.0304 min⁻¹ / 60 = 5.07 × 10⁻⁴ s⁻¹. Verify units: min⁻¹ for min, s⁻¹ for seconds.', faded: true, blankAnswer: 'k = 0.0304 min⁻¹ = 5.07 × 10⁻⁴ s⁻¹.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For 2N₂O₅ → 4NO₂ + O₂, a lab group reports the rate three ways — –Δ[N₂O₅]/Δt, Δ[NO₂]/Δt and Δ[O₂]/Δt — and gets three different numbers, so they argue about which one \'is\' the rate.',
            decisions: [{ prompt: 'How should the rate actually be reported?', options: [
                { text: 'Divide each change by its stoichiometric coefficient — –(1/2)Δ[N₂O₅]/Δt = (1/4)Δ[NO₂]/Δt = Δ[O₂]/Δt — so all three collapse to one unique reaction rate.', outcome: 'The coefficient factor is what makes \'the rate\' well-defined; without it every species gives a different answer for the same reaction.' },
                { text: 'Pick –Δ[N₂O₅]/Δt — the reactant\'s disappearance is the true rate; products can differ.', outcome: 'That privileges one species arbitrarily; the convention exists precisely so the rate is independent of which species you track.', reveals: 'rate-equals-reactant-disappearance' },
                { text: 'Report the raw number with its sign — if [N₂O₅] falls, a negative rate is acceptable.', outcome: 'Rates are positive by convention: the minus sign in –Δ[R]/Δt cancels the negative change.', reveals: 'negative-rate-acceptable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now put a number on \'fast\' and a law on \'why\' — kinetics turns chemistry from recipes into control. Rate laws and half-lives are guaranteed marks.',
            decisions: [{ prompt: 'What comes next? Chemical Kinetics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chemical Kinetics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_001', difficulty: 'standard',
          question: 'The rate of a chemical reaction is defined as the change in molar concentration.',
          hint: 'If stuck, revise balancing equations (Class 10) and molarity calculations (Class 11.',
          misconception: 'Students often think the rate of reaction equals the rate of change of concentration of any species (Δ[species]/Δt).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rate of a chemical reaction is defined as the change in molar concentration of a',
                  options: ['The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the', 'A first order reaction is a chemical reaction whose rate is directly proportional to the'],
                  hint: 'If stuck, revise balancing equations (Class 10) and molarity calculations (Class 11 Chapter 1).',
                  misconception: 'Students often think the rate of reaction equals the rate of change of concentration of any species (Δ[species]/Δt) without the.' }
          ],
            remediations: { 'the-rate-of-reaction-equals': { steps: ['Revisit the balanced equation for a simple reaction like H₂ + I₂ → 2HI.', 'Write the rate expressions for each species side by side.', 'Numerically verify that –Δ[H₂]/Δt, –Δ[I₂]/Δt, and (1/2)Δ[HI]/Δt are equal only when the 1/coefficient factor.', 'Practice 5 problems from NCERT Intext Questions 3.1 and 3.2, explicitly writing the factor each time.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_002', difficulty: 'standard',
          question: 'The rate law (or rate expression) for a chemical reaction expresses the.',
          hint: 'If stuck on concentration calculations, revisit Class 11 mole concept and molarity.',
          misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as',
                  options: ['The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'A zero-order reaction is a chemical reaction whose rate is independent of the', 'A first order reaction is a chemical reaction whose rate is directly proportional to the'],
                  hint: 'If stuck on concentration calculations, revisit Class 11 mole concept and molarity.',
                  misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2.' }
          ],
            remediations: { 'students-often-write-the-rate': { steps: ['If a student cannot determine orders from initial-rate data, have them revisit c12_chem_cbse_03_001 (rate definition).', 'Then do a guided worksheet with 3–4 data tables, explicitly writing the ratio equations step by step.', 'Finally, ask them to state the rate law and compute \\(k\\) with units for each.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow.',
          parts: [
                { id: 'a', prompt: 'The rate constant for a reaction is reported as \\(k = 3.5 \\times 10^{-3}\\ \\text{mol}^{-1}\\ \\text{L}\\ \\text{s}^{-1}\\).', answer: 'Units of \\(k\\) for overall order \\(n\\): \\(\\text{mol}^{1-n}\\ \\text{L}^{n-1}\\',
                  options: ['Units of \\(k\\) for overall order \\(n\\): \\(\\text{mol}^{1-n}\\ \\text{L}^{n-1}\\', 'yes it must be elementary'],
                  hint: 'If stuck on concentration calculations, revisit Class 11 mole concept and molarity.',
                  misconception: 'Students often write the rate law directly from the balanced equation, e.g., for \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2.' }
          ],
            remediations: { 'students-often-write-the-rate': { steps: ['If a student cannot determine orders from initial-rate data, have them revisit c12_chem_cbse_03_001 (rate definition).', 'Then do a guided worksheet with 3–4 data tables, explicitly writing the ratio equations step by step.', 'Finally, ask them to state the rate law and compute \\(k\\) with units for each.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_003', difficulty: 'standard',
          question: 'A zero-order reaction is a chemical reaction whose rate is independent of the.',
          hint: 'If stuck, review the table of "Units of rate constant" in NCERT Section 3.2.2 (Table 3.3).',
          misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order.',
          parts: [
                { id: 'a', prompt: 'A student plots concentration of reactant vs time for a zero-order reaction and gets a straight line with positive slope.', answer: 'For a reactant, concentration decreases with time, so d[R]/dt is negative',
                  options: ['For a reactant, concentration decreases with time, so d[R]/dt is negative', 'positive slope'],
                  hint: 'If stuck, review the table of "Units of rate constant" in NCERT Section 3.2.2 (Table 3.3) and.',
                  misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order integrated equation ln[R].' },
                { id: 'b', prompt: 'For a zero-order reaction, the half-life is 50 s when [R]₀ = 0.2 mol L⁻¹. What will be the half-life if [R]₀ is doubled to 0.4 mol L⁻¹?', answer: 't₁/₂ = [R]₀/2k',
                  options: ['t₁/₂ = [R]₀/2k', 'half-life stays the same'],
                  hint: 'If stuck, review the table of "Units of rate constant" in NCERT Section 3.2.2 (Table 3.3) and.',
                  misconception: 'Students often write the zero-order rate law as Rate = k[R] instead of Rate = k, and then use the first-order integrated equation ln[R].' }
          ],
            remediations: { 'students-often-write-the-zero': { steps: ['Revisit node c12_chem_cbse_03_002 (Rate Law and Rate Constant) — practice writing Rate = k[A]ˣ with x = 0, 1, 2 and.', 'Re-derive the integrated equation from d[R]/dt = –k step by step: separate variables → ∫d[R] = –k∫dt → [R] = –kt + C →.', 'Draw the [R] vs t graph for zero-order and first-order side by side; label slope and intercept.', 'Solve 5 numerical problems using only t₁/₂ = [R]₀/2k; check that doubling [R]₀ doubles t₁/₂.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_004', difficulty: 'standard',
          question: 'A first order reaction is a chemical reaction whose rate is directly.',
          hint: 'Review rate law determination from concentration-rate data (node c12_chem_cbse_03_002).',
          misconception: 'Students often write the integrated rate law as [A] = [A]₀ - kt (zero order form) for first order reactions, especially.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A first order reaction is a chemical reaction whose rate is directly proportional to the',
                  options: ['A first order reaction is a chemical reaction whose rate is directly proportional to the', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Review rate law determination from concentration-rate data (node c12_chem_cbse_03_002) and practice.',
                  misconception: 'Students often write the integrated rate law as [A] = [A]₀ - kt (zero order form) for first order reactions, especially under exam.' }
          ],
            remediations: { 'students-often-write-the-integrated': { steps: ['Revisit the derivation of the integrated rate law from -d[A]/dt = k[A] → ∫d[A]/[A] = -k∫dt → ln[A] = -kt + ln[A]₀.', 'Practice logarithm properties: ln(x) = 2.303 log(x).', 'Do 5 numerical problems using both ln and log forms.', 'Review the graphical interpretation: ln[A] vs t is linear with slope -k; log[A] vs t is linear with slope -k/2.303.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_005', difficulty: 'standard',
          question: 'For a zero order reaction, the rate of reaction is independent of the.',
          hint: 'If stuck, review the definition of zero order reaction (c12_chem_cbse_03_003) and the.',
          misconception: 'Students often write the integrated rate equation as \\([R] = kt + [R]_0\\) (missing the negative sign) because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'For a zero order reaction, the rate of reaction is independent of the concentration of',
                  options: ['For a zero order reaction, the rate of reaction is independent of the concentration of', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'If stuck, review the definition of zero order reaction (c12_chem_cbse_03_003) and the integration.',
                  misconception: 'Students often write the integrated rate equation as \\([R] = kt + [R]_0\\) (missing the negative sign) because they forget that.' }
          ],
            remediations: { 'students-often-write-the-integrated': { steps: ['Revisit the derivation in NCERT (section 3.3.1): integrate \\(d[R] = -k dt\\) step by step, explicitly writing the.', 'Practice the straight-line plot: draw \\([R]\\) vs \\(t\\) for a made-up zero order reaction, label slope and intercept.', 'Do 3 numerical problems using only \\([R] = [R]_0 - kt\\) and check units of \\(k\\) each time.', 'Compare with first order integrated equation side-by-side to cement the difference.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_006', difficulty: 'standard',
          question: 'The integrated rate equation for a first-order reaction relates the.',
          hint: 'If stuck, review the integration of 1/x (Class 11 Maths, derivative of ln *x*) and the.',
          misconception: 'Students often confuse the natural logarithm (ln) and base-10 logarithm (log) forms, writing k = (2.303/t) ln([R]₀/[R]).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The integrated rate equation for a first-order reaction relates the concentration of a',
                  options: ['The integrated rate equation for a first-order reaction relates the concentration of a', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'If stuck, review the integration of 1/x (Class 11 Maths, derivative of ln *x*) and the definition.',
                  misconception: 'Students often confuse the natural logarithm (ln) and base-10 logarithm (log) forms, writing k = (2.303/t) ln([R]₀/[R]) instead of.' }
          ],
            remediations: { 'students-often-confuse-the-natural': { steps: ['Revisit the integration step: ∫ d[R]/[R] = ln[R] (node c11_math_cbse_13_008 for derivative/integral of 1/x).', 'Practice converting between ln and log using ln *x* = 2.303 log *x* (Class 11 math: logarithmic identities).', 'For gaseous reactions, re-derive the pressure–concentration relation from the balanced equation (node.', 'Solve at least three numerical problems each for (a) concentration data, (b) pressure data, and (c) graphical.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
