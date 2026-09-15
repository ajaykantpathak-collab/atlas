import type { SimDef } from '../../engine/types';
import C12_PhysicsZenerDiodeSim from '../../../simulations/c6_12/C12_PhysicsZenerDiodeSim';

/** v3 wrapped master — C12_PhysicsZenerDiodeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicszenerdiodesim: SimDef = {
    id: 'v3w_c12_physicszenerdiodesim',
    title: 'Zener Diode',
    subtitle: 'Covers: forward bias operation (minority carrier injection, exponential I-V relation,.',
    classLevel: 12, subject: 'physics', topic: 'p-n Junction Diode: Forward and Reverse Bias',
    chapters: [],
    nodeIds: ['c12_phy_cbse_14_004', 'c12_phy_cbse_14_005', 'c12_phy_cbse_14_007', 'c12_phy_cbse_14_001', 'c12_phy_cbse_14_002', 'c12_phy_cbse_14_003', 'c12_phy_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a simple LED torch: when you flip the switch, the LED lights up instantly; if you accidentally insert.', goal: 'Master Zener Diode.' },
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_005', title: 'A half-wave rectifier is a circuit that.',
          scaffold: { problem: 'A half-wave rectifier uses a silicon diode (forward voltage drop 0.7 V) and a load resistor of 500 Ω.',
            steps: [
            { text: 'Identify given quantities. Transformer secondary RMS voltage V_s_rms = 12 V. Frequency f = 50 Hz.' },
            { text: 'Compute peak voltage of AC input: V_m = √2 * V_s_rms = 1.414 * 12 = 16.97 V.' },
            { text: 'During positive half-cycle, diode conducts when instantaneous voltage > V_f.' },
            { text: 'Average DC voltage V_dc = (V_m - V_f)/π = 16.27 / 3.1416 = 5.18 V.' },
            { text: 'RMS voltage across load (ideal approximation): V_rms = V_m/2 = 16.97/2 = 8.485 V.' },
            { text: 'DC power delivered to load P_dc = V_dc^2 / R_L = (5.06)^2 / 500 = 25.6/500 = 0.0512 W = 51.2 mW.', faded: true, blankAnswer: '(a) 16.27 V, (b) 5.06 V (exact) or 5.40 V (ideal), (c) 8.49.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_007', title: 'A Zener diode is a specially designed,.',
          scaffold: { problem: 'A 12 V DC power supply (which can vary from 10 V to 14 V) is to be regulated to 9.1 V for a sensor circuit that draws 10 mA to 30 mA.',
            steps: [
            { text: 'Identify given values: Vz = 9.1 V, Vin(min) = 10 V, Vin(max) = 14 V, IL(min) = 10 mA, IL(max) = 30 mA, Iz(min) = 2 mA,.' },
            { text: 'Calculate maximum allowable Rs from worst-case minimum Vin and maximum load current: Rs ≤ (Vin(min) - Vz) / (IL(max) +.' },
            { text: 'Verify Zener current at Vin(max) and IL(min) does not exceed Iz(max) = Pz(max)/Vz = 1/9.1 = 109.9 mA.' },
            { text: 'Recalculate Rs from maximum Zener current constraint: Rs ≥ (Vin(max) - Vz) / (IL(min) + Iz(max)) = (14 - 9.1) / (0.010.' },
            { text: 'Check if Rs = 47 Ω satisfies minimum Iz at Vin(min): Is(min) = (10 - 9.1)/47 = 0.9/47 = 19.15 mA.' },
            { text: 'For the sake of completing (c) and (d), assume we use Rs = 47 Ω and Vin is fixed at 12 V (no variation).' },
            { text: 'Load voltage variation due to rz: ΔIz = 51.7 - 31.7 = 20 mA. ΔVz = rz × ΔIz = 15 × 0.020 = 0.3 V.', faded: true, blankAnswer: '(a) Constraints conflict; no single Rs works for full Vin.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_14_005', title: 'Identify each idea',
          dissect: { specimen: 'Zener Diode', spots: [
            { id: 's1', label: 'A p-n junction diode is', prompt: 'Which idea is this? — A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and.', answer: 'A p-n junction diode is', options: ['A p-n junction diode is', 'A half-wave rectifier is a', 'A Zener diode is a', 'Energy bands in solids are'] },
            { id: 's2', label: 'A half-wave rectifier is a', prompt: 'Which idea is this? — A half-wave rectifier is a circuit that converts alternating current (AC) into pulsating.', answer: 'A half-wave rectifier is a', options: ['A half-wave rectifier is a', 'A p-n junction diode is', 'A Zener diode is a', 'Energy bands in solids are'] },
            { id: 's3', label: 'A Zener diode is a', prompt: 'Which idea is this? — A Zener diode is a specially designed, heavily doped p-n junction diode that operates.', answer: 'A Zener diode is a', options: ['A Zener diode is a', 'A p-n junction diode is', 'A half-wave rectifier is a', 'Energy bands in solids are'] },
            { id: 's4', label: 'Energy bands in solids are', prompt: 'Which idea is this? — Energy bands in solids are continuous ranges of allowed energy levels for electrons,.', answer: 'Energy bands in solids are', options: ['Energy bands in solids are', 'A p-n junction diode is', 'A half-wave rectifier is a', 'A Zener diode is a'] },
            { id: 's5', label: 'An intrinsic semiconductor is a', prompt: 'Which idea is this? — An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in which.', answer: 'An intrinsic semiconductor is a', options: ['An intrinsic semiconductor is a', 'A p-n junction diode is', 'A half-wave rectifier is a', 'A Zener diode is a'] },
            { id: 's6', label: 'A p-n junction is formed', prompt: 'Which idea is this? — A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are.', answer: 'A p-n junction is formed', options: ['A p-n junction is formed', 'A p-n junction diode is', 'A half-wave rectifier is a', 'A Zener diode is a'] }
          ] } }
    ],
    explore: { component: C12_PhysicsZenerDiodeSim, prompt: 'Explore the interactive — Zener Diode' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_004', difficulty: 'standard',
          question: 'A p-n junction diode is a two-terminal semiconductor device formed by joining.',
          hint: 'If stuck, review the formation of depletion layer and barrier potential in node.',
          misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and',
                  options: ['A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'A half-wave rectifier is a circuit that converts alternating current (AC) into pulsating', 'A Zener diode is a specially designed, heavily doped p-n junction diode that operates', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,'],
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_005', difficulty: 'standard',
          question: 'A half-wave rectifier is a circuit that converts alternating current (AC) into.',
          hint: 'If stuck, review the diode forward/reverse bias behavior (node c12_phy_cbse_14_004) and.',
          misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".',
          parts: [
                { id: 'a', prompt: 'What is the output frequency of a half-wave rectifier if the input AC frequency is 50 Hz?', answer: 'The output frequency is 50 Hz',
                  options: ['The output frequency is 50 Hz', 'rectified', 'steady DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' },
                { id: 'b', prompt: 'A half-wave rectifier is supplied with a sinusoidal AC voltage of peak value 20 V across the load resistor.', answer: 'Given: V_m = 20 V',
                  options: ['Given: V_m = 20 V', 'rectified', 'steady DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' },
                { id: 'c', prompt: 'Compare the ripple factor of a half-wave rectifier (1.21) with that of a full-wave rectifier (0.48).', answer: 'The ripple factor γ = V_ac_rms / V_dc',
                  options: ['The ripple factor γ = V_ac_rms / V_dc', 'lower efficiency', 'rectified'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' }
          ],
            remediations: { 'the-output-of-a-half': { steps: ['If the student holds these misconceptions, first revisit the diode V-I characteristic (node c12_phy_cbse_14_004) to see.', 'Then, using an oscilloscope simulation (or real oscilloscope if available), display the input and output waveforms of a.', 'Point out that the output voltage is zero for half the period, so it is not steady.', 'Calculate the average value by integrating the waveform over one period (using graphical area method) to show V_dc =.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".',
          parts: [
                { id: 'a', prompt: 'A student claims that the efficiency of a half-wave rectifier is 81.2% because they used the formula for full-wave rectifier.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'rectified', 'steady DC', 'the output of a half-wave rectifier is pure DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' },
                { id: 'b', prompt: 'Design a simple experiment using a signal generator, a diode (1N4007), a resistor (1 kΩ), and an oscilloscope to verify the working of a half-wave rectifier.', answer: 'Connect the signal generator output to the diode\'s anode, diode\'s cathode to the',
                  options: ['Connect the signal generator output to the diode\'s anode, diode\'s cathode to the', 'rectified', 'steady DC', 'the output of a half-wave rectifier is pure DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' }
          ],
            remediations: { 'the-output-of-a-half': { steps: ['If the student holds these misconceptions, first revisit the diode V-I characteristic (node c12_phy_cbse_14_004) to see.', 'Then, using an oscilloscope simulation (or real oscilloscope if available), display the input and output waveforms of a.', 'Point out that the output voltage is zero for half the period, so it is not steady.', 'Calculate the average value by integrating the waveform over one period (using graphical area method) to show V_dc =.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_007', difficulty: 'standard',
          question: 'A Zener diode is a specially designed, heavily doped p-n junction diode that.',
          hint: 'If stuck, review the V-I characteristic of a Zener diode in reverse bias.',
          misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it.',
          parts: [
                { id: 'a', prompt: 'In a Zener regulator circuit, if the input voltage Vin increases while the load resistance RL remains constant, what happens to the Zener current Iz, the load.', answer: 'VL remains constant (= Vz)',
                  options: ['VL remains constant (= Vz)', 'IL increases', 'VL increases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it can be used as an.' }
          ],
            remediations: { 'misconception-the-zener-diode-maintains': { steps: ['If the student holds this misconception: 1.', '**Revisit the I-V characteristic** of a Zener diode (from textbook or lab manual).', 'Plot Vz vs Iz on graph paper using datasheet values; calculate slope rz = ΔVz/ΔIz in the breakdown region.', '**Redo Worked Example 3** but now include rz = 10 Ω.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it.',
          parts: [
                { id: 'a', prompt: 'A student builds a Zener regulator with Vz = 5.6 V, Rs = 220 Ω, Vin = 12 V (fixed), and no load (open circuit).', answer: '**Step 1: No-load condition.** With no load, IL = 0',
                  options: ['**Step 1: No-load condition.** With no load, IL = 0', 'Yes, it will be destroyed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it can be used as an.' }
          ],
            remediations: { 'misconception-the-zener-diode-maintains': { steps: ['If the student holds this misconception: 1.', '**Revisit the I-V characteristic** of a Zener diode (from textbook or lab manual).', 'Plot Vz vs Iz on graph paper using datasheet values; calculate slope rz = ΔVz/ΔIz in the breakdown region.', '**Redo Worked Example 3** but now include rz = 10 Ω.'] } } },
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
            remediations: { 'the-depletion-layer-is-empty': { steps: ['If the student cannot explain why the depletion region has an electric field despite being "depleted", have them.', 'Then re-answer Diagnostic Question 2.', 'If they still confuse diffusion vs drift, draw the band diagram step-by-step: flat bands far from junction → carrier.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
