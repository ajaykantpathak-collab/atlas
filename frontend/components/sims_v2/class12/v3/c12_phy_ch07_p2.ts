import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch07_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch07_p2: SimDef = {
    id: 'v3_c12_phy_ch07_p2',
    title: 'Alternating Current · Part 2/2',
    subtitle: '220 on the label, 311 at the peak',
    classLevel: 12, subject: 'physics', topic: 'Alternating Current · Part 2/2',
    chapters: ['c12_phy_ch07'],
    nodeIds: ['c12_phy_cbse_07_007', 'c12_phy_cbse_07_008', 'c12_phy_cbse_07_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'AC analyst', intro: 'The mains voltage is a wave swinging ±311 V — the number on the socket is its DC-equivalent for heating.', goal: 'Use RMS values — peak/√2 — and why power calculations live on RMS, not peak.' },
    discovery: {
        question: 'Your wall socket is labelled 220 V AC — but the sine wave actually swings to +311 V. Which number is \'the voltage,\' and why?',
        options: ['220 V is the RMS — the DC-equivalent heating value; the real peak is 311 V, and every appliance rating silently speaks RMS', '311 V is the rating', 'Average is zero', 'Both are equal'],
        answer: '220 V is the RMS — the DC-equivalent heating value; the real peak is 311 V, and every appliance rating silently speaks RMS',
        hook: 'Average AC over a cycle is zero — but i²R is never negative, which is why heating still happens and why RMS exists. And mixing peak with RMS is the classic trap: a \'200 V peak\' source loses to a \'150 V RMS\' source on real power.',
    },
    teaching: [
        { title: 'Power in AC Circuit: Power Factor', text: 'The power factor in an AC circuit is defined as the cosine of the phase angle (φ) between the RMS voltage and RMS current, denoted by cos φ.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_07_007', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Translate AC numbers honestly: convert peak and RMS both ways, compute a bulb\'s resistance and current on 220 V, and decide which mismatched source delivers more power.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_007', title: 'Power in AC Circuit: Power Factor',
          scaffold: { problem: 'A household refrigerator has a motor modeled as a series RL load with resistance 25 Ω and inductive reactance 60 Ω at 50 Hz.',
            steps: [
            { text: 'Identify given: R = 25 Ω, X_L = 60 Ω, V_rms = 230 V, f = 50 Hz. Target PF = 0.95 lagging.' },
            { text: 'Compute impedance Z = √(R² + X_L²) = √(25² + 60²) = √(625 + 3600) = √4225 = 65 Ω.' },
            { text: 'Compute I_rms = V_rms / Z = 230 / 65 = 3.538 A.' },
            { text: 'Compute power factor cos φ = R/Z = 25/65 = 0.3846 (lagging). Real power P = V_rms I_rms cos φ = 230 × 3.538 × 0.3846.' },
            { text: 'Compute reactive power Q = V_rms I_rms sin φ = 230 × 3.538 × √(1 - 0.3846²) = 230 × 3.538 × 0.923 = 752.6 VAR.' },
            { text: 'For PF correction to 0.95 lagging: New φ\' = cos⁻¹(0.95) = 18.19°. tan φ\' = 0.328.', faded: true, blankAnswer: '(a) Z = 65 Ω, (b) I_rms = 3.54 A, (c) PF = 0.385 lagging.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_008', title: 'LC Oscillations: Qualitative Treatment',
          scaffold: { problem: 'A $30\\,\\mu\\text{F}$ capacitor is charged to $100\\,\\text{V}$ by a battery.',
            steps: [
            { text: 'Identify given quantities with units: $C = 30 \\times 10^{-6}\\,\\text{F}$, $L = 27 \\times 10^{-3}\\,\\text{H}$, $V_0.' },
            { text: 'Use formula $\\omega = 1/\\sqrt{LC}$. Substitute values: $\\omega = 1/\\sqrt{(27 \\times 10^{-3})(30 \\times 10^{-6})}.' },
            { text: 'Total energy initially stored in capacitor: $U_{total} = \\frac{1}{2}CV_0^2 = \\frac{1}{2}(30 \\times 10^{-6})(100)^2.' },
            { text: 'At maximum current, all energy is magnetic: $U_{total} = \\frac{1}{2}LI_{max}^2$.' },
            { text: 'Verify units: $\\sqrt{\\text{J}/\\text{H}} =.', faded: true, blankAnswer: '(a) $1111\\,\\text{rad/s}$, (b) $3.33\\,\\text{A}$, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_009', title: 'Transformer: Principle, Working and Energy Losses',
          scaffold: { problem: 'A step-down transformer for a doorbell has 4000 turns on the primary and 100 turns on the secondary.',
            steps: [
            { text: 'Identify given quantities: Np = 4000, Ns = 100, Vp = 240 V (rms), Is = 0.6 A (rms), Vs (load) = 6 V.' },
            { text: 'Compute secondary voltage: Vs = (100/4000) × 240 V = 6 V. This matches the doorbell rating.' },
            { text: 'Use power conservation (ideal): Pin = Pout ⇒ Vp Ip = Vs Is ⇒ Ip = (Vs Is)/Vp = (6 V × 0.6 A)/240 V = 0.015 A.' },
            { text: 'Power delivered to doorbell: Pout = Vs Is = 6 V × 0.6 A = 3.6 W.' },
            { text: 'Turns ratio Np:Ns = 4000:100 = 40:1. Verify current ratio: Ip/Is = 0.015/0.6 = 1/40 = Ns/Np. All consistent.', faded: true, blankAnswer: '(a) Vs = 6 V (rms), (b) Ip = 0.015 A (rms), (c) Pout = 3.6.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An electrical trainee argues a heater can\'t be drawing real power on AC mains: \'the current averages to zero over a cycle — positive half, negative half, net nothing.\'',
            decisions: [{ prompt: 'Where does that reasoning fail?', options: [
                { text: 'At the squaring — power is i²R, and i² is positive on both halves of the cycle, so it averages to I²rms R, never zero; that\'s exactly why mains ratings are quoted in RMS — \'zero average current\' doesn\'t mean zero average work.', outcome: 'The chapter\'s distinction: the average of a quantity isn\'t the average of its square — dissipation counts both directions as heat.' },
                { text: 'He\'s right — net current is zero, so net energy is zero; heaters actually work on peak current.', outcome: 'Current\'s sign reversal doesn\'t undo the i² — the resistor heats on both halves; \'net nothing\' averages the wrong quantity, and peak current describes stress, not energy.', reveals: 'zero-average-equals-zero-power' },
                { text: 'Heater works because the filament\'s phase lags — resistive loads delay the current.', outcome: 'In a pure resistor v and i are in phase — phase lag is the inductor\'s story; the heater works because i²R stays positive, not because of any shift.', reveals: 'resistors-shift-phase' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_07_009', title: 'You made it',
          caseStudy: { intro: 'You can now read any AC rating — knowing it\'s the heating-equivalent, not the peak, the nameplate promises.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_007', difficulty: 'standard',
          question: 'The power factor in an AC circuit is defined as the cosine of the phase angle.',
          hint: 'If stuck on phase angle sign: Revisit c12_phy_cbse_07_003 and c12_phy_cbse_07_004.',
          misconception: 'Students often believe that "power factor = 1" means the circuit is purely resistive.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of power factor, and what is its value for a purely resistive AC circuit?', answer: 'Power factor is dimensionless (no SI unit)',
                  options: ['Power factor is dimensionless (no SI unit)', 'power factor = 1', 'unit as Watt or value as 0', '"power factor = 1" means the circuit is purely resistive'],
                  hint: 'If stuck on phase angle sign: Revisit c12_phy_cbse_07_003 and c12_phy_cbse_07_004 — inductor.',
                  misconception: 'Students often believe that "power factor = 1" means the circuit is purely resistive.' },
                { id: 'b', prompt: 'In a series LCR circuit, the voltage across the inductor is 120 V, across the capacitor is 80 V, and across the resistor is 60 V (all RMS).', answer: 'The reasoning is accidentally correct numerically but conceptually flawed',
                  options: ['The reasoning is accidentally correct numerically but conceptually flawed', 'power factor = 1', '"power factor = 1" means the circuit is purely resistive', 'improving power factor increases real power delivered to the load'],
                  hint: 'If stuck on phase angle sign: Revisit c12_phy_cbse_07_003 and c12_phy_cbse_07_004 — inductor.',
                  misconception: 'Students often believe that "power factor = 1" means the circuit is purely resistive.' },
                { id: 'c', prompt: 'A series LCR circuit has R = 40 Ω, X_L = 70 Ω, X_C = 30 Ω, and is connected to a 230 V, 50 Hz RMS supply.', answer: 'the impedance Z, (',
                  options: ['the impedance Z, (', 'power factor = 1', '"power factor = 1" means the circuit is purely resistive', 'improving power factor increases real power delivered to the load'],
                  hint: 'If stuck on phase angle sign: Revisit c12_phy_cbse_07_003 and c12_phy_cbse_07_004 — inductor.',
                  misconception: 'Students often believe that "power factor = 1" means the circuit is purely resistive.' },
                { id: 'd', prompt: 'Two circuits are connected to the same 220 V, 50 Hz RMS supply. Circuit A: pure resistance 50 Ω.', answer: 'Circuit A: Z = 50 Ω, cos φ = 1, I_rms = 220/50 = 4.4 A, P = 220×4.4×1 = 968 W',
                  options: ['Circuit A: Z = 50 Ω, cos φ = 1, I_rms = 220/50 = 4.4 A, P = 220×4.4×1 = 968 W', 'power factor = 1', '"power factor = 1" means the circuit is purely resistive', 'improving power factor increases real power delivered to the load'],
                  hint: 'If stuck on phase angle sign: Revisit c12_phy_cbse_07_003 and c12_phy_cbse_07_004 — inductor.',
                  misconception: 'Students often believe that "power factor = 1" means the circuit is purely resistive.' }
          ],
            remediations: { 'power-factor-1-means-the': { steps: ['If the student confuses resonance PF=1 with purely resistive circuit: Revisit node c12_phy_cbse_07_006 (Resonance) and.', 'Draw phasor diagrams for (a) pure R, (b) series LCR at resonance.', 'Show that in both, V and I are in phase, but in (b) V_L and V_C are non-zero and cancel.', 'If the student thinks PF correction increases load power: Revisit node c12_phy_cbse_07_005 (LCR series) and the concept.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_008', difficulty: 'standard',
          question: 'LC oscillations are the periodic exchange of energy between a capacitor.',
          hint: 'Revisit the energy formulas for capacitor and inductor from Class 12 Electrostatics and.',
          misconception: '**Misconception:** "When the capacitor is fully discharged ($q=0$), the current in the circuit is zero because there.',
          parts: [
                { id: 'a', prompt: 'Sketch qualitative graphs (no numerical axes) of charge $q(t)$, current $i(t)$, capacitor energy $U_C(t)$, and inductor energy $U_L(t)$ for one full cycle.', answer: '- $q(t)$: Cosine wave starting at $+Q_{max}$',
                  options: ['- $q(t)$: Cosine wave starting at $+Q_{max}$', 'both energies peak together, violating energy conservation'],
                  hint: 'Revisit the energy formulas for capacitor and inductor from Class 12 Electrostatics and.',
                  misconception: '**Misconception:** "When the capacitor is fully discharged ($q=0$), the current in the circuit is zero because there is no charge to flow.".' }
          ],
            remediations: { 'misconception-when-the-capacitor-is': { steps: ['If the student holds this misconception: (1) Revisit the mass-spring analogy: at $x=0$, $v = v_{max}$; map $x.', '(2) Write the energy conservation equation: $\\frac{q^2}{2C} + \\frac{1}{2}Li^2 = \\text{constant}$.', 'Set $q=0$ and solve for $i$.', '(3) Perform the "LC circuit simulation" thought experiment: start with charged capacitor, zero current.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_009', difficulty: 'standard',
          question: 'A transformer is a static electrical device that transfers alternating current.',
          hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values).',
          misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of mutual inductance and write the formula that relates the induced emf in the secondary coil to the rate of change of current in the primary.', answer: 'SI unit: henry (H)',
                  options: ['SI unit: henry (H)', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' },
                { id: 'b', prompt: 'A step-down transformer has 500 turns on the primary and 50 turns on the secondary.', answer: 'Vs = (Ns/Np) × Vp = (50/500) × 230 V = 23 V',
                  options: ['Vs = (Ns/Np) × Vp = (50/500) × 230 V = 23 V', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' },
                { id: 'c', prompt: 'A transformer draws 0.5 A (rms) from a 220 V (rms) supply and delivers 12 V (rms) to a load drawing 8 A (rms).', answer: 'the turns ratio Np:Ns, (',
                  options: ['the turns ratio Np:Ns, (', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' },
                { id: 'd', prompt: 'Compare the eddy current loss in a solid iron core versus a laminated core of the same dimensions and material. Explain the physics behind the reduction.', answer: 'Eddy current loss is drastically lower in the laminated core',
                  options: ['Eddy current loss is drastically lower in the laminated core', 'laminations increase resistance', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' }
          ],
            remediations: { 'a-transformer-works-with-dc': { steps: ['Revisit Faraday’s law of electromagnetic induction (c10_phy_cbse_02_008) – do the magnet-and-coil demo to see that only.', 'Review mutual inductance concept: M = N₂Φ₂₁/I₁.', 'Re-derive Vs/Vp = Ns/Np from ε = –N dΦ/dt, emphasizing that Φ is the same for both coils only if coupling is perfect.', 'Practice a numerical problem where you compute primary current given a secondary load, using Ip = (Ns/Np)Is + I₀.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant.',
          parts: [
                { id: 'a', prompt: 'A student claims: “In a step-up transformer, the output power is greater than the input power because the voltage is increased.” Evaluate this statement and.', answer: 'The statement is false',
                  options: ['The statement is false', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' },
                { id: 'b', prompt: 'Design a simple experiment using a low-voltage AC source (e.g., 6 V from a lab transformer), two coils of different turns, and a multimeter to verify the.', answer: '(1) Wind two coils on a common iron rod (e.g., Np = 200, Ns =',
                  options: ['(1) Wind two coils on a common iron rod (e.g., Np = 200, Ns =', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values) with the.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces.' }
          ],
            remediations: { 'a-transformer-works-with-dc': { steps: ['Revisit Faraday’s law of electromagnetic induction (c10_phy_cbse_02_008) – do the magnet-and-coil demo to see that only.', 'Review mutual inductance concept: M = N₂Φ₂₁/I₁.', 'Re-derive Vs/Vp = Ns/Np from ε = –N dΦ/dt, emphasizing that Φ is the same for both coils only if coupling is perfect.', 'Practice a numerical problem where you compute primary current given a secondary load, using Ip = (Ns/Np)Is + I₀.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
