import type { SimDef } from '../../engine/types';
import C11_PhysicsGyroscopePrecessionSim from '../../../simulations/three/C11_PhysicsGyroscopePrecessionSim';

/** v3 wrapped master — C11_PhysicsGyroscopePrecessionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_physicsgyroscopeprecessionsim: SimDef = {
    id: 'v3w_c11_physicsgyroscopeprecessionsim',
    title: 'Angular Momentum: Definition and Conservation',
    subtitle: 'Covers: angular momentum definition for particle and system, torque-angular momentum.',
    classLevel: 11, subject: 'physics', topic: 'Angular Momentum: Definition and Conservation',
    chapters: [],
    nodeIds: ['c11_phy_cbse_06_005', 'c11_phy_cbse_06_013'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a rotating office chair: sit with arms outstretched holding weights, have someone spin you gently,.', goal: 'Master Angular Momentum: Definition and Conservation.' },
    discovery: {
        question: 'Two identical particles of mass m move in opposite directions along parallel lines separated by distance d, each with speed v.',
        options: ['Choose origin O', 'origin-independence', 'conservation'],
        answer: 'Choose origin O',
        hook: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.',
    },
    teaching: [
        { title: 'Angular momentum (L) of a particle about a.', text: 'Angular momentum (L) of a particle about a point O is the cross product of its position vector r (from O to the particle) and its linear momentum p = mv: **L = r × p**.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_005', title: 'Angular momentum (L) of a particle.',
          scaffold: { problem: 'A particle of mass 0.5 kg moves in the x-y plane with velocity v = (4î + 3ĵ) m/s.',
            steps: [
            { text: 'Identify given quantities: m = 0.5 kg, v = (4î + 3ĵ) m/s, position w.r.t origin r_O = (3î + 4ĵ) m, position w.r.t point.' },
            { text: 'Compute linear momentum p = mv = 0.5(4î + 3ĵ) = (2î + 1.5ĵ) kg·m/s.' },
            { text: 'For (a) origin: L_O = r_O × p = (3î + 4ĵ) × (2î + 1.5ĵ). Use determinant: î(0) - ĵ(0) + k̂(3×1.5 - 4×2) = k̂(4.5 - 8) =.' },
            { text: 'For (b) point (1,2): L_P = r_P × p = (2î + 2ĵ) × (2î + 1.5ĵ) = k̂(2×1.5 - 2×2) = k̂(3 - 4) = -1 k̂ kg·m²/s.' },
            { text: 'Verify: L_O ≠ L_P because reference point changed. Check units: m × (kg·m/s) = kg·m²/s ✓.' },
            { text: 'Physical interpretation: The particle\'s motion is not circular about either point; angular momentum is defined for any.', faded: true, blankAnswer: '(a) L = -3.5 k̂ kg·m²/s; (b) L = -1 k̂ kg·m²/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_013', title: 'The dynamics of rotational motion about.',
          scaffold: { problem: 'A potter\'s wheel (solid disk, mass 5.0 kg, radius 0.30 m) is rotating freely at 60 rpm.',
            steps: [
            { text: 'Identify given quantities with units: M = 5.0 kg, R = 0.30 m, ω₀ = 60 rpm, F_friction = 15 N (tangential, opposing.' },
            { text: 'Convert ω₀ to rad/s: ω₀ = 60 × (2π/60) = 2π ≈ 6.28 rad/s. Moment of inertia for solid disk about its symmetry axis: I =.' },
            { text: 'Angular acceleration α = τ/I = -4.5 / 0.225 = -20 rad/s² (negative because it opposes rotation).' },
            { text: 'Time to stop: ω = ω₀ + αt = 0 ⇒ t = -ω₀/α = 6.28 / 20 = 0.314 s.' },
            { text: 'Angular displacement: θ = ω₀t + ½αt² = (6.28)(0.314) + ½(-20)(0.314)² = 1.97 - 0.985 = 0.985 rad.', faded: true, blankAnswer: '(a) 6.28 rad/s, (b) 4.5 N·m (opposite to rotation), (c) 20.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_phy_cbse_06_013', title: 'Identify each idea',
          dissect: { specimen: 'Angular Momentum: Definition and Conservation', spots: [
            { id: 's1', label: 'Angular momentum L of a', prompt: 'Which idea is this? — Angular momentum (L) of a particle about a point O is the cross product of its position.', answer: 'Angular momentum L of a', options: ['Angular momentum L of a', 'The dynamics of rotational motion'] },
            { id: 's2', label: 'The dynamics of rotational motion', prompt: 'Which idea is this? — The dynamics of rotational motion about a fixed axis is governed by the rotational.', answer: 'The dynamics of rotational motion', options: ['The dynamics of rotational motion', 'Angular momentum L of a'] }
          ] } }
    ],
    explore: { component: C11_PhysicsGyroscopePrecessionSim, prompt: 'Explore the interactive — Angular Momentum: Definition and Conservation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_005', difficulty: 'standard',
          question: 'Angular momentum (L) of a particle about a point O is the cross product of its.',
          hint: 'Review vector cross product (c11_phy_cbse_06_003) – specifically the determinant method.',
          misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.',
          parts: [
                { id: 'a', prompt: 'Two identical particles of mass m move in opposite directions along parallel lines separated by distance d, each with speed v.', answer: 'Choose origin O',
                  options: ['Choose origin O', 'origin-independence', 'conservation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' },
                { id: 'b', prompt: 'A uniform rod of mass 4 kg and length 1.2 m rotates freely about a vertical axis through its centre.', answer: 'Step 1: Initial I = I_rod + I_rings(at centre) = (4×1.2²)/12 + 0 = 0.48 kg·m²',
                  options: ['Step 1: Initial I = I_rod + I_rings(at centre) = (4×1.2²)/12 + 0 = 0.48 kg·m²', 'conservation of angular momentum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' },
                { id: 'c', prompt: 'A horizontal platform (moment of inertia I_p) rotates freely at angular speed ω_0.', answer: 'Initial I_i = I_p + 2m_wR²',
                  options: ['Initial I_i = I_p + 2m_wR²', 'conservation of angular momentum', 'conservation of mechanical energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' }
          ],
            remediations: { 'conservation-of-angular-momentum-means': { steps: ['Revisit cross product (c11_phy_cbse_06_003): practice r × p calculations with varying angles.', 'Re-derive dL/dt = τ from l = r × p for single particle, then extend to system.', 'Do the "two-disc coupling" thought experiment: draw free-body diagrams showing internal friction forces on each disc,.', 'Practice defining system boundaries: list all objects, identify which forces are internal/external.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A disc (I = 0.5 kg·m²) rotates at 10 rad/s. A second identical disc is dropped coaxially onto it.', answer: 'The solution is incorrect',
                  options: ['The solution is incorrect', 'conservation of angular momentum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' },
                { id: 'b', prompt: 'Design a classroom demonstration using a rotating stool, two 2-kg dumbbells, and a motion sensor to verify angular momentum conservation.', answer: 'Procedure: Student sits on stool holding dumbbells at arms\' length (R ≈ 0.8 m)',
                  options: ['Procedure: Student sits on stool holding dumbbells at arms\' length (R ≈ 0.8 m)', 'ω increased so L increased', 'conservation of angular momentum'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "conservation of angular momentum" means angular velocity ω is constant when no external torque acts.' }
          ],
            remediations: { 'conservation-of-angular-momentum-means': { steps: ['Revisit cross product (c11_phy_cbse_06_003): practice r × p calculations with varying angles.', 'Re-derive dL/dt = τ from l = r × p for single particle, then extend to system.', 'Do the "two-disc coupling" thought experiment: draw free-body diagrams showing internal friction forces on each disc,.', 'Practice defining system boundaries: list all objects, identify which forces are internal/external.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_013', difficulty: 'standard',
          question: 'The dynamics of rotational motion about a fixed axis is governed by the.',
          hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia.',
          misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly.',
          parts: [
                { id: 'a', prompt: 'Explain why the moment of inertia (I) plays the same role in rotational motion as mass (m) plays in linear motion.', answer: 'Linear kinetic energy is K = ½mv²',
                  options: ['Linear kinetic energy is K = ½mv²', 'I is mass times radius', 'torque is just rotational force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'b', prompt: 'A constant torque of 5.0 N·m is applied to a flywheel with moment of inertia 0.40 kg·m², initially at rest. (a) Find its angular acceleration.', answer: 'Find its angular acceleration',
                  options: ['Find its angular acceleration', 'torque is just rotational force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'c', prompt: 'Two bodies – a hollow cylinder and a solid sphere – have the same mass (2.0 kg) and radius (0.10 m).', answer: 'For hollow cylinder: I_cyl = MR² = (2.0)(0.10)² = 0.020 kg·m²',
                  options: ['For hollow cylinder: I_cyl = MR² = (2.0)(0.10)² = 0.020 kg·m²', 'more mass at the rim gives more angular acceleration', 'torque is just rotational force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' }
          ],
            remediations: { 'torque-and-force-are-interchangeable': { steps: ['Revisit torque definition (τ = rF sinθ) from node c11_phy_cbse_06_004: do a door-pushing experiment – push at hinge vs.', 'handle – to feel torque depends on lever arm.', 'Revisit moment of inertia (node c11_phy_cbse_06_008): calculate I for a rod about its end vs.', 'centre to see axis dependence.'] } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "A grindstone (solid disk, M = 10 kg, R = 0.20 m) rotates at 300 rpm.', answer: 'Error 1: ω₀ = 300 rpm = 300 × 2π/60 = 10π ≈ 31.4 rad/s, not 300 rad/s',
                  options: ['Error 1: ω₀ = 300 rpm = 300 × 2π/60 = 10π ≈ 31.4 rad/s, not 300 rad/s', 'torque is just rotational force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'b', prompt: 'Design a simple school-lab experiment to verify τ = Iα using a rotating platform (like a lazy Susan), a hanging mass on a string wound around the axle, and a.', answer: 'Measure: axle radius r, hanging mass m, time t for mass to fall distance h',
                  options: ['Measure: axle radius r, hanging mass m, time t for mass to fall distance h', 'torque is just rotational force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' }
          ],
            remediations: { 'torque-and-force-are-interchangeable': { steps: ['Revisit torque definition (τ = rF sinθ) from node c11_phy_cbse_06_004: do a door-pushing experiment – push at hinge vs.', 'handle – to feel torque depends on lever arm.', 'Revisit moment of inertia (node c11_phy_cbse_06_008): calculate I for a rod about its end vs.', 'centre to see axis dependence.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
