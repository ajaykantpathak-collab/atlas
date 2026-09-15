import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch14_p2: SimDef = {
    id: 'v3_c11_phy_ch14_p2',
    title: 'Waves · Part 2/2',
    subtitle: 'Learn that the drawing is a graph, not a portrait of the motion.',
    classLevel: 11, subject: 'physics', topic: 'Waves · Part 2/2',
    chapters: ['c11_phy_ch14'],
    nodeIds: ['c11_phy_cbse_14_007', 'c11_phy_cbse_14_008', 'c11_phy_cbse_14_009', 'c11_phy_cbse_14_010', 'c11_phy_cbse_14_011', 'c11_phy_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a wave-watcher separating particle dance from wave travel', intro: 'The wave slides down the rope while each bit of rope just bobs — direction of travel is not direction of wiggle.', goal: 'Classify transverse vs longitudinal correctly and identify the medium as the source of wave speed.' },
    discovery: {
        question: 'Shake a rope\'s end up and down; the ripple runs along the rope — \'so this is a longitudinal wave, the motion travels forward.\' Right?',
        options: ['No — the test is particle motion versus wave travel: the rope moves up-down while the wave runs along it — transverse', 'Yes — forward travel means longitudinal', 'Yes — waves on strings are longitudinal', 'No — it\'s not a wave at all'],
        answer: 'No — the test is particle motion versus wave travel: the rope moves up-down while the wave runs along it — transverse',
        hook: 'We draw sound as a sine curve on paper, yet sound is longitudinal — the picture shows pressure, not sideways jiggle.',
    },
    teaching: [
        { title: 'Standing Waves in Strings', text: 'A standing wave (stationary wave) in a string is a wave pattern formed by the superposition of two identical progressive waves of same amplitude, frequency, and wavelength traveling in opposite.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_14_007', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Correct the \'higher frequency means faster wave\' belief — the medium sets v, so doubling ν halves λ while speed stays put.',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_007', title: 'Standing Waves in Strings',
          scaffold: { problem: 'A sonometer wire of length 1.0 m and mass 4.0 g is stretched by a load of 4.0 kg. The wire is set into vibration.',
            steps: [
            { text: 'Identify given quantities: L = 1.0 m, m = 4.0 g = 0.004 kg, load mass = 4.0 kg → Tension T = mg = 4.0 × 9.8 = 39.2 N.' },
            { text: 'Calculate linear mass density μ = m/L = 0.004 kg / 1.0 m = 0.004 kg/m. Check units: kg/m ✓.' },
            { text: 'Calculate wave speed v = √(T/μ) = √(39.2 / 0.004) = √9800 = 98.99 m/s ≈ 99.0 m/s.' },
            { text: 'Fundamental frequency ν₁ = v / 2L = 99.0 / (2 × 1.0) = 49.5 Hz. Units: (m/s)/m = 1/s = Hz ✓.' },
            { text: '3rd overtone = 4th harmonic (n=4). ν₄ = 4ν₁ = 4 × 49.5 = 198 Hz.' },
            { text: 'Verify reasonableness: For a 1m steel wire at ~40N tension, ~50 Hz fundamental is plausible (guitar low E string ~82.', faded: true, blankAnswer: 'Fundamental frequency = 49.5 Hz, 3rd overtone frequency.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_008', title: 'Standing Waves in Pipes: Open and Closed',
          scaffold: { problem: 'A cylindrical pipe of length 50 cm and radius 2 cm is closed at one end. It is sounded with a tuning fork of frequency 340 Hz.',
            steps: [
            { text: 'Identify given quantities: L = 0.50 m, r = 0.02 m, v = 340 m/s, source frequency = 340 Hz.' },
            { text: 'For closed pipe, fundamental frequency \\( \\nu_1 = \\frac{v}{4L} \\).' },
            { text: 'Compute \\( \\nu_1 = \\frac{340}{4 \\times 0.50} = \\frac{340}{2} = 170 \\text{ Hz} \\).' },
            { text: 'Allowed harmonics are odd multiples: 170 Hz, 510 Hz, 850 Hz, ...' },
            { text: 'For open pipe, fundamental frequency \\( \\nu_1\' = \\frac{v}{2L} = \\frac{340}{2 \\times 0.50} = 340 \\text{ Hz} \\).' },
            { text: 'Verify: For open pipe, harmonics are 340, 680, 1020 Hz... 340 Hz is the first harmonic.', faded: true, blankAnswer: '(a) 170 Hz; (b) No resonance (340 Hz is not an odd harmonic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_009', title: 'Beats: Frequency and Formation',
          scaffold: { problem: 'Two tabla drums are struck simultaneously. Drum A produces a frequency of 220 Hz. The combined sound exhibits beats at 3 Hz.',
            steps: [
            { text: 'Let ν_A = 220 Hz, ν_B = unknown. Given |ν_A - ν_B| = 3 Hz → ν_B = 223 Hz or 217 Hz.' },
            { text: 'Adding syahi decreases ν_B. New frequency ν_B\' = ν_B - Δν (Δν > 0). New beat frequency = |ν_A - ν_B\'| = 5 Hz.' },
            { text: 'Test both possibilities. If ν_B = 223 Hz (ν_B > ν_A), decreasing it brings it closer to ν_A → |220 - ν_B\'| decreases.' },
            { text: 'If ν_B = 217 Hz (ν_B < ν_A), decreasing it further increases the difference: |220 - (217 - Δν)| = |3 + Δν| = 5 → Δν = 2.' },
            { text: 'Conclusion: Original ν_B = 217 Hz. Adding syahi lowered it to 215 Hz, increasing the difference from 3 Hz to 5 Hz.', faded: true, blankAnswer: 'Original frequency of drum B = 217 Hz.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_010', title: 'Doppler Effect: Formula and Applications',
          scaffold: { problem: 'A motorcycle rider sounds a horn of frequency 500 Hz while moving at 20 m/s toward a stationary pedestrian.',
            steps: [
            { text: 'Identify given quantities with units: \\(f_{\\text{horn}} = 500 \\text{ Hz}\\), \\(v_s = +20 \\text{ m/s}\\) (source moving.' },
            { text: 'Determine the correct Doppler formula for source moving toward stationary observer: \\(f\' = f \\frac{v}{v - v_s}\\).' },
            { text: 'Substitute values: \\(f\'_{\\text{horn}} = 500 \\times \\frac{330}{330 - 20} = 500 \\times \\frac{330}{310}\\).' },
            { text: 'Compute with unit tracking: \\(\\frac{330}{310} = 1.0645\\), \\(f\'_{\\text{horn}} = 500 \\times 1.0645 = 532.26 \\text{ Hz}\\).' },
            { text: 'Calculate beat frequency: \\(f_{\\text{beat}} = |f\'_{\\text{horn}} - f_{\\text{fork}}| = |532.26 - 510| = 22.26 \\text{.' },
            { text: 'Physical reasonableness check: Source approaching increases frequency above 500 Hz; 532 Hz > 510 Hz so beats are.', faded: true, blankAnswer: '22.3 Hz (approx)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_011', title: 'Doppler Effect: Source Moving and Observer Moving',
          scaffold: { problem: 'A train approaches a railway platform at 30 m/s blowing a whistle of frequency 400 Hz.',
            steps: [
            { text: 'Identify given quantities: \\( f = 400 \\) Hz, \\( v = 340 \\) m/s, \\( v_s = 30 \\) m/s (source moving towards observer), \\.' },
            { text: 'Write the combined Doppler formula for approach: \\( f\' = f \\frac{v + v_o}{v - v_s} \\).' },
            { text: 'Substitute values with units: \\( f\' = 400 \\times \\frac{340 + 5}{340 - 30} = 400 \\times \\frac{345}{310} \\).' },
            { text: 'Compute: \\( \\frac{345}{310} = 1.1129 \\); \\( f\' = 400 \\times 1.1129 = 445.16 \\) Hz.' },
            { text: 'Verify reasonableness: The frequency should be higher than 400 Hz because both motions increase frequency.', faded: true, blankAnswer: '445.2 Hz' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_14_012', title: 'Reflection of Waves: Phase Change',
          scaffold: { problem: 'A transverse wave pulse on a string is described by y_i(x,t) = 0.05 / (1 + (x - 20t)^2) where x and y are in meters and t in seconds.',
            steps: [
            { text: 'Identify the form of the incident pulse. The function is of the form f(x - vt) with v = 20 m/s.' },
            { text: 'Determine the boundary condition. Fixed end at x=0 means displacement y(0,t) = 0 for all t.' },
            { text: 'Write the reflected pulse. For a rigid boundary, the reflected pulse is the inverted incident pulse travelling.' },
            { text: 'Find the resultant at the instant the incident peak reaches x=0. The peak of y_i occurs when x - 20t = 0.' },
            { text: 'Verify physical reasonableness. At the moment the incident peak arrives at the fixed end, the reflected peak (inverted).', faded: true, blankAnswer: '(a) Speed = 20 m/s, direction = +x (towards x=0). (b).' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a wave-demo stall, a student draws a sound wave\'s particles oscillating up-down \'like the sine curve in the book\' and claims a 1000 Hz note travels faster through a steel wire than a 10 Hz note \'because higher frequency means faster wave.\'',
            decisions: [{ prompt: 'What does wave physics actually say?', options: [
                { text: 'Separate the graph from the physics: the sine drawing plots displacement magnitude — sound\'s particles actually oscillate PARALLEL to propagation (longitudinal); transverse needs shear rigidity, which air lacks. And the medium sets the speed: v = √(T/μ) for the wire — 93 m/s whether the source hums at 10 Hz or 1000 Hz; frequency comes from the source, and only wavelength adjusts (λ = v/ν).', outcome: 'The demo is corrected: drawings are representations, and the source picks frequency while the medium picks speed — v = λν is a consequence, not a dial.' },
                { text: 'Keep the up-down arrows — the sine-wave picture is how sound is drawn, so that\'s how particles move.', outcome: 'The picture\'s y-axis is displacement magnitude, not a physical direction: sound in air is a compression wave — particles move along the propagation axis.', reveals: 'sine-graph-means-transverse' },
                { text: 'Keep the faster treble — v = λν literally shows frequency driving speed.', outcome: 'That reads the relation backwards: v is fixed by tension and density; raising ν only shrinks λ — the speed doesn\'t follow the source.', reveals: 'frequency-sets-wave-speed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_14_012', title: 'You made it',
          caseStudy: { intro: 'Tension and mass-per-length set the speed; frequency and amplitude only decide the shape of what travels.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_007', difficulty: 'standard',
          question: 'A standing wave (stationary wave) in a string is a wave pattern formed by the.',
          hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid.',
          misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.',
          parts: [
                { id: 'a', prompt: 'A string of length L fixed at both ends vibrates in its 3rd harmonic. What is the distance between two consecutive nodes in terms of L?', answer: 'Distance between consecutive nodes = λ/2',
                  options: ['Distance between consecutive nodes = λ/2', 'harmonic number n', 'number of antinodes', 'standing waves involve no energy at all, or that energy is trapped between nodes'],
                  hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid boundary).',
                  misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.' },
                { id: 'b', prompt: 'Two identical waves y₁ = A sin(kx - ωt) and y₂ = A sin(kx + ωt) superpose on a string. A student claims the resultant amplitude at x = λ/4 is zero.', answer: 'No, it\'s incorrect',
                  options: ['No, it\'s incorrect', 'harmonic number n', 'number of antinodes', 'standing waves involve no energy at all, or that energy is trapped between nodes'],
                  hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid boundary).',
                  misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.' },
                { id: 'c', prompt: 'A steel wire of length 1.2 m and mass 12 g is stretched with a tension of 150 N. Calculate the fundamental frequency and the frequency of the 4th harmonic.', answer: 'Given: L = 1.2 m, m = 0.012 kg, T = 150 N',
                  options: ['Given: L = 1.2 m, m = 0.012 kg, T = 150 N', 'harmonic number n', 'number of antinodes', 'standing waves involve no energy at all, or that energy is trapped between nodes'],
                  hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid boundary).',
                  misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.' },
                { id: 'd', prompt: 'A string fixed at both ends vibrates in a standing wave pattern with 5 nodes (including ends).', answer: '5 nodes means 4 segments → n=4 (4th harmonic)',
                  options: ['5 nodes means 4 segments → n=4 (4th harmonic)', 'harmonic number n', 'number of antinodes', 'standing waves involve no energy at all, or that energy is trapped between nodes'],
                  hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid boundary).',
                  misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.' }
          ],
            remediations: { 'standing-waves-involve-no-energy': { steps: ['Revisit superposition principle (c11_phy_cbse_14_005): practice adding two sine waves traveling oppositely using trig.', 'Revisit reflection at rigid boundary (c11_phy_cbse_14_012): understand π phase change creates node at fixed end.', 'Draw standing wave patterns for n=1,2,3,4 - label nodes (N) and antinodes (A), count loops.', 'Practice: L = nλ/2 → λ = 2L/n.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.',
          parts: [
                { id: 'a', prompt: 'In a standing wave on a string, a student measures the distance between a node and the nearest antinode as 10 cm and claims the wavelength is 20 cm.', answer: 'Claim is incorrect',
                  options: ['Claim is incorrect', 'harmonic number n', 'number of antinodes', 'standing waves involve no energy at all, or that energy is trapped between nodes'],
                  hint: 'Review c11_phy_cbse_14_005 (superposition) and c11_phy_cbse_14_012 (reflection at rigid boundary).',
                  misconception: 'Students think standing waves involve no energy at all, or that energy is trapped between nodes.' }
          ],
            remediations: { 'standing-waves-involve-no-energy': { steps: ['Revisit superposition principle (c11_phy_cbse_14_005): practice adding two sine waves traveling oppositely using trig.', 'Revisit reflection at rigid boundary (c11_phy_cbse_14_012): understand π phase change creates node at fixed end.', 'Draw standing wave patterns for n=1,2,3,4 - label nodes (N) and antinodes (A), count loops.', 'Practice: L = nλ/2 → λ = 2L/n.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_008', difficulty: 'standard',
          question: 'Standing waves in pipes are stationary wave patterns formed by the.',
          hint: 'Review the standing wave patterns for a string fixed at both ends (c11_phy_cbse_14_007).',
          misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n =.',
          parts: [
                { id: 'a', prompt: 'Why does a pipe closed at one end produce only odd harmonics (1st, 3rd, 5th, ...) while a pipe open at both ends produces all harmonics (1st, 2nd, 3rd, ...)?', answer: 'In a closed pipe, the closed end must be a displacement node and the open end a',
                  options: ['In a closed pipe, the closed end must be a displacement node and the open end a', 'closed pipes have only odd harmonics', 'third harmonic', 'the next harmonic is \\( 4v/4L = v/L \\) (i'],
                  hint: 'Review the standing wave patterns for a string fixed at both ends (c11_phy_cbse_14_007) and the.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\.' },
                { id: 'b', prompt: 'Two organ pipes of equal length are sounded together. Pipe A is open at both ends, Pipe B is closed at one end. The fundamental frequency of Pipe A is 256 Hz.', answer: 'For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)',
                  options: ['For Pipe A (open): \\( \\nu_{1A} = \\frac{v}{2L} = 256 \\text{ Hz} \\)', 'third harmonic', 'the next harmonic is \\( 4v/4L = v/L \\) (i', 'all integer multiples exist)'],
                  hint: 'Review the standing wave patterns for a string fixed at both ends (c11_phy_cbse_14_007) and the.',
                  misconception: 'Students often think that the "third harmonic" of a closed pipe means \\( n=3 \\) in the formula \\( \\nu_n = n \\frac{v}{4L} \\), giving \\.' }
          ],
            remediations: { 'the-third-harmonic-of-a': { steps: ['If a student confuses harmonic numbering: (1) Have them draw the standing wave patterns for the first three modes of.', '(2) Count the number of quarter-wavelengths in each pattern: 1, 3, 5.', '(3) Relate each pattern to the formula \\( L = (2m-1)\\lambda/4 \\) where m=1,2,3...', '(4) Show that the frequency is \\( \\nu = v/\\lambda = (2m-1)v/4L \\).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_009', difficulty: 'standard',
          question: 'Beats are the periodic waxing and waning of sound intensity that occurs when.',
          hint: 'Revise the derivation of resultant amplitude for two waves of same frequency but.',
          misconception: 'Students often believe that the beat frequency is the average of the two frequencies (ν_beat = (ν₁+ν₂)/2) because they.',
          parts: [
                { id: 'a', prompt: 'Two tuning forks A and B produce 4 beats per second when sounded together. Fork A is known to be 512 Hz. A student claims fork B must be 516 Hz.', answer: 'The student is NOT necessarily correct',
                  options: ['The student is NOT necessarily correct', 'pitch heard', 'beat frequency'],
                  hint: 'Revise the derivation of resultant amplitude for two waves of same frequency but different phase.',
                  misconception: 'Students often believe that the beat frequency is the average of the two frequencies (ν_beat = (ν₁+ν₂)/2) because they confuse the "pitch.' },
                { id: 'b', prompt: 'A sitar string tuned to 320 Hz produces 6 beats/s with a reference tuning fork.', answer: 'Let ν_s = string frequency, ν_f = fork frequency',
                  options: ['Let ν_s = string frequency, ν_f = fork frequency', 'pitch heard', 'beat frequency'],
                  hint: 'Revise the derivation of resultant amplitude for two waves of same frequency but different phase.',
                  misconception: 'Students often believe that the beat frequency is the average of the two frequencies (ν_beat = (ν₁+ν₂)/2) because they confuse the "pitch.' },
                { id: 'c', prompt: 'The displacement of a particle due to two superposing sound waves is given by s(t) = 0.02 cos(2π×440 t) + 0.02 cos(2π×446 t) (SI units).', answer: 'the frequency of the resultant sound heard, (',
                  options: ['the frequency of the resultant sound heard, (', 'pitch heard', 'beat frequency'],
                  hint: 'Revise the derivation of resultant amplitude for two waves of same frequency but different phase.',
                  misconception: 'Students often believe that the beat frequency is the average of the two frequencies (ν_beat = (ν₁+ν₂)/2) because they confuse the "pitch.' }
          ],
            remediations: { 'the-beat-frequency-is-the': { steps: ['Have the student plot s₁ = cos(2π×256 t) and s₂ = cos(2π×260 t) on graph paper for t = 0 to 0.5 s (or use.', 'Graphically add them point-by-point to obtain the resultant waveform.', 'Mark the times of maximum amplitude (envelope peaks) and measure the interval — it will be 0.25 s → 4 Hz.', 'Mark the zero-crossings of the rapid oscillation inside the envelope — the period will be ≈1/258 s.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_010', difficulty: 'standard',
          question: 'The Doppler Effect is the apparent change in frequency (or wavelength) of.',
          hint: 'Revisit c11_phy_cbse_14_002 (Speed of Wave Formula) and c9_physics_ch5_4.',
          misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when',
                  options: ['The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when', 'A mechanical wave is classified as **transverse** if the particles of the medium', 'The speed of a travelling wave is the rate at', 'The speed of sound in air is the rate at'],
                  hint: 'Revisit c11_phy_cbse_14_002 (Speed of Wave Formula) and c9_physics_ch5_4 (Wavelength-Frequency.',
                  misconception: 'Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \\(f\' = f \\frac{v.' }
          ],
            remediations: { 'the-doppler-shift-depends-only': { steps: ['Have the student draw wavefront diagrams for three cases: (a) stationary source, stationary observer; (b) source moving.', 'Ask them to measure wavelength \\(\\lambda\\) in each diagram and compute frequency received using \\(f\'.', 'Show that in (b), \\(\\lambda\\) changes but wave speed relative to observer is \\(v\\); in (c), \\(\\lambda\\) is unchanged.', 'Derive both formulas from the diagrams.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_011', difficulty: 'standard',
          question: 'The Doppler effect for sound waves when both the source and observer are.',
          hint: 'If stuck, review the derivation of the moving source formula (wavelength compression) and.',
          misconception: 'Students often believe that the Doppler shift depends on the distance between source and observer, not just their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Doppler effect for sound waves when both the source and observer are in motion',
                  options: ['The Doppler effect for sound waves when both the source and observer are in motion', 'A mechanical wave is classified as **transverse** if the particles of the medium', 'The speed of a travelling wave is the rate at', 'The speed of sound in air is the rate at'],
                  hint: 'If stuck, review the derivation of the moving source formula (wavelength compression) and moving.',
                  misconception: 'Students often believe that the Doppler shift depends on the distance between source and observer, not just their relative velocity.' }
          ],
            remediations: { 'the-doppler-shift-depends-on': { steps: ['To address the distance misconception: Use a video of a passing ambulance siren – the pitch changes abruptly when.', 'To fix the speed of sound misconception: Perform a thought experiment – if the source moves at the speed of sound.', 'To fix sign convention: Teach a systematic method: (1) Draw a line from source to observer.', '(2) Assign positive direction from observer to source.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_14_012', difficulty: 'standard',
          question: 'When a travelling wave encounters a boundary, it gets reflected.',
          hint: 'If stuck, review the principle of superposition (node c11_phy_cbse_14_005) and the.',
          misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like.',
          parts: [
                { id: 'a', prompt: 'A student writes the reflected wave at a rigid boundary as y_r = a sin(kx + ωt) for an incident wave y_i = a sin(kx - ωt).', answer: 'The error is missing the phase change of π',
                  options: ['The error is missing the phase change of π', 'bounces back'],
                  hint: 'If stuck, review the principle of superposition (node c11_phy_cbse_14_005) and the mathematical.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall,.' },
                { id: 'b', prompt: 'An incident longitudinal wave in a closed pipe is described by s_i(x,t) = 0.02 sin(50x - 2000t) (SI units).', answer: 'Closed end = rigid boundary → phase change π',
                  options: ['Closed end = rigid boundary → phase change π', 'bounces back'],
                  hint: 'If stuck, review the principle of superposition (node c11_phy_cbse_14_005) and the mathematical.',
                  misconception: 'Students often believe that the phase change of π at a rigid boundary occurs because the wave "bounces back" like a ball hitting a wall,.' }
          ],
            remediations: { 'the-phase-change-of-at': { steps: ['Re-visit the boundary condition: At a fixed end, the string cannot move → y_total = 0 always.', 'Write y_i + y_r = 0 at x=0.', 'Substitute y_i = a sin(-ωt) = -a sin(ωt).', 'Solve for y_r: y_r = a sin(ωt).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
