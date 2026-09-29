import type { SimDef } from '../../engine/types';
import C11_PhysicsWaveMotionPropertiesCBSESim from '../../../simulations/c6_12/C11_PhysicsWaveMotionPropertiesCBSESim';

/** v3 wrapped master — C11_PhysicsWaveMotionPropertiesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicswavemotionpropertiescbsesim: SimDef = {
    id: 'v3w_c11_physicswavemotionpropertiescbsesim',
    title: 'Speed of Wave: Formula',
    subtitle: 'This node covers the derivation of v = ω/k = λν, the formulas for speed of transverse.',
    classLevel: 11, subject: 'physics', topic: 'Speed of Wave: Formula',
    chapters: [],
    nodeIds: ['c11_phy_cbse_14_002', 'c11_phy_cbse_14_004', 'c11_phy_cbse_14_001', 'c11_phy_cbse_14_010', 'c11_phy_cbse_14_011', 'c11_phy_cbse_14_005', 'c11_phy_cbse_14_006', 'c11_phy_cbse_14_007', 'c11_phy_cbse_14_008', 'c11_phy_cbse_14_009', 'c11_phy_cbse_14_012', 'c11_phy_cbse_04_001', 'c11_phy_cbse_04_002', 'c11_phy_cbse_04_011', 'c11_phy_cbse_06_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Watch a guitar string being plucked - the disturbance travels along the string at a definite speed.', goal: 'Master Speed of Wave: Formula.' },
    discovery: {
        question: 'A transverse wave travels on a stretched string with speed v. If the tension is doubled while keeping the linear mass density constant, what happens to the.',
        options: ['The wave speed increases by a factor of √2', 'speed doubles', 'speed unchanged'],
        answer: 'The wave speed increases by a factor of √2',
        hook: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with.',
    },
    teaching: [
        { title: 'The speed of a travelling wave is the rate.', text: 'The speed of a travelling wave is the rate at which a particular phase point (such as a crest or trough) propagates through a medium, given by v = ω/k = λν = λ/T, where ω is angular frequency, k is.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_002', title: 'The speed of a travelling wave is the.',
          scaffold: { problem: 'A nylon guitar string of length 65 cm and mass 0.32 g is under a tension of 80 N.',
            steps: [
            { text: 'Identify given quantities with units. L = 65 cm = 0.65 m, m = 0.32 g = 0.32 × 10⁻³ kg = 3.2 × 10⁻⁴ kg, T = 80 N, ν =.' },
            { text: 'Calculate linear mass density μ = m/L = (3.2 × 10⁻⁴ kg) / (0.65 m) = 4.92 × 10⁻⁴ kg/m.' },
            { text: 'Calculate wave speed v = √(T/μ) = √(80 N / 4.92 × 10⁻⁴ kg/m). Check units: N = kg·m/s², so T/μ = (kg·m/s²)/(kg/m) =.' },
            { text: 'v = √(80 / 4.92 × 10⁻⁴) = √(1.626 × 10⁵) = 403.2 m/s ≈ 403 m/s.' },
            { text: 'Calculate wavelength λ = v/ν = 403.2 m/s / 440 Hz = 0.916 m = 91.6 cm.' },
            { text: 'Verify physical reasonableness: Guitar string wave speeds are typically 200-500 m/s.', faded: true, blankAnswer: '(a) μ = 4.92 × 10⁻⁴ kg/m, (b) v = 403 m/s, (c) λ = 0.916 m.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_004', title: 'The speed of sound in a medium is the.',
          scaffold: { problem: 'The speed of sound in oxygen gas at 0°C is 316 m/s. Calculate the speed of sound in hydrogen gas at the same temperature.',
            steps: [
            { text: 'Identify given quantities: \\( v_{O_2} = 316 \\) m/s at \\( T = 273 \\) K, \\( M_{O_2} = 0.032 \\) kg/mol, \\( M_{H_2} = 0.002.' },
            { text: 'Use the formula \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\). Since γ, R, T are same for both gases, \\( v \\propto.' },
            { text: 'Set up ratio: \\( \\frac{v_{H_2}}{v_{O_2}} = \\sqrt{\\frac{M_{O_2}}{M_{H_2}}} \\).' },
            { text: 'Substitute values: \\( \\frac{v_{H_2}}{316} = \\sqrt{\\frac{32}{2}} = \\sqrt{16} = 4 \\).' },
            { text: 'Compute: \\( v_{H_2} = 4 \\times 316 = 1264 \\) m/s. Check units: m/s, reasonable (hydrogen is lighter, so faster).', faded: true, blankAnswer: '1264 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_001', title: 'A mechanical wave is classified as.',
          scaffold: { problem: 'A student stretches a rubber cord horizontally between two hooks 3 m apart.',
            steps: [
            { text: 'Identify wave types. Plucking vertically on a horizontal cord → particle motion vertical, propagation horizontal →.' },
            { text: 'Recall speed formulas. Transverse on string: vₜ = √(T/μ). Longitudinal in fluid: vₗ = √(B/ρ).' },
            { text: 'Compute transverse speed. vₜ = √(50 N / 0.02 kg/m) = √(2500 m²/s²) = **50 m/s**.' },
            { text: 'Compute longitudinal speed. vₗ = √(1.4×10⁵ Pa / 1.2 kg/m³) = √(1.167×10⁵ m²/s²) ≈ **342 m/s**.' },
            { text: 'Interpret. Sound speed (342 m/s) > transverse pulse speed (50 m/s).', faded: true, blankAnswer: 'Transverse pulse speed = 50 m/s; sound speed in air = 342.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_010', title: 'The Doppler Effect is the apparent.',
          scaffold: { problem: 'A motorcycle rider sounds a horn of frequency 500 Hz while moving at 20 m/s toward a stationary pedestrian.',
            steps: [
            { text: 'Identify given quantities with units: \\(f_{\\text{horn}} = 500 \\text{ Hz}\\), \\(v_s = +20 \\text{ m/s}\\) (source moving.' },
            { text: 'Determine the correct Doppler formula for source moving toward stationary observer: \\(f\' = f \\frac{v}{v - v_s}\\).' },
            { text: 'Substitute values: \\(f\'_{\\text{horn}} = 500 \\times \\frac{330}{330 - 20} = 500 \\times \\frac{330}{310}\\).' },
            { text: 'Compute with unit tracking: \\(\\frac{330}{310} = 1.0645\\), \\(f\'_{\\text{horn}} = 500 \\times 1.0645 = 532.26 \\text{ Hz}\\).' },
            { text: 'Calculate beat frequency: \\(f_{\\text{beat}} = |f\'_{\\text{horn}} - f_{\\text{fork}}| = |532.26 - 510| = 22.26 \\text{.' },
            { text: 'Physical reasonableness check: Source approaching increases frequency above 500 Hz; 532 Hz > 510 Hz so beats are.', faded: true, blankAnswer: '22.3 Hz (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_011', title: 'The Doppler effect for sound waves when.',
          scaffold: { problem: 'A train approaches a railway platform at 30 m/s blowing a whistle of frequency 400 Hz.',
            steps: [
            { text: 'Identify given quantities: \\( f = 400 \\) Hz, \\( v = 340 \\) m/s, \\( v_s = 30 \\) m/s (source moving towards observer), \\(.' },
            { text: 'Write the combined Doppler formula for approach: \\( f\' = f \\frac{v + v_o}{v - v_s} \\).' },
            { text: 'Substitute values with units: \\( f\' = 400 \\times \\frac{340 + 5}{340 - 30} = 400 \\times \\frac{345}{310} \\).' },
            { text: 'Compute: \\( \\frac{345}{310} = 1.1129 \\); \\( f\' = 400 \\times 1.1129 = 445.16 \\) Hz.' },
            { text: 'Verify reasonableness: The frequency should be higher than 400 Hz because both motions increase frequency.', faded: true, blankAnswer: '445.2 Hz' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_005', title: 'The principle of superposition of waves.',
          scaffold: { problem: 'Two harmonic waves traveling along a string fixed at both ends are given by y₁ = 0.03 sin(πx - 20πt) and y₂ = 0.03 sin(πx - 20πt + π/4),.',
            steps: [
            { text: 'Identify given parameters from wave equations. For both waves: a = 0.03 m, k = π rad/m, ω = 20π rad/s.' },
            { text: 'Calculate resultant amplitude using A = 2a cos(φ/2) = 2 × 0.03 × cos(π/8). cos(π/8) = cos(22.5°) ≈ 0.9239.' },
            { text: 'Frequency f = ω/(2π) = 20π/(2π) = 10 Hz. Wavelength λ = 2π/k = 2π/π = 2 m. Speed v = fλ = 10 × 2 = 20 m/s.' },
            { text: 'Resultant phase constant = φ/2 = π/8. Resultant wave equation: y = A sin(kx - ωt + φ/2) = 0.0554 sin(πx - 20πt + π/8) m.' },
            { text: 'Verify units: A in m, k in rad/m, ω in rad/s, argument of sine dimensionless.', faded: true, blankAnswer: 'Resultant amplitude = 0.0554 m, frequency = 10 Hz,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_14_004', title: 'Identify each idea',
          dissect: { specimen: 'Speed of Wave: Formula', spots: [
            { id: 's1', label: 'The speed of a travelling', prompt: 'Which idea is this? — The speed of a travelling wave is the rate at which a particular phase point (such as a.', answer: 'The speed of a travelling', options: ['The speed of a travelling', 'The speed of sound in', 'A mechanical wave is classified', 'The Doppler Effect is the'] },
            { id: 's2', label: 'The speed of sound in', prompt: 'Which idea is this? — The speed of sound in a medium is the rate at which a sound wave propagates through that.', answer: 'The speed of sound in', options: ['The speed of sound in', 'The speed of a travelling', 'A mechanical wave is classified', 'The Doppler Effect is the'] },
            { id: 's3', label: 'A mechanical wave is classified', prompt: 'Which idea is this? — A mechanical wave is classified as **transverse** if the particles of the medium.', answer: 'A mechanical wave is classified', options: ['A mechanical wave is classified', 'The speed of a travelling', 'The speed of sound in', 'The Doppler Effect is the'] },
            { id: 's4', label: 'The Doppler Effect is the', prompt: 'Which idea is this? — The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when.', answer: 'The Doppler Effect is the', options: ['The Doppler Effect is the', 'The speed of a travelling', 'The speed of sound in', 'A mechanical wave is classified'] },
            { id: 's5', label: 'The Doppler effect for sound', prompt: 'Which idea is this? — The Doppler effect for sound waves when both the source and observer are in motion.', answer: 'The Doppler effect for sound', options: ['The Doppler effect for sound', 'The speed of a travelling', 'The speed of sound in', 'A mechanical wave is classified'] },
            { id: 's6', label: 'The principle of superposition of', prompt: 'Which idea is this? — The principle of superposition of waves states that when two or more waves travel.', answer: 'The principle of superposition of', options: ['The principle of superposition of', 'The speed of a travelling', 'The speed of sound in', 'A mechanical wave is classified'] }
          ] } }
    ],
    explore: { component: C11_PhysicsWaveMotionPropertiesCBSESim, prompt: 'Explore the interactive — Speed of Wave: Formula' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_002', difficulty: 'standard',
          question: 'The speed of a travelling wave is the rate at which a particular phase point.',
          hint: 'If stuck, revisit Class 9 "Wavelength, Frequency and Time Period: Relationships".',
          misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with.',
          parts: [
                { id: 'a', prompt: 'A transverse wave travels on a stretched string with speed v. If the tension is doubled while keeping the linear mass density constant, what happens to the.', answer: 'The wave speed increases by a factor of √2',
                  options: ['The wave speed increases by a factor of √2', 'speed doubles', 'speed unchanged'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with the.' },
                { id: 'b', prompt: 'Two strings A and B have the same linear mass density μ. String A has tension T_A = 40 N, string B has tension T_B = 90 N.', answer: 'the wave speeds, (',
                  options: ['the wave speeds, (', 'wavelengths are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with the.' }
          ],
            remediations: { 'wave-speed-depends-on-frequency': { steps: ['If a student thinks speed depends on frequency: (1) Have them play a low and high note on a guitar string - both travel.', '(2) Show v = √(T/μ) has no ν or λ in it.', '(3) Use the phase constancy derivation: kx - ωt = constant → dx/dt = ω/k.', 'Since ω = 2πν and k = 2π/λ, v = νλ.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with.',
          parts: [
                { id: 'a', prompt: 'Two strings A and B have the same linear mass density μ. String A has tension T_A = 40 N, string B has tension T_B = 90 N.', answer: 'the wave speeds, (',
                  options: ['the wave speeds, (', 'wavelengths are equal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with the.' }
          ],
            remediations: { 'wave-speed-depends-on-frequency': { steps: ['If a student thinks speed depends on frequency: (1) Have them play a low and high note on a guitar string - both travel.', '(2) Show v = √(T/μ) has no ν or λ in it.', '(3) Use the phase constancy derivation: kx - ωt = constant → dx/dt = ω/k.', 'Since ω = 2πν and k = 2π/λ, v = νλ.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_004', difficulty: 'standard',
          question: 'The speed of sound in a medium is the rate at which a sound wave propagates.',
          hint: 'If stuck, revisit the derivation of \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\( v =.',
          misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because.',
          parts: [
                { id: 'a', prompt: 'State the formula for speed of sound in an ideal gas and name the three variables it depends on. What is the SI unit of each variable?', answer: 'The formula is \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\)',
                  options: ['The formula is \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\)', 'pressure pushes the wave faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' },
                { id: 'b', prompt: 'Calculate the speed of sound in air at 27°C given that at 0°C it is 331 m/s. Use the relation \\( v \\propto \\sqrt{T} \\) with absolute temperature in Kelvin.', answer: '\\( T_1 = 273 \\) K, \\( v_1 = 331 \\) m/s',
                  options: ['\\( T_1 = 273 \\) K, \\( v_1 = 331 \\) m/s', 'pressure pushes the wave faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' }
          ],
            remediations: { 'increasing-the-pressure-of-a': { steps: ['Remediation: Have the student derive \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\).', 'Then ask: "If temperature is constant, what happens to \\( v \\) when \\( P \\) doubles?" Show that \\( \\rho \\) also.', 'Use a syringe with trapped air: compress it (increase P) and measure sound speed with a sensor — it won\'t change if.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Increasing humidity decreases the speed of sound because water vapour is heavier than air." Evaluate this statement and correct it.', answer: 'The statement is false',
                  options: ['The statement is false', 'pressure pushes the wave faster', 'water vapour is heavier confuses liquid water density with vapour molar mass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' },
                { id: 'b', prompt: 'Design a simple experiment using a smartphone and a long corridor to measure how the speed of sound changes with temperature.', answer: 'Use two smartphones: one emits a sharp clap (or tone), the other records',
                  options: ['Use two smartphones: one emits a sharp clap (or tone), the other records', 'pressure pushes the wave faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that increasing the pressure of a gas (by compressing it) increases the speed of sound because "pressure pushes the.' }
          ],
            remediations: { 'increasing-the-pressure-of-a': { steps: ['Remediation: Have the student derive \\( v = \\sqrt{\\frac{\\gamma RT}{M}} \\) from \\( v = \\sqrt{\\frac{\\gamma P}{\\rho}} \\).', 'Then ask: "If temperature is constant, what happens to \\( v \\) when \\( P \\) doubles?" Show that \\( \\rho \\) also.', 'Use a syringe with trapped air: compress it (increase P) and measure sound speed with a sensor — it won\'t change if.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_001', difficulty: 'standard',
          question: 'A mechanical wave is classified as **transverse** if the particles of the.',
          hint: 'If stuck, revisit Class 9 "Sound Waves: Longitudinal Waves and Compressions".',
          misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A mechanical wave is classified as **transverse** if the particles of the medium',
                  options: ['A mechanical wave is classified as **transverse** if the particles of the medium', 'The speed of a travelling wave is the rate at', 'The speed of sound in a medium is the rate at', 'The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:** Students see the.' }
          ],
            remediations: { 'misconception-sound-waves-are-transverse': { steps: ['** Use a **slinky** — have the student hold one end while you send a longitudinal pulse (push-pull).', '** Now send a transverse pulse (sideways jerk). Ask: "Which way did the coils move now?" (Answer: left-right,.', '** Show a pressure vs. position graph of the longitudinal pulse.', '** Ask the student to redraw particle motion arrows for sound in air: horizontal line with arrows pointing left-right.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_010', difficulty: 'standard',
          question: 'The Doppler Effect is the apparent change in frequency (or wavelength) of a.',
          hint: 'Revisit c11_phy_cbse_14_002 (Speed of Wave Formula) and c9_physics_ch5_4.',
          misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when',
                  options: ['The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when', 'The speed of a travelling wave is the rate at', 'The speed of sound in a medium is the rate at', 'A mechanical wave is classified as **transverse** if the particles of the medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\' = f \\frac{v +.' }
          ],
            remediations: { 'the-doppler-shift-depends-only': { steps: ['Have the student draw wavefront diagrams for three cases: (a) stationary source, stationary observer; (b) source moving.', 'Ask them to measure wavelength \\(\\lambda\\) in each diagram and compute frequency received using \\(f\' =.', 'Show that in (b), \\(\\lambda\\) changes but wave speed relative to observer is \\(v\\); in (c), \\(\\lambda\\) is unchanged.', 'Derive both formulas from the diagrams.', 'Practice 5 numerical problems where only the observer moves, then 5 where only the source moves, forcing sign.', 'Only then introduce combined motion.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_011', difficulty: 'standard',
          question: 'The Doppler effect for sound waves when both the source and observer are in.',
          hint: 'If stuck, review the derivation of the moving source formula (wavelength compression) and.',
          misconception: 'Students often believe that the Doppler shift depends on the distance between source and observer, not just their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Doppler effect for sound waves when both the source and observer are in motion',
                  options: ['The Doppler effect for sound waves when both the source and observer are in motion', 'The speed of a travelling wave is the rate at', 'The speed of sound in a medium is the rate at', 'A mechanical wave is classified as **transverse** if the particles of the medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Doppler shift depends on the distance between source and observer, not just their relative velocity.' }
          ],
            remediations: { 'the-doppler-shift-depends-on': { steps: ['To address the distance misconception: Use a video of a passing ambulance siren – the pitch changes abruptly when it.', 'To fix the speed of sound misconception: Perform a thought experiment – if the source moves at the speed of sound,.', 'To fix sign convention: Teach a systematic method: (1) Draw a line from source to observer.', '(2) Assign positive direction from observer to source.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_005', difficulty: 'standard',
          question: 'The principle of superposition of waves states that when two or more waves.',
          hint: 'If stuck, review c11_phy_cbse_14_003 (Displacement relation in a progressive wave) and.',
          misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or.',
          parts: [
                { id: 'a', prompt: 'Two harmonic waves traveling along a string are given by y₁ = 0.02 sin(2x - 4t) and y₂ = 0.02 sin(2x - 4t + π/3), where x is in meters and t in seconds.', answer: 'The resultant amplitude will be less than 0.04 m',
                  options: ['The resultant amplitude will be less than 0.04 m', '0.04 m', 'bounce off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' },
                { id: 'b', prompt: 'A wave pulse described by y₁ = 5/(1 + (x - 2t)²) cm and another by y₂ = -5/(1 + (x + 2t)²) cm travel on a long string.', answer: 'Step 1: Identify given: y₁ = 5/(1 + (x - 2t)²) cm, y₂ = -5/(1 + (x + 2t)²) cm',
                  options: ['Step 1: Identify given: y₁ = 5/(1 + (x - 2t)²) cm, y₂ = -5/(1 + (x + 2t)²) cm', 'bounce off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' },
                { id: 'c', prompt: 'Two coherent sources S₁ and S₂ emit harmonic waves of wavelength λ = 0.5 m. At point P, the path difference is Δx = 0.75 m.', answer: 'Phase difference φ = (2π/λ) × Δx = (2π/0.5) × 0.75 = 4π × 0.75 = 3π rad',
                  options: ['Phase difference φ = (2π/λ) × Δx = (2π/0.5) × 0.75 = 4π × 0.75 = 3π rad', 'constructive', 'bounce off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' }
          ],
            remediations: { 'when-two-waves-meet': { steps: ['Use a long spring or slinky: send a pulse from each end simultaneously.', 'Video record and show that after crossing, pulses continue unchanged.', 'Draw displacement diagrams at successive times for two Gaussian pulses approaching.', 'Calculate algebraic sum at each point to show temporary distortion but permanent identities.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or.',
          parts: [
                { id: 'a', prompt: 'A student claims: "When two identical waves superimpose, the resultant intensity is always four times the individual intensity because amplitude doubles.".', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'bounce off'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that when two waves meet, they permanently alter each other\'s properties (like frequency or wavelength) or that they.' }
          ],
            remediations: { 'when-two-waves-meet': { steps: ['Use a long spring or slinky: send a pulse from each end simultaneously.', 'Video record and show that after crossing, pulses continue unchanged.', 'Draw displacement diagrams at successive times for two Gaussian pulses approaching.', 'Calculate algebraic sum at each point to show temporary distortion but permanent identities.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
