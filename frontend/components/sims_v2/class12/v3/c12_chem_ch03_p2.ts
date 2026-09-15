import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch03_p2: SimDef = {
    id: 'v3_c12_chem_ch03_p2',
    title: 'Chemical Kinetics · Part 2/2',
    subtitle: 'One reaction, three different \'rates\' — unless you know the rule',
    classLevel: 12, subject: 'chemistry', topic: 'Chemical Kinetics · Part 2/2',
    chapters: ['c12_chem_ch03'],
    nodeIds: ['c12_chem_cbse_03_007', 'c12_chem_cbse_03_008', 'c12_chem_cbse_03_009', 'c12_chem_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Chemical kinetician', intro: 'An apple browns in minutes, a tablet fizzes in seconds. Kinetics is the science of that difference — and of controlling it.', goal: 'Define and calculate reaction rates, apply rate laws and order, and explain the factors controlling reaction speed.' },
    discovery: {
        question: 'In 2N₂O₅ → 4NO₂ + O₂, NO₂ appears four times faster than O₂. Two students report different \'rates\' for the same reaction. Who\'s wrong?',
        options: ['Both — the true rate divides each species\' change by its coefficient, giving one unique number for the whole reaction', 'The O₂ tracker — product rates are always slower', 'The NO₂ tracker — bigger coefficient means bigger error', 'Neither — every species legitimately has its own rate'],
        answer: 'Both — the true rate divides each species\' change by its coefficient, giving one unique number for the whole reaction',
        hook: 'Without the 1/coefficient factor, one reaction yields three different \'rates\' — a nonsense result. Divide by stoichiometric coefficients and every observer agrees on a single speed. Forgetting this is the classic first slip in kinetics.',
    },
    teaching: [
        { title: 'Half-Life of a Reaction', text: 'Half-life of a reaction (t₁/₂) is the time required for the concentration of a reactant to decrease to exactly one-half of its initial concentration.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_03_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Measure how fast reactions actually move: compute average and instantaneous rates from real data, then chase the levers — concentration, temperature, catalysts — through rate laws, order and the Arrhenius equation.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_007', title: 'Half-Life of a Reaction',
          scaffold: { problem: 'The decomposition of N₂O₅ in CCl₄ is a first-order reaction with rate constant 3.0 × 10⁻⁴ s⁻¹ at 318 K.',
            steps: [
            { text: 'Identify order (first order) and given k = 3.0×10⁻⁴ s⁻¹, [R]₀ = 0.10 M.' },
            { text: 'Use first-order half-life formula: t₁/₂ = 0.693/k.' },
            { text: 'Calculate t₁/₂ = 0.693 / (3.0×10⁻⁴) = 2310 s.' },
            { text: 'For concentration after 1000 s, use integrated law: [R] = [R]₀ e⁻ᵏᵗ = 0.10 × exp(-3.0×10⁻⁴ × 1000) = 0.10 × exp(-0.3).' },
            { text: 'For time to reach 0.0125 M, note 0.0125 = 0.10/8 = 0.10×(1/2)³, so 3 half-lives: t = 3 × 2310 = 6930 s.', faded: true, blankAnswer: '(a) 2310 s, (b) 0.0741 mol L⁻¹, (c) 6930 s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_008', title: 'Effect of Temperature on Rate: Arrhenius Equation',
          scaffold: { problem: 'The decomposition of N₂O₅ in CCl₄ follows first-order kinetics. At 298 K, k = 3.46 × 10⁻⁵ s⁻¹. At 308 K, k = 1.35 × 10⁻⁴ s⁻¹.',
            steps: [
            { text: 'Identify given data: k₁ = 3.46 × 10⁻⁵ s⁻¹ at T₁ = 298 K; k₂ = 1.35 × 10⁻⁴ s⁻¹ at T₂ = 308 K. We need Ea and A.' },
            { text: 'Use two-point Arrhenius form: ln(k₂/k₁) = (Ea/R)(1/T₁ - 1/T₂). Compute k₂/k₁ = (1.35 × 10⁻⁴)/(3.46 × 10⁻⁵) = 3.9017.' },
            { text: 'ln(3.9017) = 1.3614. Compute 1/T₁ - 1/T₂ = 1/298 - 1/308 = (308 - 298)/(298×308) = 10/91784 = 1.0895 × 10⁻⁴ K⁻¹.' },
            { text: 'Solve for Ea: Ea = (1.3614 × 8.314) / (1.0895 × 10⁻⁴) = 103,800 J mol⁻¹ = 103.8 kJ mol⁻¹.' },
            { text: 'Find A using ln k = ln A - Ea/RT at T₁: ln A = ln k₁ + Ea/RT₁ = ln(3.46 × 10⁻⁵) + 103800/(8.314 × 298) = -10.27 + 41.89.', faded: true, blankAnswer: 'Ea = 103.8 kJ mol⁻¹, A = 5.4 × 10¹³ s⁻¹' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_009', title: 'Activation Energy: Concept and Calculation',
          scaffold: { problem: 'The rate constant for the decomposition of hydrogen peroxide catalyzed by catalase enzyme is 1.2 × 10⁴ s⁻¹ at 298 K.',
            steps: [
            { text: 'Write Arrhenius equation for both: k_cat = A e^(–Ea_cat/RT) and k_uncat = A e^(–Ea_uncat/RT).' },
            { text: 'Divide the two equations to eliminate A: k_cat/k_uncat = e^[–(Ea_cat – Ea_uncat)/RT].' },
            { text: 'Take natural log: ln(k_cat/k_uncat) = –(Ea_cat – Ea_uncat)/RT.' },
            { text: 'Solve for Ea_cat: Ea_cat = Ea_uncat – RT ln(k_cat/k_uncat).' },
            { text: 'Plug values: k_cat/k_uncat = 1.2×10⁴ / 2.5×10⁻³ = 4800; ln(4800) = 8.476; RT = 8.314 × 298 = 2478 J mol⁻¹ = 2.478.', faded: true, blankAnswer: 'Ea(catalyzed) = 54.0 kJ mol⁻¹.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_03_010', title: 'Collision Theory of Chemical Reactions',
          scaffold: { problem: 'In the gas‑phase reaction 2NO(g) + O₂(g) → 2NO₂(g), the collision frequency Z_AB is 2.5 × 10¹⁰ L mol⁻¹ s⁻¹ at 300 K.',
            steps: [
            { text: 'List given values: Z_AB = 2.5×10¹⁰ L mol⁻¹ s⁻¹, Ea = 110,000 J mol⁻¹, T = 300 K, P = 0.2, R = 8.314 J mol⁻¹ K⁻¹.' },
            { text: 'Write the collision theory rate expression: k = P · Z_AB · exp(–Ea/(RT)).' },
            { text: 'Compute the exponent: –Ea/(RT) = –110,000 / (8.314 × 300) = –110,000 / 2494.2 = –44.10.' },
            { text: 'Calculate the exponential factor: exp(–44.10) = 6.7 × 10⁻²⁰.' },
            { text: 'Multiply: k = 0.2 × 2.5×10¹⁰ × 6.7×10⁻²⁰ = 3.35 × 10⁻¹⁰ L mol⁻¹ s⁻¹.', faded: true, blankAnswer: 'k = 3.35 × 10⁻¹⁰ L mol⁻¹ s⁻¹' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For 2N₂O₅ → 4NO₂ + O₂, a lab group reports the rate three ways — –Δ[N₂O₅]/Δt, Δ[NO₂]/Δt and Δ[O₂]/Δt — and gets three different numbers, so they argue about which one \'is\' the rate.',
            decisions: [{ prompt: 'How should the rate actually be reported?', options: [
                { text: 'Divide each change by its stoichiometric coefficient — –(1/2)Δ[N₂O₅]/Δt = (1/4)Δ[NO₂]/Δt = Δ[O₂]/Δt — so all three collapse to one unique reaction rate.', outcome: 'The coefficient factor is what makes \'the rate\' well-defined; without it every species gives a different answer for the same reaction.' },
                { text: 'Pick –Δ[N₂O₅]/Δt — the reactant\'s disappearance is the true rate; products can differ.', outcome: 'That privileges one species arbitrarily; the convention exists precisely so the rate is independent of which species you track.', reveals: 'rate-equals-reactant-disappearance' },
                { text: 'Report the raw number with its sign — if [N₂O₅] falls, a negative rate is acceptable.', outcome: 'Rates are positive by convention: the minus sign in –Δ[R]/Δt cancels the negative change.', reveals: 'negative-rate-acceptable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You can now put a number on \'fast\' and a law on \'why\' — kinetics turns chemistry from recipes into control. Rate laws and half-lives are guaranteed marks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_007', difficulty: 'standard',
          question: 'Half-life of a reaction (t₁/₂) is the time required for the concentration of.',
          hint: 'Revisit nodes c12_chem_cbse_03_005 and c12_chem_cbse_03_006; practice deriving half-life.',
          misconception: 'Students often apply the first-order half-life formula (0.693/k) to zero-order reactions, or vice versa.',
          parts: [
                { id: 'a', prompt: 'For a zero-order reaction, half-life is 50 s when initial concentration is 0.20 M. If initial concentration is doubled to 0.40 M, what is the new half-life?', answer: 'Zero order: t₁/₂ ∝ [R]₀, so new t₁/₂ = 100 s',
                  options: ['Zero order: t₁/₂ ∝ [R]₀, so new t₁/₂ = 100 s', 'both remain 50 s or both double'],
                  hint: 'Revisit nodes c12_chem_cbse_03_005 and c12_chem_cbse_03_006; practice deriving half-life.',
                  misconception: 'Students often apply the first-order half-life formula (0.693/k) to zero-order reactions, or vice versa.' }
          ],
            remediations: { 'students-often-apply-the-first': { steps: ['Revisit nodes c12_chem_cbse_03_005 and c12_chem_cbse_03_006.', 'Practice deriving half-life by substituting [R] = [R]₀/2 in each integrated equation.', 'Solve 5 numerical problems for each order.', 'Then re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often apply the first-order half-life formula (0.693/k) to zero-order reactions, or vice versa.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For a first-order reaction, the time required for 75% completion is twice the half-life." Evaluate this statement with justification.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'percentage completion', 'fraction remaining'],
                  hint: 'Revisit nodes c12_chem_cbse_03_005 and c12_chem_cbse_03_006; practice deriving half-life.',
                  misconception: 'Students often apply the first-order half-life formula (0.693/k) to zero-order reactions, or vice versa.' }
          ],
            remediations: { 'students-often-apply-the-first': { steps: ['Revisit nodes c12_chem_cbse_03_005 and c12_chem_cbse_03_006.', 'Practice deriving half-life by substituting [R] = [R]₀/2 in each integrated equation.', 'Solve 5 numerical problems for each order.', 'Then re-attempt Diagnostic Questions 3 and 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_008', difficulty: 'standard',
          question: 'The Arrhenius equation (k = A e^(-Ea/RT)) quantitatively describes how the rate.',
          hint: 'If stuck on determining k experimentally, revisit node c12_chem_cbse_03_006 (Integrated.',
          misconception: 'Students often write the two-point Arrhenius form as log(k₂/k₁) = (Ea/2.303R)(1/T₂ - 1/T₁) with the temperature terms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Arrhenius equation (k = A e^(-Ea/RT)) quantitatively describes how the rate constant',
                  options: ['The Arrhenius equation (k = A e^(-Ea/RT)) quantitatively describes how the rate constant', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'If stuck on determining k experimentally, revisit node c12_chem_cbse_03_006 (Integrated Rate.',
                  misconception: 'Students often write the two-point Arrhenius form as log(k₂/k₁) = (Ea/2.303R)(1/T₂ - 1/T₁) with the temperature terms reversed, or they use.' }
          ],
            remediations: { 'students-often-write-the-two': { steps: ['If a student makes the sign error in the two-point form, have them re-derive it from ln k = ln A - Ea/RT step by step.', 'For unit errors, insist on a "unit audit" step: write units of every quantity before plugging numbers.', 'For graph errors, have them practice plotting ln k vs 1/T using dummy data (e.g., k = 10⁻³ at 300 K, 10⁻² at 320 K) and.', 'Revisit node c11_math_cbse_13_008 (Derivative Using First Principle) for logarithmic differentiation and.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_009', difficulty: 'standard',
          question: 'Activation energy (Ea) is the minimum extra energy that reactant molecules must.',
          hint: 'Review the derivation of ln k = –Ea/R (1/T) + ln A from k = A e^(–Ea/RT) and practice.',
          misconception: 'Students often think activation energy is the energy of the reactants or the energy released in the reaction.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Activation energy (Ea) is the minimum extra energy that reactant molecules must possess',
                  options: ['Activation energy (Ea) is the minimum extra energy that reactant molecules must possess', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Review the derivation of ln k = –Ea/R (1/T) + ln A from k = A e^(–Ea/RT) and practice converting.',
                  misconception: 'Students often think activation energy is the energy of the reactants or the energy released in the reaction.' }
          ],
            remediations: { 'activation-energy-is-the-energy': { steps: ['Revisit c12_chem_cbse_03_008 (Arrhenius Equation) and re-derive ln k = –Ea/R (1/T) + ln A from k = A e^(–Ea/RT).', 'Practice the two-point calculation with a template: write k₁, T₁, k₂, T₂ → compute ln(k₂/k₁) → compute (1/T₂ – 1/T₁) →.', 'Draw the potential energy diagram for an exothermic and an endothermic reaction, labeling Ea(forward), Ea(reverse), and.', 'Do the diagnostic question 3 again, but this time use log₁₀ form and verify you get the same Ea.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_03_010', difficulty: 'standard',
          question: 'Collision theory states that for a chemical reaction to occur, reactant.',
          hint: 'Revisit the Maxwell‑Boltzmann distribution (Class 11 Kinetic Theory, node.',
          misconception: 'Students often treat the steric factor P as always equal to 1, assuming the Arrhenius pre‑exponential factor A.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Collision theory states that for a chemical reaction to occur, reactant molecules must',
                  options: ['Collision theory states that for a chemical reaction to occur, reactant molecules must', 'The rate of a chemical reaction is defined as the change in molar concentration of a', 'The rate law (or rate expression) for a chemical reaction expresses the reaction rate as', 'A zero-order reaction is a chemical reaction whose rate is independent of the'],
                  hint: 'Revisit the Maxwell‑Boltzmann distribution (Class 11 Kinetic Theory, node c11_chem_cbse_05_009) and.',
                  misconception: 'Students often treat the steric factor P as always equal to 1, assuming the Arrhenius pre‑exponential factor A is exactly the collision.' }
          ],
            remediations: { 'students-often-treat-the-steric': { steps: ['If the student cannot distinguish the roles of energy and orientation, have them revisit the Maxwell‑Boltzmann.', 'Then, guide them through a step‑by‑step derivation of k = P·Z_AB·e^{-Ea/RT} using a diagram: draw two molecules.', 'Finally, give a re‑diagnostic: "Calculate P for a reaction where k = 2×10⁻⁴, Z_AB = 1×10¹¹, Ea = 60 kJ/mol at 300 K.', 'If P > 1, what does it imply?"'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
