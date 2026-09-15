import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch12_p1: SimDef = {
    id: 'v3_c11_phy_ch12_p1',
    title: 'Kinetic Theory · Part 1/2',
    subtitle: 'Rebuild the gas-pressure derivation — and rescue Newton\'s nearly-right formula.',
    classLevel: 11, subject: 'physics', topic: 'Kinetic Theory · Part 1/2',
    chapters: ['c11_phy_ch12'],
    nodeIds: ['c11_phy_cbse_12_001', 'c11_phy_cbse_12_002', 'c11_phy_cbse_12_003', 'c11_phy_cbse_12_004', 'c11_phy_cbse_12_005', 'c11_phy_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a kinetic theorist averaging a billion collisions', intro: 'Each molecule obeys Newton between collisions — the gas\'s randomness lives in the statistics, not in broken mechanics.', goal: 'Derive pressure from molecular collisions and correct Newton\'s isothermal sound-speed error.' },
    discovery: {
        question: 'Newton\'s √(P/ρ) predicts sound at 280 m/s but measurement says 331 m/s — so the formula is wrong?',
        options: ['Not wrong, incomplete — he assumed isothermal compression; Laplace\'s adiabatic correction √γ fixes it to ~331 m/s', 'Yes — discard it', 'Yes — molecules don\'t collide', 'No — the experiment was wrong'],
        answer: 'Not wrong, incomplete — he assumed isothermal compression; Laplace\'s adiabatic correction √γ fixes it to ~331 m/s',
        hook: '\'Random motion\' isn\'t chaos between collisions — each molecule flies in a deterministic straight line; only the initial positions and velocities are random.',
    },
    teaching: [
        { title: 'Kinetic Theory of Gases: Assumptions', text: 'The kinetic theory of gases is a theoretical model based on seven fundamental postulates (assumptions) that describe an ideal gas as a large collection of point-like molecules in continuous, random.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_12_001', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Find the three errors in \'pressure = 2mnv²\' — the missing 1/3, the collision rate, the direction — and judge whether elastic collisions mean a gas can never cool.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_12_001', title: 'Kinetic Theory of Gases: Assumptions',
          caseStudy: { intro: 'Imagine you inflate a balloon and squeeze it — you feel a uniform resistance from all sides.',
            decisions: [{ prompt: 'State the seven assumptions of the kinetic theory of an ideal gas as per the NCERT textbook.', options: [
                { text: 'The seven assumptions are: (1) A gas consists of a very large number of molecules in', outcome: 'The seven assumptions are: (1) A gas consists of a very large number of molecules in incessant.' },
                { text: 'random motion', outcome: 'Not quite — Students often believe that "random motion" means molecules move in completely chaotic.', reveals: 'random-motion-means-molecules-move' },
                { text: 'elastic', outcome: 'Not quite — Students often believe that "random motion" means molecules move in completely chaotic.', reveals: 'random-motion-means-molecules-move' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_002', title: 'Pressure of an Ideal Gas: Derivation',
          scaffold: { problem: 'A cylindrical vessel of volume 0.5 m³ contains 2.0 × 10²⁴ molecules of oxygen gas (O₂, molar mass 32.0 g/mol).',
            steps: [
            { text: 'Identify given quantities with units: V = 0.5 m³, N = 2.0 × 10²⁴ molecules, M = 32.0 g/mol = 32.0 × 10⁻³ kg/mol, v_rms.' },
            { text: 'Compute number density n = N/V = (2.0 × 10²⁴) / 0.5 = 4.0 × 10²⁴ m⁻³.' },
            { text: 'Write the kinetic theory pressure formula: P = (1/3) n m v_rms².' },
            { text: 'Substitute values: P = (1/3) × (4.0 × 10²⁴) × (5.32 × 10⁻²⁶) × (480)² = (1/3) × 4.0 × 5.32 × 10⁻² × 2.304 × 10⁵ = (1/3).' },
            { text: 'Convert to atm: P = (1.632 × 10⁴) / (1.013 × 10⁵) = 0.161 atm.', faded: true, blankAnswer: 'P = 1.63 × 10⁴ Pa = 0.161 atm' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_003', title: 'Kinetic Interpretation of Temperature',
          scaffold: { problem: 'A 2.0 litre vessel contains 0.5 moles of argon gas at 400 K. Calculate (a) the total translational kinetic energy of the gas, (b) the.',
            steps: [
            { text: 'Identify given quantities: V = 2.0 L = 2.0 × 10⁻³ m³ (not needed for energy), μ = 0.5 mol, T = 400 K, M = 39.9 × 10⁻³.' },
            { text: 'Select formulas: (a) E_total = (3/2)μRT for monatomic ideal gas; (b) KE_per_atom = (3/2)k_BT where k_B = R/N_A; (c).' },
            { text: 'Compute (a): E_total = 1.5 × 0.5 × 8.31 × 400 = 1.5 × 0.5 × 3324 = 2493 J ≈ 2.49 × 10³ J.' },
            { text: 'Compute (b): k_B = 8.31 / 6.02×10²³ = 1.38×10⁻²³ J/K; KE_per_atom = 1.5 × 1.38×10⁻²³ × 400 = 8.28×10⁻²¹ J.' },
            { text: 'Compute (c): v_rms = √(3 × 8.31 × 400 / 0.0399) = √(9972 / 0.0399) = √250000 = 500 m/s.', faded: true, blankAnswer: '(a) 2.49 × 10³ J, (b) 8.28 × 10⁻²¹ J, (c) 500 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_004', title: 'RMS Speed: Formula and Calculation',
          scaffold: { problem: 'An LPG cylinder contains butane gas (C₄H₁₀, molar mass 58 g/mol) at 300 K. Calculate the rms speed of butane molecules.',
            steps: [
            { text: 'Identify given: \\(T = 300\\ \\text{K}\\), \\(M = 58\\ \\text{g/mol} = 0.058\\ \\text{kg/mol}\\), \\(R = 8.31\\ \\text{J.' },
            { text: 'Write formula: \\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\). Check units: \\(R\\) in J/mol·K = kg·m²/s²·mol·K, \\(T\\) in.' },
            { text: 'Substitute values: \\(v_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.31 \\times 300}{0.058}}\\).' },
            { text: 'Compute numerator: \\(3 \\times 8.31 = 24.93\\); \\(24.93 \\times 300 = 7479\\ \\text{J/mol}\\).' },
            { text: 'Divide by \\(M\\): \\(7479 / 0.058 = 128,948\\ \\text{m}^2/\\text{s}^2\\).' },
            { text: 'Square root: \\(\\sqrt{128948} \\approx 359\\ \\text{m/s}\\).', faded: true, blankAnswer: '359 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_005', title: 'Degrees of Freedom and Law of Equipartition',
          scaffold: { problem: 'A cylinder contains 2 moles of oxygen gas (O₂) at 300 K. Assuming O₂ is a rigid diatomic molecule, calculate (a) the total internal energy.',
            steps: [
            { text: 'Identify given: n = 2 mol, T = 300 K, ΔT = 10 K. O₂ is diatomic rigid → f = 5 (3 translational + 2 rotational).' },
            { text: 'Write formulas: U = (f/2)nRT; C_v = (f/2)R; Q_v = n C_v ΔT.' },
            { text: 'Substitute values: R = 8.31 J mol⁻¹ K⁻¹. U = (5/2) × 2 × 8.31 × 300 = 5 × 8.31 × 300 = 12465 J.' },
            { text: 'C_v = (5/2) × 8.31 = 20.775 J mol⁻¹ K⁻¹. Q_v = 2 × 20.775 × 10 = 415.5 J.' },
            { text: 'Verify units: U in J, C_v in J mol⁻¹ K⁻¹, Q_v in J. Values are physically reasonable (U ~ 12 kJ for 2 mol at 300 K).', faded: true, blankAnswer: '(a) U = 1.25 × 10⁴ J, (b) C_v = 20.8 J mol⁻¹ K⁻¹, (c) Q_v.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_006', title: 'Specific Heat Capacity: Monoatomic and Diatomic',
          scaffold: { problem: 'A cylinder of fixed volume 22.4 litres contains 1 mole of argon gas at STP (273 K, 1 atm).',
            steps: [
            { text: 'Identify given quantities: n = 1 mole, ΔT = 20.0 K, fixed volume → constant volume process.' },
            { text: 'Select formula: At constant volume, Q = n Cv ΔT. For monoatomic gas, Cv = (3/2)R.' },
            { text: 'Substitute values with units: Cv = 1.5 × 8.31 J mol⁻¹ K⁻¹ = 12.465 J mol⁻¹ K⁻¹.' },
            { text: 'Compute with unit cancellation: mol × (J mol⁻¹ K⁻¹) × K = J. Q = 249.3 J.' },
            { text: 'Verify reasonableness: For 1 mole monoatomic gas, Cv ≈ 12.5 J/K, so 20 K rise needs ~250 J.', faded: true, blankAnswer: '249 J (or 249.3 J)' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a kinetic-theory seminar, a student describes gas pressure as \'a continuous push like a steady wind of molecules\' and predicts argon must exert more pressure than helium at the same temperature \'since its molecules are heavier.\'',
            decisions: [{ prompt: 'What does the kinetic derivation actually show?', options: [
                { text: 'Rebuild the picture: pressure is the sum of discrete impulsive collisions — each molecule reverses momentum at the wall — and the ⅓ in P = ⅓nm⟨v²⟩ comes from isotropy (⟨vₓ²⟩ = ⟨vᵧ²⟩ = ⟨v_z²⟩), not \'three walls.\' And P = nk_BT: at fixed n and T, argon and helium give equal pressure — heavier argon just moves slower, since m·v_rms² is set by temperature.', outcome: 'The model sharpens: impulses not wind, isotropy gives the third, and mass cancels out of pressure at fixed temperature.' },
                { text: 'Keep the steady-wind image — millions of molecules pushing continuously is basically a wind.', outcome: 'The physics is impulsive: momentum transfers in discrete hits; \'random motion\' means random initial conditions, not chaotic dynamics — between collisions molecules fly straight by inertia.', reveals: 'pressure-is-steady-wind' },
                { text: 'Keep the argon prediction — heavier molecules hit harder, so more pressure.', outcome: 'They hit harder but slower: v_rms² ∝ 1/m, so m⟨v²⟩ is identical at fixed T — pressure depends on n and T, not molecular mass.', reveals: 'heavier-gas-more-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'Pressure isn\'t a steady molecular wind — it\'s the drumbeat of discrete collisions, each delivering 2mv of momentum.',
            decisions: [{ prompt: 'What comes next? Kinetic Theory · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Kinetic Theory · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_001', difficulty: 'standard',
          question: 'The kinetic theory of gases is a theoretical model based on seven fundamental.',
          hint: 'If stuck, revisit Class 9 Newton\'s laws (c9_physics_ch3_3, c9_physics_ch3_4.',
          misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like.',
          parts: [
                { id: 'a', prompt: 'A gas is confined in a cylinder at 300 K and 1 atm. The gas is compressed isothermally to 100 atm.', answer: 'The assumption of "negligible molecular volume" (point masses) breaks down first',
                  options: ['The assumption of "negligible molecular volume" (point masses) breaks down first', 'elastic collisions', 'Newton\'s laws', 'random motion'],
                  hint: 'If stuck, revisit Class 9 Newton\'s laws (c9_physics_ch3_3, c9_physics_ch3_4, c9_physics_ch3_5) and.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with.' }
          ],
            remediations: { 'random-motion-means-molecules-move': { steps: ['If the student holds the "chaotic path" misconception: (1) Show a single-molecule simulation in a box with no other.', '(2) Add one other molecule — paths remain straight between binary collisions.', '(3) Emphasise: randomness is in the *ensemble*, not the *trajectory*.', 'If the student conflates "elastic" with "billiard ball": (1) Contrast with inelastic collision where kinetic energy.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The assumption of perfectly elastic collisions means gas molecules never lose kinetic energy, so a gas in an insulated container will never.', answer: 'The statement is partially correct but misleading',
                  options: ['The statement is partially correct but misleading', 'fully correct', 'random motion', 'elastic collision'],
                  hint: 'If stuck, revisit Class 9 Newton\'s laws (c9_physics_ch3_3, c9_physics_ch3_4, c9_physics_ch3_5) and.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with.' },
                { id: 'b', prompt: 'Design a thought experiment or simulation setup to test whether the assumption "collision duration is negligible compared to time between collisions" holds for.', answer: 'A good answer: Use molecular dynamics simulation with realistic N₂ potential',
                  options: ['A good answer: Use molecular dynamics simulation with realistic N₂ potential', 'random motion', 'elastic collision'],
                  hint: 'If stuck, revisit Class 9 Newton\'s laws (c9_physics_ch3_3, c9_physics_ch3_4, c9_physics_ch3_5) and.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with.' }
          ],
            remediations: { 'random-motion-means-molecules-move': { steps: ['If the student holds the "chaotic path" misconception: (1) Show a single-molecule simulation in a box with no other.', '(2) Add one other molecule — paths remain straight between binary collisions.', '(3) Emphasise: randomness is in the *ensemble*, not the *trajectory*.', 'If the student conflates "elastic" with "billiard ball": (1) Contrast with inelastic collision where kinetic energy.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_002', difficulty: 'standard',
          question: 'Pressure of an ideal gas, derived from kinetic theory, is the macroscopic force.',
          hint: 'If stuck on momentum change: revisit c9_physics_ch3_6 (Momentum Conservation).',
          misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since pressure is force per area, and force is rate of change of momentum, we should just multiply the momentum change 2mvₓ by the number.', answer: 'The 1/2 factor arises',
                  options: ['The 1/2 factor arises', 'molecules in a region', 'molecules with velocity toward the boundary'],
                  hint: 'If stuck on momentum change: revisit c9_physics_ch3_6 (Momentum Conservation).',
                  misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact wrong reasoning:**.' },
                { id: 'b', prompt: 'Two ideal gases A and B are at the same temperature and have the same number density n.', answer: '(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩',
                  options: ['(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩', 'heavier gas exerts more pressure'],
                  hint: 'If stuck on momentum change: revisit c9_physics_ch3_6 (Momentum Conservation).',
                  misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact wrong reasoning:**.' }
          ],
            remediations: { 'misconception-pressure-is-caused-by': { steps: ['** Simulate a 1D "gas" — one molecule bouncing between two walls. Derive P = m v²/L (no 1/3, no 1/2). **', '** Add a second dimension — molecule moves in a square box. Show that pressure on x-walls uses only vₓ, and ⟨vₓ²⟩.', '** Go to 3D cube. Demonstrate ⟨vₓ²⟩ = ⅓⟨v²⟩ by symmetry. **', '** Introduce many molecules with random velocities. Show that the 1/2 flux factor emerges from counting only vₓ > 0.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_003', difficulty: 'standard',
          question: 'The kinetic interpretation of temperature states that the absolute temperature.',
          hint: 'If stuck, revisit c11_phy_cbse_12_002 for pressure derivation steps (cube container.',
          misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.',
          parts: [
                { id: 'a', prompt: 'State the kinetic interpretation of temperature equation and identify the physical meaning of each symbol with its SI unit.', answer: 'The equation is (1/2)m⟨v²⟩ = (3/2)k_BT',
                  options: ['The equation is (1/2)m⟨v²⟩ = (3/2)k_BT', 'average kinetic energy per molecule is equal', 'average speed is equal', 'at the same temperature, all gas molecules have the same speed'],
                  hint: 'If stuck, revisit c11_phy_cbse_12_002 for pressure derivation steps (cube container, momentum.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' },
                { id: 'b', prompt: 'A graph of PV/T versus P for a fixed mass of oxygen gas at two temperatures T₁ and T₂ shows two curves approaching the same y-intercept at P→0.', answer: 'At low pressures (P→0), all gases behave ideally',
                  options: ['At low pressures (P→0), all gases behave ideally', 'average kinetic energy per molecule is equal', 'average speed is equal', 'at the same temperature, all gas molecules have the same speed'],
                  hint: 'If stuck, revisit c11_phy_cbse_12_002 for pressure derivation steps (cube container, momentum.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' }
          ],
            remediations: { 'at-the-same-temperature': { steps: ['Remediation: Take two balloons — one filled with helium, one with carbon dioxide.', 'Cool both in a freezer to same temperature.', 'Release gas near a candle flame: helium extinguishes flame faster due to higher molecular speed (lighter molecules.', 'Then guide student through calculation: v_rms,He/v_rms,CO₂ = √(44/4) = √11 ≈ 3.3.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_004', difficulty: 'standard',
          question: 'Root mean square (rms) speed is the square root of the mean of the squares.',
          hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
          misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).',
          parts: [
                { id: 'a', prompt: 'Write the formula for root mean square speed of gas molecules in terms of universal gas constant \\(R\\), absolute temperature \\(T\\), and molar mass \\(M\\).', answer: '\\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\)',
                  options: ['\\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\)', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'b', prompt: 'Two gases, hydrogen (molar mass 2 g/mol) and oxygen (32 g/mol), are at the same temperature. Which has a higher rms speed?', answer: 'Hydrogen has higher \\(v_{\\text{rms}}\\)',
                  options: ['Hydrogen has higher \\(v_{\\text{rms}}\\)', 'higher pressure means higher speed', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'c', prompt: 'Calculate the rms speed of nitrogen gas (\\(M = 28\\ \\text{g/mol}\\)) at \\(27^\\circ\\text{C}\\). Use \\(R = 8.31\\ \\text{J mol}^{-1}\\text{K}^{-1}\\).', answer: 'Step 1: Convert \\(T = 27 + 273 = 300\\ \\text{K}\\)',
                  options: ['Step 1: Convert \\(T = 27 + 273 = 300\\ \\text{K}\\)', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'd', prompt: 'A graph of \\(v_{\\text{rms}}^2\\) vs \\(T\\) for a fixed mass of an ideal gas is plotted. What is the slope of this graph?', answer: 'From \\(v_{\\text{rms}}^2 = \\frac{3R}{M} T\\), slope = \\(\\frac{3R}{M}\\)',
                  options: ['From \\(v_{\\text{rms}}^2 = \\frac{3R}{M} T\\), slope = \\(\\frac{3R}{M}\\)', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' }
          ],
            remediations: { 'v-text-rms-is-the': { steps: ['If a student confuses \\(v_{\\text{rms}}\\) with average speed, have them compute both for a simple 3-molecule system.', '\\(\\bar{v} = 2\\), \\(\\overline{v^2} = (1+4+9)/3 = 14/3\\), \\(v_{\\text{rms}} = \\sqrt{14/3} \\approx 2.16\\).', 'For Celsius error, ask: "If T = 0°C, does kinetic energy become zero?" No, it\'s 273 K.', 'Emphasize that \\(v_{\\text{rms}} \\propto \\sqrt{T}\\) requires absolute zero as origin.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_005', difficulty: 'standard',
          question: 'Degrees of freedom of a gas molecule is the number of independent parameters.',
          hint: 'Review the derivation of PV = (1/3)nm<v²> and its combination with ideal gas law to get.',
          misconception: 'Students often think a diatomic molecule has 3 rotational degrees of freedom (like a 3D rigid body) because they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Degrees of freedom of a gas molecule is the number of independent parameters',
                  options: ['Degrees of freedom of a gas molecule is the number of independent parameters', 'The kinetic theory of gases is a theoretical model based on seven fundamental postulates', 'Pressure of an ideal gas, derived from kinetic theory, is the macroscopic force per unit', 'The kinetic interpretation of temperature states that the absolute temperature (T) of an'],
                  hint: 'Review the derivation of PV = (1/3)nm<v²> and its combination with ideal gas law to get (1/2)m<v²>.',
                  misconception: 'Students often think a diatomic molecule has 3 rotational degrees of freedom (like a 3D rigid body) because they visualize it as a 3D.' }
          ],
            remediations: { 'a-diatomic-molecule-has-3': { steps: ['Hold a pen (diatomic model) and rotate it about its long axis — notice almost no resistance compared to rotating about.', 'Draw the energy expression for a 1D harmonic oscillator: E = (1/2)mv² + (1/2)kx². Count the squared terms (two).', 'Use the NCERT Table 12.1 to compare predicted vs. experimental γ for Cl₂ (1.40 vs. lower) and CO₂ (1.33 vs.', 'Re-derive C_v for diatomic gas with and without vibration to internalize the factor of 2.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_006', difficulty: 'standard',
          question: 'Specific heat capacity of a gas is the amount of heat required to raise the.',
          hint: 'Revisit c11_phy_cbse_12_005 (Degrees of Freedom and Law of Equipartition) and practice.',
          misconception: 'Students believe each vibrational mode contributes only ONE degree of freedom (like translation or rotation), leading.',
          parts: [
                { id: 'a', prompt: 'A diatomic gas like oxygen has two rotational degrees of freedom at room temperature.', answer: 'Rotation about the internuclear axis has a negligible moment of inertia',
                  options: ['Rotation about the internuclear axis has a negligible moment of inertia', 'three rotations for any 3D object'],
                  hint: 'Revisit c11_phy_cbse_12_005 (Degrees of Freedom and Law of Equipartition) and practice identifying.',
                  misconception: 'Students believe each vibrational mode contributes only ONE degree of freedom (like translation or rotation), leading them to calculate.' },
                { id: 'b', prompt: 'Experimental Cv for chlorine gas (Cl₂) at 300 K is 25.0 J mol⁻¹ K⁻¹, higher than the rigid diatomic prediction of 20.8 J mol⁻¹ K⁻¹ but lower than the fully.', answer: 'The vibrational mode is partially excited',
                  options: ['The vibrational mode is partially excited', 'equipartition is wrong', 'Cl₂ is not diatomic'],
                  hint: 'Revisit c11_phy_cbse_12_005 (Degrees of Freedom and Law of Equipartition) and practice identifying.',
                  misconception: 'Students believe each vibrational mode contributes only ONE degree of freedom (like translation or rotation), leading them to calculate.' }
          ],
            remediations: { 'each-vibrational-mode-contributes-only': { steps: ['Write the total energy of a 1D harmonic oscillator: E = ½mv² + ½kx².', 'Identify the TWO squared terms (v² and x²).', 'Apply equipartition: each squared term gets ½kBT per molecule → ½RT per mole.', 'Conclude one vibrational mode = 2 degrees of freedom = R per mole added to Cv.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
