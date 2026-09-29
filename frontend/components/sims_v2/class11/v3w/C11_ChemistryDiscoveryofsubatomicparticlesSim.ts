import type { SimDef } from '../../engine/types';
import C11_ChemistryDiscoveryofsubatomicparticlesSim from '../../../simulations/c6_12/C11_ChemistryDiscoveryofsubatomicparticlesSim';

/** v3 wrapped master — C11_ChemistryDiscoveryofsubatomicparticlesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrydiscoveryofsubatomicparticlessim: SimDef = {
    id: 'v3w_c11_chemistrydiscoveryofsubatomicparticlessim',
    title: 'Heavy Water: Properties and Uses',
    subtitle: 'Covers: discovery, physical properties comparison with H₂O, preparation methods.',
    classLevel: 11, subject: 'chemistry', topic: 'Heavy Water: Properties and Uses',
    chapters: [],
    nodeIds: ['c11_chem_cbse_09_010', 'c11_chem_cbse_02_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a glass of tap water — it looks ordinary, but hidden within is a rare "heavy" version.', goal: 'Master Heavy Water: Properties and Uses.' },
    discovery: {
        question: 'State the molecular formula and molar mass of heavy water. How does its molar mass differ from that of ordinary water?',
        options: ['Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)', 'radioactive', 'heavy water toxicity'],
        answer: 'Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)',
        hook: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.',
    },
    teaching: [
        { title: 'Heavy water (D₂O) is the oxide of deuterium.', text: 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen containing one proton and one neutron in its nucleus, resulting in a molecular mass of approximately 20 g mol⁻¹ compared.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_010', title: 'Heavy water (D₂O) is the oxide of.',
          scaffold: { problem: 'Calculate the density of D₂O at 298 K given that the molar volume of D₂O is 18.07 cm³ mol⁻¹ (same as H₂O within 0.2%).',
            steps: [
            { text: 'Identify the formula for density: ρ = M / V_m where M = molar mass, V_m = molar volume.' },
            { text: 'Compute molar mass of D₂O: M = 2 × 2.014 + 16.00 = 20.028 g mol⁻¹.' },
            { text: 'Use given molar volume V_m = 18.07 cm³ mol⁻¹.' },
            { text: 'Calculate density: ρ = 20.028 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 1.108 g cm⁻³.' },
            { text: 'Compare with H₂O density (18.015 g mol⁻¹ / 18.07 cm³ mol⁻¹ = 0.997 g cm⁻³) and note 11% increase due solely to mass.', faded: true, blankAnswer: 'ρ(D₂O) = 1.108 g cm⁻³ at 298 K (literature value 1.107 g.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_02_001', title: 'The electron is a fundamental subatomic.',
          scaffold: { problem: 'In a cathode ray tube, electrons are accelerated through a potential difference of 2000 V.',
            steps: [
            { text: 'Identify knowns: V = 2000 V, B = 0.02 T, e/m = 1.76 × 10¹¹ C/kg. The kinetic energy gained = eV = ½mv².' },
            { text: 'Calculate velocity from energy: v = √(2eV/m) = √(2 × (e/m) × V) = √(2 × 1.76×10¹¹ × 2000) = √(7.04×10¹⁴) ≈ 2.65×10⁷ m/s.' },
            { text: 'In magnetic field, centripetal force = magnetic force: mv²/r = evB → r = mv/(eB) = v/((e/m)B).' },
            { text: 'Substitute values: r = (2.65×10⁷) / (1.76×10¹¹ × 0.02) = (2.65×10⁷) / (3.52×10⁹) ≈ 7.53×10⁻³ m = 7.53 mm.' },
            { text: 'Verify units: (m/s) / ((C/kg)·T) = (m/s) / ((C/kg)·(N·s/C·m)) = (m/s) / (N/kg·m) → kg·m/N = m. Correct.', faded: true, blankAnswer: 'Radius ≈ 7.5 mm' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_02_001', title: 'Identify each idea',
          dissect: { specimen: 'Heavy Water: Properties and Uses', spots: [
            { id: 's1', label: 'Heavy water DO is the', prompt: 'Which idea is this? — Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen containing.', answer: 'Heavy water DO is the', options: ['Heavy water DO is the', 'The electron is a fundamental'] },
            { id: 's2', label: 'The electron is a fundamental', prompt: 'Which idea is this? — The electron is a fundamental subatomic particle carrying a unit negative charge (-1.602.', answer: 'The electron is a fundamental', options: ['The electron is a fundamental', 'Heavy water DO is the'] }
          ] } }
    ],
    explore: { component: C11_ChemistryDiscoveryofsubatomicparticlesSim, prompt: 'Explore the interactive — Heavy Water: Properties and Uses' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_010', difficulty: 'standard',
          question: 'Heavy water (D₂O) is the oxide of deuterium (²H or D), an isotope of hydrogen.',
          hint: 'If stuck, review c11_chem_cbse_09_002 for isotope definitions and c11_chem_cbse_09_007.',
          misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.',
          parts: [
                { id: 'a', prompt: 'State the molecular formula and molar mass of heavy water. How does its molar mass differ from that of ordinary water?', answer: 'Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)',
                  options: ['Heavy water is D₂O with molar mass ≈ 20 g mol⁻¹ (2 × 2.014 + 16.00)', 'radioactive', 'heavy water toxicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'b', prompt: 'During electrolysis of ordinary water, the gas evolved at the cathode is richer in H₂ than D₂.', answer: 'Given x₀ = 0.000156, α = 1.05, f = 0.5',
                  options: ['Given x₀ = 0.000156, α = 1.05, f = 0.5', 'radioactive', 'heavy water toxicity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' },
                { id: 'c', prompt: 'Compare the density of D₂O (1.107 g cm⁻³ at 298 K) and H₂O (0.997 g cm⁻³ at 298 K).', answer: 'The statement is partially correct in outcome but wrong in mechanism',
                  options: ['The statement is partially correct in outcome but wrong in mechanism', 'packing', 'radioactive'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe heavy water is "radioactive" because it is associated with nuclear reactors.' }
          ],
            remediations: { 'heavy-water-is-radioactive-because': { steps: ['Revisit c11_chem_cbse_09_002 (Isotopes of Hydrogen) and explicitly list the nuclear composition (p, n) and stability of.', 'Write the nuclear equations: ¹H(n,γ)²H (stable), ²H(n,γ)³H (radioactive, t½=12.3 yr).', 'Complete a table comparing "Radioactive?" for H₂O, D₂O, T₂O.', 'Read the NCERT sidebar on heavy water toxicity (Class 11 Ch 9) to replace fear with quantitative fact.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_02_001', difficulty: 'standard',
          question: 'The electron is a fundamental subatomic particle carrying a unit negative.',
          hint: 'If stuck on force directions, review Class 11 Physics Chapter 4: Moving Charges and.',
          misconception: 'Students often think cathode rays are electromagnetic waves (like light) because they travel in straight lines and.',
          parts: [
                { id: 'a', prompt: 'Why does the charge-to-mass ratio (e/m) of cathode rays remain constant regardless of the gas used in the discharge tube or the electrode material?', answer: 'Because cathode rays are streams of electrons',
                  options: ['Because cathode rays are streams of electrons', 'because the voltage is the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think cathode rays are electromagnetic waves (like light) because they travel in straight lines and cause fluorescence.' }
          ],
            remediations: { 'cathode-rays-are-electromagnetic-waves': { steps: ['Revisit Class 9 "Subatomic Particles" (c9_chem_ch2_1) to recall electron properties.', 'Use a magnet and a CRT monitor (or simulation) to see beam deflection — this directly shows particle behavior.', 'Practice Fleming\'s left-hand rule for magnetic force direction on negative charges.', 'Write the force balance equation eE = evB repeatedly until the condition for no deflection is internalized.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
