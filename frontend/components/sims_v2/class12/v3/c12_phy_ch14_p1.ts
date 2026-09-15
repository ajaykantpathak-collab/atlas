import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch14_p1: SimDef = {
    id: 'v3_c12_phy_ch14_p1',
    title: 'Semiconductor Electronics · Part 1/2',
    subtitle: 'Cold silicon insulates; warm silicon computes',
    classLevel: 12, subject: 'physics', topic: 'Semiconductor Electronics · Part 1/2',
    chapters: ['c12_phy_ch14'],
    nodeIds: ['c12_phy_cbse_14_001', 'c12_phy_cbse_14_002', 'c12_phy_cbse_14_003', 'c12_phy_cbse_14_004', 'c12_phy_cbse_14_005', 'c12_phy_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Semiconductor analyst', intro: 'Copper, plastic, silicon — same kind of stuff, wildly different behaviour. The difference is an energy gap.', goal: 'Read energy bands — valence, conduction, gap — and how doping rewrites carrier counts.' },
    discovery: {
        question: 'At absolute zero a silicon chip is a perfect insulator — yet at room temperature it powers your phone. What changed without adding a single atom?',
        options: ['Heat — kT ≈ 25 meV nudges electrons across the ~1 eV gap, creating mobile electrons AND holes; cold silicon simply has no carriers to move', 'Voltage appears', 'Atoms rearrange', 'Impurities grow'],
        answer: 'Heat — kT ≈ 25 meV nudges electrons across the ~1 eV gap, creating mobile electrons AND holes; cold silicon simply has no carriers to move',
        hook: 'One part per million of arsenic floods silicon with electrons — and the mass-action law n_e·n_h = n_i² quietly strangles the holes to compensate. The gap size sorts the world: zero is a metal, ~1 eV a semiconductor, above ~3 eV an insulator — same atoms, different bands.',
    },
    teaching: [
        { title: 'Energy Bands in Solids: Conductor, Insulator, Semiconductor', text: 'Energy bands in solids are continuous ranges of allowed energy levels for electrons, formed by the splitting and merging of discrete atomic energy levels when atoms come together to form a crystal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_14_001', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Classify a solid by its band gap: sketch the three band diagrams, explain why diamond\'s structure hides an insulator, and compute majority/minority carriers in doped silicon.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_001', title: 'Energy Bands in Solids: Conductor, Insulator, Semiconductor',
          scaffold: { problem: 'Three materials A, B, C have the following properties at room temperature: Material A: resistivity ρ = 2.5 × 10⁻⁸ Ω·m; Material B: ρ = 1.2.',
            steps: [
            { text: 'Recall the resistivity ranges from NCERT: Metals ρ ~ 10⁻² to 10⁻⁸ Ω·m; Semiconductors ρ ~ 10⁻⁵ to 10⁶ Ω·m; Insulators ρ.' },
            { text: 'Compare each material\'s resistivity to these ranges. Material A (2.5 × 10⁻⁸) falls in the metal range.' },
            { text: 'Relate resistivity to band gap. Low ρ → small/zero E_g (conductor). Intermediate ρ → moderate E_g (semiconductor).' },
            { text: 'State classification: A = Conductor (likely a metal like Cu), B = Semiconductor (e.g., doped Si), C = Insulator (e.g.' },
            { text: 'Verify consistency: Conductors have overlapping bands, semiconductors have E_g ~ 1 eV, insulators have E_g > 3 eV.', faded: true, blankAnswer: 'A: Conductor, B: Semiconductor, C: Insulator.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_002', title: 'Intrinsic and Extrinsic Semiconductors: Doping',
          scaffold: { problem: '** A silicon wafer at 300 K has an intrinsic carrier concentration \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\).',
            steps: [
            { text: 'Identify given quantities: \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), \\(N_D = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(N_A.' },
            { text: 'Since \\(N_D \\gg n_i\\) (\\(5 \\times 10^{21} \\gg 1.5 \\times 10^{16}\\)), the electron concentration is dominated by donors.' },
            { text: 'Apply mass-action law \\(n_e n_h = n_i^2\\) to find hole concentration:' },
            { text: 'Verify charge neutrality: \\(n_e = N_D + n_h \\approx 5 \\times 10^{21} + 4.5 \\times 10^{10} \\approx 5 \\times 10^{21}.' },
            { text: 'Identify carriers: Electrons are majority carriers (\\(n_e \\gg n_h\\)), holes are minority carriers.', faded: true, blankAnswer: '** \\(n_e = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(n_h = 4.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_003', title: 'p-n Junction: Formation and Depletion Layer',
          scaffold: { problem: 'A silicon p-n junction at 300 K has N_A = 2 × 10¹⁶ cm⁻³ and N_D = 5 × 10¹⁵ cm⁻³.',
            steps: [
            { text: 'Convert doping concentrations to SI units: N_A = 2 × 10²² m⁻³, N_D = 5 × 10²¹ m⁻³, n_i = 1.5 × 10¹⁶ m⁻³.' },
            { text: 'Calculate V_bi = (kT/q) ln(N_A N_D / n_i²). kT/q = 0.02585 V at 300 K. N_A N_D = 1 × 10⁴⁴ m⁻⁶. n_i² = 2.25 × 10³² m⁻⁶.' },
            { text: 'Calculate W = √[(2 ε_s V_bi / q)(1/N_A + 1/N_D)]. ε_s = 11.7 × 8.85e-12 = 1.035 × 10⁻¹⁰ F/m.' },
            { text: 'E_max = q N_D x_n / ε_s. First find x_n: x_n = W × N_A/(N_A+N_D) = 4.73e-7 × 2e22/(2.5e22) = 3.78e-7 m.' },
            { text: 'Verify: V_bi ≈ 0.7 V typical for Si. W ≈ 0.5 μm reasonable. E_max ≈ 3 × 10⁶ V/m below Si breakdown field (~3 × 10⁷.', faded: true, blankAnswer: '(a) V_bi = 0.69 V, (b) W = 0.47 μm, (c) E_max = 2.9 × 10⁶.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_004', title: 'p-n Junction Diode: Forward and Reverse Bias',
          scaffold: { problem: 'A silicon p-n junction diode is connected in forward bias with a 3.0 V battery and a 470 Ω series resistor.',
            steps: [
            { text: 'Identify given: V_battery = 3.0 V, R = 470 Ω, V_diode(5 mA) = 0.72 V, V_diode(6 mA) = 0.74 V. Find I_circuit, V_R, r_d.' },
            { text: 'Apply Kirchhoff\'s voltage law: V_battery = V_R + V_diode. Since V_diode ≈ 0.72 V at operating point, V_R = 3.0 – 0.72.' },
            { text: 'Circuit current I = V_R / R = 2.28 V / 470 Ω = 0.00485 A = 4.85 mA. (Consistent with assumed 5 mA operating point.)' },
            { text: 'Dynamic resistance r_d = ΔV_diode / ΔI_diode = (0.74 – 0.72) V / (6 – 5) mA = 0.02 V / 0.001 A = 20 Ω.' },
            { text: 'Verify: Power dissipated in diode = I × V_diode = 4.85 mA × 0.72 V ≈ 3.5 mW (safe for 1N4007).', faded: true, blankAnswer: '(a) 4.85 mA, (b) 2.28 V, (c) 20 Ω' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_005', title: 'Half-Wave Rectifier: Circuit and Working',
          scaffold: { problem: 'A half-wave rectifier uses a silicon diode (forward voltage drop 0.7 V) and a load resistor of 500 Ω.',
            steps: [
            { text: 'Identify given quantities. Transformer secondary RMS voltage V_s_rms = 12 V. Frequency f = 50 Hz.' },
            { text: 'Compute peak voltage of AC input: V_m = √2 * V_s_rms = 1.414 * 12 = 16.97 V.' },
            { text: 'During positive half-cycle, diode conducts when instantaneous voltage > V_f.' },
            { text: 'Average DC voltage V_dc = (V_m - V_f)/π = 16.27 / 3.1416 = 5.18 V.' },
            { text: 'RMS voltage across load (ideal approximation): V_rms = V_m/2 = 16.97/2 = 8.485 V.' },
            { text: 'DC power delivered to load P_dc = V_dc^2 / R_L = (5.06)^2 / 500 = 25.6/500 = 0.0512 W = 51.2 mW.', faded: true, blankAnswer: '(a) 16.27 V, (b) 5.06 V (exact) or 5.40 V (ideal), (c) 8.49.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior fabricating an n-type wafer expects the arsenic doping to \'raise both carrier counts — more electrons donated means more holes somewhere too.\'',
            decisions: [{ prompt: 'What does the mass-action law say actually happens to the holes?', options: [
                { text: 'They collapse — n_e·n_h = n_i² is fixed at a temperature, so pushing electrons up to ~N_D drives holes down by the same factor; doping doesn\'t create pairs, it tilts the balance — electrons become the majority by suppressing, not spawning, holes.', outcome: 'The chapter\'s accounting: donor electrons recombine into holes faster than thermal generation replaces them — the product is pinned at n_i², so the hole count falls off a cliff.' },
                { text: 'He\'s right — charge neutrality means electrons and holes must rise together.', outcome: 'Charge neutrality is a sum over donors too, not an electron-hole equality — the donor ions carry the positive charge, and the mass-action product forces holes down as electrons rise.', reveals: 'neutrality-equals-equal-carriers' },
                { text: 'Holes stay at n_i — doping only adds electrons on top without touching holes.', outcome: 'Fixed n_i² forbids that: if n_e rises by six orders of magnitude, n_h must fall by six orders — \'untouched\' isn\'t an option the equilibrium permits.', reveals: 'holes-unaffected-by-doping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a solid\'s conductivity from its band diagram — and see doping as a tilted balance the mass-action law enforces.',
            decisions: [{ prompt: 'What comes next? Semiconductor Electronics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Semiconductor Electronics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_001', difficulty: 'standard',
          question: 'Energy bands in solids are continuous ranges of allowed energy levels for.',
          hint: 'If stuck, revisit the Bohr model (Class 12 Chapter 12 Atoms) and the Class 10 electricity.',
          misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the.',
          parts: [
                { id: 'a', prompt: 'Explain why an intrinsic semiconductor behaves as a perfect insulator at absolute zero (0 K) but conducts at room temperature.', answer: 'At 0 K, all valence electrons are in the valence band',
                  options: ['At 0 K, all valence electrons are in the valence band', 'electrons move to the conduction band'],
                  hint: 'If stuck, revisit the Bohr model (Class 12 Chapter 12 Atoms) and the Class 10 electricity chapter.',
                  misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the number of holes.' },
                { id: 'b', prompt: 'Compare the energy band diagrams of a metal, an insulator, and a semiconductor at T = 0 K.', answer: 'Metal: (i) Valence band partially filled OR valence and conduction bands overlap',
                  options: ['Metal: (i) Valence band partially filled OR valence and conduction bands overlap', 'semiconductor has a partially filled valence band at 0 K'],
                  hint: 'If stuck, revisit the Bohr model (Class 12 Chapter 12 Atoms) and the Class 10 electricity chapter.',
                  misconception: 'Students often think: "In an n-type semiconductor, the donor electrons go into the valence band and fill holes, so the number of holes.' }
          ],
            remediations: { 'in-an-n-type-semiconductor': { steps: ['If the student holds the above misconception: (1) Revisit the energy band diagram of n-type semiconductor (NCERT Fig.', 'Identify E_D just below E_C.', '(2) Trace the electron: bound to donor → thermal energy → conduction band (free electron).', 'The donor site becomes a fixed positive core, not a mobile hole.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_002', difficulty: 'standard',
          question: 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge).',
          hint: 'Revisit c12_phy_cbse_14_001 (Energy Bands in Solids) and review the covalent bond model.',
          misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In the covalent-bond model of silicon, a pentavalent phosphorus atom replaces a silicon atom.', answer: 'The four phosphorus electrons participating in covalent bonds become part of the',
                  options: ['The four phosphorus electrons participating in covalent bonds become part of the', 'all five electrons become free', 'the fifth electron is in the conduction band already'],
                  hint: 'Revisit c12_phy_cbse_14_001 (Energy Bands in Solids) and review the covalent bond model of Si/Ge.',
                  misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s wrong:** Donor atoms.' }
          ],
            remediations: { 'misconception-in-an-n-type': { steps: ['Revisit **c12_phy_cbse_14_001** (Energy Bands in Solids) and redraw the energy band diagram for intrinsic Si at 0 K and.', 'Draw the 2D covalent-bond diagram for Si with one P atom and one B atom.', 'Explicitly show: (a) the four covalent bonds of P, (b) the fifth electron loosely bound, (c) after ionisation: \\(D^+\\).', 'Practice the mass-action law: given \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), calculate \\(n_h\\) for \\(n_e = 10^{20}.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** A student claims: "In an n-type semiconductor, holes are completely absent because the pentavalent dopant donates electrons that fill all the.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'holes are absent'],
                  hint: 'Revisit c12_phy_cbse_14_001 (Energy Bands in Solids) and review the covalent bond model of Si/Ge.',
                  misconception: '**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons." **Why it\'s wrong:** Donor atoms.' }
          ],
            remediations: { 'misconception-in-an-n-type': { steps: ['Revisit **c12_phy_cbse_14_001** (Energy Bands in Solids) and redraw the energy band diagram for intrinsic Si at 0 K and.', 'Draw the 2D covalent-bond diagram for Si with one P atom and one B atom.', 'Explicitly show: (a) the four covalent bonds of P, (b) the fifth electron loosely bound, (c) after ionisation: \\(D^+\\).', 'Practice the mass-action law: given \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), calculate \\(n_h\\) for \\(n_e = 10^{20}.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_003', difficulty: 'standard',
          question: 'A p-n junction is formed when a p-type semiconductor and an n-type.',
          hint: 'If stuck on band bending, revisit c12_phy_cbse_14_001 (energy bands in semiconductors).',
          misconception: 'Students often think the depletion layer is "empty space" or vacuum.',
          parts: [
                { id: 'a', prompt: 'Why does the diffusion current decrease as the depletion layer widens during junction formation?', answer: 'As the depletion layer widens, the electric field strength increases',
                  options: ['As the depletion layer widens, the electric field strength increases', 'diffusion stops because carriers run out', 'empty space', 'the depletion layer is "empty space" or vacuum'],
                  hint: 'If stuck on band bending, revisit c12_phy_cbse_14_001 (energy bands in semiconductors) and practice.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' },
                { id: 'b', prompt: 'Compare the depletion layer width in a symmetrically doped junction (N_A = N_D) versus an asymmetrically doped junction (N_A >> N_D) for the same total doping.', answer: 'The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer',
                  options: ['The asymmetrically doped junction (N_A >> N_D) has a wider depletion layer', 'empty space', 'the depletion layer is "empty space" or vacuum'],
                  hint: 'If stuck on band bending, revisit c12_phy_cbse_14_001 (energy bands in semiconductors) and practice.',
                  misconception: 'Students often think the depletion layer is "empty space" or vacuum.' }
          ],
            remediations: { 'the-depletion-layer-is-empty': { steps: ['If the student cannot explain why the depletion region has an electric field despite being "depleted", have them.', 'Then re-answer Diagnostic Question 2.', 'If they still confuse diffusion vs drift, draw the band diagram step-by-step: flat bands far from junction → carrier.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_004', difficulty: 'standard',
          question: 'A p-n junction diode is a two-terminal semiconductor device formed by joining.',
          hint: 'If stuck, review the formation of depletion layer and barrier potential in node.',
          misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and',
                  options: ['A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are'],
                  hint: 'If stuck, review the formation of depletion layer and barrier potential in node.',
                  misconception: 'Students often think the "knee voltage" (0.7 V for Si) is a fixed internal voltage drop that appears across the diode regardless.' }
          ],
            remediations: { 'the-knee-voltage-0': { steps: ['Revisit node c12_phy_cbse_14_003 to review the equilibrium barrier potential V_0 and depletion layer formation.', 'Perform the "diode voltage vs current" lab: use a 5 V supply, 1 kΩ potentiometer, silicon diode (1N4007), measure.', 'Re-read NCERT Section 14.6.1 and Example 14.4, focusing on how dynamic resistance changes with operating point.', 'Practice load-line problems from JEE archives (e.g., 2019, 2021) where diode voltage must be found graphically, not.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_005', difficulty: 'standard',
          question: 'A half-wave rectifier is a circuit that converts alternating current (AC) into.',
          hint: 'If stuck, review the diode forward/reverse bias behavior (node c12_phy_cbse_14_004) and.',
          misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".',
          parts: [
                { id: 'a', prompt: 'What is the output frequency of a half-wave rectifier if the input AC frequency is 50 Hz?', answer: 'The output frequency is 50 Hz',
                  options: ['The output frequency is 50 Hz', 'rectified', 'steady DC', 'the output of a half-wave rectifier is pure DC'],
                  hint: 'If stuck, review the diode forward/reverse bias behavior (node c12_phy_cbse_14_004) and the.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' },
                { id: 'b', prompt: 'A half-wave rectifier is supplied with a sinusoidal AC voltage of peak value 20 V across the load resistor.', answer: 'Given: V_m = 20 V',
                  options: ['Given: V_m = 20 V', 'rectified', 'steady DC', 'the output of a half-wave rectifier is pure DC'],
                  hint: 'If stuck, review the diode forward/reverse bias behavior (node c12_phy_cbse_14_004) and the.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' },
                { id: 'c', prompt: 'Compare the ripple factor of a half-wave rectifier (1.21) with that of a full-wave rectifier (0.48).', answer: 'The ripple factor γ = V_ac_rms / V_dc',
                  options: ['The ripple factor γ = V_ac_rms / V_dc', 'lower efficiency', 'rectified', 'steady DC'],
                  hint: 'If stuck, review the diode forward/reverse bias behavior (node c12_phy_cbse_14_004) and the.',
                  misconception: 'Students often think that the output of a half-wave rectifier is pure DC because it is "rectified".' }
          ],
            remediations: { 'the-output-of-a-half': { steps: ['If the student holds these misconceptions, first revisit the diode V-I characteristic (node c12_phy_cbse_14_004) to see.', 'Then, using an oscilloscope simulation (or real oscilloscope if available), display the input and output waveforms of.', 'Point out that the output voltage is zero for half the period, so it is not steady.', 'Calculate the average value by integrating the waveform over one period (using graphical area method) to show V_dc.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_006', difficulty: 'standard',
          question: 'A full-wave rectifier is a circuit that converts an alternating current (AC).',
          hint: 'Revisit c12_phy_cbse_14_004 for diode biasing and c12_phy_cbse_14_005 for half-wave.',
          misconception: '**Misconception**: "The output of a full-wave rectifier is pure DC." **Why it is wrong**: The output is a **pulsating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A full-wave rectifier is a circuit that converts an alternating current (AC) input into a',
                  options: ['A full-wave rectifier is a circuit that converts an alternating current (AC) input into a', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are'],
                  hint: 'Revisit c12_phy_cbse_14_004 for diode biasing and c12_phy_cbse_14_005 for half-wave rectifier.',
                  misconception: '**Misconception**: "The output of a full-wave rectifier is pure DC." **Why it is wrong**: The output is a **pulsating DC** — a series.' }
          ],
            remediations: { 'misconception-the-output-of-a': { steps: ['If the student believes the output is pure DC: 1.', 'Show a live CRO trace (or simulation) of the unfiltered output — point out the deep valleys between pulses.', 'Connect a 100 μF capacitor across the load and observe the ripple reduction; calculate the ripple voltage using.', 'Revisit the half-wave rectifier node (c12_phy_cbse_14_005) and compare the discharge time of the capacitor (20 ms vs 10.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
