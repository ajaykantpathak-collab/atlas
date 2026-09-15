import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch12_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch12_p2: SimDef = {
    id: 'v3_c11_phy_ch12_p2',
    title: 'Kinetic Theory · Part 2/2',
    subtitle: 'Rebuild the gas-pressure derivation — and rescue Newton\'s nearly-right formula.',
    classLevel: 11, subject: 'physics', topic: 'Kinetic Theory · Part 2/2',
    chapters: ['c11_phy_ch12'],
    nodeIds: ['c11_phy_cbse_12_007', 'c11_phy_cbse_12_008', 'c11_phy_cbse_12_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a kinetic theorist averaging a billion collisions', intro: 'Each molecule obeys Newton between collisions — the gas\'s randomness lives in the statistics, not in broken mechanics.', goal: 'Derive pressure from molecular collisions and correct Newton\'s isothermal sound-speed error.' },
    discovery: {
        question: 'Newton\'s √(P/ρ) predicts sound at 280 m/s but measurement says 331 m/s — so the formula is wrong?',
        options: ['Not wrong, incomplete — he assumed isothermal compression; Laplace\'s adiabatic correction √γ fixes it to ~331 m/s', 'Yes — discard it', 'Yes — molecules don\'t collide', 'No — the experiment was wrong'],
        answer: 'Not wrong, incomplete — he assumed isothermal compression; Laplace\'s adiabatic correction √γ fixes it to ~331 m/s',
        hook: '\'Random motion\' isn\'t chaos between collisions — each molecule flies in a deterministic straight line; only the initial positions and velocities are random.',
    },
    teaching: [
        { title: 'Mean Free Path: Definition', text: 'Mean free path is the average distance traveled by a gas molecule between two successive collisions with other molecules.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_12_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Find the three errors in \'pressure = 2mnv²\' — the missing 1/3, the collision rate, the direction — and judge whether elastic collisions mean a gas can never cool.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_007', title: 'Mean Free Path: Definition',
          scaffold: { problem: 'Calculate the mean free path of oxygen molecules at 27°C and 1.0 atm pressure.',
            steps: [
            { text: 'Identify given quantities: T = 27°C = 300 K, P = 1.0 atm = 1.01 × 10⁵ Pa, d = 3.6 Å = 3.6 × 10⁻¹⁰ m.' },
            { text: 'Calculate number density n using ideal gas law: P = n k_B T → n = P / (k_B T).' },
            { text: 'Write exact mean free path formula: λ = 1 / (√2 π d² n).' },
            { text: 'Substitute values: d² = (3.6 × 10⁻¹⁰)² = 12.96 × 10⁻²⁰ m². Denominator = 1.414 × 3.14 × 12.96 × 10⁻²⁰ × 2.44 × 10²⁵.' },
            { text: 'λ = 1 / (1.41 × 10⁷) = 7.09 × 10⁻⁸ m = 70.9 nm. Check: at STP, λ for air ~ 68 nm; here T is higher (lower n) so λ.', faded: true, blankAnswer: 'λ = 7.1 × 10⁻⁸ m (or 71 nm)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_008', title: 'Avogadro\'s Number and Ideal Gas Law',
          scaffold: { problem: 'A weather balloon contains 2.50 moles of helium gas at a pressure of 0.800 atm and a temperature of 15.0°C.',
            steps: [
            { text: 'Identify given quantities: μ = 2.50 mol, P = 0.800 atm, T = 15.0°C = 15.0 + 273 = 288 K.' },
            { text: 'Write the ideal gas law: PV = μRT. Solve for V: V = μRT / P.' },
            { text: 'Substitute values with units: V = (2.50 mol) × (0.0821 L atm mol⁻¹ K⁻¹) × (288 K) / (0.800 atm).' },
            { text: 'Compute stepwise: numerator = 2.50 × 0.0821 × 288 = 59.112 L atm. Divide by 0.800 atm → V = 73.89 L.' },
            { text: 'Check reasonableness: At STP (1 atm, 273 K), 1 mole = 22.4 L. Here 2.5 moles at lower pressure (0.8 atm) and similar.', faded: true, blankAnswer: '73.9 L' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_009', title: 'Maxwell\'s Speed Distribution Law',
          scaffold: { problem: 'A cylinder contains 2.0 moles of helium gas at 400 K. Calculate (a) the most probable speed, (b) the average speed, and (c) the rms speed.',
            steps: [
            { text: 'Identify given: n = 2.0 mol (not needed for speeds), T = 400 K, M = 4.00 g/mol = 4.00×10^{-3} kg/mol.' },
            { text: 'Use formulas with R and M: v_p = √(2RT/M), v_avg = √(8RT/πM), v_rms = √(3RT/M).' },
            { text: 'Compute RT/M = (8.31 × 400) / (4.00×10^{-3}) = 3324 / 0.004 = 8.31×10^5 m²/s².' },
            { text: 'v_p = √(2 × 8.31×10^5) = √(1.662×10^6) = 1289 m/s. v_avg = √(8/π × 8.31×10^5) = √(2.122×10^6) = 1457 m/s.' },
            { text: 'Verify order: 1289 < 1457 < 1579. Ratios: 1457/1289 ≈ 1.13, 1579/1289 ≈ 1.22. Matches theoretical ratios.', faded: true, blankAnswer: '(a) v_p = 1290 m/s, (b) v_avg = 1460 m/s, (c) v_rms = 1580.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a kinetic-theory seminar, a student describes gas pressure as \'a continuous push like a steady wind of molecules\' and predicts argon must exert more pressure than helium at the same temperature \'since its molecules are heavier.\'',
            decisions: [{ prompt: 'What does the kinetic derivation actually show?', options: [
                { text: 'Rebuild the picture: pressure is the sum of discrete impulsive collisions — each molecule reverses momentum at the wall — and the ⅓ in P = ⅓nm⟨v²⟩ comes from isotropy (⟨vₓ²⟩ = ⟨vᵧ²⟩ = ⟨v_z²⟩), not \'three walls.\' And P = nk_BT: at fixed n and T, argon and helium give equal pressure — heavier argon just moves slower, since m·v_rms² is set by temperature.', outcome: 'The model sharpens: impulses not wind, isotropy gives the third, and mass cancels out of pressure at fixed temperature.' },
                { text: 'Keep the steady-wind image — millions of molecules pushing continuously is basically a wind.', outcome: 'The physics is impulsive: momentum transfers in discrete hits; \'random motion\' means random initial conditions, not chaotic dynamics — between collisions molecules fly straight by inertia.', reveals: 'pressure-is-steady-wind' },
                { text: 'Keep the argon prediction — heavier molecules hit harder, so more pressure.', outcome: 'They hit harder but slower: v_rms² ∝ 1/m, so m⟨v²⟩ is identical at fixed T — pressure depends on n and T, not molecular mass.', reveals: 'heavier-gas-more-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_12_009', title: 'You made it',
          caseStudy: { intro: 'Pressure isn\'t a steady molecular wind — it\'s the drumbeat of discrete collisions, each delivering 2mv of momentum.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_007', difficulty: 'standard',
          question: 'Mean free path is the average distance traveled by a gas molecule between two.',
          hint: 'Review the derivation of pressure of an ideal gas (c11_phy_cbse_12_002) to recall number.',
          misconception: 'Students often confuse mean free path with the average intermolecular distance (which is \\(\\sim n^{-1/3}\\)).',
          parts: [
                { id: 'a', prompt: 'A gas is kept at constant temperature. If its pressure is doubled, how does the mean free path change? Justify using the formula and the ideal gas law.', answer: 'From ideal gas law, \\(P = n k_B T\\)',
                  options: ['From ideal gas law, \\(P = n k_B T\\)', 'molecular diameter changes with pressure'],
                  hint: 'Review the derivation of pressure of an ideal gas (c11_phy_cbse_12_002) to recall number density.',
                  misconception: 'Students often confuse mean free path with the average intermolecular distance (which is \\(\\sim n^{-1/3}\\)).' }
          ],
            remediations: { 'students-often-confuse-mean-free': { steps: ['Revisit the pressure derivation (c11_phy_cbse_12_002) to recall how number density \\(n\\) and molecular speed \\(\\langle.', 'Draw a diagram of a moving molecule sweeping a cylinder; then imagine all molecules moving.', 'Use an analogy: walking through a stationary crowd vs.', 'Practice the relative speed calculation: if two molecules have speeds \\(v_1\\) and \\(v_2\\) at angle \\(\\theta\\), relative.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_008', difficulty: 'standard',
          question: 'Avogadro\'s number (N_A) is the number of constituent particles (atoms.',
          hint: 'If stuck on unit conversions or algebraic manipulation, review Class 8 math: powers of 10.',
          misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature.',
          parts: [
                { id: 'a', prompt: 'Two vessels A and B of equal volume V contain gases at the same temperature T.', answer: '(i) Pressure: P = μRT/V',
                  options: ['(i) Pressure: P = μRT/V', 'Avogadro\'s number (6'],
                  hint: 'If stuck on unit conversions or algebraic manipulation, review Class 8 math: powers of 10.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' }
          ],
            remediations: { 'avogadro-s-number-6': { steps: ['If a student uses 22.4 L at non-STP conditions: 1.', 'Ask them to write the ideal gas law for 1 mole at STP: P₁V₁ = RT₁ → 1 atm × 22.4 L = R × 273 K.', 'Then write it for the given conditions: P₂V₂ = RT₂.', 'Divide the two equations: (P₂V₂)/(P₁V₁) = T₂/T₁.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since PV = μRT, if I double the temperature of a gas in a rigid container, the pressure doubles.', answer: 'The statement is correct for a fixed amount of gas (constant μ)',
                  options: ['The statement is correct for a fixed amount of gas (constant μ)', 'it\'s only true for isochoric processes', 'Avogadro\'s number (6'],
                  hint: 'If stuck on unit conversions or algebraic manipulation, review Class 8 math: powers of 10.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' },
                { id: 'b', prompt: 'Design a simple experiment using a syringe, a pressure sensor, and a water bath to verify Charles\'s law (V ∝ T at constant P) for air.', answer: 'Seal a syringe with a known volume of air (e.g., 20 mL) at room temperature',
                  options: ['Seal a syringe with a known volume of air (e.g., 20 mL) at room temperature', 'Avogadro\'s number (6'],
                  hint: 'If stuck on unit conversions or algebraic manipulation, review Class 8 math: powers of 10.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' }
          ],
            remediations: { 'avogadro-s-number-6': { steps: ['If a student uses 22.4 L at non-STP conditions: 1.', 'Ask them to write the ideal gas law for 1 mole at STP: P₁V₁ = RT₁ → 1 atm × 22.4 L = R × 273 K.', 'Then write it for the given conditions: P₂V₂ = RT₂.', 'Divide the two equations: (P₂V₂)/(P₁V₁) = T₂/T₁.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_009', difficulty: 'standard',
          question: 'Maxwell\'s Speed Distribution Law describes the statistical distribution.',
          hint: 'Review c11_phy_cbse_12_003 (kinetic interpretation of temperature) and.',
          misconception: 'Students often think the peak of the Maxwell-Boltzmann curve (v_p) represents the average speed, or that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maxwell\'s Speed Distribution Law describes the statistical distribution of molecular',
                  options: ['Maxwell\'s Speed Distribution Law describes the statistical distribution of molecular', 'The kinetic theory of gases is a theoretical model based on seven fundamental postulates', 'Pressure of an ideal gas, derived from kinetic theory, is the macroscopic force per unit', 'The kinetic interpretation of temperature states that the absolute temperature (T) of an'],
                  hint: 'Review c11_phy_cbse_12_003 (kinetic interpretation of temperature) and c11_phy_cbse_12_004 (RMS.',
                  misconception: 'Students often think the peak of the Maxwell-Boltzmann curve (v_p) represents the average speed, or that the distribution is symmetric like.' }
          ],
            remediations: { 'the-peak-of-the-maxwell': { steps: ['Revisit the distinction between m and M: m = M/N_A.', 'Practice converting molar mass (g/mol) to molecular mass (kg) using N_A.', 'Draw the curve for two masses at same T: label v_p, v_avg, v_rms.', 'Verify v_p < v_avg < v_rms using the ratios 1 : √(8/π) : √(3/2) ≈ 1 : 1.128 : 1.225.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
