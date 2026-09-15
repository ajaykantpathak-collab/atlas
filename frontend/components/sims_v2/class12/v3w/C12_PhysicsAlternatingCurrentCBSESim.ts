import type { SimDef } from '../../engine/types';
import C12_PhysicsAlternatingCurrentCBSESim from '../../../simulations/c6_12/C12_PhysicsAlternatingCurrentCBSESim';

/** v3 wrapped master — C12_PhysicsAlternatingCurrentCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsalternatingcurrentcbsesim: SimDef = {
    id: 'v3w_c12_physicsalternatingcurrentcbsesim',
    title: 'Alternating Current CBSE',
    subtitle: 'This node covers the definition, derivation, and calculation of RMS values for sinusoidal.',
    classLevel: 12, subject: 'physics', topic: 'AC Voltage and Current: RMS Value',
    chapters: [],
    nodeIds: ['c12_phy_cbse_07_001', 'c12_phy_cbse_07_003', 'c12_phy_cbse_07_004', 'c12_phy_cbse_07_009', 'c12_phy_cbse_06_005', 'c12_phy_cbse_06_006', 'c12_phy_cbse_14_005', 'c12_phy_cbse_14_006', 'c12_phy_cbse_07_002', 'c12_phy_cbse_07_005', 'c12_phy_cbse_07_006', 'c12_phy_cbse_07_007', 'c12_phy_cbse_07_008', 'c12_phy_cbse_13_005', 'c12_phy_cbse_10_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe the ceiling fan in your classroom — it runs on the 220 V AC mains supply.', goal: 'Master Alternating Current CBSE.' },
    discovery: {
        question: 'What is the SI unit of capacitive reactance, and how does it change if the frequency of the AC source is doubled while capacitance remains constant?',
        options: ['The SI unit of capacitive reactance is ohm (Ω)', 'ohm but increases with frequency', 'does not draw any current'],
        answer: 'The SI unit of capacitive reactance is ohm (Ω)',
        hook: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any.',
    },
    teaching: [
        { title: 'The root mean square (RMS) value of an.', text: 'The root mean square (RMS) value of an alternating current or voltage is the equivalent steady direct current or voltage that would produce the same average power dissipation in a purely resistive.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_001', title: 'The root mean square (RMS) value of an.',
          scaffold: { problem: 'An electric geyser rated 2000 W, 240 V RMS is connected to a household AC supply. The supply voltage has a frequency of 50 Hz.',
            steps: [
            { text: 'Identify given: P = 2000 W, Vrms = 240 V, f = 50 Hz. Find: R, vm, Irms, im, v(1.5 ms).' },
            { text: 'Use P = Vrms²/R → R = Vrms²/P. Use vm = √2 Vrms. Use Irms = P/Vrms. Use im = √2 Irms. Use ω = 2πf, v(t) = vm sin(ωt).' },
            { text: '(a) R = (240 V)² / 2000 W = 57600 / 2000 = 28.8 Ω. (b) vm = 1.414 × 240 V = 339.4 V.' },
            { text: 'Unit check: V²/W = Ω ✓, √2 × V = V ✓, W/V = A ✓, √2 × A = A ✓, rad/s × s = rad (dimensionless) ✓, V × dimensionless = V.' },
            { text: 'Physical reasonableness: Geyser element ~29 Ω is typical. Peak voltage 339 V > 240 V RMS ✓.', faded: true, blankAnswer: '(a) R = 28.8 Ω, (b) vm = 339.4 V, (c) Irms = 8.33 A, (d) im.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_003', title: 'Inductive reactance (\\(X_L\\)) is the.',
          scaffold: { problem: 'A pure inductor of 0.12 H is connected to a 220 V, 50 Hz household AC supply.',
            steps: [
            { text: 'Identify given quantities: \\(L = 0.12\\ \\text{H}\\), \\(V_{\\text{rms}} = 220\\ \\text{V}\\), \\(f = 50\\ \\text{Hz}\\), \\(v_m =.' },
            { text: 'Use \\(X_L = \\omega L = 2\\pi f L\\). Check units: \\(\\omega\\) in rad/s, \\(L\\) in H → Ω.' },
            { text: 'Compute \\(X_L = 314 \\times 0.12 = 37.68\\ \\Omega\\). (Using \\(\\omega = 314\\ \\text{rad/s}\\) from given voltage equation.)' },
            { text: '\\(I_{\\text{rms}} = V_{\\text{rms}} / X_L = 220 / 37.68 = 5.84\\ \\text{A}\\).' },
            { text: '\\(i_m = \\sqrt{2} \\times I_{\\text{rms}} = 1.414 \\times 5.84 = 8.26\\ \\text{A}\\).' },
            { text: 'Current lags voltage by \\(\\pi/2\\): \\(i = 8.26 \\sin(314 t - \\pi/2)\\ \\text{A}\\).', faded: true, blankAnswer: '(a) \\(X_L = 37.7\\ \\Omega\\), (b) \\(I_{\\text{rms}} = 5.84\\.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_004', title: 'Capacitive reactance (X_C) is the.',
          scaffold: { problem: 'A 12 µF capacitor is connected across a 230 V (rms), 50 Hz household AC supply in India.',
            steps: [
            { text: 'Identify given quantities: C = 12 µF = 12 × 10⁻⁶ F, V_rms = 230 V, f = 50 Hz.' },
            { text: 'Use X_C = 1/(2πfC). Substitute: X_C = 1 / (2 × 3.1416 × 50 × 12 × 10⁻⁶) = 1 / (3.77 × 10⁻³) = 265.3 Ω.' },
            { text: 'I_rms = V_rms / X_C = 230 / 265.3 = 0.867 A. I_m = √2 × I_rms = 1.414 × 0.867 = 1.226 A.' },
            { text: 'For instantaneous values, v = V_m sin(ωt), i = I_m sin(ωt + π/2) = I_m cos(ωt).' },
            { text: 'Check: X_C ≈ 265 Ω is reasonable for µF capacitor at 50 Hz. Current < 1 A rms is plausible.', faded: true, blankAnswer: '(a) X_C = 265 Ω, (b) I_rms = 0.867 A, (c) I_m = 1.23 A, (d).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_07_009', title: 'A transformer is a static electrical.',
          scaffold: { problem: 'A step-down transformer for a doorbell has 4000 turns on the primary and 100 turns on the secondary.',
            steps: [
            { text: 'Identify given quantities: Np = 4000, Ns = 100, Vp = 240 V (rms), Is = 0.6 A (rms), Vs (load) = 6 V.' },
            { text: 'Compute secondary voltage: Vs = (100/4000) × 240 V = 6 V. This matches the doorbell rating.' },
            { text: 'Use power conservation (ideal): Pin = Pout ⇒ Vp Ip = Vs Is ⇒ Ip = (Vs Is)/Vp = (6 V × 0.6 A)/240 V = 0.015 A.' },
            { text: 'Power delivered to doorbell: Pout = Vs Is = 6 V × 0.6 A = 3.6 W.' },
            { text: 'Turns ratio Np:Ns = 4000:100 = 40:1. Verify current ratio: Ip/Is = 0.015/0.6 = 1/40 = Ns/Np. All consistent.', faded: true, blankAnswer: '(a) Vs = 6 V (rms), (b) Ip = 0.015 A (rms), (c) Pout = 3.6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_005', title: 'An AC generator is a device that.',
          scaffold: { problem: 'A portable generator uses a 150-turn coil of area 0.08 m² rotating at 1500 rpm in a magnetic field of 0.25 T.',
            steps: [
            { text: 'Convert rotation speed to frequency: f = 1500 rpm = 1500/60 = 25 Hz. Angular speed ω = 2πf = 50π rad/s ≈ 157.08 rad/s.' },
            { text: 'Maximum emf ε₀ = NBAω = 150 × 0.25 × 0.08 × 157.08 = 471.24 V. Unit check: (T)(m²)(rad/s) = V.' },
            { text: 'At t=0, emf is zero and increasing → sin(ωt) = 0 with positive slope → ωt = 0. So ε(t) = ε₀ sin(ωt).' },
            { text: 'At t = 2.0 ms = 0.002 s, ωt = 157.08 × 0.002 = 0.31416 rad = π/10 rad. sin(π/10) ≈ 0.309.' },
            { text: 'ε = 471.24 × 0.309 ≈ 145.6 V.', faded: true, blankAnswer: '(a) 25 Hz, (b) 471 V, (c) 146 V' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_06_006', title: 'The energy stored in an inductor is the.',
          scaffold: { problem: 'A ceiling fan motor has a winding inductance of 120 mH. When running at full speed, it draws 0.8 A from the 230 V mains (assume DC for this.',
            steps: [
            { text: 'Identify given quantities: \\( L = 120 \\, \\text{mH} = 120 \\times 10^{-3} \\, \\text{H} \\), \\( I = 0.8 \\, \\text{A} \\), \\(.' },
            { text: 'Use energy formula \\( U = \\frac{1}{2} L I^2 \\). Substitute: \\( U = 0.5 \\times 120 \\times 10^{-3} \\times (0.8)^2 = 0.5.' },
            { text: 'For average back emf, use \\( |\\varepsilon_{\\text{avg}}| = L \\frac{|\\Delta I|}{\\Delta t} = 120 \\times 10^{-3} \\times.' },
            { text: 'Check units: \\( \\text{H} \\times \\text{A/s} = (\\text{V·s/A}) \\times \\text{A/s} = \\text{V} \\).' },
            { text: 'Physically reasonable: 48 V back emf is much less than 230 V, so no dangerous spark; 0.038 J is a small energy,.', faded: true, blankAnswer: 'Stored energy = 0.0384 J; average back emf = 48 V.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_07_003', title: 'Identify each idea',
          dissect: { specimen: 'Alternating Current CBSE', spots: [
            { id: 's1', label: 'The root mean square RMS', prompt: 'Which idea is this? — The root mean square (RMS) value of an alternating current or voltage is the equivalent.', answer: 'The root mean square RMS', options: ['The root mean square RMS', 'Inductive reactance X_L is the', 'Capacitive reactance X_C is the', 'A transformer is a static'] },
            { id: 's2', label: 'Inductive reactance X_L is the', prompt: 'Which idea is this? — Inductive reactance (\\(X_L\\)) is the opposition offered by a pure inductor to the flow of.', answer: 'Inductive reactance X_L is the', options: ['Inductive reactance X_L is the', 'The root mean square RMS', 'Capacitive reactance X_C is the', 'A transformer is a static'] },
            { id: 's3', label: 'Capacitive reactance X_C is the', prompt: 'Which idea is this? — Capacitive reactance (X_C) is the opposition offered by a pure capacitor to the flow of.', answer: 'Capacitive reactance X_C is the', options: ['Capacitive reactance X_C is the', 'The root mean square RMS', 'Inductive reactance X_L is the', 'A transformer is a static'] },
            { id: 's4', label: 'A transformer is a static', prompt: 'Which idea is this? — A transformer is a static electrical device that transfers alternating current (AC).', answer: 'A transformer is a static', options: ['A transformer is a static', 'The root mean square RMS', 'Inductive reactance X_L is the', 'Capacitive reactance X_C is the'] },
            { id: 's5', label: 'An AC generator is a', prompt: 'Which idea is this? — An AC generator is a device that converts mechanical energy into alternating current.', answer: 'An AC generator is a', options: ['An AC generator is a', 'The root mean square RMS', 'Inductive reactance X_L is the', 'Capacitive reactance X_C is the'] },
            { id: 's6', label: 'The energy stored in an', prompt: 'Which idea is this? — The energy stored in an inductor is the magnetic potential energy accumulated in the.', answer: 'The energy stored in an', options: ['The energy stored in an', 'The root mean square RMS', 'Inductive reactance X_L is the', 'Capacitive reactance X_C is the'] }
          ] } }
    ],
    explore: { component: C12_PhysicsAlternatingCurrentCBSESim, prompt: 'Explore the interactive — Alternating Current CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_001', difficulty: 'standard',
          question: 'The root mean square (RMS) value of an alternating current or voltage is the.',
          hint: 'If stuck on the integration step, review c11_math_cbse_13_004 (limits of trig functions).',
          misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈.',
          parts: [
                { id: 'a', prompt: 'What is the RMS value of a sinusoidal AC voltage whose peak value is 300 V? State the formula used and the final answer with units.', answer: 'Vrms = vm/√2 = 300 V / 1.414 ≈ 212 V',
                  options: ['Vrms = vm/√2 = 300 V / 1.414 ≈ 212 V', 'RMS means average'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈ 0.637 vm (the average.' },
                { id: 'b', prompt: 'The voltage across a household socket is rated as 220 V AC. A student says, "The voltage reaches 220 V at its peak." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'RMS means average'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈ 0.637 vm (the average.' },
                { id: 'c', prompt: 'A 60 W incandescent bulb is designed for a 220 V RMS AC supply.', answer: 'the resistance of the bulb filament (assume constant), (',
                  options: ['the resistance of the bulb filament (assume constant), (', 'RMS means average'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈ 0.637 vm (the average.' }
          ],
            remediations: { 'rms-means-average-and-compute': { steps: ['Revisit the definition of average power in a resistor: P_avg = (1/T)∫ i²R dt over one period.', 'For i = im sin(ωt), compute ∫ sin²(ωt) dt from 0 to T using sin²θ = ½(1 – cos 2θ).', 'Thus P_avg = ½ im²R.', 'Define Irms such that P_avg = Irms²R → Irms² = ½ im² → Irms = im/√2.', 'Contrast with average of |sin θ| = 2/π ≈ 0.637. Practice: c11_math_cbse_13_004 (limits of trig functions) and.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈.',
          parts: [
                { id: 'a', prompt: 'A student solves Example 7.1 from NCERT (100 W bulb, 220 V supply) and writes: "Peak current im = P/vm = 100 W / 311 V = 0.322 A." Identify the error in this.', answer: 'The error: P = VI holds for RMS values (P = Vrms Irms), not peak values',
                  options: ['The error: P = VI holds for RMS values (P = Vrms Irms), not peak values', 'RMS means average'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "RMS means average" and compute RMS as the average of the absolute value of the sine wave: (2/π)vm ≈ 0.637 vm (the average.' }
          ],
            remediations: { 'rms-means-average-and-compute': { steps: ['Revisit the definition of average power in a resistor: P_avg = (1/T)∫ i²R dt over one period.', 'For i = im sin(ωt), compute ∫ sin²(ωt) dt from 0 to T using sin²θ = ½(1 – cos 2θ).', 'Thus P_avg = ½ im²R.', 'Define Irms such that P_avg = Irms²R → Irms² = ½ im² → Irms = im/√2.', 'Contrast with average of |sin θ| = 2/π ≈ 0.637. Practice: c11_math_cbse_13_004 (limits of trig functions) and.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_003', difficulty: 'standard',
          question: 'Inductive reactance (\\(X_L\\)) is the opposition offered by a pure inductor to.',
          hint: 'Review Class 12 Physics Chapter 6 (Electromagnetic Induction) for self-inductance and.',
          misconception: 'Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a.',
          parts: [
                { id: 'a', prompt: 'A pure inductor of 40 mH is connected to a 220 V, 50 Hz AC supply.', answer: 'the inductive reactance, (',
                  options: ['the inductive reactance, (', 'current leads voltage (capacitor behaviour)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that because an inductor has reactance (opposition to current), it must dissipate energy like a resistor.' }
          ],
            remediations: { 'because-an-inductor-has-reactance': { steps: ['Revisit Faraday\'s law and self-inductance (Class 12 Chapter 6, Electromagnetic Induction) — focus on the sign of back.', 'Review the integration of \\(\\sin \\omega t\\) and the trigonometric identity \\(\\cos \\theta = \\sin(\\theta + \\pi/2)\\).', 'Perform the CRO experiment described in Diagnostic Question 6 (or simulate it online) to visually confirm the \\(\\pi/2\\).', 'Re-derive the current equation step-by-step from \\(v = L \\frac{di}{dt}\\) without skipping the integration constant.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_004', difficulty: 'standard',
          question: 'Capacitive reactance (X_C) is the opposition offered by a pure capacitor to the.',
          hint: 'If stuck, review c11_math_cbse_13_010 (derivatives of trigonometric functions) and.',
          misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of capacitive reactance, and how does it change if the frequency of the AC source is doubled while capacitance remains constant?', answer: 'The SI unit of capacitive reactance is ohm (Ω)',
                  options: ['The SI unit of capacitive reactance is ohm (Ω)', 'ohm but increases with frequency', 'does not draw any current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any current” or “the current.' },
                { id: 'b', prompt: 'In a pure capacitive AC circuit, the current leads the voltage by 90°.', answer: 'Current is the rate of change of charge (i = dq/dt)',
                  options: ['Current is the rate of change of charge (i = dq/dt)', 'voltage leads current', 'does not draw any current'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any current” or “the current.' },
                { id: 'c', prompt: 'A 20 µF capacitor is connected to a 240 V (rms), 50 Hz AC supply. Calculate: (a) the capacitive reactance, (b) the rms current, and (c) the peak current.', answer: 'the capacitive reactance, (',
                  options: ['the capacitive reactance, (', 'does not draw any current', 'the current is wattless so it’s not real'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any current” or “the current.' }
          ],
            remediations: { 'because-the-average-power-in': { steps: ['If the student confuses X_C formula or phase lead/lag: (1) Re-derive i = dq/dt = C dv/dt step by step using v = v_m.', '(2) Plot v(t) and i(t) on the same graph for ωt = 0 to 2π; mark zero crossings and peaks to see current peaks occur π/2.', '(3) Use the water analogy: capacitor = flexible diaphragm in a pipe; AC pressure makes water oscillate back and forth —.', 'Revisit c11_math_cbse_13_010 (derivative of sin is cos) and c12_phy_cbse_07_003 (inductor phase lag) for contrast.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any.',
          parts: [
                { id: 'a', prompt: 'A student claims: “Since a capacitor blocks DC, it should also block AC, so the current in a pure capacitive AC circuit must be zero.” Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'does not draw any current', 'the current is wattless so it’s not real'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any current” or “the current.' },
                { id: 'b', prompt: 'Design a simple experiment using a capacitor, a variable-frequency AC source (e.g., a function generator), an ammeter, and a voltmeter to verify that.', answer: 'Connect the capacitor in series with the ammeter across the function generator',
                  options: ['Connect the capacitor in series with the ammeter across the function generator', 'does not draw any current', 'the current is wattless so it’s not real'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because the average power in a pure capacitor is zero, the capacitor “does not draw any current” or “the current.' }
          ],
            remediations: { 'because-the-average-power-in': { steps: ['If the student confuses X_C formula or phase lead/lag: (1) Re-derive i = dq/dt = C dv/dt step by step using v = v_m.', '(2) Plot v(t) and i(t) on the same graph for ωt = 0 to 2π; mark zero crossings and peaks to see current peaks occur π/2.', '(3) Use the water analogy: capacitor = flexible diaphragm in a pipe; AC pressure makes water oscillate back and forth —.', 'Revisit c11_math_cbse_13_010 (derivative of sin is cos) and c12_phy_cbse_07_003 (inductor phase lag) for contrast.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_009', difficulty: 'standard',
          question: 'A transformer is a static electrical device that transfers alternating current.',
          hint: 'If stuck, review c10_phy_cbse_02_008 (Faraday’s law) and c12_phy_cbse_07_001 (RMS values).',
          misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of mutual inductance and write the formula that relates the induced emf in the secondary coil to the rate of change of current in the primary.', answer: 'SI unit: henry (H)',
                  options: ['SI unit: henry (H)', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces a.' },
                { id: 'b', prompt: 'A step-down transformer has 500 turns on the primary and 50 turns on the secondary.', answer: 'Vs = (Ns/Np) × Vp = (50/500) × 230 V = 23 V',
                  options: ['Vs = (Ns/Np) × Vp = (50/500) × 230 V = 23 V', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces a.' },
                { id: 'c', prompt: 'A transformer draws 0.5 A (rms) from a 220 V (rms) supply and delivers 12 V (rms) to a load drawing 8 A (rms).', answer: 'the turns ratio Np:Ns, (',
                  options: ['the turns ratio Np:Ns, (', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces a.' }
          ],
            remediations: { 'a-transformer-works-with-dc': { steps: ['Revisit Faraday’s law of electromagnetic induction (c10_phy_cbse_02_008) – do the magnet-and-coil demo to see that only.', 'Review mutual inductance concept: M = N₂Φ₂₁/I₁.', 'Re-derive Vs/Vp = Ns/Np from ε = –N dΦ/dt, emphasizing that Φ is the same for both coils only if coupling is perfect.', 'Practice a numerical problem where you compute primary current given a secondary load, using Ip = (Ns/Np)Is + I₀.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant.',
          parts: [
                { id: 'a', prompt: 'A student claims: “In a step-up transformer, the output power is greater than the input power because the voltage is increased.” Evaluate this statement and.', answer: 'The statement is false',
                  options: ['The statement is false', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces a.' },
                { id: 'b', prompt: 'Design a simple experiment using a low-voltage AC source (e.g., 6 V from a lab transformer), two coils of different turns, and a multimeter to verify the.', answer: 'Steps: (1) Wind two coils on a common iron rod (e.g., Np = 200, Ns = 100)',
                  options: ['Steps: (1) Wind two coils on a common iron rod (e.g., Np = 200, Ns = 100)', 'coils and iron core are present', 'a transformer works with DC'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a transformer works with DC because “coils and iron core are present.” They forget that a constant current produces a.' }
          ],
            remediations: { 'a-transformer-works-with-dc': { steps: ['Revisit Faraday’s law of electromagnetic induction (c10_phy_cbse_02_008) – do the magnet-and-coil demo to see that only.', 'Review mutual inductance concept: M = N₂Φ₂₁/I₁.', 'Re-derive Vs/Vp = Ns/Np from ε = –N dΦ/dt, emphasizing that Φ is the same for both coils only if coupling is perfect.', 'Practice a numerical problem where you compute primary current given a secondary load, using Ip = (Ns/Np)Is + I₀.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_005', difficulty: 'standard',
          question: 'An AC generator is a device that converts mechanical energy into alternating.',
          hint: 'If stuck, review the derivative of cosine (c11_math_cbse_13_006) and the flux-angle.',
          misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC.',
          parts: [
                { id: 'a', prompt: 'Explain why the emf induced in an AC generator is alternating (changes polarity periodically) even though the magnetic field and rotation direction are.', answer: 'The emf alternates',
                  options: ['The emf alternates', 'because the magnetic field changes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' },
                { id: 'b', prompt: 'A student claims: "If we double the number of turns N and halve the area A of the coil, the maximum emf ε₀ remains unchanged." Analyze this statement and state.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'ε₀ doubles because N doubled'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' }
          ],
            remediations: { 'the-slip-rings-cause-the': { steps: ['Revisit Faraday\'s law (c12_phy_cbse_06_001) and magnetic flux definition (c12_phy_cbse_06_001).', 'Practice flux calculation: Φ = BA cosθ for a rotating coil; plot Φ vs t and dΦ/dt vs t on paper.', 'Use the interactive animation link from NCERT (Fig.', '6.13) to visualize coil orientation, flux, and emf simultaneously.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If we double the number of turns N and halve the area A of the coil, the maximum emf ε₀ remains unchanged." Analyze this statement and state.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'ε₀ doubles because N doubled'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the slip rings *cause* the alternating current by reversing connections like a commutator in a DC motor.' }
          ],
            remediations: { 'the-slip-rings-cause-the': { steps: ['Revisit Faraday\'s law (c12_phy_cbse_06_001) and magnetic flux definition (c12_phy_cbse_06_001).', 'Practice flux calculation: Φ = BA cosθ for a rotating coil; plot Φ vs t and dΦ/dt vs t on paper.', 'Use the interactive animation link from NCERT (Fig.', '6.13) to visualize coil orientation, flux, and emf simultaneously.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_06_006', difficulty: 'standard',
          question: 'The energy stored in an inductor is the magnetic potential energy accumulated.',
          hint: 'Revisit c12_phy_cbse_06_004 (Self-Induction) and c11_phy_cbse_05_002 (Work Done by.',
          misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf.',
          parts: [
                { id: 'a', prompt: 'A solenoid of self-inductance \\( 40 \\, \\text{mH} \\) carries a steady current of \\( 2.5 \\, \\text{A} \\). Calculate the magnetic energy stored.', answer: 'Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)',
                  options: ['Given: \\( L = 40 \\times 10^{-3} \\, \\text{H} \\), \\( I = 2.5 \\, \\text{A} \\)', '\\( U \\propto I \\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the energy stored in an inductor is \\( U = L I \\) (linear in I) because they confuse the back emf magnitude \\( L.' }
          ],
            remediations: { 'the-energy-stored-in-an': { steps: ['If the student writes \\( U = L I \\) or \\( U = \\frac{1}{2} L I \\), have them re-derive step by step: (1) Write back emf.', '(2) Power \\( P = I \\varepsilon = L I \\frac{dI}{dt} \\).', '(3) Energy \\( dU = P dt = L I dI \\).', '(4) Integrate \\( \\int_0^I L I\' dI\' = \\frac{1}{2} L I^2 \\).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
