import type { SimDef } from '../../engine/types';
import C12_PhysicsBandGapSim from '../../../simulations/three/C12_PhysicsBandGapSim';

/** v3 wrapped master — C12_PhysicsBandGapSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsbandgapsim: SimDef = {
    id: 'v3w_c12_physicsbandgapsim',
    title: 'Band Gap',
    subtitle: 'This node covers: (a) Formation of energy bands from atomic levels, (b) Classification of.',
    classLevel: 12, subject: 'physics', topic: 'Energy Bands in Solids: Conductor, Insulator, Semiconductor',
    chapters: [],
    nodeIds: ['c12_phy_cbse_14_001', 'c12_phy_cbse_14_002', 'c12_phy_cbse_14_003', 'c12_phy_cbse_14_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a copper wire (excellent conductor), a plastic ruler (insulator), and a silicon chip (semiconductor).', goal: 'Master Band Gap.' },
    discovery: {
        question: '**UNDERSTAND:** In the covalent-bond model of silicon, a pentavalent phosphorus atom replaces a silicon atom.',
        options: ['The four phosphorus electrons participating in covalent bonds become part of the', 'all five electrons become free', 'the fifth electron is in the conduction band already'],
        answer: 'The four phosphorus electrons participating in covalent bonds become part of the',
        hook: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s.',
    },
    teaching: [
        { title: 'Energy bands in solids are continuous ranges.', text: 'Energy bands in solids are continuous ranges of allowed energy levels for electrons, formed by the splitting and merging of discrete atomic energy levels when atoms come together to form a crystal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_001', title: 'Energy bands in solids are continuous.',
          scaffold: { problem: 'Three materials A, B, C have the following properties at room temperature: Material A: resistivity ρ = 2.5 × 10⁻⁸ Ω·m; Material B: ρ = 1.2.',
            steps: [
            { text: 'Recall the resistivity ranges from NCERT: Metals ρ ~ 10⁻² to 10⁻⁸ Ω·m; Semiconductors ρ ~ 10⁻⁵ to 10⁶ Ω·m; Insulators ρ.' },
            { text: 'Compare each material\'s resistivity to these ranges. Material A (2.5 × 10⁻⁸) falls in the metal range.' },
            { text: 'Relate resistivity to band gap. Low ρ → small/zero E_g (conductor). Intermediate ρ → moderate E_g (semiconductor).' },
            { text: 'State classification: A = Conductor (likely a metal like Cu), B = Semiconductor (e.g., doped Si), C = Insulator (e.g.,.' },
            { text: 'Verify consistency: Conductors have overlapping bands, semiconductors have E_g ~ 1 eV, insulators have E_g > 3 eV.', faded: true, blankAnswer: 'A: Conductor, B: Semiconductor, C: Insulator.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_002', title: 'An **intrinsic semiconductor** is a.',
          scaffold: { problem: '** A silicon wafer at 300 K has an intrinsic carrier concentration \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\).',
            steps: [
            { text: 'Identify given quantities: \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), \\(N_D = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(N_A.' },
            { text: 'Since \\(N_D \\gg n_i\\) (\\(5 \\times 10^{21} \\gg 1.5 \\times 10^{16}\\)), the electron concentration is dominated by donors:.' },
            { text: 'Apply mass-action law \\(n_e n_h = n_i^2\\) to find hole concentration:' },
            { text: 'Verify charge neutrality: \\(n_e = N_D + n_h \\approx 5 \\times 10^{21} + 4.5 \\times 10^{10} \\approx 5 \\times 10^{21}.' },
            { text: 'Identify carriers: Electrons are majority carriers (\\(n_e \\gg n_h\\)), holes are minority carriers.', faded: true, blankAnswer: '** \\(n_e = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(n_h = 4.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_003', title: 'A p-n junction is formed when a p-type.',
          scaffold: { problem: 'A silicon p-n junction at 300 K has N_A = 2 × 10¹⁶ cm⁻³ and N_D = 5 × 10¹⁵ cm⁻³.',
            steps: [
            { text: 'Convert doping concentrations to SI units: N_A = 2 × 10²² m⁻³, N_D = 5 × 10²¹ m⁻³, n_i = 1.5 × 10¹⁶ m⁻³.' },
            { text: 'Calculate V_bi = (kT/q) ln(N_A N_D / n_i²). kT/q = 0.02585 V at 300 K. N_A N_D = 1 × 10⁴⁴ m⁻⁶. n_i² = 2.25 × 10³² m⁻⁶.' },
            { text: 'Calculate W = √[(2 ε_s V_bi / q)(1/N_A + 1/N_D)]. ε_s = 11.7 × 8.85e-12 = 1.035 × 10⁻¹⁰ F/m.' },
            { text: 'E_max = q N_D x_n / ε_s. First find x_n: x_n = W × N_A/(N_A+N_D) = 4.73e-7 × 2e22/(2.5e22) = 3.78e-7 m.' },
            { text: 'Verify: V_bi ≈ 0.7 V typical for Si. W ≈ 0.5 μm reasonable. E_max ≈ 3 × 10⁶ V/m below Si breakdown field (~3 × 10⁷.', faded: true, blankAnswer: '(a) V_bi = 0.69 V, (b) W = 0.47 μm, (c) E_max = 2.9 × 10⁶.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_004', title: 'A p-n junction diode is a two-terminal.',
          scaffold: { problem: 'A silicon p-n junction diode is connected in forward bias with a 3.0 V battery and a 470 Ω series resistor.',
            steps: [
            { text: 'Identify given: V_battery = 3.0 V, R = 470 Ω, V_diode(5 mA) = 0.72 V, V_diode(6 mA) = 0.74 V. Find I_circuit, V_R, r_d.' },
            { text: 'Apply Kirchhoff\'s voltage law: V_battery = V_R + V_diode. Since V_diode ≈ 0.72 V at operating point, V_R = 3.0 – 0.72 =.' },
            { text: 'Circuit current I = V_R / R = 2.28 V / 470 Ω = 0.00485 A = 4.85 mA. (Consistent with assumed 5 mA operating point.)' },
            { text: 'Dynamic resistance r_d = ΔV_diode / ΔI_diode = (0.74 – 0.72) V / (6 – 5) mA = 0.02 V / 0.001 A = 20 Ω.' },
            { text: 'Verify: Power dissipated in diode = I × V_diode = 4.85 mA × 0.72 V ≈ 3.5 mW (safe for 1N4007).', faded: true, blankAnswer: '(a) 4.85 mA, (b) 2.28 V, (c) 20 Ω' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'Band Gap', spots: [
            { id: 's1', label: 'Energy bands in solids are', prompt: 'Which idea is this? — Energy bands in solids are continuous ranges of allowed energy levels for electrons,.', answer: 'Energy bands in solids are', options: ['Energy bands in solids are', 'An intrinsic semiconductor is a', 'A p-n junction is formed', 'A p-n junction diode is'] },
            { id: 's2', label: 'An intrinsic semiconductor is a', prompt: 'Which idea is this? — An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in which.', answer: 'An intrinsic semiconductor is a', options: ['An intrinsic semiconductor is a', 'Energy bands in solids are', 'A p-n junction is formed', 'A p-n junction diode is'] },
            { id: 's3', label: 'A p-n junction is formed', prompt: 'Which idea is this? — A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are.', answer: 'A p-n junction is formed', options: ['A p-n junction is formed', 'Energy bands in solids are', 'An intrinsic semiconductor is a', 'A p-n junction diode is'] },
            { id: 's4', label: 'A p-n junction diode is', prompt: 'Which idea is this? — A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and.', answer: 'A p-n junction diode is', options: ['A p-n junction diode is', 'Energy bands in solids are', 'An intrinsic semiconductor is a', 'A p-n junction is formed'] }
          ] } }
    ],
    explore: { component: C12_PhysicsBandGapSim, prompt: 'Explore the interactive — Band Gap' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_001', difficulty: 'standard',
          question: 'Energy bands in solids are continuous ranges of allowed energy levels for.',
          hint: 'If stuck, revisit the Bohr model (Class 12 Chapter 12 Atoms) and the Class 10 electricity.',
          misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the.',
          parts: [
                { id: 'a', prompt: 'Explain why an intrinsic semiconductor behaves as a perfect insulator at absolute zero (0 K) but conducts at room temperature.', answer: 'At 0 K, all valence electrons are in the valence band',
                  options: ['At 0 K, all valence electrons are in the valence band', 'electrons move to the conduction band'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the number of holes.' },
                { id: 'b', prompt: 'Compare the energy band diagrams of a metal, an insulator, and a semiconductor at T = 0 K.', answer: 'Metal: (i) Valence band partially filled OR valence and conduction bands overlap',
                  options: ['Metal: (i) Valence band partially filled OR valence and conduction bands overlap', 'semiconductor has a partially filled valence band at 0 K'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the number of holes.' }
          ],
            remediations: { 'in-an-n-type-semiconductor': { steps: ['If the student holds the above misconception: (1) Revisit the energy band diagram of n-type semiconductor (NCERT Fig.', 'Identify E_D just below E_C.', '(2) Trace the electron: bound to donor → thermal energy → conduction band (free electron).', 'The donor site becomes a fixed positive core, not a mobile hole.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the.',
          parts: [
                { id: 'a', prompt: 'Compare the energy band diagrams of a metal, an insulator, and a semiconductor at T = 0 K.', answer: 'Metal: (i) Valence band partially filled OR valence and conduction bands overlap',
                  options: ['Metal: (i) Valence band partially filled OR valence and conduction bands overlap', 'semiconductor has a partially filled valence band at 0 K'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the number of holes.' }
          ],
            remediations: { 'in-an-n-type-semiconductor': { steps: ['If the student holds the above misconception: (1) Revisit the energy band diagram of n-type semiconductor (NCERT Fig.', 'Identify E_D just below E_C.', '(2) Trace the electron: bound to donor → thermal energy → conduction band (free electron).', 'The donor site becomes a fixed positive core, not a mobile hole.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_002', difficulty: 'standard',
          question: 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge).',
          hint: 'Revisit c12_phy_cbse_14_001 (Energy Bands in Solids) and review the covalent bond model.',
          misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In the covalent-bond model of silicon, a pentavalent phosphorus atom replaces a silicon atom.', answer: 'The four phosphorus electrons participating in covalent bonds become part of the',
                  options: ['The four phosphorus electrons participating in covalent bonds become part of the', 'all five electrons become free', 'the fifth electron is in the conduction band already'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s wrong:** Donor atoms.' }
          ],
            remediations: { 'misconception-in-an-n-type': { steps: ['Revisit **c12_phy_cbse_14_001** (Energy Bands in Solids) and redraw the energy band diagram for intrinsic Si at 0 K and.', 'Draw the 2D covalent-bond diagram for Si with one P atom and one B atom.', 'Explicitly show: (a) the four covalent bonds of P, (b) the fifth electron loosely bound, (c) after ionisation: \\(D^+\\).', 'Practice the mass-action law: given \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), calculate \\(n_h\\) for \\(n_e = 10^{20},.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** A student claims: "In an n-type semiconductor, holes are completely absent because the pentavalent dopant donates electrons that fill all the.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'holes are absent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s wrong:** Donor atoms.' }
          ],
            remediations: { 'misconception-in-an-n-type': { steps: ['Revisit **c12_phy_cbse_14_001** (Energy Bands in Solids) and redraw the energy band diagram for intrinsic Si at 0 K and.', 'Draw the 2D covalent-bond diagram for Si with one P atom and one B atom.', 'Explicitly show: (a) the four covalent bonds of P, (b) the fifth electron loosely bound, (c) after ionisation: \\(D^+\\).', 'Practice the mass-action law: given \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), calculate \\(n_h\\) for \\(n_e = 10^{20},.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_003', difficulty: 'standard',
          question: 'A p-n junction is formed when a p-type semiconductor and an n-type.',
          hint: 'If stuck on band bending, revisit c12_phy_cbse_14_001 (energy bands in semiconductors).',
          misconception: 'Students often think the depletion layer is "empty space" or vacuum.',
          parts: [
                { id: 'a', prompt: 'Why does the diffusion current decrease as the depletion layer widens during junction formation?', answer: 'As the depletion layer widens, the electric field strength increases',
                  options: ['As the depletion layer widens, the electric field strength increases', 'diffusion stops because carriers run out', 'empty space'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' },
                { id: 'b', prompt: 'Compare the depletion layer width in a symmetrically doped junction (N_A = N_D) versus an asymmetrically doped junction (N_A >> N_D) for the same total doping.', answer: 'The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer',
                  options: ['The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer', 'empty space', 'the depletion layer is "empty space" or vacuum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' }
          ],
            remediations: { 'the-depletion-layer-is-empty': { steps: ['If the student cannot explain why the depletion region has an electric field despite being "depleted", have them.', 'Then re-answer Diagnostic Question 2.', 'If they still confuse diffusion vs drift, draw the band diagram step-by-step: flat bands far from junction → carrier.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the depletion layer is "empty space" or vacuum.',
          parts: [
                { id: 'a', prompt: 'A student claims: "At equilibrium, the Fermi level is constant across the p-n junction, so there is no electric field in the depletion region." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'empty space', 'the depletion layer is "empty space" or vacuum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' },
                { id: 'b', prompt: 'Compare the depletion layer width in a symmetrically doped junction (N_A = N_D) versus an asymmetrically doped junction (N_A >> N_D) for the same total doping.', answer: 'The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer',
                  options: ['The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer', 'empty space', 'the depletion layer is "empty space" or vacuum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' }
          ],
            remediations: { 'the-depletion-layer-is-empty': { steps: ['If the student cannot explain why the depletion region has an electric field despite being "depleted", have them.', 'Then re-answer Diagnostic Question 2.', 'If they still confuse diffusion vs drift, draw the band diagram step-by-step: flat bands far from junction → carrier.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_004', difficulty: 'standard',
          question: 'A p-n junction diode is a two-terminal semiconductor device formed by joining.',
          hint: 'If stuck, review the formation of depletion layer and barrier potential in node.',
          misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and',
                  options: ['A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode regardless of.' }
          ],
            remediations: { 'the-knee-voltage-0': { steps: ['Revisit node c12_phy_cbse_14_003 to review the equilibrium barrier potential V_0 and depletion layer formation.', 'Perform the "diode voltage vs current" lab: use a 5 V supply, 1 kΩ potentiometer, silicon diode (1N4007), measure.', 'Re-read NCERT Section 14.6.1 and Example 14.4, focusing on how dynamic resistance changes with operating point.', 'Practice load-line problems from JEE archives (e.g., 2019, 2021) where diode voltage must be found graphically, not.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In reverse bias, the diode current is zero because the barrier becomes infinite." Evaluate this statement and correct it.', answer: 'The statement is false',
                  options: ['The statement is false', 'very high resistance', 'infinite resistance', 'knee voltage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode regardless of.' },
                { id: 'b', prompt: 'Design a simple experiment using a 9 V battery, a 1 kΩ resistor, a silicon diode, and a multimeter to verify that the diode conducts in only one direction.', answer: 'Connect battery, resistor, and diode in series',
                  options: ['Connect battery, resistor, and diode in series', 'knee voltage', 'the "knee voltage" (0'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode regardless of.' }
          ],
            remediations: { 'the-knee-voltage-0': { steps: ['Revisit node c12_phy_cbse_14_003 to review the equilibrium barrier potential V_0 and depletion layer formation.', 'Perform the "diode voltage vs current" lab: use a 5 V supply, 1 kΩ potentiometer, silicon diode (1N4007), measure.', 'Re-read NCERT Section 14.6.1 and Example 14.4, focusing on how dynamic resistance changes with operating point.', 'Practice load-line problems from JEE archives (e.g., 2019, 2021) where diode voltage must be found graphically, not.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
