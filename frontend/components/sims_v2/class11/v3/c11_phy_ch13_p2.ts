import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch13_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch13_p2: SimDef = {
    id: 'v3_c11_phy_ch13_p2',
    title: 'Oscillations · Part 2/2',
    subtitle: 'Draw the line between merely repeating and truly harmonic.',
    classLevel: 11, subject: 'physics', topic: 'Oscillations · Part 2/2',
    chapters: ['c11_phy_ch13'],
    nodeIds: ['c11_phy_cbse_13_007', 'c11_phy_cbse_13_008', 'c11_phy_cbse_13_009', 'c11_phy_cbse_13_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a metronome maker checking which motions qualify', intro: 'A pendulum ticks, a fan spins, a ball bounces — all repeat, but only one has the linear restoring force that defines SHM.', goal: 'Distinguish oscillatory from simple harmonic motion using the F = −kx criterion.' },
    discovery: {
        question: 'A ceiling fan rotates forever and a ball bounces repeatedly — both repeat, so both are SHM?',
        options: ['Neither — SHM demands a restoring force exactly proportional to displacement, F = −kx; mere repetition isn\'t enough', 'Yes — anything periodic is simple harmonic', 'Yes — repetition is the definition', 'No — but a bouncing ball counts'],
        answer: 'Neither — SHM demands a restoring force exactly proportional to displacement, F = −kx; mere repetition isn\'t enough',
        hook: 'Even the pendulum only qualifies for small swings — −mgL sin θ is approximately −mgLθ, and that approximation is the whole licence.',
    },
    teaching: [
        { title: 'Damped Simple Harmonic Motion', text: 'Damped simple harmonic motion is an oscillatory motion where the amplitude decreases exponentially with time due to a dissipative damping force (typically viscous, proportional to velocity, F_d.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_13_007', title: 'Your mission',
          mission: { widget: 'wave', validate: 'wave:amplitude=80',
            instruction: 'On the lab: push the amplitude up — do the particles move faster or just higher?.',
        context: 'Fix θ(t) = 0.2 sin(5t) written in degrees, then test which motions — fan, bouncing ball, small-angle pendulum — truly earn \'simple harmonic.\'',
            observePrompt: 'What did the wave interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_13_007', title: 'Damped Simple Harmonic Motion',
          scaffold: { problem: 'A 200 g mass is attached to a spring of spring constant 50 N/m.',
            steps: [
            { text: 'Identify given quantities with units: m = 200 g = 0.2 kg, k = 50 N/m, b = 0.4 kg/s. Find f₀, f\', t_{1/2}, Q.' },
            { text: 'Check damping regime using discriminant: b² = 0.16, 4mk = 4×0.2×50 = 40.' },
            { text: 'Compute natural angular frequency ω₀ = √(k/m) = √(50/0.2) = √250 = 15.81 rad/s.' },
            { text: 'Compute damped angular frequency ω\' = √(ω₀² - b²/4m²) = √(250 - 0.16/(4×0.04)) = √(250 - 0.16/0.16) = √(250 - 1) = √249.' },
            { text: 'Amplitude decay time constant τ = 2m/b = 2×0.2/0.4 = 1.0 s. Amplitude halves when e^(-t/τ) = 1/2 → t = τ ln 2 = 1.0.' },
            { text: 'Quality factor Q = ω₀m/b = 15.81 × 0.2 / 0.4 = 7.9. Alternatively Q = ω₀/γ, γ = b/m = 0.4/0.2 = 2 s⁻¹, Q = 15.81/2.' },
            { text: 'Verify physical reasonableness: f\' ≈ f₀ (light damping), Q ≈ 8 (moderate damping), half-life < τ (since ln 2 < 1).', faded: true, blankAnswer: '(a) f₀ = 2.52 Hz, (b) f\' = 2.51 Hz, (c) t_{1/2} = 0.693.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_13_008', title: 'Forced Oscillations and Resonance',
          scaffold: { problem: 'A 200 g mass attached to a spring (k = 80 N/m) oscillates in a viscous fluid providing damping force F_d = -0.2v N·s/m.',
            steps: [
            { text: 'Convert mass to kg: m = 0.2 kg. Identify k = 80 N/m, b = 0.2 N·s/m, F₀ = 1.5 N.' },
            { text: 'Compute natural angular frequency: ω₀ = √(k/m) = √(80/0.2) = √400 = 20 rad/s.' },
            { text: 'Compute damping constant: β = b/(2m) = 0.2/(2×0.2) = 0.5 s⁻¹.' },
            { text: 'Compute resonance frequency: ω_res = √(ω₀² - 2β²) = √(400 - 2×0.25) = √399.5 ≈ 19.987 rad/s.' },
            { text: 'Compute maximum amplitude: A_max = F₀/(2mβ√(ω₀² - β²)) = 1.5/(2×0.2×0.5×√(400 - 0.25)) = 1.5/(0.2×19.987) ≈ 1.5/3.997 ≈.' },
            { text: 'Compute quality factor: Q = ω₀/(2β) = 20/(2×0.5) = 20.', faded: true, blankAnswer: '(a) ω₀ = 20 rad/s (≈ 3.18 Hz), (b) ω_res ≈ 19.99 rad/s, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_13_009', title: 'Phase in SHM: Initial Phase and Phase Constant',
          scaffold: { problem: 'A particle executes SHM with amplitude 8 cm and frequency 2 Hz.',
            steps: [
            { text: 'Identify given quantities with units. Amplitude \\( A = 8 \\text{ cm} = 0.08 \\text{ m} \\).' },
            { text: 'Use initial conditions to find \\( \\phi \\). \\( x_0 = A \\cos \\phi \\Rightarrow \\cos \\phi = x_0/A = 0.04/0.08 = 0.5.' },
            { text: 'Write displacement equation. \\( x(t) = 0.08 \\cos(4\\pi t + \\pi/3) \\) m.' },
            { text: 'Find earliest \\( t > 0 \\) when particle crosses mean position (\\( x = 0 \\)) moving positively (\\( v > 0 \\)).' },
            { text: 'Verify physical reasonableness. Period \\( T = 1/\\nu = 0.5 \\text{ s} \\).' },
            { text: 'State final answers with units. (a) \\( \\phi = \\pi/3 \\) rad. (b) \\( x(t) = 0.08 \\cos(4\\pi t + \\pi/3) \\) m.', faded: true, blankAnswer: '(a) \\( \\phi = \\pi/3 \\) rad; (b) \\( x(t) = 0.08 \\cos(4\\pi.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_13_010', title: 'Word Problems: SHM Applications',
          scaffold: { problem: 'A vertical spring of force constant 400 N/m hangs from a ceiling.',
            steps: [
            { text: 'Identify given quantities with units: k = 400 N/m, m = 2.0 kg, additional displacement = 5.0 cm = 0.050 m (this is the.' },
            { text: '(a) At equilibrium, spring force balances weight: kx_eq = mg → x_eq = mg/k = (2.0 × 9.8)/400 = 19.6/400 = 0.049 m = 4.9.' },
            { text: '(b) Angular frequency for vertical spring-mass is same as horizontal: ω = √(k/m) = √(400/2.0) = √200 = 14.14 rad/s.' },
            { text: '(c) At t = 0, block is at x = +A = +0.050 m (5 cm below equilibrium) and released from rest (v = 0).' },
            { text: '(d) Maximum speed v_max = ωA = 14.14 × 0.050 = 0.707 m/s.' },
            { text: '(e) At x = –3.0 cm = –0.030 m (above equilibrium), use v = ω√(A² – x²) = 14.14 × √(0.050² – 0.030²) = 14.14 × √(0.0025.' },
            { text: 'Verify: v_max = 0.707 m/s is reasonable for a 2 kg block on a stiff spring; v at x = 3 cm is less than v_max.', faded: true, blankAnswer: '(a) 4.9 cm, (b) 14.1 rad/s, (c) x(t) = 0.050 cos(14.14 t).' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting motions for a mechanics quiz, a student files the ceiling fan, a bouncing ball, and a pendulum swinging at 60° all under \'SHM — they repeat.\'',
            decisions: [{ prompt: 'Which actually qualify, and why?', options: [
                { text: 'Apply the two filters: oscillatory motion needs to-and-fro movement about a stable equilibrium under a restoring force — the fan merely repeats (periodic, not oscillatory) and the bouncing ball loses energy. SHM is stricter still: F = −kx exactly — the pendulum\'s restoring torque is −mgL sinθ, which is linear only for small θ; at 60° it\'s periodic but not simple harmonic.', outcome: 'The quiz sorts correctly: periodic ⊃ oscillatory ⊃ SHM — each layer adds a requirement, and SHM\'s is the linear restoring law.' },
                { text: 'Keep all three — repeating motion is oscillation, and oscillation is SHM.', outcome: 'Repetition isn\'t to-and-fro about equilibrium, and oscillation isn\'t necessarily sinusoidal — only an exactly linear restoring force earns SHM.', reveals: 'periodic-equals-shm' },
                { text: 'Drop only the fan — pendulums and bouncing balls are classic SHM examples.', outcome: 'The pendulum is SHM only in the small-angle approximation (sinθ ≈ θ); at 60° the sin law bends and the motion is periodic but not harmonic — and a bouncing ball isn\'t even periodic once it loses height.', reveals: 'pendulum-always-shm' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_13_010', title: 'You made it',
          caseStudy: { intro: 'Periodic means it comes back; simple harmonic means a linear pull sends it back — one is a schedule, the other is a law.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'wave', prompt: 'Explore the wave interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'wave', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_007', difficulty: 'standard',
          question: 'Damped simple harmonic motion is an oscillatory motion where the amplitude.',
          hint: 'Revisit c11_phy_cbse_13_006 (Spring-Mass System: Time Period) and c11_phy_cbse_13_004.',
          misconception: 'Students often think the damped frequency ω\' = √(k/m - b²/4m²) is always less than the natural frequency ω₀ = √(k/m).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Damped simple harmonic motion is an oscillatory motion where the amplitude decreases',
                  options: ['Damped simple harmonic motion is an oscillatory motion where the amplitude decreases', 'Periodic motion is a motion that repeats itself identically after a fixed interval of', 'Simple Harmonic Motion (SHM) is a special type of periodic oscillatory motion where the', 'In Simple Harmonic Motion (SHM), displacement x(t) = A cos(ωt + φ) describes the position'],
                  hint: 'Revisit c11_phy_cbse_13_006 (Spring-Mass System: Time Period) and c11_phy_cbse_13_004 (Energy.',
                  misconception: 'Students often think the damped frequency ω\' = √(k/m - b²/4m²) is always less than the natural frequency ω₀ = √(k/m) by a significant.' }
          ],
            remediations: { 'the-damped-frequency-k-m': { steps: ['If the student struggles: (1) Revisit the spring-mass system (node c11_phy_cbse_13_006) and derive mẍ + kx = 0.', '(2) Add a velocity-dependent force -bv to the free-body diagram and re-derive mẍ + bẋ + kx = 0.', '(3) Solve the auxiliary equation mλ² + bλ + k = 0 using quadratic formula from c10_math_cbse_04_005.', '(4) Plot the three cases of roots (real distinct, real equal, complex conjugate) and connect to motion types.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the damped frequency ω\' = √(k/m - b²/4m²) is always less than the natural frequency ω₀ = √(k/m).',
          parts: [
                { id: 'a', prompt: 'A student claims: "In damped SHM, the total energy decays as E = E₀e^(-bt/m), so the rate of energy loss dE/dt = -(b/m)E.', answer: 'The claim is approximately true only for light damping (b² ≪ 4mk)',
                  options: ['The claim is approximately true only for light damping (b² ≪ 4mk)', 'exactly constant'],
                  hint: 'Revisit c11_phy_cbse_13_006 (Spring-Mass System: Time Period) and c11_phy_cbse_13_004 (Energy.',
                  misconception: 'Students often think the damped frequency ω\' = √(k/m - b²/4m²) is always less than the natural frequency ω₀ = √(k/m) by a significant.' }
          ],
            remediations: { 'the-damped-frequency-k-m': { steps: ['If the student struggles: (1) Revisit the spring-mass system (node c11_phy_cbse_13_006) and derive mẍ + kx = 0.', '(2) Add a velocity-dependent force -bv to the free-body diagram and re-derive mẍ + bẋ + kx = 0.', '(3) Solve the auxiliary equation mλ² + bλ + k = 0 using quadratic formula from c10_math_cbse_04_005.', '(4) Plot the three cases of roots (real distinct, real equal, complex conjugate) and connect to motion types.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_008', difficulty: 'standard',
          question: 'Forced oscillations occur when an external periodic force drives a damped.',
          hint: 'Review c11_phy_cbse_13_007 (Damped Simple Harmonic Motion) for the equation of motion.',
          misconception: 'Students believe resonance occurs exactly at ω = ω₀ = √(k/m) for all damped systems, and that the amplitude becomes.',
          parts: [
                { id: 'a', prompt: 'Why does the amplitude not become infinite at resonance in a real system? Explain using energy balance between the driving force and damping force.', answer: 'At resonance, the driving force does maximum work per cycle',
                  options: ['At resonance, the driving force does maximum work per cycle', 'resonance implies infinite amplitude, missing that damping limits energy buildup'],
                  hint: 'Review c11_phy_cbse_13_007 (Damped Simple Harmonic Motion) for the equation of motion, damping.',
                  misconception: 'Students believe resonance occurs exactly at ω = ω₀ = √(k/m) for all damped systems, and that the amplitude becomes infinite at resonance.' }
          ],
            remediations: { 'resonance-occurs-exactly-at-k': { steps: ['Revisit the differential equation mẍ + bẋ + kx = F₀ cos(ωt) and solve for the particular solution using complex.', 'Plot |Ã| vs ω for three β values (0.1ω₀, 0.5ω₀, ω₀) using Python/Desmos — observe peak shifts left and broadens.', 'Derive ω_res by setting d|Ã|/dω = 0 → ω_res = √(ω₀² - 2β²).', 'Compute power input P = F·v averaged over cycle: show P_max occurs when φ = 0 (force in phase with velocity) which.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_009', difficulty: 'standard',
          question: 'In Simple Harmonic Motion described by \\( x(t) = A \\cos(\\omega t + \\phi) \\).',
          hint: 'Revisit node c11_phy_cbse_13_003 for velocity derivation and node c11_phy_cbse_13_002 for.',
          misconception: 'Students believe the phase constant \\( \\phi \\) is always the "initial angle on the reference circle" without realizing.',
          parts: [
                { id: 'a', prompt: 'Two SHMs are given by \\( x_1 = A \\cos(\\omega t) \\) and \\( x_2 = A \\cos(\\omega t + \\pi/2) \\).', answer: 'Particle 2 at \\( t=0 \\) is at the mean position moving negatively',
                  options: ['Particle 2 at \\( t=0 \\) is at the mean position moving negatively', 'particle 2 leads by \\( T/4 \\)', 'initial angle on the reference circle', 'one oscillator is half a period behind'],
                  hint: 'Revisit node c11_phy_cbse_13_003 for velocity derivation and node c11_phy_cbse_13_002 for the.',
                  misconception: 'Students believe the phase constant \\( \\phi \\) is always the "initial angle on the reference circle" without realizing that the reference.' },
                { id: 'b', prompt: 'The displacement of a particle is given by \\( x(t) = 3 \\sin(2t) + 4 \\cos(2t) \\) (SI units).', answer: '\\( D = \\sqrt{3^2 + 4^2} = 5 \\) m',
                  options: ['\\( D = \\sqrt{3^2 + 4^2} = 5 \\) m', 'initial angle on the reference circle', 'one oscillator is half a period behind', '\\( \\phi = +\\pi/3 \\'],
                  hint: 'Revisit node c11_phy_cbse_13_003 for velocity derivation and node c11_phy_cbse_13_002 for the.',
                  misconception: 'Students believe the phase constant \\( \\phi \\) is always the "initial angle on the reference circle" without realizing that the reference.' }
          ],
            remediations: { 'the-phase-constant-phi-is': { steps: ['Draw the reference circle. Mark the initial radius vector at angle \\( \\phi \\) from +x axis (anticlockwise).', 'Given \\( x_0, v_0 \\), compute \\( \\tan \\phi = -v_0/(\\omega x_0) \\) (derived from \\( v_0 = -\\omega A \\sin \\phi, x_0 =.', 'Practice converting between forms: \\( A \\cos(\\omega t + \\phi) = A \\sin(\\omega t + \\phi + \\pi/2) \\).', 'For two SHMs, compute \\( \\Delta \\phi = \\phi_1 - \\phi_2 \\) and interpret: \\( \\Delta \\phi = 0 \\) (in phase), \\( \\pi \\).'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_13_010', difficulty: 'standard',
          question: 'Word problems in SHM applications require translating a physical oscillatory.',
          hint: 'If stuck, revisit c11_phy_cbse_13_003 (SHM: Displacement, Velocity, Acceleration) for the.',
          misconception: 'Students treat the phase constant φ as an arbitrary angle to be memorized rather than a quantity determined by specific.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems in SHM applications require translating a physical oscillatory system',
                  options: ['Word problems in SHM applications require translating a physical oscillatory system', 'Periodic motion is a motion that repeats itself identically after a fixed interval of', 'Simple Harmonic Motion (SHM) is a special type of periodic oscillatory motion where the', 'In Simple Harmonic Motion (SHM), displacement x(t) = A cos(ωt + φ) describes the position'],
                  hint: 'If stuck, revisit c11_phy_cbse_13_003 (SHM: Displacement, Velocity, Acceleration) for the kinematic.',
                  misconception: 'Students treat the phase constant φ as an arbitrary angle to be memorized rather than a quantity determined by specific initial conditions.' }
          ],
            remediations: { 'students-treat-the-phase-constant': { steps: ['Revisit node c11_phy_cbse_13_009 (Phase in SHM) and practice converting between x(0), v(0) and (A, φ) using the two.', 'Make a table of 5 standard initial conditions (released from +A, released from –A, at mean moving right, at mean moving.', 'Drill unit conversions: always write A in meters, ω in rad/s, t in s before substituting.', 'Solve 3 problems from NCERT Exercises 13.7–13.12 where initial conditions vary, checking answers with the back-of-book.'], labTask: { instruction: 'On the interactive: push the amplitude up — do the particles move faster or just higher? — then check.', widget: 'wave', validate: 'wave:amplitude=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
