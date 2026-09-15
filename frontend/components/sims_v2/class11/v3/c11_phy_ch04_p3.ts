import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch04_p3 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch04_p3: SimDef = {
    id: 'v3_c11_phy_ch04_p3',
    title: 'Laws of Motion · Part 3/3',
    subtitle: 'Unmask the hidden force that made Aristotle\'s fallacy feel true.',
    classLevel: 11, subject: 'physics', topic: 'Laws of Motion · Part 3/3',
    chapters: ['c11_phy_ch04'],
    nodeIds: ['c11_phy_cbse_04_013', 'c11_phy_cbse_04_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Galileo rerunning the incline in thought', intro: 'A marble on carpet stops, on smooth floor rolls far, on frictionless ice — never. Removing the confounder was the whole insight.', goal: 'State the first law as net-force-zero and distinguish inertia from a force.' },
    discovery: {
        question: '\'Stop pedalling and my bicycle stops — so Galileo was wrong and motion does need force.\' Evaluate.',
        options: ['Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it', 'Completely right — Aristotle stands', 'Completely wrong — bicycles don\'t stop', 'Right — because road contact is a force'],
        answer: 'Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it',
        hook: 'Inertia isn\'t a force keeping things moving — it\'s the property that makes a force necessary to change velocity at all.',
    },
    teaching: [
        { title: 'Banking of Roads and Friction', text: 'Banking of roads is the practice of raising the outer edge of a curved road above the inner edge at an angle θ (angle of banking) so that the horizontal component of the normal reaction provides the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_04_013', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Run Galileo\'s double incline to its flat conclusion — same height, then infinite distance — then find the friction on a box pushed steadily at 2 m/s.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_013', title: 'Banking of Roads and Friction',
          scaffold: { problem: 'A highway curve of radius 250 m is banked at an angle of 8°. The coefficient of static friction between tyres and road is 0.22.',
            steps: [
            { text: 'Identify given: R = 250 m, θ = 8°, μ_s = 0.22, m = 1200 kg, v = 60 km/h = 16.67 m/s, g = 9.8 m/s².' },
            { text: 'Calculate tan 8° = 0.1405. Optimum speed v₀ = √(Rg tan θ) = √(250 × 9.8 × 0.1405) = √344.2 = 18.55 m/s = 66.8 km/h.' },
            { text: 'For v_max: numerator = tan θ + μ_s = 0.1405 + 0.22 = 0.3605. Denominator = 1 - μ_s tan θ = 1 - (0.22 × 0.1405) = 1.' },
            { text: 'For v = 16.67 m/s: Compare with v₀ = 18.55 m/s. Since v < v₀, friction acts UP the slope.' },
            { text: 'Solve simultaneously: From vertical, N = (mg - f sin θ)/cos θ.' },
            { text: 'Verify: f = 316 N < f_max = μ_s N. Check N from vertical: N = (1200×9.8 - 316×0.1392)/0.9903 = 11707 N.', faded: true, blankAnswer: '(a) v₀ = 66.8 km/h, (b) v_max = 108.7 km/h, (c) f = 316.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_014', title: 'Solving Problems Using Free Body Diagrams',
          scaffold: { problem: 'A 40 kg sack of rice is pulled up a 20° rough ramp (μ_k = 0.15) by a rope parallel to the ramp with tension T = 300 N.',
            steps: [
            { text: 'Identify system = sack. Draw FBD: weight mg = 400 N vertically down, normal N perpendicular to ramp, kinetic friction.' },
            { text: 'Resolve weight: mg_x = mg sin20° = 400 × 0.342 = 136.8 N (down ramp), mg_y = mg cos20° = 400 × 0.94 = 376 N (into ramp).' },
            { text: 'Write ΣF_y = 0 (no acceleration perpendicular to ramp): N - mg cos20° = 0 → N = 376 N.' },
            { text: 'Write ΣF_x = m a_x: T - mg sin20° - f_k = m a → 300 - 136.8 - 56.4 = 40 a → 106.8 = 40 a → a = 2.67 m/s² up the ramp.' },
            { text: 'Work by tension: W_T = T × s = 300 × 5 = 1500 J. Work by friction: W_f = -f_k × s = -56.4 × 5 = -282 J.', faded: true, blankAnswer: '(a) a = 2.67 m/s² up the ramp, (b) W_T = 1500 J, (c) W_f.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mechanics debate, a student defends Aristotle: \'A car cruising at 60 km/h clearly needs the engine\'s forward force to keep moving — without it, motion dies. Inertia is just the force that resists stopping.\'',
            decisions: [{ prompt: 'What did Galileo and Newton actually establish?', options: [
                { text: 'Expose the hidden balancing: the engine force doesn\'t sustain motion — it cancels friction and drag, leaving F_net = 0, which is why velocity is constant. Galileo\'s incline argument showed that removing friction lets motion continue forever. And inertia isn\'t a force at all — it\'s mass\'s resistance to CHANGE in velocity, the reason a net force is needed to accelerate, not to keep going.', outcome: 'The debate resolves: uniform motion and rest are the same state (zero acceleration); the car proves Aristotle wrong precisely because its forces balance.' },
                { text: 'Side with Aristotle — remove the engine and the car stops, so force sustains motion.', outcome: 'What stops the car is friction, not absence of a \'mover\': on frictionless ice the puck glides on — Galileo\'s whole point.', reveals: 'force-needed-to-sustain-motion' },
                { text: 'Accept \'inertia is a force\' — something must push back when motion changes.', outcome: 'Inertia is a property, not an agent: \'force of inertia\' is a category error — mass resists acceleration; no pushing force exists.', reveals: 'inertia-is-a-force' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_014', title: 'You made it',
          caseStudy: { intro: 'A car cruising at constant 60 has engine thrust exactly balancing drag — net force zero, motion sustained; force changes motion, it doesn\'t keep it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_013', difficulty: 'standard',
          question: 'Banking of roads is the practice of raising the outer edge of a curved road.',
          hint: 'Revisit c11_phy_cbse_04_012 (Circular Motion: Dynamics) for centripetal force on level.',
          misconception: 'Students believe that on a banked road, friction always acts DOWN the slope (towards the centre of the curve) because.',
          parts: [
                { id: 'a', prompt: 'Explain why a car parked on a banked road with θ = 10° and μ_s = 0.15 will remain stationary, but the same car on a road with θ = 15° and μ_s = 0.15 will slide.', answer: 'For θ = 10°, tan 10° = 0.176 > μ_s = 0.15 is FALSE (0.176 > 0.15 is TRUE',
                  options: ['For θ = 10°, tan 10° = 0.176 > μ_s = 0.15 is FALSE (0.176 > 0.15 is TRUE', 'friction provides centripetal force'],
                  hint: 'Revisit c11_phy_cbse_04_012 (Circular Motion: Dynamics) for centripetal force on level roads, and.',
                  misconception: 'Students believe that on a banked road, friction always acts DOWN the slope (towards the centre of the curve) because "friction provides.' },
                { id: 'b', prompt: 'A banked curve has radius 300 m and banking angle 15°. The coefficient of static friction is 0.2. Calculate the maximum permissible speed in km/h.', answer: 'Step 1: Identify formula v_max = √[Rg (tan θ + μ_s)/(1 - μ_s tan θ)]',
                  options: ['Step 1: Identify formula v_max = √[Rg (tan θ + μ_s)/(1 - μ_s tan θ)]', 'friction provides centripetal force'],
                  hint: 'Revisit c11_phy_cbse_04_012 (Circular Motion: Dynamics) for centripetal force on level roads, and.',
                  misconception: 'Students believe that on a banked road, friction always acts DOWN the slope (towards the centre of the curve) because "friction provides.' }
          ],
            remediations: { 'on-a-banked-road': { steps: ['Draw the free-body diagram for THREE cases: (a) v = v₀ (no friction), (b) v < v₀, (c) v > v₀.', 'For each case, ask: "If friction suddenly vanished, which way would the car slide?" (a) nowhere, (b) down the slope.', 'Friction always opposes IMPENDING relative motion, so draw friction opposite to the slide direction.', 'Write vertical equilibrium: N cos θ = mg ± f sin θ (plus when friction acts down, minus when up).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that on a banked road, friction always acts DOWN the slope (towards the centre of the curve) because.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a coin, a rigid cardboard sheet, and a protractor to demonstrate the concept of optimum speed on a banked curve.', answer: 'Procedure: Bend cardboard into a curved track of radius R ≈ 0.5 m',
                  options: ['Procedure: Bend cardboard into a curved track of radius R ≈ 0.5 m', 'tilt the board and spin', 'friction provides centripetal force'],
                  hint: 'Revisit c11_phy_cbse_04_012 (Circular Motion: Dynamics) for centripetal force on level roads, and.',
                  misconception: 'Students believe that on a banked road, friction always acts DOWN the slope (towards the centre of the curve) because "friction provides.' }
          ],
            remediations: { 'on-a-banked-road': { steps: ['Draw the free-body diagram for THREE cases: (a) v = v₀ (no friction), (b) v < v₀, (c) v > v₀.', 'For each case, ask: "If friction suddenly vanished, which way would the car slide?" (a) nowhere, (b) down the slope.', 'Friction always opposes IMPENDING relative motion, so draw friction opposite to the slide direction.', 'Write vertical equilibrium: N cos θ = mg ± f sin θ (plus when friction acts down, minus when up).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_014', difficulty: 'standard',
          question: 'A Free Body Diagram (FBD) is a schematic representation of an isolated body (or.',
          hint: 'If stuck, revisit **c11_phy_cbse_04_003 (Newton\'s Second Law)** for ΣF =.',
          misconception: '**Misconception:** "The normal reaction force N is always equal to mg." **Exact Wrong Reasoning:** Students memorize.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system)',
                  options: ['A Free Body Diagram (FBD) is a schematic representation of an isolated body (or system)', 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force is', 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its state of', 'Newton\'s Second Law states that the rate of change of linear momentum of a body is'],
                  hint: 'If stuck, revisit **c11_phy_cbse_04_003 (Newton\'s Second Law)** for ΣF = ma, **c11_phy_cbse_04_008.',
                  misconception: '**Misconception:** "The normal reaction force N is always equal to mg." **Exact Wrong Reasoning:** Students memorize the equilibrium.' }
          ],
            remediations: { 'misconception-the-normal-reaction-force': { steps: ['** Revisit **c11_phy_cbse_04_007 (Equilibrium of a Particle)** and **c11_phy_cbse_04_008 (Common Forces in Mechanics)**.', '** Perform this **mental experiment**: Place a book on a table (N = mg).', '** Solve **three targeted problems** where N ≠ mg: (a) Block on frictionless incline (θ = 30°), (b) Block in lift.', '** Check NCERT Example 4.6 (rope pulled horizontally at midpoint) — notice N is not even vertical!'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
