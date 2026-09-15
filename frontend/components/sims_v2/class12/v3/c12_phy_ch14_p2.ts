import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch14_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch14_p2: SimDef = {
    id: 'v3_c12_phy_ch14_p2',
    title: 'Semiconductor Electronics · Part 2/2',
    subtitle: 'Cold silicon insulates; warm silicon computes',
    classLevel: 12, subject: 'physics', topic: 'Semiconductor Electronics · Part 2/2',
    chapters: ['c12_phy_ch14'],
    nodeIds: ['c12_phy_cbse_14_007', 'c12_phy_cbse_14_008', 'c12_phy_cbse_14_009', 'c12_phy_cbse_14_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Semiconductor analyst', intro: 'Copper, plastic, silicon — same kind of stuff, wildly different behaviour. The difference is an energy gap.', goal: 'Read energy bands — valence, conduction, gap — and how doping rewrites carrier counts.' },
    discovery: {
        question: 'At absolute zero a silicon chip is a perfect insulator — yet at room temperature it powers your phone. What changed without adding a single atom?',
        options: ['Heat — kT ≈ 25 meV nudges electrons across the ~1 eV gap, creating mobile electrons AND holes; cold silicon simply has no carriers to move', 'Voltage appears', 'Atoms rearrange', 'Impurities grow'],
        answer: 'Heat — kT ≈ 25 meV nudges electrons across the ~1 eV gap, creating mobile electrons AND holes; cold silicon simply has no carriers to move',
        hook: 'One part per million of arsenic floods silicon with electrons — and the mass-action law n_e·n_h = n_i² quietly strangles the holes to compensate. The gap size sorts the world: zero is a metal, ~1 eV a semiconductor, above ~3 eV an insulator — same atoms, different bands.',
    },
    teaching: [
        { title: 'Zener Diode: Voltage Regulator', text: 'A Zener diode is a specially designed, heavily doped p-n junction diode that operates reliably in the reverse breakdown region (Zener breakdown) to maintain a nearly constant voltage across its.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_14_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Classify a solid by its band gap: sketch the three band diagrams, explain why diamond\'s structure hides an insulator, and compute majority/minority carriers in doped silicon.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_007', title: 'Zener Diode: Voltage Regulator',
          scaffold: { problem: 'A 12 V DC power supply (which can vary from 10 V to 14 V) is to be regulated to 9.1 V for a sensor circuit that draws 10 mA to 30 mA.',
            steps: [
            { text: 'Identify given values: Vz = 9.1 V, Vin(min) = 10 V, Vin(max) = 14 V, IL(min) = 10 mA, IL(max) = 30 mA, Iz(min) = 2.' },
            { text: 'Calculate maximum allowable Rs from worst-case minimum Vin and maximum load current: Rs ≤ (Vin(min) - Vz) / (IL(max).' },
            { text: 'Verify Zener current at Vin(max) and IL(min) does not exceed Iz(max) = Pz(max)/Vz = 1/9.1 = 109.9 mA.' },
            { text: 'Recalculate Rs from maximum Zener current constraint: Rs ≥ (Vin(max) - Vz) / (IL(min) + Iz(max)) = (14 - 9.1) / (0.010.' },
            { text: 'Check if Rs = 47 Ω satisfies minimum Iz at Vin(min): Is(min) = (10 - 9.1)/47 = 0.9/47 = 19.15 mA.' },
            { text: 'For the sake of completing (c) and (d), assume we use Rs = 47 Ω and Vin is fixed at 12 V (no variation).' },
            { text: 'Load voltage variation due to rz: ΔIz = 51.7 - 31.7 = 20 mA. ΔVz = rz × ΔIz = 15 × 0.020 = 0.3 V.', faded: true, blankAnswer: '(a) Constraints conflict; no single Rs works for full Vin.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_14_009', title: 'Transistor as an Amplifier (CE Configuration)',
          scaffold: { problem: 'A CE amplifier uses an npn transistor with \\(\\beta = 150\\). The AC load resistance \\(R_L = 3.3\\ \\text{k}\\Omega\\) and the dynamic input.',
            steps: [
            { text: 'Identify given: \\(\\beta = 150\\), \\(R_L = 3300\\ \\Omega\\), \\(r_i = 1500\\ \\Omega\\), \\(v_{in,peak} = 0.020\\ \\text{V}\\).' },
            { text: 'Recall formulas: \\(A_v = \\beta \\frac{R_L}{r_i}\\), \\(v_{out,peak} = A_v \\times v_{in,peak}\\), \\(A_p = \\beta^2.' },
            { text: 'Compute \\(A_v = 150 \\times \\frac{3300}{1500} = 150 \\times 2.2 = 330\\).' },
            { text: 'Compute \\(v_{out,peak} = 330 \\times 0.020 = 6.6\\ \\text{V}\\).' },
            { text: 'Compute \\(A_p = 150^2 \\times 2.2 = 22500 \\times 2.2 = 49500\\).' },
            { text: 'Compute \\(P_{out} = 49500 \\times 0.5 \\times 10^{-6} = 0.02475\\ \\text{W} = 24.75\\ \\text{mW}\\).' },
            { text: 'Verify: Output power (24.75 mW) is less than typical DC supply power (e.g., \\(V_{CC}=12\\ \\text{V}, I_C \\approx 3\\.', faded: true, blankAnswer: '(a) \\(A_v = 330\\), (b) \\(v_{out,peak} = 6.6\\ \\text{V}\\).' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_14_010', title: 'Logic Gates: AND, OR, NOT, NAND, NOR',
          caseStudy: { intro: 'Observe a two-switch hallway light circuit in your home: the light turns ON only when **both** Switch A **AND** Switch B are ON — this is an AND gate.',
            decisions: [{ prompt: 'Draw the standard circuit symbol for a 2-input NAND gate and write its truth table. What is its Boolean expression?', options: [
                { text: '**Symbol:** AND gate symbol (D-shaped) with a small circle (inversion bubble) at the', outcome: '**Symbol:** AND gate symbol (D-shaped) with a small circle (inversion bubble) at the output tip.' },
                { text: 'two inputs like other gates', outcome: 'Not quite — Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol.', reveals: 'a-not-gate-can-have' },
                { text: '"two inputs like other gates"', outcome: 'Not quite — Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol.', reveals: 'a-not-gate-can-have' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A junior fabricating an n-type wafer expects the arsenic doping to \'raise both carrier counts — more electrons donated means more holes somewhere too.\'',
            decisions: [{ prompt: 'What does the mass-action law say actually happens to the holes?', options: [
                { text: 'They collapse — n_e·n_h = n_i² is fixed at a temperature, so pushing electrons up to ~N_D drives holes down by the same factor; doping doesn\'t create pairs, it tilts the balance — electrons become the majority by suppressing, not spawning, holes.', outcome: 'The chapter\'s accounting: donor electrons recombine into holes faster than thermal generation replaces them — the product is pinned at n_i², so the hole count falls off a cliff.' },
                { text: 'He\'s right — charge neutrality means electrons and holes must rise together.', outcome: 'Charge neutrality is a sum over donors too, not an electron-hole equality — the donor ions carry the positive charge, and the mass-action product forces holes down as electrons rise.', reveals: 'neutrality-equals-equal-carriers' },
                { text: 'Holes stay at n_i — doping only adds electrons on top without touching holes.', outcome: 'Fixed n_i² forbids that: if n_e rises by six orders of magnitude, n_h must fall by six orders — \'untouched\' isn\'t an option the equilibrium permits.', reveals: 'holes-unaffected-by-doping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_14_010', title: 'You made it',
          caseStudy: { intro: 'You can now read a solid\'s conductivity from its band diagram — and see doping as a tilted balance the mass-action law enforces.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_007', difficulty: 'standard',
          question: 'A Zener diode is a specially designed, heavily doped p-n junction diode that.',
          hint: 'If stuck, review the V-I characteristic of a Zener diode in reverse bias.',
          misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so.',
          parts: [
                { id: 'a', prompt: 'In a Zener regulator circuit, if the input voltage Vin increases while the load resistance RL remains constant, what happens to the Zener current Iz, the load.', answer: 'VL remains constant (= Vz)',
                  options: ['VL remains constant (= Vz)', 'IL increases', 'VL increases'],
                  hint: 'If stuck, review the V-I characteristic of a Zener diode in reverse bias (c12_phy_cbse_14_004) and.',
                  misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it can be used as.' }
          ],
            remediations: { 'misconception-the-zener-diode-maintains': { steps: ['If the student holds this misconception: 1.', '**Revisit the I-V characteristic** of a Zener diode (from textbook or lab manual).', 'Plot Vz vs Iz on graph paper using datasheet values; calculate slope rz = ΔVz/ΔIz in the breakdown region.', '**Redo Worked Example 3** but now include rz = 10 Ω.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so.',
          parts: [
                { id: 'a', prompt: 'A student builds a Zener regulator with Vz = 5.6 V, Rs = 220 Ω, Vin = 12 V (fixed), and no load (open circuit).', answer: '**Step 1: No-load condition.** With no load, IL = 0',
                  options: ['**Step 1: No-load condition.** With no load, IL = 0', 'Yes, it will be destroyed'],
                  hint: 'If stuck, review the V-I characteristic of a Zener diode in reverse bias (c12_phy_cbse_14_004) and.',
                  misconception: '**Misconception:** "The Zener diode maintains exactly the same voltage Vz regardless of the current through it, so it can be used as.' }
          ],
            remediations: { 'misconception-the-zener-diode-maintains': { steps: ['If the student holds this misconception: 1.', '**Revisit the I-V characteristic** of a Zener diode (from textbook or lab manual).', 'Plot Vz vs Iz on graph paper using datasheet values; calculate slope rz = ΔVz/ΔIz in the breakdown region.', '**Redo Worked Example 3** but now include rz = 10 Ω.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_008', difficulty: 'standard',
          question: 'A junction transistor is a three-terminal semiconductor device consisting.',
          hint: 'If stuck on biasing: Re-read c12_phy_cbse_14_004 section 14.6.1 and 14.6.2.',
          misconception: '**Misconception:** "The collector is larger than the emitter so it can collect more charge carriers." **Why it\'s.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** In an n-p-n transistor, the emitter is heavily doped n-type, the base is lightly doped p-type, and the collector is moderately doped n-type.', answer: 'very thin and (',
                  options: ['very thin and (', 'base is thin to reduce resistance'],
                  hint: 'If stuck on biasing: Re-read c12_phy_cbse_14_004 section 14.6.1 and 14.6.2.',
                  misconception: '**Misconception:** "The collector is larger than the emitter so it can collect more charge carriers." **Why it\'s wrong:** The collector.' }
          ],
            remediations: { 'misconception-the-collector-is-larger': { steps: ['Revisit **c12_phy_cbse_14_003** (p-n junction formation) to reinforce depletion region and built-in potential concepts.', 'Revisit **c12_phy_cbse_14_004** (p-n junction diode biasing) to practice identifying forward/reverse bias from battery.', 'Draw the n-p-n and p-n-p structures side-by-side on paper.', 'Label doping (n+, p, n) and (p+, n, p).'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_009', difficulty: 'standard',
          question: 'A transistor in common-emitter (CE) configuration acts as an amplifier by using.',
          hint: 'If stuck, review the transistor action animation in c12_phy_cbse_14_008 and practice.',
          misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A transistor in common-emitter (CE) configuration acts as an amplifier by using a small',
                  options: ['A transistor in common-emitter (CE) configuration acts as an amplifier by using a small', 'Energy bands in solids are continuous ranges of allowed energy levels for electrons,', 'An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in', 'A p-n junction is formed when a p-type semiconductor and an n-type semiconductor are'],
                  hint: 'If stuck, review the transistor action animation in c12_phy_cbse_14_008 and practice calculating.',
                  misconception: 'Students often think the transistor "creates" energy, violating conservation of energy.' }
          ],
            remediations: { 'the-transistor-creates-energy': { steps: ['Revisit c12_phy_cbse_14_008 (Junction Transistor) to recall transistor action and current components.', 'Review Class 10 electricity (c10_phy_cbse_01_003 Ohm\'s Law, c10_phy_cbse_01_010 Electric Power) for power conservation.', 'Perform a simple simulation (e.g., Falstad circuit simulator) of CE amplifier: vary \\(V_{CC}\\) and observe output power.', 'Re-attempt Diagnostic Question 5 with focus on energy source.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_14_010', difficulty: 'standard',
          question: 'A logic gate is an elementary building block of a digital circuit that performs.',
          hint: 'Review the transistor switching characteristics in c12_phy_cbse_14_008, specifically the.',
          misconception: 'Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol and think "two.',
          parts: [
                { id: 'a', prompt: 'Explain why a NAND gate is called a "universal gate". Can a single NOR gate also be used to implement any Boolean function? Justify your answer.', answer: 'A NAND gate is universal',
                  options: ['A NAND gate is universal', 'NAND is universal', 'two inputs like other gates', '"two inputs like other gates"'],
                  hint: 'Review the transistor switching characteristics in c12_phy_cbse_14_008, specifically the transfer.',
                  misconception: 'Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol and think "two inputs like other.' },
                { id: 'b', prompt: 'A circuit consists of a 2-input AND gate whose output is fed into a NOT gate. The inputs to the AND gate are A and B.', answer: '**Step 1:** AND gate output X = A·B',
                  options: ['**Step 1:** AND gate output X = A·B', 'two inputs like other gates', 'it\'s a NOR', '"two inputs like other gates"'],
                  hint: 'Review the transistor switching characteristics in c12_phy_cbse_14_008, specifically the transfer.',
                  misconception: 'Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol and think "two inputs like other.' },
                { id: 'c', prompt: 'Two circuits are given: Circuit P = A NOR B. Circuit Q = (NOT A) AND (NOT B). Are Circuit P and Circuit Q logically equivalent?', answer: '**Yes, they are equivalent.** **Proof by Truth Table:** A=0,B=0: P=(0+0)\'=1',
                  options: ['**Yes, they are equivalent.** **Proof by Truth Table:** A=0,B=0: P=(0+0)\'=1', 'two inputs like other gates', '"two inputs like other gates"'],
                  hint: 'Review the transistor switching characteristics in c12_phy_cbse_14_008, specifically the transfer.',
                  misconception: 'Students often believe that **a NOT gate can have two inputs** because they see the triangle symbol and think "two inputs like other.' }
          ],
            remediations: { 'a-not-gate-can-have': { steps: ['Revisit **c12_phy_cbse_14_008** (Junction Transistor) to review how a transistor acts as a switch (cutoff/saturation).', 'Draw each gate symbol **5 times** from memory, labeling inputs/outputs and the inversion bubble.', 'Write truth tables for all 5 gates side-by-side on one sheet; highlight the single row where each gate differs from the.', 'Practice the "NAND-only" implementation of NOT, AND, OR using the 3-step method in Diagnostic Answer 6.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
