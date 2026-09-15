import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch05_p2: SimDef = {
    id: 'v3_c11_chem_ch05_p2',
    title: 'States of Matter · Part 2/3',
    subtitle: 'Separate London, dipole-dipole and hydrogen-bond contributions and predict who boils first.',
    classLevel: 11, subject: 'chemistry', topic: 'States of Matter · Part 2/3',
    chapters: ['c11_chem_ch05'],
    nodeIds: ['c11_chem_cbse_05_007', 'c11_chem_cbse_05_008', 'c11_chem_cbse_05_009', 'c11_chem_cbse_05_010', 'c11_chem_cbse_05_011', 'c11_chem_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physical chemist explaining anomalous boiling points', intro: 'A gecko walks up glass and iodine leaps straight to vapour — name the invisible grip behind both.', goal: 'Distinguish London dispersion from dipole-dipole forces and use polarizability to predict boiling trends.' },
    discovery: {
        question: 'Nonpolar iodine (I2) boils at 184°C while polar HCl boils at -85°C. If dipole-dipole forces always beat London forces, this is backwards. What actually decides it?',
        options: ['I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces', 'HCl\'s dipole is too weak to matter at any temperature', 'Iodine secretly hydrogen-bonds like water does', 'Molar mass directly sets boiling point regardless of forces'],
        answer: 'I2\'s large polarizable electron cloud gives London forces that outweigh HCl\'s dipole forces',
        hook: 'Every molecule has London forces — a permanent dipole is a bonus on top, and a big electron cloud can outmuscle polarity.',
    },
    teaching: [
        { title: 'Dalton\'s Law of Partial Pressures', text: 'Dalton\'s Law of Partial Pressures states that in a mixture of non-reacting gases, the total pressure exerted is equal to the sum of the partial pressures of individual gases, where the partial.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_05_007', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Rank the Group 14 hydrides by boiling point using polarizability, then explain why nonpolar I2 outboils polar HCl.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_007', title: 'Dalton\'s Law of Partial Pressures',
          scaffold: { problem: 'A 2.0 L flask contains 0.50 mol of N₂ and 0.30 mol of O₂ at 300 K.',
            steps: [
            { text: 'Identify knowns: V = 2.0 L, T = 300 K, n_N₂ = 0.50 mol, n_O₂ = 0.30 mol, R = 0.0821 L·atm·mol⁻¹·K⁻¹.' },
            { text: 'Calculate total moles: n_total = n_N₂ + n_O₂ = 0.50 + 0.30 = 0.80 mol.' },
            { text: 'Use ideal gas equation to find total pressure: P_total = n_total RT / V = (0.80 × 0.0821 × 300) / 2.0 = 9.852 atm.' },
            { text: 'Calculate mole fractions: x_N₂ = n_N₂ / n_total = 0.50/0.80 = 0.625; x_O₂ = 0.30/0.80 = 0.375.' },
            { text: 'Calculate partial pressures: P_N₂ = x_N₂ × P_total = 0.625 × 9.852 = 6.1575 atm; P_O₂ = 0.375 × 9.852 = 3.6945 atm.' },
            { text: 'Verify: P_N₂ + P_O₂ = 6.1575 + 3.6945 = 9.852 atm = P_total. Report with proper significant figures.', faded: true, blankAnswer: 'P_N₂ = 6.16 atm, P_O₂ = 3.69 atm, P_total = 9.85 atm (all.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_008', title: 'Graham\'s Law of Diffusion',
          scaffold: { problem: 'In a laboratory experiment, 50 mL of an unknown gas takes 120 seconds to effuse through a pinhole.',
            steps: [
            { text: 'Calculate rates of effusion: r_unknown = 50 mL / 120 s = 0.4167 mL s⁻¹; r_N₂ = 50 mL / 80 s = 0.625 mL s⁻¹.' },
            { text: 'Write Graham\'s Law for effusion: r_unknown / r_N₂ = √(M_N₂ / M_unknown).' },
            { text: 'Substitute known values: 0.4167 / 0.625 = √(28 / M_unknown) → 0.6667 = √(28 / M_unknown).' },
            { text: 'Square both sides: (0.6667)² = 28 / M_unknown → 0.4444 = 28 / M_unknown.' },
            { text: 'Solve for M_unknown: M_unknown = 28 / 0.4444 = 63.0 g mol⁻¹.' },
            { text: 'Compare with options: closest to Cl₂ (71 g mol⁻¹) but not exact; check calculation: 0.6667² = 4/9 = 0.4444, 28/(4/9).', faded: true, blankAnswer: 'M_unknown = 63 g mol⁻¹ (closest to Cl₂ at 71 g mol⁻¹ but.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_009', title: 'Kinetic Molecular Theory of Gases',
          scaffold: { problem: 'A 2.0 L vessel contains 0.5 mol of oxygen gas at 300 K. Calculate (a) the root mean square speed of O₂ molecules, (b) the pressure exerted.',
            steps: [
            { text: 'Identify given: n = 0.5 mol, V = 2.0 L = 2.0×10⁻³ m³, T = 300 K, M(O₂) = 0.032 kg/mol, R = 8.314 J/(mol·K)' },
            { text: 'Calculate u_rms using u_rms = √(3RT/M) = √(3 × 8.314 × 300 / 0.032) = √(233812.5) = 483.5 m/s' },
            { text: 'Calculate density ρ = total mass / volume = (n × M) / V = (0.5 × 0.032) / (2.0×10⁻³) = 8.0 kg/m³' },
            { text: 'Use kinetic gas equation P = ⅓ ρ u²_rms = ⅓ × 8.0 × (483.5)² = ⅓ × 8.0 × 233,772 = 623,392 Pa = 6.15×10⁵ Pa' },
            { text: 'Verify with ideal gas equation: P = nRT/V = (0.5 × 8.314 × 300) / (2.0×10⁻³) = 1247.1 / 0.002 = 623,550 Pa (matches.' },
            { text: 'Total KE = n × (3/2)RT = 0.5 × 1.5 × 8.314 × 300 = 1870.65 J', faded: true, blankAnswer: '(a) u_rms = 484 m/s; (b) P = 6.23×10⁵ Pa (6.15 atm); (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_010', title: 'Deviation from Ideal Behaviour: Real Gases',
          scaffold: { problem: 'A 1.00 mol sample of nitrogen gas is confined in a 22.4 L vessel at 273 K. The measured pressure is 0.98 atm.',
            steps: [
            { text: 'Identify given values: n = 1.00 mol, V = 22.4 L, T = 273 K, P = 0.98 atm, R = 0.0821 L·atm·mol⁻¹·K⁻¹' },
            { text: 'Write the compressibility factor formula: Z = PV / nRT' },
            { text: 'Substitute values: Z = (0.98 × 22.4) / (1.00 × 0.0821 × 273)' },
            { text: 'Calculate numerator: 0.98 × 22.4 = 21.952; denominator: 1.00 × 0.0821 × 273 = 22.4133' },
            { text: 'Z = 21.952 / 22.4133 = 0.979 ≈ 0.98' },
            { text: 'Interpret: Z < 1 indicates negative deviation - attractive forces dominate, pulling molecules closer and reducing.', faded: true, blankAnswer: 'Z = 0.98; attractive forces dominate (negative deviation)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_05_011', title: 'van der Waals Equation for Real Gases',
          scaffold: { problem: 'A 5.00 L cylinder contains 10.0 moles of ammonia gas (NH₃) at 300 K.',
            steps: [
            { text: 'List knowns: \\(n = 10.0\\ \\text{mol}\\), \\(V = 5.00\\ \\text{L}\\), \\(T = 300\\ \\text{K}\\), \\(R = 0.0821\\.' },
            { text: '(a) Ideal gas law: \\(P_{\\text{ideal}} = \\frac{nRT}{V} = \\frac{10.0 \\times 0.0821 \\times 300}{5.00} = \\frac{246.3}{5.00}.' },
            { text: '(b) Van der Waals equation: \\(\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT\\).' },
            { text: 'Solve for P: \\(P = \\frac{nRT}{V - nb} - \\frac{an^2}{V^2} = \\frac{246.3}{4.629} - 16.68 = 53.21 - 16.68 = 36.53\\.' },
            { text: 'Compare: \\(P_{\\text{vdW}} = 36.5\\ \\text{atm}\\) vs \\(P_{\\text{ideal}} = 49.3\\ \\text{atm}\\).' },
            { text: 'Physical interpretation: At this high density (\\(n/V = 2.0\\ \\text{mol/L}\\)), intermolecular attractions in polar NH₃.', faded: true, blankAnswer: '(a) \\(P_{\\text{ideal}} = 49.3\\ \\text{atm}\\); (b).' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_012', title: 'Liquid State: Vapour Pressure',
          caseStudy: { intro: 'Imagine leaving a glass of water on your kitchen counter overnight. By morning, some water has disappeared even though it never reached 100°C. Where did it go?',
            decisions: [{ prompt: 'Define vapour pressure and state the two factors on which it depends at a given temperature.', options: [
                { text: 'Vapour pressure is the pressure exerted by a vapour in thermodynamic equilibrium with its', outcome: 'Vapour pressure is the pressure exerted by a vapour in thermodynamic equilibrium with its condensed.' },
                { text: 'depends on volume of container', outcome: 'Not quite — Students believe vapour pressure depends on the amount of liquid or the volume of the container.', reveals: 'vapour-pressure-depends-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science-fair demo on \'why some liquids evaporate faster\', you place equal drops of water, acetone and hexane on a glass plate and time them. Your partner predicts the order purely by molecular weight: \'Water is lightest, so it vanishes first; and all intermolecular attraction is just London dispersion anyway.\'',
            decisions: [{ prompt: 'What order will you actually observe, and which forces explain it?', options: [
                { text: 'Hexane evaporates first, then acetone, then water: hexane (nonpolar) has only London dispersion; acetone adds dipole-dipole attraction; water\'s hydrogen bonding is strongest. Van der Waals forces are a family — London, dipole-dipole, dipole-induced — and hydrogen bonding is a stronger, separate category requiring H bonded to N/O/F.', outcome: 'Evaporation rate reads intermolecular-force strength, not molar mass — water is light but H-bonded hard.' },
                { text: 'Water first — lowest molar mass means molecules escape easiest; all three liquids share the same London forces.', outcome: 'That ignores the force ladder: water\'s hydrogen bonds hold it back while nonpolar hexane escapes first despite being the heaviest molecule.', reveals: 'lighter-evaporates-first' },
                { text: 'The order is random — intermolecular forces are all \'van der Waals\' and too weak to matter.', outcome: 'Weak is relative: dispersion, dipole and hydrogen-bonding differences are exactly what boiling points and evaporation rates measure.', reveals: 'intermolecular-forces-negligible' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'Intermolecular attraction isn\'t a loyalty test — the biggest, most distortable electron cloud usually wins.',
            decisions: [{ prompt: 'What comes next? States of Matter · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — States of Matter · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_007', difficulty: 'standard',
          question: 'Dalton\'s Law of Partial Pressures states that in a mixture of non-reacting.',
          hint: 'If stuck, revisit c11_chem_cbse_05_006 (Ideal Gas Equation) for PV=nRT applications and.',
          misconception: 'Students often think partial pressure of a gas in a mixture is the same as its pressure in the original separate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dalton\'s Law of Partial Pressures states that in a mixture of non-reacting gases, the',
                  options: ['Dalton\'s Law of Partial Pressures states that in a mixture of non-reacting gases, the', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a'],
                  hint: 'If stuck, revisit c11_chem_cbse_05_006 (Ideal Gas Equation) for PV=nRT applications and.',
                  misconception: 'Students often think partial pressure of a gas in a mixture is the same as its pressure in the original separate container before mixing.' }
          ],
            remediations: { 'partial-pressure-of-a-gas': { steps: ['If a student makes this error, guide them through a step-by-step visualization: (1) Draw initial state: two 1.', '(2) Draw final state: one 2 L container.', '(3) Apply Boyle\'s law (P₁V₁ = P₂V₂) to each gas separately: for gas A, 2×1 = P_A×2 → P_A=1 atm; for gas B, 3×1 = P_B×2.', '(4) Sum partial pressures: 2.5 atm.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_008', difficulty: 'standard',
          question: 'Graham\'s Law of Diffusion states that at constant temperature and pressure, the.',
          hint: 'Review c11_chem_cbse_05_006 (Ideal Gas Equation) for M = dRT/P conversion and.',
          misconception: 'Students confuse diffusion (mixing of gases due to random motion) with effusion (escape through a pinhole) and apply.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Graham\'s Law of Diffusion states that at constant temperature and pressure, the rate of',
                  options: ['Graham\'s Law of Diffusion states that at constant temperature and pressure, the rate of', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a'],
                  hint: 'Review c11_chem_cbse_05_006 (Ideal Gas Equation) for M = dRT/P conversion and c11_chem_cbse_05_009.',
                  misconception: 'Students confuse diffusion (mixing of gases due to random motion) with effusion (escape through a pinhole) and apply Graham\'s Law.' }
          ],
            remediations: { 'students-confuse-diffusion-mixing-of': { steps: ['If student uses linear inverse: Have them derive from kinetic energy: At same T, KE_avg same → ½m₁v₁² = ½m₂v₂² → v₁/v₂.', 'Since rate ∝ v, r₁/r₂ = √(M₂/M₁).', 'If confusing diffusion/effusion: Demonstrate with perfume spray (diffusion) vs balloon pinhole (effusion) - both follow.', 'If unit errors: Practice M = dRT/P conversion using ideal gas equation (c11_chem_cbse_05_006) with R = 0.0821 L atm.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_009', difficulty: 'standard',
          question: 'The Kinetic Molecular Theory (KMT) of gases is a microscopic model that.',
          hint: 'If stuck, revisit c11_chem_cbse_05_006 (Ideal Gas Equation) for PV=nRT manipulations and.',
          misconception: 'Students confuse the three molecular speeds: u_rms = √(3RT/M), u_avg = √(8RT/πM), u_mp = √(2RT/M).',
          parts: [
                { id: 'a', prompt: 'Compare the Maxwell-Boltzmann speed distribution curves for (a) O₂ at 300 K and 600 K, (b) H₂ and O₂ at 300 K.', answer: 'O₂ at 300 K and 600 K, (',
                  options: ['O₂ at 300 K and 600 K, (', 'area increases with temperature'],
                  hint: 'If stuck, revisit c11_chem_cbse_05_006 (Ideal Gas Equation) for PV=nRT manipulations and.',
                  misconception: 'Students confuse the three molecular speeds: u_rms = √(3RT/M), u_avg = √(8RT/πM), u_mp = √(2RT/M).' }
          ],
            remediations: { 'students-confuse-the-three-molecular': { steps: ['Draw the Maxwell-Boltzmann curve and label the three speeds on the x-axis.', 'Derive u_mp by setting df/du = 0 for f(u) = 4π (M/2πRT)^(3/2) u² e^(-Mu²/2RT).', 'Compute u_avg = ∫₀^∞ u f(u) du and u_rms = √(∫₀^∞ u² f(u) du).', 'Make a ratio table: u_mp = √(2RT/M), u_avg = √(8RT/πM) ≈ 1.128 u_mp, u_rms = √(3RT/M) ≈ 1.225 u_mp.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse the three molecular speeds: u_rms = √(3RT/M), u_avg = √(8RT/πM), u_mp = √(2RT/M).',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "At the same temperature, all gas molecules have the same kinetic energy, so they must have the same speed." Provide a counterexample.', answer: 'The statement is false',
                  options: ['The statement is false', 'same KE means same speed'],
                  hint: 'If stuck, revisit c11_chem_cbse_05_006 (Ideal Gas Equation) for PV=nRT manipulations and.',
                  misconception: 'Students confuse the three molecular speeds: u_rms = √(3RT/M), u_avg = √(8RT/πM), u_mp = √(2RT/M).' }
          ],
            remediations: { 'students-confuse-the-three-molecular': { steps: ['Draw the Maxwell-Boltzmann curve and label the three speeds on the x-axis.', 'Derive u_mp by setting df/du = 0 for f(u) = 4π (M/2πRT)^(3/2) u² e^(-Mu²/2RT).', 'Compute u_avg = ∫₀^∞ u f(u) du and u_rms = √(∫₀^∞ u² f(u) du).', 'Make a ratio table: u_mp = √(2RT/M), u_avg = √(8RT/πM) ≈ 1.128 u_mp, u_rms = √(3RT/M) ≈ 1.225 u_mp.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_010', difficulty: 'standard',
          question: 'Real gases deviate from ideal gas behaviour (PV = nRT) because gas molecules.',
          hint: 'If stuck, review c11_chem_cbse_05_006 (Ideal Gas Equation) for PV = nRT usage, and.',
          misconception: 'Students often think "real gases deviate from ideal behaviour only at high pressure" and forget that low temperature.',
          parts: [
                { id: 'a', prompt: 'What is the value of compressibility factor Z for an ideal gas, and what does Z = PV/nRT represent physically?', answer: 'For an ideal gas, Z = 1 at all temperatures and pressures',
                  options: ['For an ideal gas, Z = 1 at all temperatures and pressures', 'real gases deviate from ideal behaviour only at high pressure'],
                  hint: 'If stuck, review c11_chem_cbse_05_006 (Ideal Gas Equation) for PV = nRT usage, and.',
                  misconception: 'Students often think "real gases deviate from ideal behaviour only at high pressure" and forget that low temperature also causes deviation.' },
                { id: 'b', prompt: 'Explain why the compressibility factor Z for nitrogen gas at 273 K first decreases below 1 and then increases above 1 as pressure increases from 1 atm to 1000.', answer: 'At low to moderate pressures, intermolecular attractive forces dominate, pulling',
                  options: ['At low to moderate pressures, intermolecular attractive forces dominate, pulling', 'real gases deviate from ideal behaviour only at high pressure'],
                  hint: 'If stuck, review c11_chem_cbse_05_006 (Ideal Gas Equation) for PV = nRT usage, and.',
                  misconception: 'Students often think "real gases deviate from ideal behaviour only at high pressure" and forget that low temperature also causes deviation.' },
                { id: 'c', prompt: 'Calculate the compressibility factor Z for 2 moles of CO₂ gas occupying 40 L at 300 K and 50 atm. (R = 0.0821 L·atm·mol⁻¹·K⁻¹).', answer: 'Z = PV/nRT = (50 × 40) / (2 × 0.0821 × 300) = 2000 / 49.26 = 40.6',
                  options: ['Z = PV/nRT = (50 × 40) / (2 × 0.0821 × 300) = 2000 / 49.26 = 40.6', 'real gases deviate from ideal behaviour only at high pressure'],
                  hint: 'If stuck, review c11_chem_cbse_05_006 (Ideal Gas Equation) for PV = nRT usage, and.',
                  misconception: 'Students often think "real gases deviate from ideal behaviour only at high pressure" and forget that low temperature also causes deviation.' },
                { id: 'd', prompt: 'Compare the Z vs P curves for H₂ and N₂ at 300 K. Why does H₂ show Z > 1 at all pressures while N₂ shows a dip below 1 at moderate pressures?', answer: 'H₂ has very weak intermolecular forces (small polarizability, no dipole) and low',
                  options: ['H₂ has very weak intermolecular forces (small polarizability, no dipole) and low', 'real gases deviate from ideal behaviour only at high pressure'],
                  hint: 'If stuck, review c11_chem_cbse_05_006 (Ideal Gas Equation) for PV = nRT usage, and.',
                  misconception: 'Students often think "real gases deviate from ideal behaviour only at high pressure" and forget that low temperature also causes deviation.' }
          ],
            remediations: { 'real-gases-deviate-from-ideal': { steps: ['Revisit c11_chem_cbse_05_009 (Kinetic Molecular Theory) - list the two postulates that fail for real gases.', 'Draw a molecular diagram showing molecules with finite volume (excluded volume) and arrows for attractive forces.', 'For a given gas at fixed T, trace what happens to average intermolecular distance as P increases from 1 to 1000 atm.', 'Plot Z vs P for N₂ at 300 K from memory, label regions: "attraction dominates (Z<1)" and "volume dominates (Z>1)".'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_011', difficulty: 'standard',
          question: 'The van der Waals equation is a modified gas law that accounts for the.',
          hint: 'Revisit c11_chem_cbse_05_010 (Deviation from Ideal Behaviour) to review the.',
          misconception: 'Students often write the van der Waals equation as \\((P - \\frac{an^2}{V^2})(V + nb) = nRT\\), reversing both signs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The van der Waals equation is a modified gas law that accounts for the non-ideal',
                  options: ['The van der Waals equation is a modified gas law that accounts for the non-ideal', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a'],
                  hint: 'Revisit c11_chem_cbse_05_010 (Deviation from Ideal Behaviour) to review the compressibility factor.',
                  misconception: 'Students often write the van der Waals equation as \\((P - \\frac{an^2}{V^2})(V + nb) = nRT\\), reversing both signs.' }
          ],
            remediations: { 'students-often-write-the-van': { steps: ['If a student reverses the signs: Have them derive the pressure correction from kinetic theory—molecules near the wall.', 'The measured \\(P\\) is *less* than ideal \\(P\\), so ideal \\(P = P_{\\text{measured}} + \\text{correction}\\).', 'For volume: draw a container with molecules as hard spheres.', 'The center of a molecule cannot approach the wall closer than its radius, so the free volume for centers is \\(V - nb\\).'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_05_012', difficulty: 'standard',
          question: 'Vapour pressure is the pressure exerted by the vapours of a liquid when they.',
          hint: 'If stuck, review c11_chem_cbse_05_001 (van der Waals forces) and c11_chem_cbse_05_003.',
          misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Vapour pressure is the pressure exerted by the vapours of a liquid when they are in',
                  options: ['Vapour pressure is the pressure exerted by the vapours of a liquid when they are in', 'Van der Waals forces are the collective term for weak, short-range electrostatic', 'London dispersion forces are temporary attractive forces arising from instantaneous', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs between a'],
                  hint: 'If stuck, review c11_chem_cbse_05_001 (van der Waals forces) and c11_chem_cbse_05_003 (hydrogen.',
                  misconception: 'Students believe vapour pressure depends on the amount of liquid or the volume of the container above the liquid.' }
          ],
            remediations: { 'vapour-pressure-depends-on-the': { steps: ['Revisit the syringe experiment (Diagnostic Q6) mentally. Visualize the liquid-vapour interface.', 'Draw a molecular diagram: liquid molecules at bottom, vapour molecules in headspace.', 'Apply Le Chatelier\'s principle: increasing volume decreases vapour concentration momentarily, so evaporation rate >.', 'Practice numerical: "Vapour pressure of water at 300 K is 3.5 kPa.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
