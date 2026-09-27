import type { SimDef } from '../../engine/types';
import C12_PhysicsPNJunctionDiodeSim from '../../../simulations/three/C12_PhysicsPNJunctionDiodeSim';

/** v3 wrapped master — C12_PhysicsPNJunctionDiodeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicspnjunctiondiodesim: SimDef = {
    id: 'v3w_c12_physicspnjunctiondiodesim',
    title: 'PNJunction Diode',
    subtitle: 'This node covers the formation of a p-n junction, the creation of the depletion layer,.',
    classLevel: 12, subject: 'physics', topic: 'p-n Junction: Formation and Depletion Layer',
    chapters: [],
    nodeIds: ['c12_phy_cbse_14_003', 'c12_phy_cbse_14_004', 'c12_phy_cbse_14_002', 'c12_phy_cbse_14_008', 'c12_phy_cbse_14_009', 'c12_phy_cbse_14_007', 'c12_phy_cbse_14_001', 'c12_phy_cbse_14_005', 'c12_phy_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you have two adjacent rooms: one filled with red balls (holes) and the other with blue balls.', goal: 'Master PNJunction Diode.' },
    discovery: {
        question: 'Why does the diffusion current decrease as the depletion layer widens during junction formation?',
        options: ['As the depletion layer widens, the electric field strength increases', 'diffusion stops because carriers run out', 'empty space'],
        answer: 'As the depletion layer widens, the electric field strength increases',
        hook: 'Students often think the depletion layer is "empty space" or vacuum.',
    },
    teaching: [
        { title: 'A p-n junction is formed when a p-type.', text: 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are joined together at the atomic level, creating a metallurgical junction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_002', title: 'An **intrinsic semiconductor** is a.',
          scaffold: { problem: '** A silicon wafer at 300 K has an intrinsic carrier concentration \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\).',
            steps: [
            { text: 'Identify given quantities: \\(n_i = 1.5 \\times 10^{16} \\text{m}^{-3}\\), \\(N_D = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(N_A.' },
            { text: 'Since \\(N_D \\gg n_i\\) (\\(5 \\times 10^{21} \\gg 1.5 \\times 10^{16}\\)), the electron concentration is dominated by donors:.' },
            { text: 'Apply mass-action law \\(n_e n_h = n_i^2\\) to find hole concentration:' },
            { text: 'Verify charge neutrality: \\(n_e = N_D + n_h \\approx 5 \\times 10^{21} + 4.5 \\times 10^{10} \\approx 5 \\times 10^{21}.' },
            { text: 'Identify carriers: Electrons are majority carriers (\\(n_e \\gg n_h\\)), holes are minority carriers.', faded: true, blankAnswer: '** \\(n_e = 5 \\times 10^{21} \\text{m}^{-3}\\), \\(n_h = 4.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_009', title: 'A transistor in common-emitter (CE).',
          scaffold: { problem: 'A CE amplifier uses an npn transistor with \\(\\beta = 150\\). The AC load resistance \\(R_L = 3.3\\ \\text{k}\\Omega\\) and the dynamic input.',
            steps: [
            { text: 'Identify given: \\(\\beta = 150\\), \\(R_L = 3300\\ \\Omega\\), \\(r_i = 1500\\ \\Omega\\), \\(v_{in,peak} = 0.020\\ \\text{V}\\),.' },
            { text: 'Recall formulas: \\(A_v = \\beta \\frac{R_L}{r_i}\\), \\(v_{out,peak} = A_v \\times v_{in,peak}\\), \\(A_p = \\beta^2.' },
            { text: 'Compute \\(A_v = 150 \\times \\frac{3300}{1500} = 150 \\times 2.2 = 330\\).' },
            { text: 'Compute \\(v_{out,peak} = 330 \\times 0.020 = 6.6\\ \\text{V}\\).' },
            { text: 'Compute \\(A_p = 150^2 \\times 2.2 = 22500 \\times 2.2 = 49500\\).' },
            { text: 'Compute \\(P_{out} = 49500 \\times 0.5 \\times 10^{-6} = 0.02475\\ \\text{W} = 24.75\\ \\text{mW}\\).' },
            { text: 'Verify: Output power (24.75 mW) is less than typical DC supply power (e.g., \\(V_{CC}=12\\ \\text{V}, I_C \\approx 3\\.', faded: true, blankAnswer: '(a) \\(A_v = 330\\), (b) \\(v_{out,peak} = 6.6\\ \\text{V}\\),.' }
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
        { type: 'dissect', nodeId: 'c12_phy_cbse_14_004', title: 'Identify each idea',
          dissect: { specimen: 'PNJunction Diode', spots: [
            { id: 's1', label: 'A p-n junction is formed', prompt: 'Which idea is this? — A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are.', answer: 'A p-n junction is formed', options: ['A p-n junction is formed', 'A p-n junction diode is', 'An intrinsic semiconductor is a', 'A junction transistor is a'] },
            { id: 's2', label: 'A p-n junction diode is', prompt: 'Which idea is this? — A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and.', answer: 'A p-n junction diode is', options: ['A p-n junction diode is', 'A p-n junction is formed', 'An intrinsic semiconductor is a', 'A junction transistor is a'] },
            { id: 's3', label: 'An intrinsic semiconductor is a', prompt: 'Which idea is this? — An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in which.', answer: 'An intrinsic semiconductor is a', options: ['An intrinsic semiconductor is a', 'A p-n junction is formed', 'A p-n junction diode is', 'A junction transistor is a'] },
            { id: 's4', label: 'A junction transistor is a', prompt: 'Which idea is this? — A junction transistor is a three-terminal semiconductor device consisting of two p-n.', answer: 'A junction transistor is a', options: ['A junction transistor is a', 'A p-n junction is formed', 'A p-n junction diode is', 'An intrinsic semiconductor is a'] },
            { id: 's5', label: 'A transistor in common-emitter CE', prompt: 'Which idea is this? — A transistor in common-emitter (CE) configuration acts as an amplifier by using a small.', answer: 'A transistor in common-emitter CE', options: ['A transistor in common-emitter CE', 'A p-n junction is formed', 'A p-n junction diode is', 'An intrinsic semiconductor is a'] },
            { id: 's6', label: 'A Zener diode is a', prompt: 'Which idea is this? — A Zener diode is a specially designed, heavily doped p-n junction diode that operates.', answer: 'A Zener diode is a', options: ['A Zener diode is a', 'A p-n junction is formed', 'A p-n junction diode is', 'An intrinsic semiconductor is a'] }
          ] } }
    ],
    explore: { component: C12_PhysicsPNJunctionDiodeSim, prompt: 'Explore the interactive — PNJunction Diode' },
    challenges: [
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
                  options: ['A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A junction transistor is a three-terminal semiconductor device consisting of two p-n'],
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
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_009', difficulty: 'standard',
          question: 'A transistor in common-emitter (CE) configuration acts as an amplifier by using.',
          hint: 'If stuck, review the transistor action animation in c12_phy_cbse_14_008 and practice.',
          misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A transistor in common-emitter (CE) configuration acts as an amplifier by using a small',
                  options: ['A transistor in common-emitter (CE) configuration acts as an amplifier by using a small', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are', 'A p-n junction diode is a two-terminal semiconductor device formed by joining p-type and', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.' }
          ],
            remediations: { 'the-transistor-creates-energy': { steps: ['Revisit c12_phy_cbse_14_008 (Junction Transistor) to recall transistor action and current components.', 'Review Class 10 electricity (c10_phy_cbse_01_003 Ohm\'s Law, c10_phy_cbse_01_010 Electric Power) for power conservation.', 'Perform a simple simulation (e.g., Falstad circuit simulator) of CE amplifier: vary \\(V_{CC}\\) and observe output power.', 'Re-attempt Diagnostic Question 5 with focus on energy source.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.',
          parts: [
                { id: 'a', prompt: 'A student builds a CE amplifier with fixed bias (\\(R_B\\) only) and finds the Q-point shifts drastically when temperature rises.', answer: 'Fixed bias makes \\(I_B\\) (and thus \\(I_C\\)) highly temperature-dependent',
                  options: ['Fixed bias makes \\(I_B\\) (and thus \\(I_C\\)) highly temperature-dependent', 'creates', 'the transistor "creates" energy, violating conservation of energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.' },
                { id: 'b', prompt: 'Design a simple experiment using a school laboratory CRO, function generator, and a BC547 transistor to demonstrate the phase reversal of a CE amplifier.', answer: 'Build voltage-divider bias CE amplifier with \\(V_{CC}=9\\ \\text{V}\\), \\(R_L=2.2\\',
                  options: ['Build voltage-divider bias CE amplifier with \\(V_{CC}=9\\ \\text{V}\\), \\(R_L=2.2\\', 'creates', 'the transistor "creates" energy, violating conservation of energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.' }
          ],
            remediations: { 'the-transistor-creates-energy': { steps: ['Revisit c12_phy_cbse_14_008 (Junction Transistor) to recall transistor action and current components.', 'Review Class 10 electricity (c10_phy_cbse_01_003 Ohm\'s Law, c10_phy_cbse_01_010 Electric Power) for power conservation.', 'Perform a simple simulation (e.g., Falstad circuit simulator) of CE amplifier: vary \\(V_{CC}\\) and observe output power.', 'Re-attempt Diagnostic Question 5 with focus on energy source.'] } } },
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
            remediations: { 'misconception-the-zener-diode-maintains': { steps: ['If the student holds this misconception: 1.', '**Revisit the I-V characteristic** of a Zener diode (from textbook or lab manual).', 'Plot Vz vs Iz on graph paper using datasheet values; calculate slope rz = ΔVz/ΔIz in the breakdown region.', '**Redo Worked Example 3** but now include rz = 10 Ω.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
