import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch05_p2: SimDef = {
    id: 'v3_c11_phy_ch05_p2',
    title: 'Work, Energy and Power',
    subtitle: 'The physics of getting things done — and why holding a heavy bag still isn\'t \'work\' at all.',
    classLevel: 11, subject: 'physics', topic: 'Work, Energy and Power · Part 2/3',
    chapters: ['c11_phy_ch05'],
    nodeIds: ['c11_phy_cbse_05_007', 'c11_phy_cbse_05_008', 'c11_phy_cbse_05_009', 'c11_phy_cbse_05_010', 'c11_phy_cbse_05_011', 'c11_phy_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a ride designer rating a roller coaster', intro: 'Your coaster car must clear the second hill using only the energy from the first drop. Your job: check the energy math before anyone rides.', goal: 'Track energy as it converts — kinetic to potential and back — and compute real work and power.' },
    discovery: {
        question: 'You stand still holding a 10 kg bag for an hour. Exhausted — but a physicist says you did ZERO work on the bag. How?',
        options: ['No displacement = no work, however tired you feel', 'The bag was too light to count', 'You did work — the physicist is wrong', 'Only machines do work'],
        answer: 'No displacement = no work, however tired you feel',
        hook: 'Physics defines work as force × displacement — your muscles burned energy fighting your own cells, not moving the bag.',
    },
    teaching: [
        { title: 'Potential Energy: Gravitational', text: 'Gravitational potential energy near Earth\'s surface is the energy stored in a body-Earth system due to the body\'s position (height) relative to a chosen reference level.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_05_007', title: 'Your mission',
          mission: { widget: 'vector', validate: 'vector:ax=60',
            instruction: 'On the lab: add vector b to a — is the result just the lengths added?.',
        context: 'On the energy track: drop the car from different heights and measure speed at the bottom — verify mgh really does become ½mv².',
            observePrompt: 'What did the vector interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_007', title: 'Potential Energy: Gravitational',
          scaffold: { problem: 'A 2.5 kg water bucket is lifted from a well. The water surface is 12 m below ground level.',
            steps: [
            { text: 'Identify given quantities: m = 2.5 kg, initial height h_i = −12 m (below ground), final height h_f = +1.5 m (above.' },
            { text: 'Formula for change in potential energy: ΔV = mg(h_f − h_i).' },
            { text: 'Substitute values: ΔV = 2.5 × 9.8 × (1.5 − (−12)) = 2.5 × 9.8 × 13.5.' },
            { text: 'Compute: 2.5 × 9.8 = 24.5; 24.5 × 13.5 = 330.75 J. Track units: kg × m/s² × m = N·m = J.' },
            { text: 'Verify: Bucket rises 13.5 m, weight = 24.5 N, work against gravity = 24.5 × 13.5 ≈ 331 J. Physically reasonable.', faded: true, blankAnswer: 'ΔV = 330.75 J (gain in potential energy)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_008', title: 'Potential Energy of a Spring',
          scaffold: { problem: 'A spring gun has a spring of force constant $k = 400\\ \\text{N/m}$.',
            steps: [
            { text: 'Identify given quantities with units: $k = 400\\ \\text{N/m}$, $m = 20\\ \\text{g} = 0.02\\ \\text{kg}$, $x = 5\\ \\text{cm}.' },
            { text: 'For (a), apply conservation of mechanical energy inside the gun: initial spring potential energy = final kinetic energy.' },
            { text: 'Substitute values: $v = 0.05 \\times \\sqrt{400 / 0.02} = 0.05 \\times \\sqrt{20000} = 0.05 \\times 141.42 = 7.07\\.' },
            { text: 'For (b), treat as projectile motion. Time of fall: $h = \\frac{1}{2}gt^2 \\Rightarrow t = \\sqrt{2h/g} = \\sqrt{2 \\times.' },
            { text: 'Verify physical reasonableness: Spring gun firing a light ball at ~7 m/s reaching ~3.5 m horizontally from 1.2 m height.', faded: true, blankAnswer: '(a) $7.07\\ \\text{m/s}$, (b) $3.46\\ \\text{m}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_009', title: 'Conservative and Non-Conservative Forces',
          scaffold: { problem: 'A 0.5 kg block is pushed against a horizontal spring (spring constant \\( k = 200 \\, \\text{N/m} \\)) compressing it by 0.1 m.',
            steps: [
            { text: 'Identify the forces doing work: spring force (conservative) and kinetic friction (non-conservative).' },
            { text: 'Initial spring potential energy \\( U_i = \\frac{1}{2} k x^2 = \\frac{1}{2} \\times 200 \\times (0.1)^2 = 1 \\, \\text{J} \\).' },
            { text: 'Work done by friction \\( W_f = -f_k d = -\\mu_k m g d \\). Here \\( f_k = 0.15 \\times 0.5 \\times 10 = 0.75 \\, \\text{N} \\).' },
            { text: 'Apply work-energy theorem including non-conservative work: \\( \\Delta K = W_{\\text{spring}} + W_f \\).' },
            { text: 'Solve for \\( d \\): \\( 0.75 d = 1 \\Rightarrow d = 1 / 0.75 = 1.33 \\, \\text{m} \\).', faded: true, blankAnswer: '\\( d = 1.33 \\, \\text{m} \\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_010', title: 'Conservation of Mechanical Energy',
          scaffold: { problem: 'A 500 g ball is dropped from a height of 20 m above the ground. During its fall, air resistance does -15 J of work on the ball.',
            steps: [
            { text: 'Identify given quantities with units: m = 500 g = 0.5 kg, h = 20 m, W_air = -15 J (negative because air resistance.' },
            { text: 'Choose the principle. Since air resistance (non-conservative force) does work, use generalized work-energy: Ki +.' },
            { text: 'Write initial and final energies. Initial: Ki = 0 (dropped from rest), Vi = mgh = 0.5 × 10 × 20 = 100 J.' },
            { text: 'Substitute into equation: 0 + 100 + (-15) = ½(0.5)v² + 0 → 85 = 0.25 v².' },
            { text: 'Solve for v: v² = 85 / 0.25 = 340 → v = √340 ≈ 18.44 m/s.' },
            { text: 'Check physical reasonableness: Without air resistance, v = √(2gh) = √(400) = 20 m/s.', faded: true, blankAnswer: '18.4 m/s (or √340 m/s)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_011', title: 'Power: Definition and Units',
          scaffold: { problem: 'A 60 kg student runs up a staircase of 30 steps, each 15 cm high, in 10 seconds.',
            steps: [
            { text: 'Identify given quantities: mass m = 60 kg, number of steps = 30, height per step = 15 cm = 0.15 m, time t = 10 s,.' },
            { text: 'Total vertical height h = 30 × 0.15 = 4.5 m. Work done against gravity W = mgh = 60 × 10 × 4.5 = 2700 J.' },
            { text: 'Average power P_avg = W / t = 2700 J / 10 s = 270 W.' },
            { text: 'Unit check: J/s = W. 270 W is reasonable for a student running up stairs.' },
            { text: 'Convert to horsepower for context: 270 / 746 ≈ 0.36 hp.', faded: true, blankAnswer: '270 W (or 0.36 hp)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_05_012', title: 'Average and Instantaneous Power',
          scaffold: { problem: 'A 1200 kg car accelerates from rest to 20 m/s in 10 s on a horizontal road.',
            steps: [
            { text: 'Identify given: mass m = 1200 kg, initial velocity u = 0, final velocity v = 20 m/s, time Δt = 10 s, efficiency = 75%.' },
            { text: 'Change in kinetic energy ΔK = ½ m v² - ½ m u² = ½ × 1200 × (20)² = 240,000 J.' },
            { text: 'Net work W_net = 0.75 × W_engine (since 25% lost). So W_engine = W_net / 0.75 = 240,000 / 0.75 = 320,000 J.' },
            { text: 'Average power P_avg_engine = W_engine / Δt = 320,000 J / 10 s = 32,000 W = 32 kW.' },
            { text: 'Check units: J/s = W. 32 kW is a reasonable car engine power (typical 50-100 kW). Answer: 32 kW.', faded: true, blankAnswer: '32 kW' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'Laws of motion let us design safer cars — crumple zones that sacrifice the car to save the passenger. A cheap car without them costs half as much; a family choosing it may be choosing between money and physics.',
            decisions: [{ prompt: 'Should safety features be mandatory even if they raise prices?', options: [
                { text: 'Yes — physics doesn\'t care about your budget', outcome: 'The regulation argument — momentum at 60 km/h is non-negotiable; but mandates price out the families who could only afford the cheap car.' },
                { text: 'No — let buyers choose their trade-off', outcome: 'The autonomy argument; it assumes buyers fully understand the physics of what they\'re declining.' },
                { text: 'Mandate the minimum, subsidise the rest', outcome: 'The design answer — a safety floor for everyone, help for those who can\'t reach it.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A coolie hauls a suitcase across the platform and a weightlifter holds a barbell overhead — a classmate claims both \'do lots of work since the forces are big.\' For a spring stretched with F = 2x over 3 m, he computes work as 6 × 3 = 18 J.',
            decisions: [{ prompt: 'What does the work definition actually compute?', options: [
                { text: 'Apply the dot product: W = F·d·cosθ — the coolie\'s upward force is perpendicular to horizontal displacement, so W = 0 despite the effort; the weightlifter\'s displacement is zero, also W = 0. And for a variable force you integrate: ∫₀³ 2x dx = 9 J — using the endpoint force double-counts what the growing force only reached at the end.', outcome: 'Effort stops masquerading as work: only the force component along displacement counts, and a changing force sums slice by slice — the area under the F–x curve.' },
                { text: 'Count both as work — sweating and straining are proof that work is being done.', outcome: 'Physiology isn\'t physics: without a force component along displacement, energy isn\'t transferred to the object — zero work however tired the worker.', reveals: 'effort-equals-work' },
                { text: 'Keep 18 J — final force times distance is a fair estimate for the spring.', outcome: 'The force was 2x throughout, not 6 the whole way: final-force × distance overestimates — the integral (area under the line) gives 9 J.', reveals: 'final-force-times-distance' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'Energy is the universe\'s currency — it never appears or disappears, only changes hands. Roller coasters, dams and your breakfast all run on the same ledger.',
            decisions: [{ prompt: 'What comes next? Work, Energy and Power · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Work, Energy and Power · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'vector', prompt: 'Explore the vector interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'vector', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_007', difficulty: 'standard',
          question: 'Gravitational potential energy near Earth\'s surface is the energy stored in.',
          hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy.',
          misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8.',
          parts: [
                { id: 'a', prompt: 'A 5 kg object is raised from a table (height 0.8 m) to a shelf (height 2.3 m). What is the change in its gravitational potential energy? (Take g = 9.8 m/s²)', answer: 'ΔV = mgΔh = 5 × 9.8 × (2.3 − 0.8) = 5 × 9.8 × 1.5 = 73.5 J',
                  options: ['ΔV = mgΔh = 5 × 9.8 × (2.3 − 0.8) = 5 × 9.8 × 1.5 = 73.5 J', 'the book has 9.8 J of energy', 'V(h) = mgh gives absolute energy rather than understanding only ΔV is meaningful', 'gravitational potential energy is an absolute property of the object alone (e'],
                  hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy Theorem).',
                  misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8 J of energy") rather.' },
                { id: 'b', prompt: 'Two students discuss a 1 kg book on a table 1 m above the floor. Student A says its potential energy is 9.8 J.', answer: 'Both are correct',
                  options: ['Both are correct', 'the book has 9.8 J of energy', 'gravitational potential energy is an absolute property of the object alone (e'],
                  hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy Theorem).',
                  misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8 J of energy") rather.' },
                { id: 'c', prompt: 'A 60 kg person climbs a staircase of 20 steps, each 15 cm high, in 30 seconds.', answer: 'Step 1: Total height gain Δh = 20 × 0.15 m = 3.0 m',
                  options: ['Step 1: Total height gain Δh = 20 × 0.15 m = 3.0 m', 'the book has 9.8 J of energy', 'gravitational potential energy is an absolute property of the object alone (e'],
                  hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy Theorem).',
                  misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8 J of energy") rather.' },
                { id: 'd', prompt: 'A graph of V(h) vs h for a 2 kg mass near Earth\'s surface is a straight line. What is the slope of this line?', answer: 'Slope = dV/dh = mg = 2 × 9.8 = 19.6 N',
                  options: ['Slope = dV/dh = mg = 2 × 9.8 = 19.6 N', 'the book has 9.8 J of energy', 'gravitational potential energy is an absolute property of the object alone (e'],
                  hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy Theorem).',
                  misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8 J of energy") rather.' }
          ],
            remediations: { 'gravitational-potential-energy-is-an': { steps: ['Take a 1 kg mass and a spring balance. Hold the mass at three different heights: floor (0 m), table (0.8 m), and shelf.', 'Calculate ΔPE between each pair: table-to-floor = 7.84 J, shelf-to-table = 6.86 J, shelf-to-floor = 14.7 J.', 'Show that the sum of first two equals the third (path independence).', 'Now declare the table as "zero PE level" and recalculate: table = 0 J, shelf = +6.86 J, floor = −7.84 J.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a spring balance, a 1 kg mass, and a meter scale to verify that the work done in lifting the mass vertically through 1.', answer: 'Procedure: 1) Hang 1 kg mass from spring balance',
                  options: ['Procedure: 1) Hang 1 kg mass from spring balance', 'the book has 9.8 J of energy', 'gravitational potential energy is an absolute property of the object alone (e'],
                  hint: 'Revisit c11_phy_cbse_05_001 (Work Done by a Force) and c11_phy_cbse_05_005 (Work-Energy Theorem).',
                  misconception: 'Students believe gravitational potential energy is an absolute property of the object alone (e.g., "the book has 9.8 J of energy") rather.' }
          ],
            remediations: { 'gravitational-potential-energy-is-an': { steps: ['Take a 1 kg mass and a spring balance. Hold the mass at three different heights: floor (0 m), table (0.8 m), and shelf.', 'Calculate ΔPE between each pair: table-to-floor = 7.84 J, shelf-to-table = 6.86 J, shelf-to-floor = 14.7 J.', 'Show that the sum of first two equals the third (path independence).', 'Now declare the table as "zero PE level" and recalculate: table = 0 J, shelf = +6.86 J, floor = −7.84 J.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_008', difficulty: 'standard',
          question: 'The elastic potential energy of a spring is the energy stored in a spring due.',
          hint: 'If stuck, review "Work Done by Spring Force" (c11_phy_cbse_05_003) for the integration.',
          misconception: 'Students often believe that the potential energy of a vertical spring-mass system is simply $\\frac{1}{2}kx^2$ where $x$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The elastic potential energy of a spring is the energy stored in a spring due to its',
                  options: ['The elastic potential energy of a spring is the energy stored in a spring due to its', 'Work done by a constant force is defined as the scalar product of the force vector and', 'Work done by a variable force is the definite integral of the force component along the', 'The work done by a spring force is the negative of the change in elastic potential energy'],
                  hint: 'If stuck, review "Work Done by Spring Force" (c11_phy_cbse_05_003) for the integration derivation.',
                  misconception: 'Students often believe that the potential energy of a vertical spring-mass system is simply $\\frac{1}{2}kx^2$ where $x$ is measured from.' }
          ],
            remediations: { 'the-potential-energy-of-a': { steps: ['** Re-derive the total potential energy for a vertical spring from scratch.', '** Integrate to get potential energy: $U = -\\int F\\,dy\' = \\frac{1}{2}ky\'^2 + C$.', '** Verify that this $U = \\frac{1}{2}ky\'^2$ already includes **both** spring and gravitational potential energy.', '** Practice 3 vertical spring problems: (a) mass lowered gently to equilibrium, (b) mass released from unstretched.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_009', difficulty: 'standard',
          question: 'A force is **conservative** if the work done by it on an object moving between.',
          hint: 'Review the calculation of work for constant and variable forces (nodes 001, 002) and the.',
          misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force.',
          parts: [
                { id: 'a', prompt: 'A block is moved from point A to point B along two different paths: Path 1 is a straight line, Path 2 is a longer curved path.', answer: 'For gravity (conservative), \\( W_1 = W_2 \\)',
                  options: ['For gravity (conservative), \\( W_1 = W_2 \\)', 'work done in a specific displacement', 'work done over any closed path', '\\( W_1 \\neq W_2 \\'],
                  hint: 'Review the calculation of work for constant and variable forces (nodes 001, 002) and the.',
                  misconception: 'Students often think that **any force that does zero work in a given situation is conservative** (e.g., normal force, tension in a pendulum.' }
          ],
            remediations: { 'any-force-that-does-zero': { steps: ['Revisit the definition: "Work done over a closed loop is zero" – test this with a specific closed path for the force.', 'For normal force/tension: imagine a scenario where the constraint moves (e.g., block on an accelerating cart) and.', 'For constant magnitude forces: compute work over a closed rectangular path for friction (non-zero) vs gravity (zero).', 'Practice classifying forces using the two criteria: (a) path-independence of work, (b) existence of a potential energy.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_010', difficulty: 'standard',
          question: 'The principle of conservation of mechanical energy states that in an isolated.',
          hint: 'If stuck, revisit c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) and.',
          misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading.',
          parts: [
                { id: 'a', prompt: 'A block slides down a frictionless inclined plane of height h. At the bottom, its speed is v. The same block is now dropped vertically from the same height h.', answer: 'The speed will be the same',
                  options: ['The speed will be the same', 'greater on the incline', 'less because the distance is longer', 'conservation of mechanical energy'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) and.',
                  misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading them to apply.' },
                { id: 'b', prompt: 'A 2.0 kg block is released from rest at the top of a smooth (frictionless) quarter-circle track of radius R = 1.5 m.', answer: '**Step 1:** On the smooth track, mechanical energy is conserved',
                  options: ['**Step 1:** On the smooth track, mechanical energy is conserved', 'conservation of mechanical energy', 'energy is always conserved in any situation', 'only conservative forces do work'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) and.',
                  misconception: 'Students often believe "conservation of mechanical energy" means "energy is always conserved in any situation," leading them to apply.' }
          ],
            remediations: { 'conservation-of-mechanical-energy-means': { steps: ['Revisit node c11_phy_cbse_05_009 (Conservative and Non-Conservative Forces) — list every force in the problem and.', 'For each non-conservative force, calculate its work (Wnc = ∫Fnc·dx).', 'Remember: normal force from fixed surface does zero work; static friction on a rolling object without slipping does.', 'Write the generalized equation: Ki + Vi + Wnc = Kf + Vf.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_011', difficulty: 'standard',
          question: 'Power is the rate at which work is done or energy is transferred.',
          hint: 'If stuck, revisit c11_phy_cbse_05_001 (Work Done by a Force) to review dot product and.',
          misconception: 'Students often think that if a large force is applied, the power must be large.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of power and write its dimensional formula. How is it related to the units of work and time?', answer: 'The SI unit of power is the watt (W)',
                  options: ['The SI unit of power is the watt (W)', 'the battery has 5000 W of energy', '5000 J of energy', 'the battery can deliver 50 W of power'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_001 (Work Done by a Force) to review dot product and work.',
                  misconception: 'Students often think that if a large force is applied, the power must be large.' },
                { id: 'b', prompt: 'A student says: "If a force does no work, the power delivered by that force must be zero." Is this statement always true?', answer: 'Yes, the statement is always true',
                  options: ['Yes, the statement is always true', 'the battery has 5000 W of energy', '5000 J of energy', 'the battery can deliver 50 W of power'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_001 (Work Done by a Force) to review dot product and work.',
                  misconception: 'Students often think that if a large force is applied, the power must be large.' },
                { id: 'c', prompt: 'A water pump lifts 500 kg of water to a height of 20 m in 40 seconds. Calculate the average power output of the pump in watts and in horsepower (1 hp = 746 W).', answer: 'Work done = mgh = 500 × 10 × 20 = 100,000 J',
                  options: ['Work done = mgh = 500 × 10 × 20 = 100,000 J', 'the battery has 5000 W of energy', '5000 J of energy', 'the battery can deliver 50 W of power'],
                  hint: 'If stuck, revisit c11_phy_cbse_05_001 (Work Done by a Force) to review dot product and work.',
                  misconception: 'Students often think that if a large force is applied, the power must be large.' }
          ],
            remediations: { 'if-a-large-force-is': { steps: ['If the student confuses force with power, have them hold a heavy book at arm\'s length for 30 seconds.', 'Is your power output zero?" Then have them lift the same book 1 m in 2 seconds.', 'Calculate work (mgh) and power (work/time).', 'Emphasize: force alone → no power without displacement; power requires both force and velocity.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_05_012', difficulty: 'standard',
          question: 'Average power is the total work done divided by the total time interval over.',
          hint: 'If stuck, revisit the scalar product (dot product) from Chapter 5.1.1 and the work-energy.',
          misconception: 'Students often think instantaneous power is just "average power over a very small time" and try to compute it.',
          parts: [
                { id: 'a', prompt: 'State the SI unit of power and write the formula for average power in terms of work and time.', answer: 'The SI unit of power is the watt (W), where 1 W = 1 J/s',
                  options: ['The SI unit of power is the watt (W), where 1 W = 1 J/s', 'average power over a very small time'],
                  hint: 'If stuck, revisit the scalar product (dot product) from Chapter 5.1.1 and the work-energy theorem.',
                  misconception: 'Students often think instantaneous power is just "average power over a very small time" and try to compute it by dividing work done in.' },
                { id: 'b', prompt: 'A constant force of 10 N acts on a block moving at a constant velocity of 2 m/s in the direction of the force.', answer: 'Instantaneous power P = F·v = (10 N)(2 m/s) = 20 W',
                  options: ['Instantaneous power P = F·v = (10 N)(2 m/s) = 20 W', 'average power is different', 'average power over a very small time'],
                  hint: 'If stuck, revisit the scalar product (dot product) from Chapter 5.1.1 and the work-energy theorem.',
                  misconception: 'Students often think instantaneous power is just "average power over a very small time" and try to compute it by dividing work done in.' },
                { id: 'c', prompt: 'A particle of mass 2 kg moves along the x-axis such that its velocity varies with time as v(t) = 3t^2 m/s.', answer: 'At t = 2 s, v = 3(2)^2 = 12 m/s, F = 12(2) = 24 N',
                  options: ['At t = 2 s, v = 3(2)^2 = 12 m/s, F = 12(2) = 24 N', 'average power over a very small time'],
                  hint: 'If stuck, revisit the scalar product (dot product) from Chapter 5.1.1 and the work-energy theorem.',
                  misconception: 'Students often think instantaneous power is just "average power over a very small time" and try to compute it by dividing work done in.' },
                { id: 'd', prompt: 'A force F = (3i + 4j) N acts on a particle moving with velocity v = (2i - 1j) m/s. Compute the instantaneous power.', answer: 'P = F·v = (3)(2) + (4)(-1) = 6 - 4 = 2 W',
                  options: ['P = F·v = (3)(2) + (4)(-1) = 6 - 4 = 2 W', 'average power over a very small time'],
                  hint: 'If stuck, revisit the scalar product (dot product) from Chapter 5.1.1 and the work-energy theorem.',
                  misconception: 'Students often think instantaneous power is just "average power over a very small time" and try to compute it by dividing work done in.' }
          ],
            remediations: { 'instantaneous-power-is-just-average': { steps: ['Remediate by: (1) Revisiting the dot product definition (scalar product) from Chapter 5.1.1 – emphasize that work and.', '(2) Use a graphical approach: plot F·v vs time for a simple case (e.g., constant force, increasing velocity) and show.', '(3) Do a quick lab: pull a spring balance at different angles to a moving cart and observe that the force reading.'], labTask: { instruction: 'On the interactive: add vector b to a — is the result just the lengths added? — then check.', widget: 'vector', validate: 'vector:ax=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
