import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch06_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch06_p3: SimDef = {
    id: 'v3_c11_phy_ch06_p3',
    title: 'System of Particles and Rotational Motion · Part 3/3',
    subtitle: 'Watch a hundred fragments obey one invisible point.',
    classLevel: 11, subject: 'physics', topic: 'System of Particles and Rotational Motion · Part 3/3',
    chapters: ['c11_phy_ch06'],
    nodeIds: ['c11_phy_cbse_06_013', 'c11_phy_cbse_06_014', 'c11_phy_cbse_06_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tracker following a point with no mass in it', intro: 'Each blade particle of a fan circles differently, yet the fan \'as a whole\' moves simply — that average point does all the bookkeeping.', goal: 'Compute centre of mass and explain why internal forces can\'t deflect its motion.' },
    discovery: {
        question: 'A Diwali rocket explodes mid-flight into a hundred fragments — where does the centre of mass go?',
        options: ['It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM', 'It falls straight down once the pieces scatter', 'It speeds up from the explosion\'s energy', 'It stops — the system no longer exists'],
        answer: 'It keeps tracing the original parabola — internal forces cancel in pairs; only external gravity steers the CM',
        hook: 'A uniform ring\'s centre of mass sits at its geometric centre — a point containing zero mass; the CM needn\'t live inside the material at all.',
    },
    teaching: [
        { title: 'Dynamics of Rotational Motion: Torque and Angular Acceleration', text: 'The dynamics of rotational motion about a fixed axis is governed by the rotational analogue of Newton\'s second law: the net external torque (τ) acting on a rigid body equals the product of its moment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_06_013', title: 'Your mission',
          mission: { widget: 'weigh', validate: 'weigh:grams=40',
            instruction: 'On the lab: weigh out 40 g — is the scale balanced?.',
        context: 'Find the CM of an L-shaped lamina of three unit squares, then argue why the exploding bomb\'s fragments can\'t move their shared centre.',
            observePrompt: 'What did the weigh interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_013', title: 'Dynamics of Rotational Motion: Torque and Angular Acceleration',
          scaffold: { problem: 'A potter\'s wheel (solid disk, mass 5.0 kg, radius 0.30 m) is rotating freely at 60 rpm.',
            steps: [
            { text: 'Identify given quantities with units: M = 5.0 kg, R = 0.30 m, ω₀ = 60 rpm, F_friction = 15 N (tangential, opposing.' },
            { text: 'Convert ω₀ to rad/s: ω₀ = 60 × (2π/60) = 2π ≈ 6.28 rad/s. Moment of inertia for solid disk about its symmetry axis:.' },
            { text: 'Angular acceleration α = τ/I = -4.5 / 0.225 = -20 rad/s² (negative because it opposes rotation).' },
            { text: 'Time to stop: ω = ω₀ + αt = 0 ⇒ t = -ω₀/α = 6.28 / 20 = 0.314 s.' },
            { text: 'Angular displacement: θ = ω₀t + ½αt² = (6.28)(0.314) + ½(-20)(0.314)² = 1.97 - 0.985 = 0.985 rad.', faded: true, blankAnswer: '(a) 6.28 rad/s, (b) 4.5 N·m (opposite to rotation), (c) 20.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_014', title: 'Rolling Motion: Kinetic Energy',
          scaffold: { problem: 'A solid sphere of mass 3 kg and radius 0.1 m rolls without slipping down an inclined plane of height 2 m starting from rest.',
            steps: [
            { text: 'Identify given: m = 3 kg, R = 0.1 m, h = 2 m, g = 9.8 m/s², I = ⅖mR², starts from rest so initial KE = 0' },
            { text: 'Determine β = I/mR² = ⅖ = 0.4. Pure rolling condition: v = ωR holds throughout' },
            { text: 'Apply energy conservation: Initial PE = mgh, Final KE = ½mv²(1 + β). So mgh = ½mv²(1 + β)' },
            { text: 'Cancel m (mass independent). Solve for v: v = √[2gh/(1+β)] = √[2×9.8×2/(1+0.4)] = √[39.2/1.4] = √28' },
            { text: 'Compute: √28 ≈ 5.29 m/s. Check units: √(m²/s²) = m/s ✓. Verify: 5.29 m/s is reasonable for 2 m drop (free fall would.' },
            { text: 'Calculate rotational KE fraction: K_rot/K_total = β/(1+β) = 0.4/1.4 ≈ 28.6%', faded: true, blankAnswer: 'v = 5.29 m/s (or √28 m/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_06_015', title: 'Rolling Motion on Inclined Plane',
          scaffold: { problem: 'A solid sphere of mass 500 g and radius 5.0 cm rolls without slipping down a rough inclined plane of length 1.5 m and angle 37°.',
            steps: [
            { text: 'Identify given quantities: m = 0.500 kg, R = 0.050 m, L = 1.5 m, θ = 37°, g = 9.8 m/s².' },
            { text: 'Use formula a = g sinθ / (1 + I/(mR²)) = 9.8 × 0.6 / (1 + 0.4) = 5.88 / 1.4 = 4.20 m/s².' },
            { text: 'Friction force from translation equation: f = mg sinθ - ma = 0.500 × 9.8 × 0.6 - 0.500 × 4.20 = 2.94 - 2.10 = 0.84.' },
            { text: 'Minimum μ from μ_min = (tanθ) / (1 + mR²/I) = tan37° / (1 + 1/0.4) = 0.75 / 3.5 = 0.214.' },
            { text: 'Verify: μ_s must be ≥ 0.214 for pure rolling. Friction does no work; energy check: mgh = 0.500 × 9.8 × (1.5 × 0.6).', faded: true, blankAnswer: '(a) 4.20 m/s², (b) 0.84 N up the plane, (c) 0.214' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Modelling a Diwali rocket\'s explosion in a simulation, a teammate makes the fragments\' centre of mass veer off \'because the pieces now fly in different directions\', and refuses to place a ring\'s centre of mass at its centre \'since there\'s no mass there.\'',
            decisions: [{ prompt: 'What does centre-of-mass physics actually say?', options: [
                { text: 'Apply both rules: the CM is a mass-weighted average position — a ring\'s CM sits at its geometric centre in empty space; it needn\'t lie in material. And internal forces cancel in action-reaction pairs, so MA_cm = F_ext: the exploded rocket\'s CM keeps tracing the original parabola under gravity alone, however the fragments scatter.', outcome: 'The simulation corrects: explosions rearrange mass but can\'t redirect the CM — only external forces can, and emptiness doesn\'t disqualify a CM.' },
                { text: 'Let the CM veer — after the blast the mass distribution changed, so its path must too.', outcome: 'Internal forces sum to zero by Newton\'s third law: the CM responds only to external forces — gravity — and stays on the parabola.', reveals: 'explosion-moves-cm' },
                { text: 'Force the ring\'s CM inside the material — a centre of mass must sit on mass.', outcome: 'CM is a weighted average of positions, not a piece of matter: rings, boomerangs and hollow spheres all have CMs in empty space.', reveals: 'cm-must-be-inside-body' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_06_015', title: 'You made it',
          caseStudy: { intro: 'Fragments fly every direction; the mass-weighted average keeps falling like nothing happened — internal chaos can\'t bend an external path.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'weigh', prompt: 'Explore the weigh interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'weigh', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_013', difficulty: 'standard',
          question: 'The dynamics of rotational motion about a fixed axis is governed by the.',
          hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia.',
          misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly.',
          parts: [
                { id: 'a', prompt: 'Explain why the moment of inertia (I) plays the same role in rotational motion as mass (m) plays in linear motion.', answer: 'Linear kinetic energy is K = ½mv²',
                  options: ['Linear kinetic energy is K = ½mv²', 'I is mass times radius', 'torque is just rotational force'],
                  hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia formulas (node.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'b', prompt: 'A constant torque of 5.0 N·m is applied to a flywheel with moment of inertia 0.40 kg·m², initially at rest. (a) Find its angular acceleration.', answer: 'Find its angular acceleration',
                  options: ['Find its angular acceleration', 'torque is just rotational force'],
                  hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia formulas (node.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'c', prompt: 'Two bodies – a hollow cylinder and a solid sphere – have the same mass (2.0 kg) and radius (0.10 m).', answer: 'For hollow cylinder: I_cyl = MR² = (2.0)(0.10)² = 0.020 kg·m²',
                  options: ['For hollow cylinder: I_cyl = MR² = (2.0)(0.10)² = 0.020 kg·m²', 'more mass at the rim gives more angular acceleration', 'torque is just rotational force'],
                  hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia formulas (node.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' }
          ],
            remediations: { 'torque-and-force-are-interchangeable': { steps: ['Revisit torque definition (τ = rF sinθ) from node c11_phy_cbse_06_004: do a door-pushing experiment – push at hinge vs.', 'handle – to feel torque depends on lever arm.', 'Revisit moment of inertia (node c11_phy_cbse_06_008): calculate I for a rod about its end vs.', 'centre to see axis dependence.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "A grindstone (solid disk, M = 10 kg, R = 0.20 m) rotates at 300 rpm.', answer: 'Error 1: ω₀ = 300 rpm = 300 × 2π/60 = 10π ≈ 31.4 rad/s, not 300 rad/s',
                  options: ['Error 1: ω₀ = 300 rpm = 300 × 2π/60 = 10π ≈ 31.4 rad/s, not 300 rad/s', 'torque is just rotational force'],
                  hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia formulas (node.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' },
                { id: 'b', prompt: 'Design a simple school-lab experiment to verify τ = Iα using a rotating platform (like a lazy Susan), a hanging mass on a string wound around the axle, and.', answer: 'Measure: axle radius r, hanging mass m, time t for mass to fall distance h',
                  options: ['Measure: axle radius r, hanging mass m, time t for mass to fall distance h', 'torque is just rotational force'],
                  hint: 'If stuck, review torque calculation (node c11_phy_cbse_06_004) and moment of inertia formulas (node.',
                  misconception: 'Students often think torque and force are interchangeable ("torque is just rotational force") and use F = ma directly with tangential force.' }
          ],
            remediations: { 'torque-and-force-are-interchangeable': { steps: ['Revisit torque definition (τ = rF sinθ) from node c11_phy_cbse_06_004: do a door-pushing experiment – push at hinge vs.', 'handle – to feel torque depends on lever arm.', 'Revisit moment of inertia (node c11_phy_cbse_06_008): calculate I for a rod about its end vs.', 'centre to see axis dependence.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_014', difficulty: 'standard',
          question: 'Rolling motion is the combination of pure translation of the centre of mass and.',
          hint: 'Review moment of inertia formulas for ring, disc, cylinder, sphere (c11_phy_cbse_06_011).',
          misconception: 'Students believe that in rolling motion, the instantaneous axis of rotation is the centre of mass, so they calculate.',
          parts: [
                { id: 'a', prompt: 'A solid sphere and a hollow sphere of same mass and radius roll without slipping at the same centre of mass speed. Which has greater total kinetic energy?', answer: 'The hollow sphere has greater total KE',
                  options: ['The hollow sphere has greater total KE', 'solid sphere has more KE'],
                  hint: 'Review moment of inertia formulas for ring, disc, cylinder, sphere (c11_phy_cbse_06_011) and energy.',
                  misconception: 'Students believe that in rolling motion, the instantaneous axis of rotation is the centre of mass, so they calculate rotational KE using.' }
          ],
            remediations: { 'in-rolling-motion': { steps: ['Place a cylinder on a ramp. Mark a point on the rim. Roll slowly and observe the marked point traces a cycloid –.', 'Calculate KE two ways: (a) K = ½mv² + ½I_cmω², (b) K = ½I_contactω² with I_contact = I_cm + mR².', 'Push a cylinder to make it slip initially. Observe friction acts forward until v = ωR.', 'Re-derive energy conservation for rolling down incline including work done by friction = 0 for pure rolling.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_06_015', difficulty: 'standard',
          question: 'Rolling motion on an inclined plane is the combined translational and.',
          hint: 'Revisit c11_phy_cbse_06_011 for moment of inertia formulas and c11_phy_cbse_06_013 for τ.',
          misconception: 'Students believe that heavier objects roll down an incline faster because "gravity pulls harder on them." They confuse.',
          parts: [
                { id: 'a', prompt: 'A solid sphere and a hollow sphere of the same mass and radius are released from rest on the same inclined plane.', answer: 'The solid sphere reaches the bottom first',
                  options: ['The solid sphere reaches the bottom first', 'gravity pulls harder on them', 'they reach together or the hollow sphere wins', 'heavier objects roll down an incline faster'],
                  hint: 'Revisit c11_phy_cbse_06_011 for moment of inertia formulas and c11_phy_cbse_06_013 for τ = Iα.',
                  misconception: 'Students believe that heavier objects roll down an incline faster because "gravity pulls harder on them." They confuse the gravitational.' },
                { id: 'b', prompt: 'A student claims: "Static friction acts up the incline for a cylinder rolling down, so it must be doing positive work on the cylinder because the cylinder.', answer: 'Static friction does zero work in pure rolling',
                  options: ['Static friction does zero work in pure rolling', 'gravity pulls harder on them', 'heavier objects roll down an incline faster'],
                  hint: 'Revisit c11_phy_cbse_06_011 for moment of inertia formulas and c11_phy_cbse_06_013 for τ = Iα.',
                  misconception: 'Students believe that heavier objects roll down an incline faster because "gravity pulls harder on them." They confuse the gravitational.' },
                { id: 'c', prompt: 'A solid cylinder of mass 2.0 kg and radius 0.10 m rolls without slipping down a 30° incline of length 2.0 m.', answer: 'Given: m = 2.0 kg, R = 0.10 m, θ = 30°, L = 2.0 m, g = 9.8 m/s²',
                  options: ['Given: m = 2.0 kg, R = 0.10 m, θ = 30°, L = 2.0 m, g = 9.8 m/s²', 'gravity pulls harder on them', 'heavier objects roll down an incline faster'],
                  hint: 'Revisit c11_phy_cbse_06_011 for moment of inertia formulas and c11_phy_cbse_06_013 for τ = Iα.',
                  misconception: 'Students believe that heavier objects roll down an incline faster because "gravity pulls harder on them." They confuse the gravitational.' }
          ],
            remediations: { 'heavier-objects-roll-down-an': { steps: ['If the student holds this misconception, have them derive the acceleration formula step-by-step from mg sinθ - f =.', 'Explicitly show m cancels: f = Iα/R = Ia/R², so mg sinθ - Ia/R² = ma → a = g sinθ / (1 + I/(mR²)).', 'Then test with two objects of same shape but different masses (e.g., two solid cylinders, one solid metal, one hollow.', 'They will reach the bottom simultaneously.'], labTask: { instruction: 'On the interactive: weigh out 40 g — is the scale balanced? — then check.', widget: 'weigh', validate: 'weigh:grams=40' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
