import type { SimDef } from '../../engine/types';
import C11_PhysicsWaveTypesSim from '../../../simulations/three/C11_PhysicsWaveTypesSim';

/** v3 wrapped master — C11_PhysicsWaveTypesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicswavetypessim: SimDef = {
    id: 'v3w_c11_physicswavetypessim',
    title: 'Wave Types',
    subtitle: 'This node covers the fundamental classification of mechanical waves based on particle.',
    classLevel: 11, subject: 'physics', topic: 'Transverse and Longitudinal Waves',
    chapters: [],
    nodeIds: ['c11_phy_cbse_14_001', 'c11_phy_cbse_14_012', 'c11_phy_cbse_14_002', 'c11_phy_cbse_14_005', 'c11_phy_cbse_14_010', 'c11_phy_cbse_14_008', 'c11_phy_cbse_14_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a **slinky spring** on a smooth floor: give one end a sharp sideways jerk — a pulse travels along the.', goal: 'Master Wave Types.' },
    discovery: {
        question: 'A transverse wave travels on a stretched string with speed v. If the tension is doubled while keeping the linear mass density constant, what happens to the.',
        options: ['The wave speed increases by a factor of √2', 'speed doubles', 'speed unchanged'],
        answer: 'The wave speed increases by a factor of √2',
        hook: 'Students believe wave speed depends on frequency or amplitude because they confuse v = λν (where λ and ν can vary) with.',
    },
    teaching: [
        { title: 'A mechanical wave is classified as.', text: 'A mechanical wave is classified as **transverse** if the particles of the medium oscillate perpendicular to the direction of wave propagation, and **longitudinal** if the particles oscillate parallel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_001', title: 'A mechanical wave is classified as.',
          scaffold: { problem: 'A student stretches a rubber cord horizontally between two hooks 3 m apart.',
            steps: [
            { text: 'Identify wave types. Plucking vertically on a horizontal cord → particle motion vertical, propagation horizontal →.' },
            { text: 'Recall speed formulas. Transverse on string: vₜ = √(T/μ). Longitudinal in fluid: vₗ = √(B/ρ).' },
            { text: 'Compute transverse speed. vₜ = √(50 N / 0.02 kg/m) = √(2500 m²/s²) = **50 m/s**.' },
            { text: 'Compute longitudinal speed. vₗ = √(1.4×10⁵ Pa / 1.2 kg/m³) = √(1.167×10⁵ m²/s²) ≈ **342 m/s**.' },
            { text: 'Interpret. Sound speed (342 m/s) > transverse pulse speed (50 m/s).', faded: true, blankAnswer: 'Transverse pulse speed = 50 m/s; sound speed in air = 342.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_012', title: 'When a travelling wave encounters a.',
          scaffold: { problem: 'A transverse wave pulse on a string is described by y_i(x,t) = 0.05 / (1 + (x - 20t)^2) where x and y are in meters and t in seconds.',
            steps: [
            { text: 'Identify the form of the incident pulse. The function is of the form f(x - vt) with v = 20 m/s.' },
            { text: 'Determine the boundary condition. Fixed end at x=0 means displacement y(0,t) = 0 for all t.' },
            { text: 'Write the reflected pulse. For a rigid boundary, the reflected pulse is the inverted incident pulse travelling in.' },
            { text: 'Find the resultant at the instant the incident peak reaches x=0. The peak of y_i occurs when x - 20t = 0.' },
            { text: 'Verify physical reasonableness. At the moment the incident peak arrives at the fixed end, the reflected peak (inverted).', faded: true, blankAnswer: '(a) Speed = 20 m/s, direction = +x (towards x=0). (b).' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_005', title: 'The principle of superposition of waves.',
          scaffold: { problem: 'Two harmonic waves traveling along a string fixed at both ends are given by y₁ = 0.03 sin(πx - 20πt) and y₂ = 0.03 sin(πx - 20πt + π/4),.',
            steps: [
            { text: 'Identify given parameters from wave equations. For both waves: a = 0.03 m, k = π rad/m, ω = 20π rad/s.' },
            { text: 'Calculate resultant amplitude using A = 2a cos(φ/2) = 2 × 0.03 × cos(π/8). cos(π/8) = cos(22.5°) ≈ 0.9239.' },
            { text: 'Frequency f = ω/(2π) = 20π/(2π) = 10 Hz. Wavelength λ = 2π/k = 2π/π = 2 m. Speed v = fλ = 10 × 2 = 20 m/s.' },
            { text: 'Resultant phase constant = φ/2 = π/8. Resultant wave equation: y = A sin(kx - ωt + φ/2) = 0.0554 sin(πx - 20πt + π/8) m.' },
            { text: 'Verify units: A in m, k in rad/m, ω in rad/s, argument of sine dimensionless.', faded: true, blankAnswer: 'Resultant amplitude = 0.0554 m, frequency = 10 Hz,.' }
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
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_008', title: 'Standing waves in pipes are stationary.',
          scaffold: { problem: 'A cylindrical pipe of length 50 cm and radius 2 cm is closed at one end. It is sounded with a tuning fork of frequency 340 Hz.',
            steps: [
            { text: 'Identify given quantities: L = 0.50 m, r = 0.02 m, v = 340 m/s, source frequency = 340 Hz.' },
            { text: 'For closed pipe, fundamental frequency \\( \\nu_1 = \\frac{v}{4L} \\).' },
            { text: 'Compute \\( \\nu_1 = \\frac{340}{4 \\times 0.50} = \\frac{340}{2} = 170 \\text{ Hz} \\).' },
            { text: 'Allowed harmonics are odd multiples: 170 Hz, 510 Hz, 850 Hz, ...' },
            { text: 'For open pipe, fundamental frequency \\( \\nu_1\' = \\frac{v}{2L} = \\frac{340}{2 \\times 0.50} = 340 \\text{ Hz} \\).' },
            { text: 'Verify: For open pipe, harmonics are 340, 680, 1020 Hz... 340 Hz is the first harmonic.', faded: true, blankAnswer: '(a) 170 Hz; (b) No resonance (340 Hz is not an odd harmonic.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_14_012', title: 'Identify each idea',
          dissect: { specimen: 'Wave Types', spots: [
            { id: 's1', label: 'A mechanical wave is classified', prompt: 'Which idea is this? — A mechanical wave is classified as **transverse** if the particles of the medium.', answer: 'A mechanical wave is classified', options: ['A mechanical wave is classified', 'When a travelling wave encounters', 'The speed of a travelling', 'The principle of superposition of'] },
            { id: 's2', label: 'When a travelling wave encounters', prompt: 'Which idea is this? — When a travelling wave encounters a boundary, it gets reflected.', answer: 'When a travelling wave encounters', options: ['When a travelling wave encounters', 'A mechanical wave is classified', 'The speed of a travelling', 'The principle of superposition of'] },
            { id: 's3', label: 'The speed of a travelling', prompt: 'Which idea is this? — The speed of a travelling wave is the rate at which a particular phase point (such as a.', answer: 'The speed of a travelling', options: ['The speed of a travelling', 'A mechanical wave is classified', 'When a travelling wave encounters', 'The principle of superposition of'] },
            { id: 's4', label: 'The principle of superposition of', prompt: 'Which idea is this? — The principle of superposition of waves states that when two or more waves travel.', answer: 'The principle of superposition of', options: ['The principle of superposition of', 'A mechanical wave is classified', 'When a travelling wave encounters', 'The speed of a travelling'] },
            { id: 's5', label: 'The Doppler Effect is the', prompt: 'Which idea is this? — The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when.', answer: 'The Doppler Effect is the', options: ['The Doppler Effect is the', 'A mechanical wave is classified', 'When a travelling wave encounters', 'The speed of a travelling'] },
            { id: 's6', label: 'Standing waves in pipes are', prompt: 'Which idea is this? — Standing waves in pipes are stationary wave patterns formed by the superposition of.', answer: 'Standing waves in pipes are', options: ['Standing waves in pipes are', 'A mechanical wave is classified', 'When a travelling wave encounters', 'The speed of a travelling'] }
          ] } }
    ],
    explore: { component: C11_PhysicsWaveTypesSim, prompt: 'Explore the interactive — Wave Types' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_001', difficulty: 'standard',
          question: 'A mechanical wave is classified as **transverse** if the particles of the.',
          hint: 'If stuck, revisit Class 9 "Sound Waves: Longitudinal Waves and Compressions".',
          misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A mechanical wave is classified as **transverse** if the particles of the medium',
                  options: ['A mechanical wave is classified as **transverse** if the particles of the medium', 'When a travelling wave encounters a boundary, it gets reflected', 'The speed of a travelling wave is the rate at', 'The principle of superposition of waves states that when two or more waves travel'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Sound waves are transverse because we draw them as sine waves on paper." **Exact wrong reasoning:** Students see the.' }
          ],
            remediations: { 'misconception-sound-waves-are-transverse': { steps: ['** Use a **slinky** — have the student hold one end while you send a longitudinal pulse (push-pull).', '** Now send a transverse pulse (sideways jerk). Ask: "Which way did the coils move now?" (Answer: left-right,.', '** Show a pressure vs. position graph of the longitudinal pulse.', '** Ask the student to redraw particle motion arrows for sound in air: horizontal line with arrows pointing left-right.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_012', difficulty: 'standard',
          question: 'When a travelling wave encounters a boundary, it gets reflected.',
          hint: 'If stuck, review the principle of superposition (node c11_phy_cbse_14_005) and the.',
          misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a.',
          parts: [
                { id: 'a', prompt: 'A student writes the reflected wave at a rigid boundary as y_r = a sin(kx + ωt) for an incident wave y_i = a sin(kx - ωt).', answer: 'The error is missing the phase change of π',
                  options: ['The error is missing the phase change of π', 'bounces back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall, so.' },
                { id: 'b', prompt: 'An incident longitudinal wave in a closed pipe is described by s_i(x,t) = 0.02 sin(50x - 2000t) (SI units).', answer: 'Closed end = rigid boundary → phase change π',
                  options: ['Closed end = rigid boundary → phase change π', 'bounces back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall, so.' }
          ],
            remediations: { 'the-phase-change-of-at': { steps: ['Re-visit the boundary condition: At a fixed end, the string cannot move → y_total = 0 always.', 'Write y_i + y_r = 0 at x=0.', 'Substitute y_i = a sin(-ωt) = -a sin(ωt).', 'Solve for y_r: y_r = a sin(ωt).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a standing wave on a string fixed at both ends, the nodes are formed because the incident and reflected waves always have a phase.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'bounces back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall, so.' },
                { id: 'b', prompt: 'Design a simple experiment using a rubber tube and a water surface to demonstrate the difference in phase change between reflection at a rigid boundary and a.', answer: 'Setup: Stretch a rubber tube horizontally',
                  options: ['Setup: Stretch a rubber tube horizontally', 'bounces back'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall, so.' }
          ],
            remediations: { 'the-phase-change-of-at': { steps: ['Re-visit the boundary condition: At a fixed end, the string cannot move → y_total = 0 always.', 'Write y_i + y_r = 0 at x=0.', 'Substitute y_i = a sin(-ωt) = -a sin(ωt).', 'Solve for y_r: y_r = a sin(ωt).'] } } },
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
            remediations: { 'when-two-waves-meet': { steps: ['Use a long spring or slinky: send a pulse from each end simultaneously.', 'Video record and show that after crossing, pulses continue unchanged.', 'Draw displacement diagrams at successive times for two Gaussian pulses approaching.', 'Calculate algebraic sum at each point to show temporary distortion but permanent identities.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_010', difficulty: 'standard',
          question: 'The Doppler Effect is the apparent change in frequency (or wavelength) of a.',
          hint: 'Revisit c11_phy_cbse_14_002 (Speed of Wave Formula) and c9_physics_ch5_4.',
          misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when',
                  options: ['The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when', 'A mechanical wave is classified as **transverse** if the particles of the medium', 'When a travelling wave encounters a boundary, it gets reflected', 'The speed of a travelling wave is the rate at'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\' = f \\frac{v +.' }
          ],
            remediations: { 'the-doppler-shift-depends-only': { steps: ['Have the student draw wavefront diagrams for three cases: (a) stationary source, stationary observer; (b) source moving.', 'Ask them to measure wavelength \\(\\lambda\\) in each diagram and compute frequency received using \\(f\' =.', 'Show that in (b), \\(\\lambda\\) changes but wave speed relative to observer is \\(v\\); in (c), \\(\\lambda\\) is unchanged.', 'Derive both formulas from the diagrams.', 'Practice 5 numerical problems where only the observer moves, then 5 where only the source moves, forcing sign.', 'Only then introduce combined motion.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_008', difficulty: 'standard',
          question: 'Standing waves in pipes are stationary wave patterns formed by the.',
          hint: 'Review the standing wave patterns for a string fixed at both ends (c11_phy_cbse_14_007).',
          misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n.',
          parts: [
                { id: 'a', prompt: 'Why does a pipe closed at one end produce only odd harmonics (1st, 3rd, 5th, ...) while a pipe open at both ends produces all harmonics (1st, 2nd, 3rd, ...)?', answer: 'In a closed pipe, the closed end must be a displacement node and the open end a',
                  options: ['In a closed pipe, the closed end must be a displacement node and the open end a', 'closed pipes have only odd harmonics', 'third harmonic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\(.' },
                { id: 'b', prompt: 'Two organ pipes of equal length are sounded together. Pipe A is open at both ends, Pipe B is closed at one end. The fundamental frequency of Pipe A is 256 Hz.', answer: 'For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)',
                  options: ['For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)', 'third harmonic', 'the next harmonic is \\( 4v/4L = v/L \\) (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\(.' }
          ],
            remediations: { 'the-third-harmonic-of-a': { steps: ['If a student confuses harmonic numbering: (1) Have them draw the standing wave patterns for the first three modes of a.', '(2) Count the number of quarter-wavelengths in each pattern: 1, 3, 5.', '(3) Relate each pattern to the formula \\( L = (2m-1)\\lambda/4 \\) where m=1,2,3...', '(4) Show that the frequency is \\( \\nu = v/\\lambda = (2m-1)v/4L \\).'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a closed pipe, the pressure variation is maximum at the closed end and zero at the open end.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'pressure is maximum at the open end', 'third harmonic', 'the next harmonic is \\( 4v/4L = v/L \\) (i'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\(.' },
                { id: 'b', prompt: 'Two organ pipes of equal length are sounded together. Pipe A is open at both ends, Pipe B is closed at one end. The fundamental frequency of Pipe A is 256 Hz.', answer: 'For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)',
                  options: ['For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)', 'third harmonic', 'the next harmonic is \\( 4v/4L = v/L \\) (i', 'all integer multiples exist)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\(.' }
          ],
            remediations: { 'the-third-harmonic-of-a': { steps: ['If a student confuses harmonic numbering: (1) Have them draw the standing wave patterns for the first three modes of a.', '(2) Count the number of quarter-wavelengths in each pattern: 1, 3, 5.', '(3) Relate each pattern to the formula \\( L = (2m-1)\\lambda/4 \\) where m=1,2,3...', '(4) Show that the frequency is \\( \\nu = v/\\lambda = (2m-1)v/4L \\).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
