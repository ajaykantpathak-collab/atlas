import type { SimDef } from '../../engine/types';
import C11_PhysicsKineticTheoryGasesCBSESim from '../../../simulations/c6_12/C11_PhysicsKineticTheoryGasesCBSESim';

/** v3 wrapped master — C11_PhysicsKineticTheoryGasesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicskinetictheorygasescbsesim: SimDef = {
    id: 'v3w_c11_physicskinetictheorygasescbsesim',
    title: 'Kinetic Theory Gases CBSE',
    subtitle: 'This node covers the seven standard postulates of kinetic theory for an ideal gas as.',
    classLevel: 11, subject: 'physics', topic: 'Kinetic Theory of Gases: Assumptions',
    chapters: [],
    nodeIds: ['c11_phy_cbse_12_001', 'c11_phy_cbse_12_004', 'c11_phy_cbse_12_008', 'c11_phy_cbse_12_002', 'c11_phy_cbse_12_003', 'c11_phy_cbse_09_012', 'c11_phy_cbse_10_013', 'c11_phy_cbse_10_011', 'c11_phy_cbse_12_005', 'c11_phy_cbse_12_006', 'c11_phy_cbse_12_007', 'c11_phy_cbse_12_009', 'c11_phy_cbse_04_008', 'c11_phy_cbse_09_011', 'c11_phy_cbse_11_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you inflate a balloon and squeeze it — you feel a uniform resistance from all sides.', goal: 'Master Kinetic Theory Gases CBSE.' },
    discovery: {
        question: 'A gas is confined in a cylinder at 300 K and 1 atm. The gas is compressed isothermally to 100 atm.',
        options: ['The assumption of "negligible molecular volume" (point masses) breaks down first', 'elastic collisions', 'Newton\'s laws'],
        answer: 'The assumption of "negligible molecular volume" (point masses) breaks down first',
        hook: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a.',
    },
    teaching: [
        { title: 'The kinetic theory of gases is a theoretical.', text: 'The kinetic theory of gases is a theoretical model based on seven fundamental postulates (assumptions) that describe an ideal gas as a large collection of point-like molecules in continuous, random.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_001', title: 'The kinetic theory of gases is a.',
          scaffold: { problem: 'A container holds helium gas at 300 K and 1 atm. The diameter of a helium atom is approximately 100 pm.',
            steps: [
            { text: 'Identify given quantities: T = 300 K, P = 1 atm = 1.013 × 10⁵ Pa, d = 100 pm = 1.00 × 10⁻¹⁰ m, N_A = 6.022 × 10²³.' },
            { text: 'Calculate molar volume at 300 K, 1 atm using ideal gas law: V_m = RT/P. R = 8.314 J mol⁻¹ K⁻¹.' },
            { text: 'Calculate volume of one helium atom assuming spherical: V_atom = (4/3)π(d/2)³ = (4/3)π(5.00 × 10⁻¹¹)³ = 5.24 × 10⁻³¹ m³.' },
            { text: 'Total volume of atoms in 1 mole: V_total_atoms = N_A × V_atom = (6.022 × 10²³) × (5.24 × 10⁻³¹) = 3.15 × 10⁻⁷ m³.' },
            { text: 'Compute ratio: V_total_atoms / V_m = (3.15 × 10⁻⁷) / 0.0246 = 1.28 × 10⁻⁵.' },
            { text: 'Interpret: The atoms occupy only 0.00128% of the container volume.', faded: true, blankAnswer: 'Ratio = 1.28 × 10⁻⁵ (0.00128%). The point mass assumption.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_004', title: 'Root mean square (rms) speed is the.',
          scaffold: { problem: 'An LPG cylinder contains butane gas (C₄H₁₀, molar mass 58 g/mol) at 300 K. Calculate the rms speed of butane molecules.',
            steps: [
            { text: 'Identify given: \\(T = 300\\ \\text{K}\\), \\(M = 58\\ \\text{g/mol} = 0.058\\ \\text{kg/mol}\\), \\(R = 8.31\\ \\text{J.' },
            { text: 'Write formula: \\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\). Check units: \\(R\\) in J/mol·K = kg·m²/s²·mol·K, \\(T\\) in K,.' },
            { text: 'Substitute values: \\(v_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.31 \\times 300}{0.058}}\\).' },
            { text: 'Compute numerator: \\(3 \\times 8.31 = 24.93\\); \\(24.93 \\times 300 = 7479\\ \\text{J/mol}\\).' },
            { text: 'Divide by \\(M\\): \\(7479 / 0.058 = 128,948\\ \\text{m}^2/\\text{s}^2\\).' },
            { text: 'Square root: \\(\\sqrt{128948} \\approx 359\\ \\text{m/s}\\).', faded: true, blankAnswer: '359 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_008', title: 'Avogadro\'s number (N_A) is the number.',
          scaffold: { problem: 'A weather balloon contains 2.50 moles of helium gas at a pressure of 0.800 atm and a temperature of 15.0°C.',
            steps: [
            { text: 'Identify given quantities: μ = 2.50 mol, P = 0.800 atm, T = 15.0°C = 15.0 + 273 = 288 K.' },
            { text: 'Write the ideal gas law: PV = μRT. Solve for V: V = μRT / P.' },
            { text: 'Substitute values with units: V = (2.50 mol) × (0.0821 L atm mol⁻¹ K⁻¹) × (288 K) / (0.800 atm).' },
            { text: 'Compute stepwise: numerator = 2.50 × 0.0821 × 288 = 59.112 L atm. Divide by 0.800 atm → V = 73.89 L.' },
            { text: 'Check reasonableness: At STP (1 atm, 273 K), 1 mole = 22.4 L. Here 2.5 moles at lower pressure (0.8 atm) and similar.', faded: true, blankAnswer: '73.9 L' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_002', title: 'Pressure of an ideal gas, derived from.',
          scaffold: { problem: 'A cylindrical vessel of volume 0.5 m³ contains 2.0 × 10²⁴ molecules of oxygen gas (O₂, molar mass 32.0 g/mol).',
            steps: [
            { text: 'Identify given quantities with units: V = 0.5 m³, N = 2.0 × 10²⁴ molecules, M = 32.0 g/mol = 32.0 × 10⁻³ kg/mol, v_rms.' },
            { text: 'Compute number density n = N/V = (2.0 × 10²⁴) / 0.5 = 4.0 × 10²⁴ m⁻³.' },
            { text: 'Write the kinetic theory pressure formula: P = (1/3) n m v_rms².' },
            { text: 'Substitute values: P = (1/3) × (4.0 × 10²⁴) × (5.32 × 10⁻²⁶) × (480)² = (1/3) × 4.0 × 5.32 × 10⁻² × 2.304 × 10⁵ = (1/3).' },
            { text: 'Convert to atm: P = (1.632 × 10⁴) / (1.013 × 10⁵) = 0.161 atm.', faded: true, blankAnswer: 'P = 1.63 × 10⁴ Pa = 0.161 atm' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_12_003', title: 'The kinetic interpretation of.',
          scaffold: { problem: 'A 2.0 litre vessel contains 0.5 moles of argon gas at 400 K. Calculate (a) the total translational kinetic energy of the gas, (b) the.',
            steps: [
            { text: 'Identify given quantities: V = 2.0 L = 2.0 × 10⁻³ m³ (not needed for energy), μ = 0.5 mol, T = 400 K, M = 39.9 × 10⁻³.' },
            { text: 'Select formulas: (a) E_total = (3/2)μRT for monatomic ideal gas; (b) KE_per_atom = (3/2)k_BT where k_B = R/N_A; (c).' },
            { text: 'Compute (a): E_total = 1.5 × 0.5 × 8.31 × 400 = 1.5 × 0.5 × 3324 = 2493 J ≈ 2.49 × 10³ J.' },
            { text: 'Compute (b): k_B = 8.31 / 6.02×10²³ = 1.38×10⁻²³ J/K; KE_per_atom = 1.5 × 1.38×10⁻²³ × 400 = 8.28×10⁻²¹ J.' },
            { text: 'Compute (c): v_rms = √(3 × 8.31 × 400 / 0.0399) = √(9972 / 0.0399) = √250000 = 500 m/s.', faded: true, blankAnswer: '(a) 2.49 × 10³ J, (b) 8.28 × 10⁻²¹ J, (c) 500 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_09_012', title: 'Surface tension is the property of a.',
          scaffold: { problem: 'A U-shaped wire frame holds a soap film. A light slider of length 8 cm rests on the film.',
            steps: [
            { text: 'Identify given: slider length l = 8 cm = 0.08 m, mass m = 0.5 g = 0.0005 kg, g = 9.8 m/s². The film has two surfaces.' },
            { text: 'Force due to hanging mass: F = mg = 0.0005 × 9.8 = 0.0049 N. This balances the surface tension force from both.' },
            { text: 'Rearrange for S: S = F / (2l) = 0.0049 / (2 × 0.08) = 0.0049 / 0.16.' },
            { text: 'Compute: S = 0.030625 N/m ≈ 3.06 × 10⁻² N/m. Unit check: N / m = N/m ✓.' },
            { text: 'Reasonableness: Soap solution S ~ 0.02–0.03 N/m (water is 0.072 N/m). Answer is physically plausible.', faded: true, blankAnswer: '3.06 × 10⁻² N/m' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_12_004', title: 'Identify each idea',
          dissect: { specimen: 'Kinetic Theory Gases CBSE', spots: [
            { id: 's1', label: 'The kinetic theory of gases', prompt: 'Which idea is this? — The kinetic theory of gases is a theoretical model based on seven fundamental postulates.', answer: 'The kinetic theory of gases', options: ['The kinetic theory of gases', 'Root mean square rms speed', 'Avogadros number N_A is the', 'Pressure of an ideal gas'] },
            { id: 's2', label: 'Root mean square rms speed', prompt: 'Which idea is this? — Root mean square (rms) speed is the square root of the mean of the squares of the speeds.', answer: 'Root mean square rms speed', options: ['Root mean square rms speed', 'The kinetic theory of gases', 'Avogadros number N_A is the', 'Pressure of an ideal gas'] },
            { id: 's3', label: 'Avogadros number N_A is the', prompt: 'Which idea is this? — Avogadro\'s number (N_A) is the number of constituent particles (atoms or molecules) in.', answer: 'Avogadros number N_A is the', options: ['Avogadros number N_A is the', 'The kinetic theory of gases', 'Root mean square rms speed', 'Pressure of an ideal gas'] },
            { id: 's4', label: 'Pressure of an ideal gas', prompt: 'Which idea is this? — Pressure of an ideal gas, derived from kinetic theory, is the macroscopic force per unit.', answer: 'Pressure of an ideal gas', options: ['Pressure of an ideal gas', 'The kinetic theory of gases', 'Root mean square rms speed', 'Avogadros number N_A is the'] },
            { id: 's5', label: 'The kinetic interpretation of temperature', prompt: 'Which idea is this? — The kinetic interpretation of temperature states that the absolute temperature (T) of an.', answer: 'The kinetic interpretation of temperature', options: ['The kinetic interpretation of temperature', 'The kinetic theory of gases', 'Root mean square rms speed', 'Avogadros number N_A is the'] },
            { id: 's6', label: 'Surface tension is the property', prompt: 'Which idea is this? — Surface tension is the property of a liquid surface to behave like a stretched elastic.', answer: 'Surface tension is the property', options: ['Surface tension is the property', 'The kinetic theory of gases', 'Root mean square rms speed', 'Avogadros number N_A is the'] }
          ] } }
    ],
    explore: { component: C11_PhysicsKineticTheoryGasesCBSESim, prompt: 'Explore the interactive — Kinetic Theory Gases CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_001', difficulty: 'standard',
          question: 'The kinetic theory of gases is a theoretical model based on seven fundamental.',
          hint: 'If stuck, revisit Class 9 Newton\'s laws (c9_physics_ch3_3, c9_physics_ch3_4,.',
          misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a.',
          parts: [
                { id: 'a', prompt: 'A gas is confined in a cylinder at 300 K and 1 atm. The gas is compressed isothermally to 100 atm.', answer: 'The assumption of "negligible molecular volume" (point masses) breaks down first',
                  options: ['The assumption of "negligible molecular volume" (point masses) breaks down first', 'elastic collisions', 'Newton\'s laws'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with no.' }
          ],
            remediations: { 'random-motion-means-molecules-move': { steps: ['If the student holds the "chaotic path" misconception: (1) Show a single-molecule simulation in a box with no other.', '(2) Add one other molecule — paths remain straight between binary collisions.', '(3) Emphasise: randomness is in the *ensemble*, not the *trajectory*.', 'If the student conflates "elastic" with "billiard ball": (1) Contrast with inelastic collision where kinetic energy.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The assumption of perfectly elastic collisions means gas molecules never lose kinetic energy, so a gas in an insulated container will never.', answer: 'The statement is partially correct but misleading',
                  options: ['The statement is partially correct but misleading', 'fully correct', 'random motion', 'elastic collision'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with no.' },
                { id: 'b', prompt: 'Design a thought experiment or simulation setup to test whether the assumption "collision duration is negligible compared to time between collisions" holds for.', answer: 'A good answer: Use molecular dynamics simulation with realistic N₂ potential',
                  options: ['A good answer: Use molecular dynamics simulation with realistic N₂ potential', 'random motion', 'elastic collision'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "random motion" means molecules move in completely chaotic, unpredictable paths like a random walk with no.' }
          ],
            remediations: { 'random-motion-means-molecules-move': { steps: ['If the student holds the "chaotic path" misconception: (1) Show a single-molecule simulation in a box with no other.', '(2) Add one other molecule — paths remain straight between binary collisions.', '(3) Emphasise: randomness is in the *ensemble*, not the *trajectory*.', 'If the student conflates "elastic" with "billiard ball": (1) Contrast with inelastic collision where kinetic energy.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_004', difficulty: 'standard',
          question: 'Root mean square (rms) speed is the square root of the mean of the squares of.',
          hint: 'If stuck on unit conversion, revisit the definition of molar mass: \\(M = m N_A\\).',
          misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).',
          parts: [
                { id: 'a', prompt: 'Write the formula for root mean square speed of gas molecules in terms of universal gas constant \\(R\\), absolute temperature \\(T\\), and molar mass \\(M\\).', answer: '\\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\)',
                  options: ['\\(v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}\\)', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'b', prompt: 'Two gases, hydrogen (molar mass 2 g/mol) and oxygen (32 g/mol), are at the same temperature. Which has a higher rms speed?', answer: 'Hydrogen has higher \\(v_{\\text{rms}}\\)',
                  options: ['Hydrogen has higher \\(v_{\\text{rms}}\\)', 'higher pressure means higher speed', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'c', prompt: 'Calculate the rms speed of nitrogen gas (\\(M = 28\\ \\text{g/mol}\\)) at \\(27^\\circ\\text{C}\\). Use \\(R = 8.31\\ \\text{J mol}^{-1}\\text{K}^{-1}\\).', answer: 'Step 1: Convert \\(T = 27 + 273 = 300\\ \\text{K}\\)',
                  options: ['Step 1: Convert \\(T = 27 + 273 = 300\\ \\text{K}\\)', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' }
          ],
            remediations: { 'v-text-rms-is-the': { steps: ['If a student confuses \\(v_{\\text{rms}}\\) with average speed, have them compute both for a simple 3-molecule system:.', '\\(\\bar{v} = 2\\), \\(\\overline{v^2} = (1+4+9)/3 = 14/3\\), \\(v_{\\text{rms}} = \\sqrt{14/3} \\approx 2.16\\).', 'For Celsius error, ask: "If T = 0°C, does kinetic energy become zero?" No, it\'s 273 K.', 'Emphasize that \\(v_{\\text{rms}} \\propto \\sqrt{T}\\) requires absolute zero as origin.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).',
          parts: [
                { id: 'a', prompt: 'A student calculates \\(v_{\\text{rms}}\\) for oxygen at 300 K using \\(M = 32\\ \\text{g/mol}\\) directly in the formula \\(v_{\\text{rms}} = \\sqrt{3RT/M}\\) with \\(R =.', answer: 'Error: Molar mass used in g/mol instead of kg/mol',
                  options: ['Error: Molar mass used in g/mol instead of kg/mol', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' },
                { id: 'b', prompt: 'Design a simple thought experiment using a balloon filled with helium and another with argon, both at room temperature, to demonstrate the difference in rms.', answer: 'Good answer: Use rate of diffusion/effusion',
                  options: ['Good answer: Use rate of diffusion/effusion', '\\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \\(v_{\\text{rms}}\\) is the same as average speed \\(\\bar{v}\\) (mean of speeds).' }
          ],
            remediations: { 'v-text-rms-is-the': { steps: ['If a student confuses \\(v_{\\text{rms}}\\) with average speed, have them compute both for a simple 3-molecule system:.', '\\(\\bar{v} = 2\\), \\(\\overline{v^2} = (1+4+9)/3 = 14/3\\), \\(v_{\\text{rms}} = \\sqrt{14/3} \\approx 2.16\\).', 'For Celsius error, ask: "If T = 0°C, does kinetic energy become zero?" No, it\'s 273 K.', 'Emphasize that \\(v_{\\text{rms}} \\propto \\sqrt{T}\\) requires absolute zero as origin.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_008', difficulty: 'standard',
          question: 'Avogadro\'s number (N_A) is the number of constituent particles (atoms or.',
          hint: 'If stuck on unit conversions or algebraic manipulation, review Class 8 math: powers of 10.',
          misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature.',
          parts: [
                { id: 'a', prompt: 'Two vessels A and B of equal volume V contain gases at the same temperature T.', answer: '(i) Pressure: P = μRT/V',
                  options: ['(i) Pressure: P = μRT/V', 'Avogadro\'s number (6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' }
          ],
            remediations: { 'avogadro-s-number-6': { steps: ['If a student uses 22.4 L at non-STP conditions: 1.', 'Ask them to write the ideal gas law for 1 mole at STP: P₁V₁ = RT₁ → 1 atm × 22.4 L = R × 273 K.', 'Then write it for the given conditions: P₂V₂ = RT₂.', 'Divide the two equations: (P₂V₂)/(P₁V₁) = T₂/T₁.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since PV = μRT, if I double the temperature of a gas in a rigid container, the pressure doubles.', answer: 'The statement is correct for a fixed amount of gas (constant μ)',
                  options: ['The statement is correct for a fixed amount of gas (constant μ)', 'Avogadro\'s number (6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' },
                { id: 'b', prompt: 'Design a simple experiment using a syringe, a pressure sensor, and a water bath to verify Charles\'s law (V ∝ T at constant P) for air.', answer: 'Seal a syringe with a known volume of air (e.g., 20 mL) at room temperature',
                  options: ['Seal a syringe with a known volume of air (e.g., 20 mL) at room temperature', 'Avogadro\'s number (6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' },
                { id: 'c', prompt: 'Two vessels A and B of equal volume V contain gases at the same temperature T.', answer: '(i) Pressure: P = μRT/V',
                  options: ['(i) Pressure: P = μRT/V', 'Avogadro\'s number (6'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Avogadro\'s number (6.02 × 10²³) is the number of molecules in 22.4 L of gas at *any* temperature and pressure.' }
          ],
            remediations: { 'avogadro-s-number-6': { steps: ['If a student uses 22.4 L at non-STP conditions: 1.', 'Ask them to write the ideal gas law for 1 mole at STP: P₁V₁ = RT₁ → 1 atm × 22.4 L = R × 273 K.', 'Then write it for the given conditions: P₂V₂ = RT₂.', 'Divide the two equations: (P₂V₂)/(P₁V₁) = T₂/T₁.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_002', difficulty: 'standard',
          question: 'Pressure of an ideal gas, derived from kinetic theory, is the macroscopic force.',
          hint: 'If stuck on momentum change: revisit c9_physics_ch3_6 (Momentum Conservation).',
          misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since pressure is force per area, and force is rate of change of momentum, we should just multiply the momentum change 2mvₓ by the number of.', answer: 'The 1/2 factor arises',
                  options: ['The 1/2 factor arises', 'molecules in a region', 'molecules with velocity toward the boundary'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact wrong reasoning:**.' },
                { id: 'b', prompt: 'Two ideal gases A and B are at the same temperature and have the same number density n.', answer: '(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩',
                  options: ['(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩', 'heavier gas exerts more pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact wrong reasoning:**.' }
          ],
            remediations: { 'misconception-pressure-is-caused-by': { steps: ['** Simulate a 1D "gas" — one molecule bouncing between two walls. Derive P = m v²/L (no 1/3, no 1/2). **', '** Add a second dimension — molecule moves in a square box. Show that pressure on x-walls uses only vₓ, and ⟨vₓ²⟩ =.', '** Go to 3D cube. Demonstrate ⟨vₓ²⟩ = ⅓⟨v²⟩ by symmetry. **', '** Introduce many molecules with random velocities. Show that the 1/2 flux factor emerges from counting only vₓ > 0.', '** Use a PhET "Gas Properties" simulation — toggle "show velocities" and watch the velocity distribution; measure.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact.',
          parts: [
                { id: 'a', prompt: 'Two ideal gases A and B are at the same temperature and have the same number density n.', answer: '(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩',
                  options: ['(i) **Pressures are equal.** P = ⅓ n m ⟨v²⟩', 'heavier gas exerts more pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Pressure is caused by molecules pushing continuously against the wall like a steady wind." **Exact wrong reasoning:**.' }
          ],
            remediations: { 'misconception-pressure-is-caused-by': { steps: ['** Simulate a 1D "gas" — one molecule bouncing between two walls. Derive P = m v²/L (no 1/3, no 1/2). **', '** Add a second dimension — molecule moves in a square box. Show that pressure on x-walls uses only vₓ, and ⟨vₓ²⟩ =.', '** Go to 3D cube. Demonstrate ⟨vₓ²⟩ = ⅓⟨v²⟩ by symmetry. **', '** Introduce many molecules with random velocities. Show that the 1/2 flux factor emerges from counting only vₓ > 0.', '** Use a PhET "Gas Properties" simulation — toggle "show velocities" and watch the velocity distribution; measure.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_003', difficulty: 'standard',
          question: 'The kinetic interpretation of temperature states that the absolute temperature.',
          hint: 'If stuck, revisit c11_phy_cbse_12_002 for pressure derivation steps (cube container,.',
          misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.',
          parts: [
                { id: 'a', prompt: 'State the kinetic interpretation of temperature equation and identify the physical meaning of each symbol with its SI unit.', answer: 'The equation is (1/2)m⟨v²⟩ = (3/2)k_BT',
                  options: ['The equation is (1/2)m⟨v²⟩ = (3/2)k_BT', 'average kinetic energy per molecule is equal', 'average speed is equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' },
                { id: 'b', prompt: 'A graph of PV/T versus P for a fixed mass of oxygen gas at two temperatures T₁ and T₂ shows two curves approaching the same y-intercept at P→0.', answer: 'At low pressures (P→0), all gases behave ideally',
                  options: ['At low pressures (P→0), all gases behave ideally', 'average kinetic energy per molecule is equal', 'average speed is equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' }
          ],
            remediations: { 'at-the-same-temperature': { steps: ['Remediation: Take two balloons — one filled with helium, one with carbon dioxide.', 'Cool both in a freezer to same temperature.', 'Release gas near a candle flame: helium extinguishes flame faster due to higher molecular speed (lighter molecules.', 'Then guide student through calculation: v_rms,He/v_rms,CO₂ = √(44/4) = √11 ≈ 3.3.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we double the temperature of an ideal gas from 300 K to 600 K, the rms speed of its molecules also doubles." Evaluate this claim and.', answer: 'The claim is false',
                  options: ['The claim is false', 'average kinetic energy per molecule is equal', 'average speed is equal', 'at the same temperature, all gas molecules have the same speed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' },
                { id: 'b', prompt: 'A graph of PV/T versus P for a fixed mass of oxygen gas at two temperatures T₁ and T₂ shows two curves approaching the same y-intercept at P→0.', answer: 'At low pressures (P→0), all gases behave ideally',
                  options: ['At low pressures (P→0), all gases behave ideally', 'average kinetic energy per molecule is equal', 'average speed is equal', 'at the same temperature, all gas molecules have the same speed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that at the same temperature, all gas molecules have the same speed.' }
          ],
            remediations: { 'at-the-same-temperature': { steps: ['Remediation: Take two balloons — one filled with helium, one with carbon dioxide.', 'Cool both in a freezer to same temperature.', 'Release gas near a candle flame: helium extinguishes flame faster due to higher molecular speed (lighter molecules.', 'Then guide student through calculation: v_rms,He/v_rms,CO₂ = √(44/4) = √11 ≈ 3.3.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_09_012', difficulty: 'standard',
          question: 'Surface tension is the property of a liquid surface to behave like a stretched.',
          hint: 'Revisit Class 9 Work-Energy Theorem (c9_physics_ch4_3) and practice W = PΔV for a.',
          misconception: 'Students believe surface tension acts only at the very edge of a liquid surface (like a skin) and not throughout the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Surface tension is the property of a liquid surface to behave like a stretched elastic',
                  options: ['Surface tension is the property of a liquid surface to behave like a stretched elastic', 'The kinetic theory of gases is a theoretical model based on seven fundamental postulates', 'Root mean square (rms) speed is the square root of the mean of the squares of the speeds', 'Avogadro\'s number (N_A) is the number of constituent particles (atoms or molecules) in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe surface tension acts only at the very edge of a liquid surface (like a skin) and not throughout the surface.' }
          ],
            remediations: { 'surface-tension-acts-only-at': { steps: ['If the student holds the "skin-only" misconception: (1) Show a simulation or diagram of molecular forces at the.', '(2) Perform the wire frame experiment: pull a slider from the middle of a film, not just the edge — the force is the.', '(3) Ask: "If surface tension were only at the edge, why does a soap film have uniform thickness and why does a bubble.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
