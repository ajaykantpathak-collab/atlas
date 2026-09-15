import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch14_p1: SimDef = {
    id: 'v3_c11_phy_ch14_p1',
    title: 'Waves · Part 1/2',
    subtitle: 'Learn that the drawing is a graph, not a portrait of the motion.',
    classLevel: 11, subject: 'physics', topic: 'Waves · Part 1/2',
    chapters: ['c11_phy_ch14'],
    nodeIds: ['c11_phy_cbse_14_001', 'c11_phy_cbse_14_002', 'c11_phy_cbse_14_003', 'c11_phy_cbse_14_004', 'c11_phy_cbse_14_005', 'c11_phy_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wave-watcher separating particle dance from wave travel', intro: 'The wave slides down the rope while each bit of rope just bobs — direction of travel is not direction of wiggle.', goal: 'Classify transverse vs longitudinal correctly and identify the medium as the source of wave speed.' },
    discovery: {
        question: 'Shake a rope\'s end up and down; the ripple runs along the rope — \'so this is a longitudinal wave, the motion travels forward.\' Right?',
        options: ['No — the test is particle motion versus wave travel: the rope moves up-down while the wave runs along it — transverse', 'Yes — forward travel means longitudinal', 'Yes — waves on strings are longitudinal', 'No — it\'s not a wave at all'],
        answer: 'No — the test is particle motion versus wave travel: the rope moves up-down while the wave runs along it — transverse',
        hook: 'We draw sound as a sine curve on paper, yet sound is longitudinal — the picture shows pressure, not sideways jiggle.',
    },
    teaching: [
        { title: 'Transverse and Longitudinal Waves', text: 'A mechanical wave is classified as **transverse** if the particles of the medium oscillate perpendicular to the direction of wave propagation, and **longitudinal** if the particles oscillate parallel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_14_001', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Correct the \'higher frequency means faster wave\' belief — the medium sets v, so doubling ν halves λ while speed stays put.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_002', title: 'Speed of Wave: Formula',
          scaffold: { problem: 'A nylon guitar string of length 65 cm and mass 0.32 g is under a tension of 80 N.',
            steps: [
            { text: 'Identify given quantities with units. L = 65 cm = 0.65 m, m = 0.32 g = 0.32 × 10⁻³ kg = 3.2 × 10⁻⁴ kg, T = 80 N, ν.' },
            { text: 'Calculate linear mass density μ = m/L = (3.2 × 10⁻⁴ kg) / (0.65 m) = 4.92 × 10⁻⁴ kg/m.' },
            { text: 'Calculate wave speed v = √(T/μ) = √(80 N / 4.92 × 10⁻⁴ kg/m). Check units: N = kg·m/s², so T/μ = (kg·m/s²)/(kg/m).' },
            { text: 'v = √(80 / 4.92 × 10⁻⁴) = √(1.626 × 10⁵) = 403.2 m/s ≈ 403 m/s.' },
            { text: 'Calculate wavelength λ = v/ν = 403.2 m/s / 440 Hz = 0.916 m = 91.6 cm.' },
            { text: 'Verify physical reasonableness: Guitar string wave speeds are typically 200-500 m/s.', faded: true, blankAnswer: '(a) μ = 4.92 × 10⁻⁴ kg/m, (b) v = 403 m/s, (c) λ = 0.916.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_003', title: 'Speed of Sound in Air: Newton\'s and Laplace\'s Correction',
          scaffold: { problem: 'A physics student measures the speed of sound in air at a hill station where the temperature is 10°C and atmospheric pressure is 0.85 × 10⁵.',
            steps: [
            { text: 'Identify given quantities with units: T = 10°C = 283 K, P = 0.85 × 10⁵ Pa, γ = 1.4, M = 29 × 10⁻³ kg/mol, R = 8.31.' },
            { text: 'Choose formula v = √(γRT/M) since T is given (more direct than v = √(γP/ρ) which requires ρ).' },
            { text: 'Substitute values: v = √(1.4 × 8.31 × 283 / 0.029) = √(3301.5 / 0.029) = √(113845)' },
            { text: 'Compute: v = 337.4 m/s (Laplace). For Newton: v_N = √(RT/M) = √(8.31 × 283 / 0.029) = √(81177) = 284.9 m/s' },
            { text: 'Percentage difference = (337.4 - 284.9)/337.4 × 100% = 15.6%. Check reasonableness: At 0°C (273 K), v ≈ 331 m/s;.', faded: true, blankAnswer: 'v_Laplace = 337 m/s, v_Newton = 285 m/s, percentage.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_004', title: 'Speed of Sound: Factors Affecting',
          scaffold: { problem: 'The speed of sound in oxygen gas at 0°C is 316 m/s. Calculate the speed of sound in hydrogen gas at the same temperature.',
            steps: [
            { text: 'Identify given quantities: \\( v_{O_2} = 316 \\) m/s at \\( T = 273 \\) K, \\( M_{O_2} = 0.032 \\) kg/mol, \\( M_{H_2} = 0.002.' },
            { text: 'Use the formula \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\). Since γ, R, T are same for both gases, \\( v \\propto.' },
            { text: 'Set up ratio: \\( \\frac{v_{H_2}}{v_{O_2}} = \\sqrt{\\frac{M_{O_2}}{M_{H_2}}} \\).' },
            { text: 'Substitute values: \\( \\frac{v_{H_2}}{316} = \\sqrt{\\frac{32}{2}} = \\sqrt{16} = 4 \\).' },
            { text: 'Compute: \\( v_{H_2} = 4 \\times 316 = 1264 \\) m/s. Check units: m/s, reasonable (hydrogen is lighter, so faster).', faded: true, blankAnswer: '1264 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_005', title: 'Principle of Superposition of Waves',
          scaffold: { problem: 'Two harmonic waves traveling along a string fixed at both ends are given by y₁ = 0.03 sin(πx - 20πt) and y₂ = 0.03 sin(πx - 20πt + π/4).',
            steps: [
            { text: 'Identify given parameters from wave equations. For both waves: a = 0.03 m, k = π rad/m, ω = 20π rad/s.' },
            { text: 'Calculate resultant amplitude using A = 2a cos(φ/2) = 2 × 0.03 × cos(π/8). cos(π/8) = cos(22.5°) ≈ 0.9239.' },
            { text: 'Frequency f = ω/(2π) = 20π/(2π) = 10 Hz. Wavelength λ = 2π/k = 2π/π = 2 m. Speed v = fλ = 10 × 2 = 20 m/s.' },
            { text: 'Resultant phase constant = φ/2 = π/8. Resultant wave equation: y = A sin(kx - ωt + φ/2) = 0.0554 sin(πx - 20πt + π/8) m.' },
            { text: 'Verify units: A in m, k in rad/m, ω in rad/s, argument of sine dimensionless.', faded: true, blankAnswer: 'Resultant amplitude = 0.0554 m, frequency = 10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_006', title: 'Interference of Waves: Constructive and Destructive',
          scaffold: { problem: 'Two coherent sound sources S₁ and S₂ are placed 1.5 m apart and emit sound waves of frequency 680 Hz in phase.',
            steps: [
            { text: 'Calculate wavelength λ = v/f = 340/680 = 0.5 m.' },
            { text: 'Identify geometry: source separation d = 1.5 m, screen distance D = 12 m.' },
            { text: 'Compute β = (0.5 × 12)/1.5 = 4.0 m. This is the distance between consecutive maxima.' },
            { text: 'For path difference Δx = 37.5 cm = 0.375 m, calculate phase difference φ = 2π(Δx/λ) = 2π(0.375/0.5) = 2π(0.75) = 1.5π.' },
            { text: 'Verify: φ = 3π/2 is an odd multiple of π/2, not π, so neither fully constructive nor destructive — intermediate.', faded: true, blankAnswer: 'Distance between consecutive maxima = 4.0 m; Phase.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a wave-demo stall, a student draws a sound wave\'s particles oscillating up-down \'like the sine curve in the book\' and claims a 1000 Hz note travels faster through a steel wire than a 10 Hz note \'because higher frequency means faster wave.\'',
            decisions: [{ prompt: 'What does wave physics actually say?', options: [
                { text: 'Separate the graph from the physics: the sine drawing plots displacement magnitude — sound\'s particles actually oscillate PARALLEL to propagation (longitudinal); transverse needs shear rigidity, which air lacks. And the medium sets the speed: v = √(T/μ) for the wire — 93 m/s whether the source hums at 10 Hz or 1000 Hz; frequency comes from the source, and only wavelength adjusts (λ = v/ν).', outcome: 'The demo is corrected: drawings are representations, and the source picks frequency while the medium picks speed — v = λν is a consequence, not a dial.' },
                { text: 'Keep the up-down arrows — the sine-wave picture is how sound is drawn, so that\'s how particles move.', outcome: 'The picture\'s y-axis is displacement magnitude, not a physical direction: sound in air is a compression wave — particles move along the propagation axis.', reveals: 'sine-graph-means-transverse' },
                { text: 'Keep the faster treble — v = λν literally shows frequency driving speed.', outcome: 'That reads the relation backwards: v is fixed by tension and density; raising ν only shrinks λ — the speed doesn\'t follow the source.', reveals: 'frequency-sets-wave-speed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Tension and mass-per-length set the speed; frequency and amplitude only decide the shape of what travels.',
            decisions: [{ prompt: 'What comes next? Waves · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Waves · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_001', difficulty: 'standard',
          question: 'A mechanical wave is classified as **transverse** if the particles of the.',
          hint: 'If stuck, revisit Class 9 "Sound Waves: Longitudinal Waves and Compressions".',
          misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A mechanical wave is classified as **transverse** if the particles of the medium',
                  options: ['A mechanical wave is classified as **transverse** if the particles of the medium', 'The speed of a travelling wave is the rate at', 'The speed of sound in air is the rate at', 'The speed of sound in a medium is the rate at'],
                  hint: 'If stuck, revisit Class 9 "Sound Waves: Longitudinal Waves and Compressions" (c9_physics_ch5_3) and.',
                  misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:** Students see the.' }
          ],
            remediations: { 'misconception-sound-waves-are-transverse': { steps: ['** Use a **slinky** — have the student hold one end while you send a longitudinal pulse (push-pull).', '** Now send a transverse pulse (sideways jerk). Ask: "Which way did the coils move now?" (Answer: left-right.', '** Show a pressure vs. position graph of the longitudinal pulse.', '** Ask the student to redraw particle motion arrows for sound in air: horizontal line with arrows pointing left-right.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_002', difficulty: 'standard',
          question: 'The speed of a travelling wave is the rate at which a particular phase point.',
          hint: 'If stuck, revisit Class 9 "Wavelength, Frequency and Time Period: Relationships".',
          misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with.',
          parts: [
                { id: 'a', prompt: 'A transverse wave travels on a stretched string with speed v. If the tension is doubled while keeping the linear mass density constant, what happens to the.', answer: 'The wave speed increases by a factor of √2',
                  options: ['The wave speed increases by a factor of √2', 'speed doubles', 'speed unchanged'],
                  hint: 'If stuck, revisit Class 9 "Wavelength, Frequency and Time Period: Relationships" (c9_physics_ch5_4).',
                  misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with the.' },
                { id: 'b', prompt: 'Two strings A and B have the same linear mass density μ. String A has tension T_A = 40 N, string B has tension T_B = 90 N.', answer: 'the wave speeds, (',
                  options: ['the wave speeds, (', 'wavelengths are equal'],
                  hint: 'If stuck, revisit Class 9 "Wavelength, Frequency and Time Period: Relationships" (c9_physics_ch5_4).',
                  misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with the.' }
          ],
            remediations: { 'wave-speed-depends-on-frequency': { steps: ['If a student thinks speed depends on frequency: (1) Have them play a low and high note on a guitar string - both travel.', '(2) Show v = √(T/μ) has no ν or λ in it.', '(3) Use the phase constancy derivation: kx - ωt = constant → dx/dt = ω/k.', 'Since ω = 2πν and k = 2π/λ, v = νλ.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_003', difficulty: 'standard',
          question: 'The speed of sound in air is the rate at which longitudinal pressure.',
          hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the.',
          misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations.".',
          parts: [
                { id: 'a', prompt: 'State Newton\'s formula for the speed of sound in air and the thermodynamic assumption behind it.', answer: 'Newton\'s formula: v = √(P/ρ) assuming isothermal compressions/rarefactions',
                  options: ['Newton\'s formula: v = √(P/ρ) assuming isothermal compressions/rarefactions', 'air is not an ideal gas', 'γ corrects for molecular vibrations'],
                  hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the derivation.',
                  misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations." The exact error: they.' },
                { id: 'b', prompt: 'Why did Newton assume the process is isothermal, and why is this assumption physically incorrect for sound wave propagation in air?', answer: 'Newton assumed isothermal',
                  options: ['Newton assumed isothermal', 'Newton didn\'t know about adiabatic processes', 'sound is isothermal', 'air is not an ideal gas'],
                  hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the derivation.',
                  misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations." The exact error: they.' },
                { id: 'c', prompt: 'Calculate the speed of sound in air at 27°C using Laplace\'s formula. Given: γ = 1.4, R = 8.31 J/(mol·K), molar mass of air M = 29 × 10⁻³ kg/mol.', answer: 'Step 1: Convert T = 27°C = 300 K',
                  options: ['Step 1: Convert T = 27°C = 300 K', 'air is not an ideal gas', 'γ corrects for molecular vibrations'],
                  hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the derivation.',
                  misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations." The exact error: they.' },
                { id: 'd', prompt: 'A student claims: "Since v = √(γP/ρ) and for an ideal gas P/ρ = RT/M, the speed of sound is independent of pressure but depends on temperature." Analyze this.', answer: 'The statement is correct for an ideal gas where γ, R, M are constant',
                  options: ['The statement is correct for an ideal gas where γ, R, M are constant', 'v depends on pressure', 'air is not an ideal gas', 'γ corrects for molecular vibrations'],
                  hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the derivation.',
                  misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations." The exact error: they.' }
          ],
            remediations: { 'the-factor-appears-because-air': { steps: ['Revisit the definition of bulk modulus B = -V(ΔP/ΔV) from Class 11 Thermodynamics (Chapter 11).', 'Derive B_isothermal = P by differentiating PV = constant.', 'Derive B_adiabatic = γP by differentiating PV^γ = constant.', 'Substitute into v = √(B/ρ) for both cases.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations.".',
          parts: [
                { id: 'a', prompt: 'In a resonance tube experiment at 20°C, the first resonance occurs at 16.5 cm and the second at 50.5 cm with a tuning fork of frequency 512 Hz.', answer: 'The conclusion is invalid',
                  options: ['The conclusion is invalid', 'air is not an ideal gas', 'γ corrects for molecular vibrations'],
                  hint: 'If stuck, revisit Class 11 Thermodynamics: isothermal vs adiabatic processes, and the derivation.',
                  misconception: 'Students often think the factor γ appears because "air is not an ideal gas" or "γ corrects for molecular vibrations." The exact error: they.' }
          ],
            remediations: { 'the-factor-appears-because-air': { steps: ['Revisit the definition of bulk modulus B = -V(ΔP/ΔV) from Class 11 Thermodynamics (Chapter 11).', 'Derive B_isothermal = P by differentiating PV = constant.', 'Derive B_adiabatic = γP by differentiating PV^γ = constant.', 'Substitute into v = √(B/ρ) for both cases.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_004', difficulty: 'standard',
          question: 'The speed of sound in a medium is the rate at which a sound wave propagates.',
          hint: 'If stuck, revisit the derivation of \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\(.',
          misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because.',
          parts: [
                { id: 'a', prompt: 'State the formula for speed of sound in an ideal gas and name the three variables it depends on. What is the SI unit of each variable?', answer: 'The formula is \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\)',
                  options: ['The formula is \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\)', 'pressure pushes the wave faster', 'it depends on pressure alone'],
                  hint: 'If stuck, revisit the derivation of \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\(.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' },
                { id: 'b', prompt: 'Calculate the speed of sound in air at 27°C given that at 0°C it is 331 m/s. Use the relation \\( v \\propto \\sqrt{T} \\) with absolute temperature in Kelvin.', answer: '\\( T_1 = 273 \\) K, \\( v_1 = 331 \\) m/s',
                  options: ['\\( T_1 = 273 \\) K, \\( v_1 = 331 \\) m/s', 'pressure pushes the wave faster'],
                  hint: 'If stuck, revisit the derivation of \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\(.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' }
          ],
            remediations: { 'increasing-the-pressure-of-a': { steps: ['Remediation: Have the student derive \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\).', 'Then ask: "If temperature is constant, what happens to \\( v \\) when \\( P \\) doubles?" Show that \\( \\rho \\) also.', 'Use a syringe with trapped air: compress it (increase P) and measure sound speed with a sensor — it won\'t change.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_005', difficulty: 'standard',
          question: 'The principle of superposition of waves states that when two or more waves.',
          hint: 'If stuck, review c11_phy_cbse_14_003 (Displacement relation in a progressive wave) and.',
          misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency.',
          parts: [
                { id: 'a', prompt: 'Two harmonic waves traveling along a string are given by y₁ = 0.02 sin(2x - 4t) and y₂ = 0.02 sin(2x - 4t + π/3), where x is in meters and t in seconds.', answer: 'The resultant amplitude will be less than 0.04 m',
                  options: ['The resultant amplitude will be less than 0.04 m', '0.04 m', 'bounce off', 'amplitudes always add directly (confusing with φ=0 case)'],
                  hint: 'If stuck, review c11_phy_cbse_14_003 (Displacement relation in a progressive wave) and practice.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' },
                { id: 'b', prompt: 'A wave pulse described by y₁ = 5/(1 + (x - 2t)²) cm and another by y₂ = -5/(1 + (x + 2t)²) cm travel on a long string.', answer: 'Step 1: Identify given: y₁ = 5/(1 + (x - 2t)²) cm, y₂ = -5/(1 + (x + 2t)²) cm',
                  options: ['Step 1: Identify given: y₁ = 5/(1 + (x - 2t)²) cm, y₂ = -5/(1 + (x + 2t)²) cm', 'bounce off'],
                  hint: 'If stuck, review c11_phy_cbse_14_003 (Displacement relation in a progressive wave) and practice.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' },
                { id: 'c', prompt: 'Two coherent sources S₁ and S₂ emit harmonic waves of wavelength λ = 0.5 m. At point P, the path difference is Δx = 0.75 m.', answer: 'Phase difference φ = (2π/λ) × Δx = (2π/0.5) × 0.75 = 4π × 0.75 = 3π rad',
                  options: ['Phase difference φ = (2π/λ) × Δx = (2π/0.5) × 0.75 = 4π × 0.75 = 3π rad', 'constructive', 'bounce off'],
                  hint: 'If stuck, review c11_phy_cbse_14_003 (Displacement relation in a progressive wave) and practice.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' }
          ],
            remediations: { 'when-two-waves-meet': { steps: ['Use a long spring or slinky: send a pulse from each end simultaneously.', 'Video record and show that after crossing, pulses continue unchanged.', 'Draw displacement diagrams at successive times for two Gaussian pulses approaching.', 'Calculate algebraic sum at each point to show temporary distortion but permanent identities.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_006', difficulty: 'standard',
          question: 'Interference of waves is the phenomenon where two or more coherent waves.',
          hint: 'Revisit the derivation of resultant wave equation in NCERT Section 14.5 (Equations.',
          misconception: 'Students believe that destructive interference means energy is destroyed.',
          parts: [
                { id: 'a', prompt: 'Two coherent sources emit waves of wavelength 500 nm. At a point P, the path difference between the waves is 250 nm.', answer: 'Phase difference φ = 2π(Δx/λ) = 2π(250/500) = π rad',
                  options: ['Phase difference φ = 2π(Δx/λ) = 2π(250/500) = π rad', 'destructive interference means energy is destroyed'],
                  hint: 'Revisit the derivation of resultant wave equation in NCERT Section 14.5 (Equations 14.27–14.31) and.',
                  misconception: 'Students believe that destructive interference means energy is destroyed.' },
                { id: 'b', prompt: 'Two speakers separated by 2.0 m emit coherent sound waves of frequency 340 Hz. A student walks parallel to the line joining the speakers at a distance of 10 m.', answer: 'Step 1: Wavelength λ = v/f = 340/340 = 1.0 m',
                  options: ['Step 1: Wavelength λ = v/f = 340/340 = 1.0 m', 'destructive interference means energy is destroyed'],
                  hint: 'Revisit the derivation of resultant wave equation in NCERT Section 14.5 (Equations 14.27–14.31) and.',
                  misconception: 'Students believe that destructive interference means energy is destroyed.' },
                { id: 'c', prompt: 'Two coherent waves of amplitudes 3 mm and 4 mm interfere with a phase difference of π/2. The resultant amplitude is 5 mm.', answer: 'The claim is false',
                  options: ['The claim is false', 'destructive interference means energy is destroyed'],
                  hint: 'Revisit the derivation of resultant wave equation in NCERT Section 14.5 (Equations 14.27–14.31) and.',
                  misconception: 'Students believe that destructive interference means energy is destroyed.' }
          ],
            remediations: { 'destructive-interference-means-energy-is': { steps: ['Draw the interference pattern of two coherent sources on paper — mark constructive (bright) and destructive (dark).', 'Calculate energy at a bright fringe: I_max ∝ (2a)² = 4a².', 'Calculate energy at a dark fringe: I_min ∝ 0.', 'Average over one fringe width: (I_max + I_min)/2 = 2a², which equals I₁ + I₂ ∝ a² + a².'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
