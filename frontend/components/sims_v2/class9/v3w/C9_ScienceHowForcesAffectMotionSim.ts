import type { SimDef } from '../../engine/types';
import C9_ScienceHowForcesAffectMotionSim from '../../../simulations/c6_12/C9_ScienceHowForcesAffectMotionSim';

/** v3 wrapped master — C9_ScienceHowForcesAffectMotionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_sciencehowforcesaffectmotionsim: SimDef = {
    id: 'v3w_c9_sciencehowforcesaffectmotionsim',
    title: 'How Forces Affect Motion',
    subtitle: 'Covers the Work-Energy Theorem (W_net = delta_KE), its derivation from Newton\'s Second.',
    classLevel: 9, subject: 'science', topic: 'Simple Machines: Inclined Planes and Levers',
    chapters: [],
    nodeIds: ['c9_physics_ch4_11', 'c9_physics_ch4_2', 'c9_physics_ch4_3', 'c9_physics_ch4_7', 'c9_physics_ch6_8', 'c9_physics_ch5_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine pushing a box from rest until it reaches 5 m/s. You did work on the box — you applied a force over a.', goal: 'Master How Forces Affect Motion.' },
    discovery: {
        question: 'A net force of 10 N acts on a 2 kg object over a distance of 5 m. The object starts from rest. Find the final velocity using the Work-Energy Theorem.',
        options: ['Step 1: Calculate work', 'change in kinetic energy', 'kinetic energy'],
        answer: 'Step 1: Calculate work',
        hook: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).',
    },
    teaching: [
        { title: 'The Work-Energy Theorem states that the net.', text: 'The Work-Energy Theorem states that the net work done by all forces acting on a body equals the change in its kinetic energy: W_net = delta_KE = (1/2)mv^2 - (1/2)mu^2, where m is mass, v is final.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_physics_ch4_11', title: 'The Work-Energy Theorem states that the.',
          scaffold: { problem: 'A 1500 kg car accelerates from 10 m/s to 20 m/s. Calculate the net work done on the car using the Work-Energy Theorem.',
            steps: [
            { text: 'Identify the formula. W_net = delta_KE = (1/2)mv^2 - (1/2)mu^2.' },
            { text: 'Substitute. W_net = (1/2)(1500)(20^2) - (1/2)(1500)(10^2).' },
            { text: 'Calculate. W_net = (750)(400) - (750)(100) = 300,000 - 75,000 = 225,000 J = 225 kJ.' },
            { text: 'Interpret. The net work done is 225 kJ, which equals the increase in kinetic energy.', faded: true, blankAnswer: 'W_net = (1/2)(1500)(20^2) - (1/2)(1500)(10^2) = 300,000 -.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_2', title: 'Work done by a force is zero when the.',
          scaffold: { problem: 'A 200 g stone is tied to a 1.5 m long string and whirled in a horizontal circle at a constant speed of 4 m/s.',
            steps: [
            { text: 'Identify given quantities: mass m = 200 g = 0.2 kg, radius r = 1.5 m, speed v = 4 m/s, tension T = 2.13 N.' },
            { text: 'Recall work formula W = F·s·cosθ. In circular motion, tension is always radial (toward centre), displacement is.' },
            { text: 'For (a) full revolution: displacement over full circle is zero (returns to start), but work is path integral.' },
            { text: 'For (b) quarter revolution: same reasoning — at every point on the quarter arc, tension ⟂ displacement → dW = 0 → total.' },
            { text: 'Verify: Speed is constant (4 m/s), so kinetic energy ½mv² = 0.5 × 0.2 × 16 = 1.6 J is unchanged.', faded: true, blankAnswer: '(a) 0 J, (b) 0 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_3', title: 'The Work-Energy Theorem states that the.',
          scaffold: { problem: 'A 200 g cricket ball is bowled at 30 m/s. The batsman hits it straight back at 40 m/s. The contact time is 0.01 s.',
            steps: [
            { text: 'Identify given: \\(m = 200\\,\\text{g} = 0.2\\,\\text{kg}\\), \\(u = +30\\,\\text{m/s}\\) (towards batsman), \\(v =.' },
            { text: 'Apply Work-Energy Theorem: \\(W_{\\text{net}} = \\frac{1}{2}m(v^2 - u^2)\\).' },
            { text: 'Compute: \\(W_{\\text{net}} = 0.5 \\times 0.2 \\times (40^2 - 30^2) = 0.1 \\times (1600 - 900) = 0.1 \\times 700 =.' },
            { text: 'For average force: \\(W_{\\text{net}} = F_{\\text{avg}} \\times s\\) (force and displacement in same direction during.' },
            { text: 'Verify: 70 J is reasonable for a cricket ball; 700 N ≈ 70 kg-weight, plausible for a bat impact.', faded: true, blankAnswer: '(a) 70 J, (b) 700 N' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_7', title: 'Mechanical energy is the total energy.',
          scaffold: { problem: 'A 50 g toy car is launched from a compressed spring on a horizontal frictionless track.',
            steps: [
            { text: 'Identify given quantities: mass m = 50 g = 0.05 kg, initial KE = 0.8 J, initial PE = 0 (reference at horizontal track),.' },
            { text: 'Apply mechanical energy conservation: Total ME = initial KE + initial PE = 0.8 J + 0 = 0.8 J.' },
            { text: '(a) At maximum height, v = 0 so KE = 0. Then ME = mgh_max → 0.8 = 0.05 × 10 × h_max → h_max = 0.8 / 0.5 = 1.6 m.' },
            { text: '(b) At h = 0.5 m, PE = mgh = 0.05 × 10 × 0.5 = 0.25 J. Then KE = ME - PE = 0.8 - 0.25 = 0.55 J.' },
            { text: 'Verify: At h=0.5 m, PE=0.25 J, KE=0.55 J, sum=0.8 J. At h_max=1.6 m, PE=0.05×10×1.6=0.8 J, KE=0. Both consistent.', faded: true, blankAnswer: '(a) Maximum height = 1.6 m; (b) Speed at height 0.5 m =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_8', title: 'Resistance is the opposition a.',
          scaffold: { problem: 'A copper wire has resistivity 1.7e-8 ohm*m, length 5 m, and cross-sectional area 2e-6 m^2. Calculate its resistance.',
            steps: [
            { text: 'Identify the formula. R = rho * L / A.' },
            { text: 'Substitute. R = 1.7e-8 * 5 / 2e-6 = 8.5e-8 / 2e-6 = 4.25e-2 = 0.0425 ohms.' },
            { text: 'Interpret. The resistance is 0.0425 ohms — very low, as expected for copper (good conductor).', faded: true, blankAnswer: 'R = 1.7e-8 * 5 / 2e-6 = 0.0425 ohms. The resistance is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch5_7', title: 'Characteristics of sound waves are the.',
          scaffold: { problem: 'A sound wave has frequency 680 Hz and travels at 340 m/s. Calculate its wavelength and time period.',
            steps: [
            { text: 'Wavelength. lambda = v/f = 340/680 = 0.5 m.' },
            { text: 'Time period. T = 1/f = 1/680 = 0.00147 s (approximately 1.47 ms).', faded: true, blankAnswer: 'Wavelength = 340/680 = 0.5 m. Time period = 1/680 = 0.00147.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_physics_ch4_2', title: 'Identify each idea',
          dissect: { specimen: 'How Forces Affect Motion', spots: [
            { id: 's1', label: 'The Work-Energy Theorem states that', prompt: 'Which idea is this? — The Work-Energy Theorem states that the net work done by all forces acting on a body.', answer: 'The Work-Energy Theorem states that', options: ['The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total', 'Resistance is the opposition a'] },
            { id: 's2', label: 'Work done by a force', prompt: 'Which idea is this? — Work done by a force is zero when the force applied on an object is perpendicular to the.', answer: 'Work done by a force', options: ['Work done by a force', 'The Work-Energy Theorem states that', 'Mechanical energy is the total', 'Resistance is the opposition a'] },
            { id: 's3', label: 'Mechanical energy is the total', prompt: 'Which idea is this? — Mechanical energy is the total energy possessed by an object due to its motion and.', answer: 'Mechanical energy is the total', options: ['Mechanical energy is the total', 'The Work-Energy Theorem states that', 'Work done by a force', 'Resistance is the opposition a'] },
            { id: 's4', label: 'Resistance is the opposition a', prompt: 'Which idea is this? — Resistance is the opposition a conductor offers to electric current, measured in ohms.', answer: 'Resistance is the opposition a', options: ['Resistance is the opposition a', 'The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total'] },
            { id: 's5', label: 'Characteristics of sound waves are', prompt: 'Which idea is this? — Characteristics of sound waves are the measurable properties that describe a sound wave:.', answer: 'Characteristics of sound waves are', options: ['Characteristics of sound waves are', 'The Work-Energy Theorem states that', 'Work done by a force', 'Mechanical energy is the total'] }
          ] } }
    ],
    explore: { component: C9_ScienceHowForcesAffectMotionSim, prompt: 'Explore the interactive — How Forces Affect Motion' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch4_11', difficulty: 'standard',
          question: 'The Work-Energy Theorem states that the net work done by all forces acting on a.',
          hint: 'Revisit c9_physics_ch4_1 (Work) for the definition of work and c9_physics_ch4_2 (Kinetic.',
          misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).',
          parts: [
                { id: 'a', prompt: 'A net force of 10 N acts on a 2 kg object over a distance of 5 m. The object starts from rest. Find the final velocity using the Work-Energy Theorem.', answer: 'Step 1: Calculate work',
                  options: ['Step 1: Calculate work', 'change in kinetic energy', 'kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).' },
                { id: 'b', prompt: 'A 3 kg object moving at 6 m/s is brought to rest by friction. Calculate the work done by friction.', answer: 'W_net = delta_KE = (1/2)(3)(0^2) - (1/2)(3)(6^2) = 0 - 27 = -27 J',
                  options: ['W_net = delta_KE = (1/2)(3)(0^2) - (1/2)(3)(6^2) = 0 - 27 = -27 J', 'change in kinetic energy', 'kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).' }
          ],
            remediations: { 'students-confuse-change-in-kinetic': { steps: ['Show an object moving at constant velocity.', 'Emphasize: W = delta_KE (change), not W = KE (value).', 'Practice: calculate delta_KE = (1/2)mv^2 - (1/2)mu^2.', 'Check signs: speeding up (positive delta_KE, positive work); slowing down (negative delta_KE, negative work).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).',
          parts: [
                { id: 'a', prompt: 'A student claims: "If no work is done on an object, its kinetic energy is zero." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'change in KE', 'KE itself', 'change in kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).' },
                { id: 'b', prompt: 'A 3 kg object moving at 6 m/s is brought to rest by friction. Calculate the work done by friction.', answer: 'W_net = delta_KE = (1/2)(3)(0^2) - (1/2)(3)(6^2) = 0 - 27 = -27 J',
                  options: ['W_net = delta_KE = (1/2)(3)(0^2) - (1/2)(3)(6^2) = 0 - 27 = -27 J', 'change in kinetic energy', 'kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse "change in kinetic energy" (delta_KE) with "kinetic energy" (KE).' }
          ],
            remediations: { 'students-confuse-change-in-kinetic': { steps: ['Show an object moving at constant velocity.', 'Emphasize: W = delta_KE (change), not W = KE (value).', 'Practice: calculate delta_KE = (1/2)mv^2 - (1/2)mu^2.', 'Check signs: speeding up (positive delta_KE, positive work); slowing down (negative delta_KE, negative work).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_2', difficulty: 'standard',
          question: 'Work done by a force is zero when the force applied on an object is.',
          hint: 'Revisit c9_physics_ch4_1 (Work: Definition and Formula) to practice W = Fs cosθ with.',
          misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force.',
          parts: [
                { id: 'a', prompt: 'A coolie carries a 50 kg load on his head and walks horizontally at constant speed for 100 m. What is the work done by the coolie\'s upward force on the load?', answer: 'Work done = 0 J',
                  options: ['Work done = 0 J', 'a force is applied, so work must be done', 'keeps the object moving in a circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' },
                { id: 'b', prompt: 'A planet moves in a circular orbit around the Sun. The gravitational force is always directed toward the Sun.', answer: 'Work done is zero',
                  options: ['Work done is zero', 'gravity does work', 'a force is applied, so work must be done'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' },
                { id: 'c', prompt: 'A block of mass 2 kg slides on a frictionless horizontal table. A constant force of 10 N acts at 60° to the horizontal. The block moves 5 m horizontally.', answer: 'the applied force, (',
                  options: ['the applied force, (', 'a force is applied, so work must be done', 'keeps the object moving in a circle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' }
          ],
            remediations: { 'a-force-is-applied': { steps: ['Hold a textbook horizontally and walk across the room at constant speed.', 'Swing a ball on a string horizontally. Mark a point on the string and time 10 revolutions. Calculate speed.', 'Draw force-displacement vectors at 4 points on a circle. Have students measure angle with protractor — always 90°.', 'Contrast with pushing a book horizontally (θ = 0°, work done) to cement the cosine factor difference.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In uniform circular motion, the centripetal force changes the direction of velocity, so it must be doing work because work is needed to.', answer: 'The statement is false',
                  options: ['The statement is false', 'change in velocity vector', 'change in speed', 'a force is applied, so work must be done'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "a force is applied, so work must be done" — they treat work as a scalar count of force application rather than a dot.' }
          ],
            remediations: { 'a-force-is-applied': { steps: ['Hold a textbook horizontally and walk across the room at constant speed.', 'Swing a ball on a string horizontally. Mark a point on the string and time 10 revolutions. Calculate speed.', 'Draw force-displacement vectors at 4 points on a circle. Have students measure angle with protractor — always 90°.', 'Contrast with pushing a book horizontally (θ = 0°, work done) to cement the cosine factor difference.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_3', difficulty: 'standard',
          question: 'The Work-Energy Theorem states that the net work done by all forces acting on.',
          hint: 'If stuck, revisit c9_physics_ch4_1 (work formula and sign conventions) and.',
          misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity =.',
          parts: [
                { id: 'a', prompt: 'A 2 kg block slides on a rough horizontal floor. An applied force of 10 N acts forward, and kinetic friction of 4 N acts backward. The block moves 5 m.', answer: 'The theorem uses *net work*, not work by a single force',
                  options: ['The theorem uses *net work*, not work by a single force', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' },
                { id: 'b', prompt: 'A 1500 kg car accelerates from 10 m/s to 25 m/s on a straight road. Calculate the net work done on the car. (Ignore unit conversion; answer in joules.)', answer: 'Given: \\(m = 1500\\,\\text{kg}\\), \\(u = 10\\,\\text{m/s}\\), \\(v = 25\\,\\text{m/s}\\)',
                  options: ['Given: \\(m = 1500\\,\\text{kg}\\), \\(u = 10\\,\\text{m/s}\\), \\(v = 25\\,\\text{m/s}\\)', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' },
                { id: 'c', prompt: 'Two identical trucks, one loaded (mass \\(2m\\)) and one empty (mass \\(m\\)), have the same net work done on them over the same distance. Both start from rest.', answer: 'Net work \\(W\\) is same for both',
                  options: ['Net work \\(W\\) is same for both', 'same speed because same work', 'work done by gravity = change in kinetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' }
          ],
            remediations: { 'the-work-energy-theorem-applies': { steps: ['Draw a free-body diagram showing *all* forces.', 'Calculate work done by *each* force separately (using \\(W = Fs\\cos\\theta\\)).', 'Sum them algebraically to get \\(W_{\\text{net}}\\).', 'Apply \\(W_{\\text{net}} = \\Delta K\\). Practice with a block pulled up a rough incline: list applied force, friction,.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity =.',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "A 5 kg box is pushed with 20 N over 4 m on a frictionless surface. Find final speed." They write: \\(W = Fs = 80\\,\\text{J}\\).', answer: 'The solution is correct *only if* the box starts from rest (\\(u=0\\))',
                  options: ['The solution is correct *only if* the box starts from rest (\\(u=0\\))', 'work done by gravity = change in kinetic energy', 'the Work-Energy Theorem applies to work done by *any single force* (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Work-Energy Theorem applies to work done by *any single force* (e.g., "work done by gravity = change in kinetic.' }
          ],
            remediations: { 'the-work-energy-theorem-applies': { steps: ['Draw a free-body diagram showing *all* forces.', 'Calculate work done by *each* force separately (using \\(W = Fs\\cos\\theta\\)).', 'Sum them algebraically to get \\(W_{\\text{net}}\\).', 'Apply \\(W_{\\text{net}} = \\Delta K\\). Practice with a block pulled up a rough incline: list applied force, friction,.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_7', difficulty: 'standard',
          question: 'Mechanical energy is the total energy possessed by an object due to its motion.',
          hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for.',
          misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or.',
          parts: [
                { id: 'a', prompt: 'State the formula for mechanical energy of an object of mass m moving with speed v at a height h above a chosen reference level. What is its SI unit?', answer: 'Mechanical energy = ½mv² + mgh',
                  options: ['Mechanical energy = ½mv² + mgh', 'mv² + mgh', '½mv² + ½mgh'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'b', prompt: 'A 0.5 kg stone is dropped from a height of 20 m. Calculate its mechanical energy (i) at the start, (ii) after falling 5 m, and (iii) just before hitting the.', answer: '(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J',
                  options: ['(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J', 'the path length matters', 'the normal force does work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'c', prompt: 'Two identical balls are released from the same height: Ball A is dropped from rest, Ball B is thrown horizontally with speed 10 m/s.', answer: 'At release: Ball A has ME = mgh (KE=0)',
                  options: ['At release: Ball A has ME = mgh (KE=0)', 'both have same mechanical energy', 'the path length matters'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' }
          ],
            remediations: { 'mechanical-energy-is-conserved-only': { steps: ['Place a dynamics cart on a frictionless air track inclined at 30°.', 'Mark three positions: top (h=0.5 m), middle (h=0.25 m), bottom (h=0).', 'Use a motion sensor to measure speed at each position.', 'Calculate KE=½mv² and PE=mgh at each point.', 'Show that KE+PE is constant (within sensor error).', 'Repeat with a curved track (same vertical drop) to demonstrate path independence.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a ball, a ramp, and a meter scale to demonstrate that mechanical energy is conserved when a ball rolls down a smooth incline.', answer: 'Set up a smooth ramp of length 2 m inclined at 30° (height 1 m)',
                  options: ['Set up a smooth ramp of length 2 m inclined at 30° (height 1 m)', 'the path length matters', 'the normal force does work', 'it travels farther'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' }
          ],
            remediations: { 'mechanical-energy-is-conserved-only': { steps: ['Place a dynamics cart on a frictionless air track inclined at 30°.', 'Mark three positions: top (h=0.5 m), middle (h=0.25 m), bottom (h=0).', 'Use a motion sensor to measure speed at each position.', 'Calculate KE=½mv² and PE=mgh at each point.', 'Show that KE+PE is constant (within sensor error).', 'Repeat with a curved track (same vertical drop) to demonstrate path independence.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_8', difficulty: 'standard',
          question: 'Resistance is the opposition a conductor offers to electric current, measured.',
          hint: 'Revisit c9_physics_ch6_7 (Ohm\'s Law) for the definition of resistance as R = V/I.',
          misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that.',
          parts: [
                { id: 'a', prompt: 'A copper wire has resistivity 1.7e-8 ohm*m, length 10 m, and cross-sectional area 0.0001 m^2. Calculate its resistance.', answer: 'R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms',
                  options: ['R = rho * L / A = 1.7e-8 * 10 / 0.0001 = 1.7e-7 / 1e-4 = 1.7e-3 = 0.0017 ohms', 'more material', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' },
                { id: 'b', prompt: 'If a wire\'s length is doubled (same material and cross-section), what happens to its resistance?', answer: 'Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R',
                  options: ['Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R', 'resistance stays the same', 'more material'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' }
          ],
            remediations: { 'thicker-wires-have-more-resistance': { steps: ['Long pipe = more resistance (more friction).', 'Wide pipe = less resistance (more space).', 'L in numerator (more L = more R).', 'A in denominator (more A = less R).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that.',
          parts: [
                { id: 'a', prompt: 'A student says: "A thicker wire has more resistance because it has more material." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'more material', 'more resistance', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' },
                { id: 'b', prompt: 'If a wire\'s length is doubled (same material and cross-section), what happens to its resistance?', answer: 'Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R',
                  options: ['Length doubled: R = rho * (2L) / A = 2 * (rho * L / A) = 2R', 'resistance stays the same', 'more material', 'thicker wires have more resistance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think thicker wires have more resistance because they have "more material." The exact error: they reason that more material = more.' }
          ],
            remediations: { 'thicker-wires-have-more-resistance': { steps: ['Long pipe = more resistance (more friction).', 'Wide pipe = less resistance (more space).', 'L in numerator (more L = more R).', 'A in denominator (more A = less R).'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_7', difficulty: 'standard',
          question: 'Characteristics of sound waves are the measurable properties that describe a.',
          hint: 'Revisit c9_physics_ch5_2 (Production of Sound) for the concept of vibration and.',
          misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are.',
          parts: [
                { id: 'a', prompt: 'Define frequency and state its unit. How does frequency affect pitch?', answer: 'Frequency is the number of oscillations (or compressions) per second',
                  options: ['Frequency is the number of oscillations (or compressions) per second', 'frequency is how fast sound travels'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are higher-pitched and quieter.' }
          ],
            remediations: { 'students-confuse-amplitude-loudness-with': { steps: ['Play a tone at fixed frequency, varying amplitude — students hear it get louder/quieter, not change pitch.', 'Play tones at fixed amplitude, varying frequency — students hear pitch change, not loudness.', 'Conclude: amplitude = loudness, frequency = pitch.', 'Practice: v = f * lambda calculations.'] } } },
        { type: 'subpart', nodeId: 'c9_physics_ch5_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are.',
          parts: [
                { id: 'a', prompt: 'A student says: "Higher amplitude means higher pitch." Evaluate this statement and correct it.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Higher amplitude means louder sound'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students confuse amplitude (loudness) with frequency (pitch). The exact error: they think louder sounds are higher-pitched and quieter.' }
          ],
            remediations: { 'students-confuse-amplitude-loudness-with': { steps: ['Play a tone at fixed frequency, varying amplitude — students hear it get louder/quieter, not change pitch.', 'Play tones at fixed amplitude, varying frequency — students hear pitch change, not loudness.', 'Conclude: amplitude = loudness, frequency = pitch.', 'Practice: v = f * lambda calculations.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
