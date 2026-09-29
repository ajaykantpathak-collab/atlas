import type { SimDef } from '../../engine/types';
import C12_PhysicsNucleiCBSESim from '../../../simulations/c6_12/C12_PhysicsNucleiCBSESim';

/** v3 wrapped master — C12_PhysicsNucleiCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsnucleicbsesim: SimDef = {
    id: 'v3w_c12_physicsnucleicbsesim',
    title: 'Nuclear Fission: Chain Reaction and Energy Release',
    subtitle: 'This node covers: (1) the fission process for U-235 and Pu-239 with typical fragment.',
    classLevel: 12, subject: 'physics', topic: 'Nuclear Fission: Chain Reaction and Energy Release',
    chapters: [],
    nodeIds: ['c12_phy_cbse_13_004', 'c12_phy_cbse_13_005', 'c12_phy_cbse_13_006', 'c12_phy_cbse_13_007', 'c12_phy_cbse_12_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a household LPG cylinder: it stores chemical energy released by combustion.', goal: 'Master Nuclear Fission: Chain Reaction and Energy Release.' },
    discovery: {
        question: 'State the typical energy released per fission of a U-235 nucleus and the average number of neutrons emitted per fission.',
        options: ['~200 MeV per fission', 'destroying protons/neutrons', 'converting mass into energy'],
        answer: '~200 MeV per fission',
        hook: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into.',
    },
    teaching: [
        { title: 'Nuclear fission is a nuclear reaction in.', text: 'Nuclear fission is a nuclear reaction in which a heavy nucleus (such as uranium-235 or plutonium-239) splits into two lighter nuclei (fission fragments) of comparable mass when bombarded by a.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_13_004', title: 'Nuclear fission is a nuclear reaction.',
          scaffold: { problem: 'A typical fission reaction is: ¹⁰n + ²³⁵⁹²U → ¹⁴⁴⁵⁶Ba + ⁸⁹³⁶Kr + 2 ¹⁰n.',
            steps: [
            { text: 'Identify initial total mass: m_initial = m(²³⁵U) + m_n = 235.04393 + 1.00866 = 236.05259 u.' },
            { text: 'Identify final total mass: m_final = m(¹⁴⁴Ba) + m(⁸⁹Kr) + 2 m_n = 143.92295 + 88.91763 + 2×1.00866 = 234.85790 u.' },
            { text: 'Compute mass defect: Δm = m_initial - m_final = 236.05259 - 234.85790 = 1.19469 u.' },
            { text: 'Convert to energy: Q = Δm × 931.5 MeV/u = 1.19469 × 931.5 = 1112.9 MeV? Wait, that\'s too high.' },
            { text: 'Write the reaction and note atomic numbers balance: 92 = 56 + 36, mass numbers: 1+235 = 141+92+3 = 236.' },
            { text: 'Calculate initial total atomic mass: m_i = m(²³⁵U) + m_n = 235.04393 u + 1.00866 u = 236.05259 u.' },
            { text: 'Calculate final total atomic mass: m_f = m(¹⁴¹Ba) + m(⁹²Kr) + 3 m_n = 140.91441 u + 91.92616 u + 3(1.00866 u) =.' },
            { text: 'Find mass defect: Δm = m_i - m_f = 236.05259 u - 235.86655 u = 0.18604 u.' },
            { text: 'Convert to energy: Q = Δm × 931.5 MeV/u = 0.18604 × 931.5 = 173.3 MeV.', faded: true, blankAnswer: 'Q ≈ 173 MeV (prompt energy); total ~200 MeV including.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_13_005', title: 'Nuclear fusion is the process in which.',
          scaffold: { problem: 'The Sun radiates energy at a rate of 3.8×10²⁶ W. Assuming all this energy comes from the proton-proton cycle (net: 4¹H → ⁴He + 2e⁺ + 2νₑ +.',
            steps: [
            { text: 'Identify given: Power P = 3.8×10²⁶ J/s. Energy per reaction Q = 26.7 MeV = 26.7×10⁶ × 1.6×10⁻¹⁹ J = 4.27×10⁻¹² J.' },
            { text: 'Number of reactions per second N = P / Q = (3.8×10²⁶) / (4.27×10⁻¹²) ≈ 8.9×10³⁷ reactions/s.' },
            { text: 'Each reaction consumes 4 protons (hydrogen nuclei). Mass of 4 protons = 4 × 1.007825 u ≈ 4.0313 u.' },
            { text: 'Mass consumption rate = N × mass per reaction = (8.9×10³⁷) × (6.69×10⁻²⁷) ≈ 5.95×10¹¹ kg/s.' },
            { text: 'Check reasonableness: ~600 million metric tons per second. Known value is ~6.2×10¹¹ kg/s. Matches.', faded: true, blankAnswer: '≈ 6.0×10¹¹ kg/s (600 billion kg per second)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_13_006', title: 'Radioactivity is the spontaneous.',
          scaffold: { problem: 'Uranium-238 decays by α-emission to thorium-234. Given atomic masses: m(²³⁸U) = 238.050788 u, m(²³⁴Th) = 234.043601 u, m(⁴He) = 4.002603 u.',
            steps: [
            { text: 'Write the balanced nuclear equation: \\(^{238}_{92}\\text{U} \\rightarrow ^{234}_{90}\\text{Th} + ^{4}_{2}\\text{He}\\).' },
            { text: 'Identify given atomic masses in u: m_U = 238.050788 u, m_Th = 234.043601 u, m_He = 4.002603 u.' },
            { text: 'Compute total mass of products: m_Th + m_He = 234.043601 + 4.002603 = 238.046204 u.' },
            { text: 'Find mass defect: Δm = m_U - (m_Th + m_He) = 238.050788 - 238.046204 = 0.004584 u.' },
            { text: 'Convert to energy using 1 u = 931.5 MeV/c²: Q = 0.004584 × 931.5 = 4.270 MeV.' },
            { text: 'Since thorium recoil is small, almost all Q goes to α-particle kinetic energy: K_α ≈ Q = 4.27 MeV.', faded: true, blankAnswer: 'Q_α = 4.27 MeV (K_α ≈ 4.27 MeV)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_13_007', title: 'The law of radioactive decay states.',
          scaffold: { problem: 'A radioactive sample of iodine-131 (half-life = 8.04 days) has an initial activity of 5.0 MBq.',
            steps: [
            { text: 'Convert half-life to seconds: T₁/₂ = 8.04 days × 24 h/day × 3600 s/h = 8.04 × 86400 s = 694,656 s.' },
            { text: 'Compute decay constant: λ = ln2 / T₁/₂ = 0.693147 / 694656 s = 9.98 × 10⁻⁷ s⁻¹.', faded: true, blankAnswer: '(a) λ = 9.98 × 10⁻⁷ s⁻¹ (b) R = 0.625 MBq (c) t = 45.4 days.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_12_001', title: 'Rutherford\'s nuclear model of the atom.',
          scaffold: { problem: 'In a Rutherford scattering experiment, α-particles of kinetic energy 5.5 MeV are incident on a thin gold foil (Z = 79).',
            steps: [
            { text: 'Identify given: K = 5.5 MeV (not needed for ratio), θ₁ = 30°, N₁ = 1000 min⁻¹, θ₂ = 90°.' },
            { text: 'Compute sin(θ₁/2) = sin(15°) = 0.2588; sin⁴(15°) = (0.2588)⁴ = 0.00448.' },
            { text: 'Compute sin(θ₂/2) = sin(45°) = 0.7071; sin⁴(45°) = (0.7071)⁴ = 0.25.' },
            { text: 'Ratio N₂/N₁ = sin⁴(θ₁/2) / sin⁴(θ₂/2) = 0.00448 / 0.25 = 0.01792.' },
            { text: 'N₂ = 1000 × 0.01792 = 17.92 ≈ 18 particles per minute.', faded: true, blankAnswer: '18 particles per minute (at 90°).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_13_005', title: 'Identify each idea',
          dissect: { specimen: 'Nuclear Fission: Chain Reaction and Energy Release', spots: [
            { id: 's1', label: 'Nuclear fission is a nuclear', prompt: 'Which idea is this? — Nuclear fission is a nuclear reaction in which a heavy nucleus (such as uranium-235 or.', answer: 'Nuclear fission is a nuclear', options: ['Nuclear fission is a nuclear', 'Nuclear fusion is the process', 'Radioactivity is the spontaneous nuclear', 'The law of radioactive decay'] },
            { id: 's2', label: 'Nuclear fusion is the process', prompt: 'Which idea is this? — Nuclear fusion is the process in which two or more light atomic nuclei combine to form a.', answer: 'Nuclear fusion is the process', options: ['Nuclear fusion is the process', 'Nuclear fission is a nuclear', 'Radioactivity is the spontaneous nuclear', 'The law of radioactive decay'] },
            { id: 's3', label: 'Radioactivity is the spontaneous nuclear', prompt: 'Which idea is this? — Radioactivity is the spontaneous nuclear process in which an unstable atomic nucleus.', answer: 'Radioactivity is the spontaneous nuclear', options: ['Radioactivity is the spontaneous nuclear', 'Nuclear fission is a nuclear', 'Nuclear fusion is the process', 'The law of radioactive decay'] },
            { id: 's4', label: 'The law of radioactive decay', prompt: 'Which idea is this? — The law of radioactive decay states that the rate of disintegration of a radioactive.', answer: 'The law of radioactive decay', options: ['The law of radioactive decay', 'Nuclear fission is a nuclear', 'Nuclear fusion is the process', 'Radioactivity is the spontaneous nuclear'] },
            { id: 's5', label: 'Rutherfords nuclear model of the', prompt: 'Which idea is this? — Rutherford\'s nuclear model of the atom states that the entire positive charge and nearly.', answer: 'Rutherfords nuclear model of the', options: ['Rutherfords nuclear model of the', 'Nuclear fission is a nuclear', 'Nuclear fusion is the process', 'Radioactivity is the spontaneous nuclear'] }
          ] } }
    ],
    explore: { component: C12_PhysicsNucleiCBSESim, prompt: 'Explore the interactive — Nuclear Fission: Chain Reaction and Energy Release' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_004', difficulty: 'standard',
          question: 'Nuclear fission is a nuclear reaction in which a heavy nucleus (such as.',
          hint: 'Revisit binding energy per nucleon graph (Figure 13.1 in NCERT) and practice mass defect.',
          misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into.',
          parts: [
                { id: 'a', prompt: 'State the typical energy released per fission of a U-235 nucleus and the average number of neutrons emitted per fission.', answer: '~200 MeV per fission',
                  options: ['~200 MeV per fission', 'destroying protons/neutrons', 'converting mass into energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into energy" in a literal.' },
                { id: 'b', prompt: 'Explain why a chain reaction does not occur spontaneously in a small piece of natural uranium, even though U-235 is fissile.', answer: 'Natural uranium is only 0.7% U-235 (rest U-238)',
                  options: ['Natural uranium is only 0.7% U-235 (rest U-238)', 'neutrons are too fast', 'destroying protons/neutrons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into energy" in a literal.' },
                { id: 'c', prompt: 'A 1000 MW nuclear power plant operates at 33% thermal efficiency. If each U-235 fission releases 200 MeV, calculate the mass of U-235 consumed per day.', answer: 'Step 1: Electrical power P_elec = 1000 MW = 10⁹ W',
                  options: ['Step 1: Electrical power P_elec = 1000 MW = 10⁹ W', 'destroying protons/neutrons', 'converting mass into energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into energy" in a literal.' }
          ],
            remediations: { 'the-energy-in-nuclear-fission': { steps: ['If the student cannot distinguish between mass defect and particle annihilation, revisit c12_phy_cbse_13_003.', 'Perform the "mass balance" exercise: write a fission equation (e.g., U-235 + n → Ba-144 + Kr-89 + 3n), sum the mass.', 'If chain reaction concept is weak, simulate with a "neutron economy" spreadsheet: start with 1000 neutrons, apply.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a nuclear reactor, the moderator speeds up neutrons so they can cause more fissions." Evaluate this statement and correct it.', answer: 'The statement is false',
                  options: ['The statement is false', 'destroying protons/neutrons', 'converting mass into energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy in nuclear fission comes from "destroying protons/neutrons" or "converting mass into energy" in a literal.' }
          ],
            remediations: { 'the-energy-in-nuclear-fission': { steps: ['If the student cannot distinguish between mass defect and particle annihilation, revisit c12_phy_cbse_13_003.', 'Perform the "mass balance" exercise: write a fission equation (e.g., U-235 + n → Ba-144 + Kr-89 + 3n), sum the mass.', 'If chain reaction concept is weak, simulate with a "neutron economy" spreadsheet: start with 1000 neutrons, apply.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_005', difficulty: 'standard',
          question: 'Nuclear fusion is the process in which two or more light atomic nuclei combine.',
          hint: 'If stuck on Q-value calculations, revisit c12_phy_cbse_13_003 Example 13.3 (energy.',
          misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.',
          parts: [
                { id: 'a', prompt: 'Why must the temperature in the Sun\'s core be high (~1.5×10⁷ K) for fusion to occur, even though the average kinetic energy at this temperature (≈1.3 keV) is.', answer: 'Fusion occurs because a small fraction of protons in the high-energy tail of the',
                  options: ['Fusion occurs because a small fraction of protons in the high-energy tail of the', 'average kinetic energy must exceed the barrier', 'ignite'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.' },
                { id: 'b', prompt: 'Calculate the Q-value (in MeV) for the fusion reaction: ²₁H + ²₁H → ³₂He + ¹₀n.', answer: 'Step 1: Initial total mass = 2 × 2.014102 u = 4.028204 u',
                  options: ['Step 1: Initial total mass = 2 × 2.014102 u = 4.028204 u', 'ignite', 'the Sun "burns" hydrogen like a chemical fire, consuming it rapidly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.' },
                { id: 'c', prompt: 'Compare the energy released per kilogram of fuel for the fusion of deuterium (²₁H + ²₁H → ³₂He + n + 3.27 MeV) with the fission of ²³⁵U (≈200 MeV per fission).', answer: 'Fusion of deuterium: 3.27 MeV per reaction consuming 2 deuterons (≈4 u)',
                  options: ['Fusion of deuterium: 3.27 MeV per reaction consuming 2 deuterons (≈4 u)', 'ignite', 'the Sun "burns" hydrogen like a chemical fire, consuming it rapidly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.' }
          ],
            remediations: { 'the-sun-burns-hydrogen-like': { steps: ['If the student holds the combustion misconception: 1.', 'Revisit c12_phy_cbse_13_003 (Mass-Energy Equivalence) and compute the energy from 1 kg of hydrogen via E=mc² vs.', 'Show the factor of 10⁷ difference.', 'Review the binding energy curve (c12_phy_cbse_13_002, Figure 13.1) and identify that moving from A=1 to A=4 increases.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In the p-p cycle, the first step (p + p → d + e⁺ + νₑ) releases only 0.42 MeV, which is very small.', answer: 'The statement is misleading',
                  options: ['The statement is misleading', 'ignite', 'the Sun "burns" hydrogen like a chemical fire, consuming it rapidly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.' },
                { id: 'b', prompt: 'Design a simple thought experiment to estimate the minimum temperature required for two deuterons to overcome the Coulomb barrier classically (ignoring.', answer: 'Coulomb barrier height U = (1/4πε₀) (e² / r) with r = 4.0 fm (sum of radii)',
                  options: ['Coulomb barrier height U = (1/4πε₀) (e² / r) with r = 4.0 fm (sum of radii)', 'ignite', 'the Sun "burns" hydrogen like a chemical fire, consuming it rapidly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun "burns" hydrogen like a chemical fire, consuming it rapidly.' }
          ],
            remediations: { 'the-sun-burns-hydrogen-like': { steps: ['If the student holds the combustion misconception: 1.', 'Revisit c12_phy_cbse_13_003 (Mass-Energy Equivalence) and compute the energy from 1 kg of hydrogen via E=mc² vs.', 'Show the factor of 10⁷ difference.', 'Review the binding energy curve (c12_phy_cbse_13_002, Figure 13.1) and identify that moving from A=1 to A=4 increases.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_006', difficulty: 'standard',
          question: 'Radioactivity is the spontaneous nuclear process in which an unstable atomic.',
          hint: 'Revisit c12_phy_cbse_13_001 for nuclear notation and c12_phy_cbse_13_003 for mass-energy.',
          misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.',
          parts: [
                { id: 'a', prompt: 'Write the nuclear equation for the α-decay of \\(^{226}_{88}\\text{Ra}\\). Identify the daughter nucleus.', answer: '\\(^{226}_{88}\\text{Ra} \\rightarrow ^{222}_{86}\\text{Rn} + ^{4}_{2}\\text{He}\\)',
                  options: ['\\(^{226}_{88}\\text{Ra} \\rightarrow ^{222}_{86}\\text{Rn} + ^{4}_{2}\\text{He}\\)', 'γ-decay changes the element (Z or A)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.' },
                { id: 'b', prompt: 'In β⁻ decay, a neutron transforms into a proton, an electron, and an antineutrino.', answer: 'The neutron (n) → proton (p) + electron (e⁻) + antineutrino (\\(\\bar{\\nu}_e\\))',
                  options: ['The neutron (n) → proton (p) + electron (e⁻) + antineutrino (\\(\\bar{\\nu}_e\\))', 'A decreases', 'γ-decay changes the element (Z or A)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.' },
                { id: 'c', prompt: 'Given atomic masses: \\(m(^{14}_{6}\\text{C}) = 14.003242\\,\\text{u}\\), \\(m(^{14}_{7}\\text{N}) = 14.003074\\,\\text{u}\\).', answer: 'Step 1: Write decay: \\(^{14}_{6}\\text{C} \\rightarrow ^{14}_{7}\\text{N} + e^- +',
                  options: ['Step 1: Write decay: \\(^{14}_{6}\\text{C} \\rightarrow ^{14}_{7}\\text{N} + e^- +', 'γ-decay changes the element (Z or A)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.' }
          ],
            remediations: { 'decay-changes-the-element-z': { steps: ['If the student confuses γ-decay with transmutation: (1) Review c12_phy_cbse_13_001 nuclear notation — emphasize that γ.', '(2) Write three decay equations side-by-side on paper, highlighting what changes (Z, A) in each.', '(3) Use the "valley of stability" diagram: α and β move the nucleus toward stability; γ only de-excites an.', '(4) Re-attempt Diagnostic Question 5 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.',
          parts: [
                { id: 'a', prompt: 'A student writes the β⁺ decay of \\(^{22}_{11}\\text{Na}\\) as: \\(^{22}_{11}\\text{Na} \\rightarrow ^{22}_{10}\\text{Ne} + e^+\\). Is this equation complete?', answer: 'Incomplete',
                  options: ['Incomplete', 'γ-decay changes the element (Z or A)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.' },
                { id: 'b', prompt: 'Design a simple experiment using a Geiger-Müller counter, a set of absorbers (paper, aluminum, lead), and a mixed α-β-γ source to identify which radiation type.', answer: 'Procedure: Place source near GM tube, record background-subtracted count rate R₀',
                  options: ['Procedure: Place source near GM tube, record background-subtracted count rate R₀', 'γ-decay changes the element (Z or A)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think γ-decay changes the element (Z or A) because they confuse it with α/β decay.' }
          ],
            remediations: { 'decay-changes-the-element-z': { steps: ['If the student confuses γ-decay with transmutation: (1) Review c12_phy_cbse_13_001 nuclear notation — emphasize that γ.', '(2) Write three decay equations side-by-side on paper, highlighting what changes (Z, A) in each.', '(3) Use the "valley of stability" diagram: α and β move the nucleus toward stability; γ only de-excites an.', '(4) Re-attempt Diagnostic Question 5 and 6.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_13_007', difficulty: 'standard',
          question: 'The law of radioactive decay states that the rate of disintegration of a.',
          hint: 'If stuck on the differential equation, review c11_math_cbse_13_006 (intuitive idea of.',
          misconception: 'Students often think that after one half-life, exactly half the nuclei have decayed *simultaneously* at the moment.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of the decay constant λ and write the differential equation for radioactive decay. Explain the physical meaning of the negative sign.', answer: 'The SI unit of λ is s⁻¹ (per second)',
                  options: ['The SI unit of λ is s⁻¹ (per second)', 'the number of nuclei increases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that after one half-life, exactly half the nuclei have decayed *simultaneously* at the moment T₁/₂, or that a nucleus.' }
          ],
            remediations: { 'after-one-half-life': { steps: ['Revisit the concept of probability per unit time (λ) from c12_phy_cbse_13_006.', 'Simulate decay with dice: roll 100 dice, remove all sixes (decay probability 1/6 per roll), repeat.', 'Plot remaining dice vs roll number.', 'Observe the exponential trend and that half-life is ~3.8 rolls (ln2/(1/6)), but the exact number of sixes each roll.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_001', difficulty: 'standard',
          question: 'Rutherford\'s nuclear model of the atom states that the entire positive charge.',
          hint: 'If stuck, review c11_phy_cbse_05_010 (Conservation of Mechanical Energy) and practice.',
          misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact.',
          parts: [
                { id: 'a', prompt: 'The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m.', answer: '**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m',
                  options: ['**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m', 'thin foil reduces absorption', 'multiple scattering increases large-angle events'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact force**, like a.' }
          ],
            remediations: { 'the-particle-hits-the-nucleus': { steps: ['If the student holds the "contact collision" misconception: 1.', 'Revisit the energy-conservation derivation (Worked Example 3) step by step, emphasizing that at *d*, velocity = 0 and.', 'Watch a simulation of Rutherford scattering (e.g., PhET "Rutherford Scattering") to visualize the hyperbolic trajectory.', 'Solve a problem: "Calculate the Coulomb force at *d* for the gold foil example.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact.',
          parts: [
                { id: 'a', prompt: 'The Geiger-Marsden experiment used a gold foil of thickness 2.1 × 10⁻⁷ m.', answer: '**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m',
                  options: ['**Step 1:** Atomic diameter ≈ 2 × 1.4 × 10⁻¹⁰ m = 2.8 × 10⁻¹⁰ m', 'thin foil reduces absorption', 'multiple scattering increases large-angle events'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **the α-particle "hits" the nucleus in a head-on collision and stops because of a contact force**, like a.' }
          ],
            remediations: { 'the-particle-hits-the-nucleus': { steps: ['If the student holds the "contact collision" misconception: 1.', 'Revisit the energy-conservation derivation (Worked Example 3) step by step, emphasizing that at *d*, velocity = 0 and.', 'Watch a simulation of Rutherford scattering (e.g., PhET "Rutherford Scattering") to visualize the hyperbolic trajectory.', 'Solve a problem: "Calculate the Coulomb force at *d* for the gold foil example.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
