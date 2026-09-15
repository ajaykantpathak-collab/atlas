import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch04_p2: SimDef = {
    id: 'v3_c9_physics_ch04_p2',
    title: 'Work and Energy · Part 2/2',
    subtitle: 'Force alone doesn\'t count — things must move',
    classLevel: 9, subject: 'physics', topic: 'Work and Energy · Part 2/2',
    chapters: ['c9_physics_ch04'],
    nodeIds: ['c9_physics_ch4_5', 'c9_physics_ch4_6', 'c9_physics_ch4_7', 'c9_physics_ch4_8', 'c9_physics_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a work auditor', intro: 'Pushing a desk 3 metres? Work. Holding a suitcase still while your arms shake? Zero work. Learn the strict physics definition and spot every impostor.', goal: 'Understand work as W = Fs — requiring both force and displacement in the same direction — and identify zero-work and perpendicular-force situations.' },
    discovery: {
        question: 'You hold a heavy schoolbag perfectly still for a full minute — arms burning, sweating, exhausted. How much work did physics say you did?',
        options: ['Zero joules — work needs force AND displacement; a bag that doesn\'t move gets no work done on it, however tired you feel', 'Lots — your muscles clearly burned energy', 'Force × 60 seconds', 'Half the bag\'s weight in joules'],
        answer: 'Zero joules — work needs force AND displacement; a bag that doesn\'t move gets no work done on it, however tired you feel',
        hook: 'Your tired muscles and physics disagree: work = force × displacement, and no displacement means zero joules. Bonus trap: a coolie walking 100 m with a load does zero work AGAINST gravity — the force points down, the motion points sideways.',
    },
    teaching: [
        { title: 'Kinetic Energy: Formula and Derivation', text: 'Kinetic energy is the energy possessed by an object due to its motion, defined as the work needed to accelerate a body of mass \\( m \\) from rest to its current velocity \\( v \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch4_5', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Calculate the joules: a farmer pushing a cart 25 m at 120 N, two students pushing identical boxes different distances — then catch the exam trap where a box\'s weight gets mistaken for the pushing force.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_5', title: 'Kinetic Energy: Formula and Derivation',
          scaffold: { problem: 'A 60 kg cyclist on a 10 kg bicycle accelerates from rest to 5 m/s on a flat road. Calculate the total kinetic energy of the system.',
            steps: [
            { text: 'Identify given: \\( m_{\\text{cyclist}} = 60 \\, \\text{kg} \\), \\( m_{\\text{bicycle}} = 10 \\, \\text{kg} \\), \\( u = 0 \\), \\.' },
            { text: 'Total mass \\( m = 60 + 10 = 70 \\, \\text{kg} \\). Use \\( KE = \\frac{1}{2}mv^2 \\).' },
            { text: 'Substitute: \\( KE = \\frac{1}{2} \\times 70 \\times (5)^2 = 35 \\times 25 = 875 \\, \\text{J} \\).' },
            { text: 'Work done \\( W = Fs = KE \\) (work-energy theorem). So \\( s = KE / F = 875 / 150 = 5.833... \\, \\text{m} \\).' },
            { text: 'Check units: \\( \\text{J} / \\text{N} = \\text{N·m} / \\text{N} = \\text{m} \\). Answer is reasonable for a bicycle start.', faded: true, blankAnswer: 'Kinetic energy = 875 J; distance = 5.83 m (or 5.8 m with 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_6', title: 'Potential Energy: Gravitational and Elastic',
          scaffold: { problem: 'A 200 g ball is thrown vertically upward from a rooftop 15 m above the ground with an initial speed of 20 m/s.',
            steps: [
            { text: 'Identify given quantities: mass m = 200 g = 0.2 kg, initial height h₀ = 15 m, initial speed u = 20 m/s, g = 10 m/s².' },
            { text: 'Use kinematics (v² = u² - 2gΔh) to find additional height gained above rooftop. At max height, v = 0.' },
            { text: 'Total height above ground H = h₀ + Δh = 15 m + 20 m = 35 m.' },
            { text: 'Calculate gravitational potential energy: U_g = mgh = 0.2 kg × 10 m/s² × 35 m = 70 J.' },
            { text: 'Verify: Initial kinetic energy = ½×0.2×20² = 40 J. Initial potential energy = 0.2×10×15 = 30 J.', faded: true, blankAnswer: '70 J' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_7', title: 'Mechanical Energy: Sum of Kinetic and Potential Energy',
          scaffold: { problem: 'A 50 g toy car is launched from a compressed spring on a horizontal frictionless track.',
            steps: [
            { text: 'Identify given quantities: mass m = 50 g = 0.05 kg, initial KE = 0.8 J, initial PE = 0 (reference at horizontal track).' },
            { text: 'Apply mechanical energy conservation: Total ME = initial KE + initial PE = 0.8 J + 0 = 0.8 J.' },
            { text: '(a) At maximum height, v = 0 so KE = 0. Then ME = mgh_max → 0.8 = 0.05 × 10 × h_max → h_max = 0.8 / 0.5 = 1.6 m.' },
            { text: '(b) At h = 0.5 m, PE = mgh = 0.05 × 10 × 0.5 = 0.25 J. Then KE = ME - PE = 0.8 - 0.25 = 0.55 J.' },
            { text: 'Verify: At h=0.5 m, PE=0.25 J, KE=0.55 J, sum=0.8 J. At h_max=1.6 m, PE=0.05×10×1.6=0.8 J, KE=0. Both consistent.', faded: true, blankAnswer: '(a) Maximum height = 1.6 m; (b) Speed at height 0.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_8', title: 'Law of Conservation of Energy: Examples',
          scaffold: { problem: 'A 0.2 kg cricket ball is thrown vertically upward from the ground with a speed of 25 m/s.',
            steps: [
            { text: 'Identify given: m = 0.2 kg, u = 25 m/s upward, g = 10 m/s². At ground, h_i = 0, so PE_i = 0.' },
            { text: 'At maximum height H, final velocity v = 0, so KE_f = 0. By conservation: KE_i + PE_i = KE_f + PE_f → 62.5 + 0 = 0 + m.' },
            { text: 'Substitute: 62.5 = 0.2 × 10 × H → 62.5 = 2H → H = 31.25 m. (a) Maximum height = 31.25 m.' },
            { text: 'At half maximum height, h = H/2 = 15.625 m. PE at this point = m g h = 0.2 × 10 × 15.625 = 31.25 J.' },
            { text: 'KE at half height = Total E - PE = 62.5 - 31.25 = 31.25 J. Now ½ m v² = 31.25 → 0.1 v² = 31.25 → v² = 312.5 →.', faded: true, blankAnswer: '(a) Maximum height = 31.25 m. (b) Speed at half height.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch4_9', title: 'Power: Definition, Formula and Units (Watt)',
          scaffold: { problem: 'A 40 kg girl runs up a staircase of 20 steps, each 15 cm high, in 8 seconds. Calculate her power output. (Take g = 10 m/s²)',
            steps: [
            { text: 'Identify given: mass m = 40 kg, number of steps = 20, height per step = 15 cm = 0.15 m, time t = 8 s, g = 10 m/s².' },
            { text: 'Total height climbed h = 20 × 0.15 m = 3 m. Work done against gravity W = mgh = 40 × 10 × 3 = 1200 J.' },
            { text: 'Use power formula P = W/t. Check units: W in joules, t in seconds → P in watts.' },
            { text: 'Substitute: P = 1200 J / 8 s = 150 W.' },
            { text: 'Verify: 150 W is reasonable for a short burst of human effort (typical human power ~100-300 W). Answer: 150 W.', faded: true, blankAnswer: '150 W' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch4_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Helping at a bookstall, Asha holds a 20 N bag of stock at shoulder height for five long minutes, arms aching. She reports to her teacher: \'I did hundreds of joules of work — I was exhausted.\'',
            decisions: [{ prompt: 'How much physics work did she do on the bag?', options: [
                { text: 'Zero joules — work needs force AND displacement in the force\'s direction; the bag never moved, so W = 20 N × 0 m = 0 J. Her tired muscles spent energy internally, but no work was done on the bag.', outcome: 'This separates the physics quantity from the feeling of effort — exhaustion is not evidence of displacement.' },
                { text: 'She is right — effort times time is work, so five minutes of holding counts.', outcome: 'Work is force times displacement, not force times duration; a motionless hold, however tiring, transfers no energy to the bag.', reveals: 'effort-is-work' },
                { text: 'Work was done but negative, since the bag\'s weight pulled opposite to her lift.', outcome: 'Negative work still needs displacement — with zero movement, the product is simply zero, whatever the direction of the forces.', reveals: 'still-is-negative' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch4_9', title: 'You made it',
          caseStudy: { intro: 'W = F × s: force times displacement in the force\'s direction, measured in joules. Effort without movement earns applause but zero joules — physics only pays for distance covered.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch4_5', difficulty: 'standard',
          question: 'Kinetic energy is the energy possessed by an object due to its motion, defined.',
          hint: 'Revisit c9_physics_ch4_1 (Work formula) and c9_physics_ch4_3 (Work-energy theorem).',
          misconception: 'Students think kinetic energy depends on velocity linearly (like momentum) because they confuse \\( p = mv \\) with \\(.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Kinetic energy is the energy possessed by an object due to its motion, defined as the',
                  options: ['Kinetic energy is the energy possessed by an object due to its motion, defined as the', 'Work is a scalar physical quantity defined as the product of the magnitude of the force', 'Mechanical Advantage (MA) of a pulley system is the ratio of the load lifted to the', 'The Work-Energy Theorem states that the net work done by all forces acting on a body'],
                  hint: 'Revisit c9_physics_ch4_1 (Work formula) and c9_physics_ch4_3 (Work-energy theorem) — practice.',
                  misconception: 'Students think kinetic energy depends on velocity linearly (like momentum) because they confuse \\( p = mv \\) with \\( KE = \\frac{1}{2}mv^2.' }
          ],
            remediations: { 'kinetic-energy-depends-on-velocity': { steps: ['Have the student roll a marble down a ramp from rest and measure its speed at the bottom for 3 different heights.', 'Calculate \\( mgh \\) (work done by gravity) and \\( \\frac{1}{2}mv^2 \\) for each.', 'Show they match only with the \\( \\frac{1}{2} \\) factor.', 'Then ask: "If \\( KE = mv^2 \\), what would the speed be for height \\( h \\)?" — the numbers won\'t match.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_6', difficulty: 'standard',
          question: 'Potential energy is the energy stored in an object due to its position.',
          hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
          misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting.',
          parts: [
                { id: 'a', prompt: 'A 2 kg book is placed on a shelf 1.5 m above the floor. What is the gravitational potential energy of the book-Earth system relative to the floor?', answer: '30 J',
                  options: ['30 J', '0 J because the book is not moving', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' },
                { id: 'b', prompt: 'Two identical springs are compressed by the same distance x. Spring A has spring constant k, Spring B has spring constant 2k.', answer: 'Spring B stores twice the energy of Spring A (U_B = 2U_A)',
                  options: ['Spring B stores twice the energy of Spring A (U_B = 2U_A)', 'four times', 'energy depends on k², perhaps confusing with the force formula F = kx', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' },
                { id: 'c', prompt: 'A 500 g toy car is launched from a spring (k = 200 N/m) compressed by 5 cm on a horizontal frictionless track.', answer: 'Elastic potential energy = ½ × 200 N/m × (0.05 m)² = 0.25 J',
                  options: ['Elastic potential energy = ½ × 200 N/m × (0.05 m)² = 0.25 J', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' },
                { id: 'd', prompt: 'A student lifts a 3 kg box from the floor to a table (height 0.8 m) and then carries it horizontally 2 m across the room.', answer: 'First box: U = 3 × 10 × 0.8 = 24 J',
                  options: ['First box: U = 3 × 10 × 0.8 = 24 J', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' }
          ],
            remediations: { 'gravitational-potential-energy-depends-on': { steps: ['If a student insists potential energy depends on path, have them lift a 1 kg mass 1 m vertically (work = 10 J) and then.', 'Measure the force needed parallel to the ramp (5 N) and calculate work (5 N × 2 m = 10 J).', 'For the spring misconception, plot force vs.', 'extension graph for a spring; the area under the graph (triangle) is ½kx², not the rectangle kx².'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting.',
          parts: [
                { id: 'a', prompt: 'A physics textbook claims: "The gravitational potential energy of a 1 kg mass at height 10 m is 100 J.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' },
                { id: 'b', prompt: 'Design a simple experiment using a spring, a set of masses, a ruler, and a clamp stand to verify that the elastic potential energy stored in a spring.', answer: 'Hang the spring vertically, attach a mass, measure extension x',
                  options: ['Hang the spring vertically, attach a mass, measure extension x', 'gravitational potential energy depends on the path taken to reach the height (e'],
                  hint: 'If stuck, review the work-energy theorem (c9_physics_ch4_3) and the definition of work.',
                  misconception: 'Students often think gravitational potential energy depends on the path taken to reach the height (e.g., lifting straight up vs.' }
          ],
            remediations: { 'gravitational-potential-energy-depends-on': { steps: ['If a student insists potential energy depends on path, have them lift a 1 kg mass 1 m vertically (work = 10 J) and then.', 'Measure the force needed parallel to the ramp (5 N) and calculate work (5 N × 2 m = 10 J).', 'For the spring misconception, plot force vs.', 'extension graph for a spring; the area under the graph (triangle) is ½kx², not the rectangle kx².'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_7', difficulty: 'standard',
          question: 'Mechanical energy is the total energy possessed by an object due to its motion.',
          hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for.',
          misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall.',
          parts: [
                { id: 'a', prompt: 'State the formula for mechanical energy of an object of mass m moving with speed v at a height h above a chosen reference level. What is its SI unit?', answer: 'Mechanical energy = ½mv² + mgh',
                  options: ['Mechanical energy = ½mv² + mgh', 'mv² + mgh', '½mv² + ½mgh', 'the path length matters'],
                  hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for potential.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'b', prompt: 'A 0.5 kg stone is dropped from a height of 20 m. Calculate its mechanical energy (i) at the start, (ii) after falling 5 m, and (iii) just before hitting the.', answer: '(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J',
                  options: ['(i) At start: v=0, h=20 m → KE=0, PE=mgh=0.5×10×20=100 J → ME=100 J', 'the path length matters', 'the normal force does work', 'it travels farther'],
                  hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for potential.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' },
                { id: 'c', prompt: 'Two identical balls are released from the same height: Ball A is dropped from rest, Ball B is thrown horizontally with speed 10 m/s.', answer: 'At release: Ball A has ME = mgh (KE=0)',
                  options: ['At release: Ball A has ME = mgh (KE=0)', 'both have same mechanical energy', 'the path length matters', 'the normal force does work'],
                  hint: 'If stuck, revisit c9_physics_ch4_5 for kinetic energy derivation and c9_physics_ch4_6 for potential.',
                  misconception: 'Students often believe that mechanical energy is conserved only when an object moves vertically (like free fall or vertical throw) but not.' }
          ],
            remediations: { 'mechanical-energy-is-conserved-only': { steps: ['Place a dynamics cart on a frictionless air track inclined at 30°.', 'Mark three positions: top (h=0.5 m), middle (h=0.25 m), bottom (h=0).', 'Use a motion sensor to measure speed at each position.', 'Calculate KE=½mv² and PE=mgh at each point.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_8', difficulty: 'standard',
          question: 'The Law of Conservation of Energy states that in an isolated system where only.',
          hint: 'Revisit c9_physics_ch4_5 (KE derivation), c9_physics_ch4_6 (PE derivation), and.',
          misconception: 'Students believe that "energy conservation means kinetic energy is always equal to the initial potential energy".',
          parts: [
                { id: 'a', prompt: 'A simple pendulum of length 1 m is released from a horizontal position.', answer: 'Yes, both speeds are equal',
                  options: ['Yes, both speeds are equal', 'the block is faster'],
                  hint: 'Revisit c9_physics_ch4_5 (KE derivation), c9_physics_ch4_6 (PE derivation), and c9_physics_ch4_7.',
                  misconception: 'Students believe that "energy conservation means kinetic energy is always equal to the initial potential energy" at every point during the.' }
          ],
            remediations: { 'energy-conservation-means-kinetic-energy': { steps: ['Have the student draw an energy bar chart for a 20 m drop at 5 m intervals: at 20 m (PE=max, KE=0), at 15 m (PE=3/4.', 'Then ask: "If total is 100 J, what is KE at 10 m?" This visual forces them to subtract current PE from total.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch4_9', difficulty: 'standard',
          question: 'Power is the rate at which work is done or energy is transferred, measured.',
          hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed.',
          misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).',
          parts: [
                { id: 'a', prompt: 'State the SI unit of power and write its relationship with joule and second.', answer: 'The SI unit of power is watt (W)',
                  options: ['The SI unit of power is watt (W)', 'newton', 'higher power means more total energy consumed'],
                  hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed formula).',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' },
                { id: 'b', prompt: 'Two students, A and B, each lift a 20 kg box to a height of 2 m. Student A takes 4 seconds, student B takes 8 seconds. Who has greater power?', answer: 'Student A has greater power',
                  options: ['Student A has greater power', 'he took more time', 'higher power means more total energy consumed'],
                  hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed formula).',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' },
                { id: 'c', prompt: 'A 1.5 kW water pump runs for 2 hours daily. Calculate the electrical energy consumed in one day in joules and in kilowatt-hours (kWh).', answer: 'Power = 1.5 kW = 1500 W',
                  options: ['Power = 1.5 kW = 1500 W', 'higher power means more total energy consumed'],
                  hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed formula).',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' },
                { id: 'd', prompt: 'A graph shows work done (y-axis) versus time (x-axis) for two machines: Machine X is a straight line through origin with slope 500; Machine Y is a horizontal.', answer: 'Machine X has constant power of 500 W (slope = ΔW/Δt = power)',
                  options: ['Machine X has constant power of 500 W (slope = ΔW/Δt = power)', 'both reach 2000 J', 'higher power means more total energy consumed'],
                  hint: 'If stuck, revisit c9_physics_ch4_1 (Work definition) and c7_physics_ch04_006 (Speed formula).',
                  misconception: 'Students think "higher power means more total energy consumed" and confuse power (rate) with energy (total).' }
          ],
            remediations: { 'higher-power-means-more-total': { steps: ['Have student calculate energy for both bulbs: E1 = 100 W × 1 h = 100 Wh; E2 = 60 W × 3 h = 180 Wh.', 'Ask "Which is larger?"', 'Convert to joules: 100 Wh = 360,000 J; 180 Wh = 648,000 J.', 'Emphasize: Power is speed of energy use; energy is total amount.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
