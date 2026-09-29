import type { SimDef } from '../../engine/types';
import C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim from '../../../simulations/c6_12/C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim';

/** v3 wrapped master — C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicssemiconductorelectronicsmaterialsdevicesandsim: SimDef = {
    id: 'v3w_c12_physicssemiconductorelectronicsmaterialsdevicesandsim',
    title: 'p-n Junction Diode: Forward and Reverse Bias',
    subtitle: 'Covers: forward bias operation (minority carrier injection, exponential I-V relation,.',
    classLevel: 12, subject: 'physics', topic: 'p-n Junction Diode: Forward and Reverse Bias',
    chapters: [],
    nodeIds: ['c12_phy_cbse_14_004', 'c12_phy_cbse_14_002', 'c12_phy_cbse_14_008', 'c12_phy_cbse_14_001', 'c12_phy_cbse_14_003', 'c12_phy_cbse_03_004', 'c12_phy_cbse_03_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a simple LED torch: when you flip the switch, the LED lights up instantly; if you accidentally insert.', goal: 'Master p-n Junction Diode: Forward and Reverse Bias.' },
    discovery: {
        question: 'A student claims: "In reverse bias, the diode current is zero because the barrier becomes infinite." Evaluate this statement and correct it.',
        options: ['The statement is false', 'very high resistance', 'infinite resistance'],
        answer: 'The statement is false',
        hook: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
    },
    teaching: [
        { title: 'A p-n junction diode is a two-terminal.', text: 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and n-type materials with metallic contacts; under forward bias (p-side connected to positive terminal, n-side to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_004', title: 'A p-n junction diode is a two-terminal.',
          scaffold: { problem: 'A silicon p-n junction diode is connected in forward bias with a 3.0 V battery and a 470 Ω series resistor.',
            steps: [
            { text: 'Identify given: V_battery = 3.0 V, R = 470 Ω, V_diode(5 mA) = 0.72 V, V_diode(6 mA) = 0.74 V. Find I_circuit, V_R, r_d.' },
            { text: 'Apply Kirchhoff\'s voltage law: V_battery = V_R + V_diode. Since V_diode ≈ 0.72 V at operating point, V_R = 3.0 – 0.72 =.' },
            { text: 'Circuit current I = V_R / R = 2.28 V / 470 Ω = 0.00485 A = 4.85 mA. (Consistent with assumed 5 mA operating point.)' },
            { text: 'Dynamic resistance r_d = ΔV_diode / ΔI_diode = (0.74 – 0.72) V / (6 – 5) mA = 0.02 V / 0.001 A = 20 Ω.' },
            { text: 'Verify: Power dissipated in diode = I × V_diode = 4.85 mA × 0.72 V ≈ 3.5 mW (safe for 1N4007).', faded: true, blankAnswer: '(a) 4.85 mA, (b) 2.28 V, (c) 20 Ω' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_001', title: 'Energy bands in solids are continuous.',
          scaffold: { problem: 'Three materials A, B, C have the following properties at room temperature: Material A: resistivity ρ = 2.5 × 10⁻⁸ Ω·m; Material B: ρ = 1.2.',
            steps: [
            { text: 'Recall the resistivity ranges from NCERT: Metals ρ ~ 10⁻² to 10⁻⁸ Ω·m; Semiconductors ρ ~ 10⁻⁵ to 10⁶ Ω·m; Insulators ρ.' },
            { text: 'Compare each material\'s resistivity to these ranges. Material A (2.5 × 10⁻⁸) falls in the metal range.' },
            { text: 'Relate resistivity to band gap. Low ρ → small/zero E_g (conductor). Intermediate ρ → moderate E_g (semiconductor).' },
            { text: 'State classification: A = Conductor (likely a metal like Cu), B = Semiconductor (e.g., doped Si), C = Insulator (e.g.,.' },
            { text: 'Verify consistency: Conductors have overlapping bands, semiconductors have E_g ~ 1 eV, insulators have E_g > 3 eV.', faded: true, blankAnswer: 'A: Conductor, B: Semiconductor, C: Insulator.' }
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_03_004', title: 'Resistivity (ρ) is an intrinsic.',
          scaffold: { problem: 'An immersion heater used for heating water in a bucket has a nichrome wire element. At room temperature (25.0°C), its resistance is 24.0 Ω.',
            steps: [
            { text: 'Identify given quantities: R_0 = 24.0 Ω at T_0 = 25.0°C, V = 230 V, I_steady = 4.20 A, α = 1.70 × 10⁻⁴ °C⁻¹.' },
            { text: 'Calculate the steady resistance R_steady using Ohm\'s law: R_steady = V / I_steady = 230 V / 4.20 A = 54.76 Ω.' },
            { text: 'Use the temperature dependence formula for resistance (same as for resistivity since dimensions are constant): R_steady.' },
            { text: 'Solve for T_steady: (R_steady / R_0) - 1 = α(T_steady - T_0) → T_steady - T_0 = (R_steady/R_0 - 1)/α.' },
            { text: 'Compute: R_steady/R_0 = 54.76/24.0 = 2.2817. (2.2817 - 1) = 1.2817. ΔT = 1.2817 / (1.70×10⁻⁴) = 7539 °C.' },
            { text: 'Check physical reasonableness: Nichrome melts around 1400°C. The calculated temperature is impossibly high, indicating.' },
            { text: 'Given: R_0 = 10.0 Ω at T_0 = 20.0°C, V = 12.0 V, I = 0.500 A, α = 3.90 × 10⁻³ °C⁻¹. Find T.' },
            { text: 'Steady resistance R = V/I = 12.0 / 0.500 = 24.0 Ω.' },
            { text: 'Formula: R = R_0[1 + α(T - T_0)].' },
            { text: 'Solve for T: T - T_0 = (R/R_0 - 1)/α = (24.0/10.0 - 1) / (3.90×10⁻³) = (2.40 - 1) / 0.00390 = 1.40 / 0.00390 = 359 °C.' },
            { text: 'T = 20.0 + 359 = 379 °C. Check: Copper melts at 1085°C, so 379°C is physically plausible for a resistor under power.', faded: true, blankAnswer: '379 °C' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_14_002', title: 'Identify each idea',
          dissect: { specimen: 'p-n Junction Diode: Forward and Reverse Bias', spots: [
            { id: 's1', label: 'A p-n junction diode is', prompt: 'Which idea is this? — A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and.', answer: 'A p-n junction diode is', options: ['A p-n junction diode is', 'An intrinsic semiconductor is a', 'A junction transistor is a', 'Energy bands in solids are'] },
            { id: 's2', label: 'An intrinsic semiconductor is a', prompt: 'Which idea is this? — An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in which.', answer: 'An intrinsic semiconductor is a', options: ['An intrinsic semiconductor is a', 'A p-n junction diode is', 'A junction transistor is a', 'Energy bands in solids are'] },
            { id: 's3', label: 'A junction transistor is a', prompt: 'Which idea is this? — A junction transistor is a three-terminal semiconductor device consisting of two p-n.', answer: 'A junction transistor is a', options: ['A junction transistor is a', 'A p-n junction diode is', 'An intrinsic semiconductor is a', 'Energy bands in solids are'] },
            { id: 's4', label: 'Energy bands in solids are', prompt: 'Which idea is this? — Energy bands in solids are continuous ranges of allowed energy levels for electrons,.', answer: 'Energy bands in solids are', options: ['Energy bands in solids are', 'A p-n junction diode is', 'An intrinsic semiconductor is a', 'A junction transistor is a'] },
            { id: 's5', label: 'A p-n junction is formed', prompt: 'Which idea is this? — A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are.', answer: 'A p-n junction is formed', options: ['A p-n junction is formed', 'A p-n junction diode is', 'An intrinsic semiconductor is a', 'A junction transistor is a'] },
            { id: 's6', label: 'Resistivity is an intrinsic', prompt: 'Which idea is this? — Resistivity (ρ) is an intrinsic material property quantifying how strongly a material.', answer: 'Resistivity is an intrinsic', options: ['Resistivity is an intrinsic', 'A p-n junction diode is', 'An intrinsic semiconductor is a', 'A junction transistor is a'] }
          ] } }
    ],
    explore: { component: C12_PhysicsSemiconductorElectronicsMaterialsDevicesAndSim, prompt: 'Explore the interactive — p-n Junction Diode: Forward and Reverse Bias' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_004', difficulty: 'standard',
          question: 'A p-n junction diode is a two-terminal semiconductor device formed by joining.',
          hint: 'If stuck, review the formation of depletion layer and barrier potential in node.',
          misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and',
                  options: ['A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A junction transistor is a three-terminal semiconductor device consisting of two p-n', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,'],
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
            remediations: { 'the-knee-voltage-0': { steps: ['Revisit node c12_phy_cbse_14_003 to review the equilibrium barrier potential V_0 and depletion layer formation.', 'Perform the "diode voltage vs current" lab: use a 5 V supply, 1 kΩ potentiometer, silicon diode (1N4007), measure.', 'Re-read NCERT Section 14.6.1 and Example 14.4, focusing on how dynamic resistance changes with operating point.', 'Practice load-line problems from JEE archives (e.g., 2019, 2021) where diode voltage must be found graphically, not.'] } } },
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_008', difficulty: 'standard',
          question: 'A junction transistor is a three-terminal semiconductor device consisting of.',
          hint: 'If stuck on biasing: Re-read c12_phy_cbse_14_004 section 14.6.1 and 14.6.2.',
          misconception: '**Misconception:** "The collector is larger than the emitter so it can collect more charge carriers." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In an n-p-n transistor, the emitter is heavily doped n-type, the base is lightly doped p-type, and the collector is moderately doped n-type.', answer: 'very thin and (',
                  options: ['very thin and (', 'base is thin to reduce resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The collector is larger than the emitter so it can collect more charge carriers." **Why it\'s wrong:** The collector is.' }
          ],
            remediations: { 'misconception-the-collector-is-larger': { steps: ['Revisit **c12_phy_cbse_14_003** (p-n junction formation) to reinforce depletion region and built-in potential concepts.', 'Revisit **c12_phy_cbse_14_004** (p-n junction diode biasing) to practice identifying forward/reverse bias from battery.', 'Draw the n-p-n and p-n-p structures side-by-side on paper.', 'Label doping (n+, p, n) and (p+, n, p).'] } } },
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_03_004', difficulty: 'standard',
          question: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a.',
          hint: 'If stuck, revisit the drift velocity derivation (c12_phy_cbse_03_003) and the Class 11.',
          misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Resistivity (ρ) is an intrinsic material property quantifying how strongly a material',
                  options: ['Resistivity (ρ) is an intrinsic material property quantifying how strongly a material', 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A junction transistor is a three-terminal semiconductor device consisting of two p-n'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the linear formula ρ_T = ρ_0[1 + α(T - T_0)] is universally valid for all temperatures, and they apply it to very.' }
          ],
            remediations: { 'the-linear-formula-t-0': { steps: ['If the student exhibits this misconception, have them: (1) Revisit the drift velocity derivation (c12_phy_cbse_03_003).', '(2) Plot ρ vs T for copper using data from a handbook (or NCERT Fig.', '3.8) and observe the non-linear region below 50 K.', '(3) Re-derive the linear approximation from the Taylor expansion of ρ(T) around T_0, emphasizing it is a first-order.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
