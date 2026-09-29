import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch03_p2: SimDef = {
    id: 'v3_c9_physics_ch03_p2',
    title: 'Force and Laws of Motion',
    subtitle: 'Inertia, momentum and action-reaction — Newton\'s three laws run every collision from cricket to car crashes.',
    classLevel: 9, subject: 'physics', topic: 'Force and Laws of Motion',
    chapters: ['c9_physics_ch03'],
    nodeIds: ['c9_physics_ch3_6', 'c9_physics_ch3_7', 'c9_physics_ch3_8', 'c9_physics_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crash-test engineer analysing an impact', intro: 'Two test cars collide — one heavier, one faster. Your job: use momentum to predict which dummy gets hurt before the crash happens.', goal: 'Apply all three laws to real collisions — calculate momentum, feel inertia, predict reaction forces.' },
    discovery: {
        question: 'A tablecloth is yanked out from under a full dinner setting — and the plates barely move. What law just saved dinner?',
        options: ['Inertia — objects resist changes to their state of rest', 'Friction held the plates', 'The cloth was too smooth to matter', 'Gravity pinned them down'],
        answer: 'Inertia — objects resist changes to their state of rest',
        hook: 'The plates didn\'t \'stay\' — they simply refused to start moving. Newton\'s first law: stillness is also a state that takes a force to change.',
    },
    teaching: [
        { title: 'Momentum: Definition and Conservation', text: 'Momentum is a vector quantity defined as the product of an object\'s mass and its velocity (p = mv), measured in kilogram metres per second (kg·m/s).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch3_6', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'On the collision lab: vary mass and velocity, measure momentum before and after — verify it never disappears.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch3_6', title: 'Momentum: Definition and Conservation',
          scaffold: { problem: 'A 50 g bullet is fired from a 4 kg rifle with a velocity of 350 m/s. Calculate the recoil velocity of the rifle.',
            steps: [
            { text: 'Identify given quantities with units. Mass of bullet m_b = 50 g = 0.050 kg. Mass of rifle m_r = 4 kg.' },
            { text: 'Write conservation of momentum equation for the closed system (bullet + rifle). Total initial momentum = 0.' },
            { text: 'Substitute values with units. 0 = (0.050 kg × 350 m/s) + (4 kg × v_r) = 17.5 kg·m/s + 4 kg × v_r.' },
            { text: 'Solve for v_r with unit tracking. 4 kg × v_r = -17.5 kg·m/s → v_r = -17.5 / 4 m/s = -4.375 m/s.' },
            { text: 'Verify physical reasonableness. Negative sign means rifle moves opposite to bullet (recoil).', faded: true, blankAnswer: '-4.375 m/s (i.e., 4.375 m/s opposite to bullet\'s direction)' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch3_7', title: 'Friction: Types and Causes',
          caseStudy: { intro: 'When you walk, you push the ground backward with your foot. The ground pushes you forward with an equal and opposite force.',
            decisions: [{ prompt: 'State Newton\'s Third Law of Motion.', options: [
                { text: 'For every action (force) there is an equal and opposite reaction (force)', outcome: 'For every action (force) there is an equal and opposite reaction (force).' },
                { text: 'every force has an opposite force', outcome: 'Not quite — Students think action and reaction forces cancel because they are equal and opposite.', reveals: 'action-and-reaction-forces-cancel' },
                { text: 'action and reaction forces cancel', outcome: 'Not quite — Students think action and reaction forces cancel because they are equal and opposite.', reveals: 'action-and-reaction-forces-cancel' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_8', title: 'Friction: Advantages and Disadvantages',
          caseStudy: { intro: 'Observe a bicycle: when you pedal, the rear tyre pushes backward on the road, and static friction pushes you forward (Third Law action-reaction) — this is.',
            decisions: [{ prompt: 'List three distinct advantages and three distinct disadvantages of friction in daily life.', options: [
                { text: 'Advantages: (1) Walking', outcome: 'Advantages: (1) Walking — static friction between shoe and ground provides forward reaction force.' },
                { text: 'friction helps us stop', outcome: 'Not quite — Students believe "friction always opposes motion" and therefore classify static friction as.', reveals: 'friction-always-opposes-motion-and' },
                { text: 'friction helps us walk', outcome: 'Not quite — Students believe "friction always opposes motion" and therefore classify static friction as.', reveals: 'friction-always-opposes-motion-and' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_9', title: 'Increasing and Reducing Friction',
          caseStudy: { intro: 'Observe a bicycle: when brakes are applied, rubber pads press against the metal rim — the rough brake pads increase friction to stop the wheel.',
            decisions: [{ prompt: 'State two methods to reduce friction in a ceiling fan\'s rotating shaft and explain the physical reason each method works.', options: [
                { text: '1', outcome: '1. **Lubrication (oil/grease)**: Forms a thin fluid layer between shaft and bearing, replacing.' },
                { text: 'polishing the shaft', outcome: 'Not quite — **Misconception:** "Polishing surfaces always reduces friction." Students over-polish metal.', reveals: 'misconception-polishing-surfaces-always-reduces' },
                { text: 'Polishing surfaces always reduces friction', outcome: 'Not quite — **Misconception:** "Polishing surfaces always reduces friction." Students over-polish metal.', reveals: 'misconception-polishing-surfaces-always-reduces' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_6', title: 'Use it in the wild',
          caseStudy: { intro: 'On a bus that brakes suddenly, Kabir lurches forward into the seat ahead. Explaining it later he says, \'a force threw me forward — motion needs force to keep going, so when the bus\'s force stopped, mine pushed me on.\'',
            decisions: [{ prompt: 'What does Newton\'s first law say instead?', options: [
                { text: 'No forward force existed — Kabir and the bus shared a velocity; braking acted on the bus, not directly on him, so his inertia kept him moving while the bus slowed. Force changes motion; it is not needed to maintain it — things only \'stop on their own\' because hidden friction does the changing.', outcome: 'This replaces the phantom forward push with inertia of motion — the law\'s actual content.' },
                { text: 'Kabir is right — a moving body needs continuous force, and losing it is what flung him ahead.', outcome: 'That is the pre-Newtonian error: a force is required to change velocity, not to sustain it — in frictionless space he would coast forever.', reveals: 'force-keeps-motion' },
                { text: 'He lurched because braking created a backward force on the bus that bounced off him.', outcome: 'Nothing bounced: the seat and floor simply decelerated while his body, left unforced, continued at the old speed.', reveals: 'brake-force-bounce' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Seatbelts, airbags, rocket launches, every cricket shot — three sentences Newton wrote in 1687 are still running all of it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch3_6', difficulty: 'standard',
          question: 'Momentum is a vector quantity defined as the product of an object\'s mass and.',
          hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
          misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total.',
          parts: [
                { id: 'a', prompt: 'State the definition of linear momentum, its formula, and its SI unit.', answer: 'Linear momentum (p) is the product of mass (m) and velocity (v): p = mv',
                  options: ['Linear momentum (p) is the product of mass (m) and velocity (v): p = mv', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'b', prompt: 'Explain why momentum is considered a vector quantity while kinetic energy is a scalar, even though both depend on mass and velocity.', answer: 'Momentum is a vector',
                  options: ['Momentum is a vector', 'both are vectors', 'momentum is scalar', 'momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'c', prompt: 'A 1500 kg car moving at 20 m/s east collides with a stationary 1000 kg truck. After collision, the car moves at 5 m/s east.', answer: '**Given:** m₁ = 1500 kg, u₁ = 20 m/s east',
                  options: ['**Given:** m₁ = 1500 kg, u₁ = 20 m/s east', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'd', prompt: 'Two ice skaters (m₁ = 60 kg, m₂ = 80 kg) stand at rest on frictionless ice. They push each other apart. Skater 1 moves at 2 m/s north.', answer: '**Initial momentum = 0** (both at rest)',
                  options: ['**Initial momentum = 0** (both at rest)', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' }
          ],
            remediations: { 'momentum-conservation-means-the-momentum': { steps: ['Draw a system boundary around *both* colliding objects.', 'Label initial velocities (with arrows) and final velocities.', 'Write Σp_initial = Σp_final explicitly for the system.', 'Use a hands-on demo: two carts with magnets (repelling) on a track.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total.',
          parts: [
                { id: 'a', prompt: 'A student argues: "In a perfectly inelastic collision where two objects stick together, momentum is conserved but kinetic energy is not.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' },
                { id: 'b', prompt: 'Design a simple experiment using a balloon and a straw to demonstrate conservation of momentum.', answer: '**Setup:** Thread a straw on a long horizontal string stretched across the room',
                  options: ['**Setup:** Thread a straw on a long horizontal string stretched across the room', 'momentum conservation means the momentum of *each* object stays the same', '"momentum conservation means the momentum of *each* object stays the same'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s third law) and c8_physics_ch3_6 (net force).',
                  misconception: 'Students often think "momentum conservation means the momentum of *each* object stays the same." They confuse *total system momentum* with.' }
          ],
            remediations: { 'momentum-conservation-means-the-momentum': { steps: ['Draw a system boundary around *both* colliding objects.', 'Label initial velocities (with arrows) and final velocities.', 'Write Σp_initial = Σp_final explicitly for the system.', 'Use a hands-on demo: two carts with magnets (repelling) on a track.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_7', difficulty: 'standard',
          question: 'Newton\'s Third Law of Motion states that for every action (force) there is.',
          hint: 'Revisit c9_physics_ch3_1 (First Law) for the concept of force and c9_physics_ch3_2.',
          misconception: 'Students think action and reaction forces cancel because they are equal and opposite.',
          parts: [
                { id: 'a', prompt: 'State Newton\'s Third Law of Motion.', answer: 'For every action (force) there is an equal and opposite reaction (force)',
                  options: ['For every action (force) there is an equal and opposite reaction (force)', 'every force has an opposite force', 'action and reaction forces cancel'],
                  hint: 'Revisit c9_physics_ch3_1 (First Law) for the concept of force and c9_physics_ch3_2 (Second Law) for.',
                  misconception: 'Students think action and reaction forces cancel because they are equal and opposite.' },
                { id: 'b', prompt: 'When you walk, identify the action-reaction pair. Which force acts on you, and which acts on the ground?', answer: 'Action: Your foot pushes the ground backward (force on the ground)',
                  options: ['Action: Your foot pushes the ground backward (force on the ground)', 'you push yourself forward', 'action and reaction forces cancel'],
                  hint: 'Revisit c9_physics_ch3_1 (First Law) for the concept of force and c9_physics_ch3_2 (Second Law) for.',
                  misconception: 'Students think action and reaction forces cancel because they are equal and opposite.' },
                { id: 'c', prompt: 'Why do action and reaction forces not cancel each other?', answer: 'Action and reaction forces do not cancel',
                  options: ['Action and reaction forces do not cancel', 'they are not equal', 'action and reaction forces cancel'],
                  hint: 'Revisit c9_physics_ch3_1 (First Law) for the concept of force and c9_physics_ch3_2 (Second Law) for.',
                  misconception: 'Students think action and reaction forces cancel because they are equal and opposite.' },
                { id: 'd', prompt: 'A book rests on a table. Is the normal force (table on book) the reaction to the book\'s weight (gravity on book)? Explain.', answer: 'No, the normal force and the book\'s weight are NOT an action-reaction pair',
                  options: ['No, the normal force and the book\'s weight are NOT an action-reaction pair', 'normal force is the reaction to weight', 'action and reaction forces cancel'],
                  hint: 'Revisit c9_physics_ch3_1 (First Law) for the concept of force and c9_physics_ch3_2 (Second Law) for.',
                  misconception: 'Students think action and reaction forces cancel because they are equal and opposite.' }
          ],
            remediations: { 'action-and-reaction-forces-cancel': { steps: ['Draw two boxes: A and B, touching.', 'Label: A pushes B (force on B, to the right).', 'B pushes A (force on A, to the left).', 'Emphasize: the forces are on DIFFERENT bodies.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_8', difficulty: 'standard',
          question: 'Friction\'s advantages are its beneficial roles in enabling motion (via static.',
          hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s Third Law) and practice drawing.',
          misconception: 'Students believe "friction always opposes motion" and therefore classify static friction as a disadvantage when.',
          parts: [
                { id: 'a', prompt: 'List three distinct advantages and three distinct disadvantages of friction in daily life.', answer: 'Advantages: (1) Walking',
                  options: ['Advantages: (1) Walking', 'friction helps us stop', 'friction helps us walk', 'friction always opposes motion'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s Third Law) and practice drawing action-reaction pairs.',
                  misconception: 'Students believe "friction always opposes motion" and therefore classify static friction as a disadvantage when it prevents a stationary.' },
                { id: 'b', prompt: 'A student says: "Friction is a disadvantage for a car because it slows the car down." Explain why this statement is incomplete.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'friction slows the car', 'friction helps tyres grip', 'friction always opposes motion'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s Third Law) and practice drawing action-reaction pairs.',
                  misconception: 'Students believe "friction always opposes motion" and therefore classify static friction as a disadvantage when it prevents a stationary.' },
                { id: 'c', prompt: 'Compare a block sliding down a rough inclined plane (angle θ = 30°, μ_k = 0.2) with an identical block on a frictionless incline of the same angle.', answer: 'Which block reaches the bottom first?',
                  options: ['Which block reaches the bottom first?', 'friction always opposes motion', 'friction makes it hard to push a heavy cupboard'],
                  hint: 'If stuck, revisit c9_physics_ch3_5 (Newton\'s Third Law) and practice drawing action-reaction pairs.',
                  misconception: 'Students believe "friction always opposes motion" and therefore classify static friction as a disadvantage when it prevents a stationary.' }
          ],
            remediations: { 'friction-always-opposes-motion-and': { steps: ['Place a toy car on a smooth tile floor and on a rough mat. Push each with the same force.', 'Ask: "Which friction helped the car move?" (static on mat). "Which friction will stop it if you stop pushing?".', 'Have student draw free-body diagrams for foot pushing backward on ground (static friction forward on foot) and brake.', 'Complete the sentence: "Static friction is an advantage when _______, but a disadvantage when _______." This forces.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_9', difficulty: 'standard',
          question: 'Increasing friction involves enhancing the interlocking between surface.',
          hint: 'Revisit c9_physics_ch3_7 (Friction: Types and Causes) for friction types and.',
          misconception: '**Misconception:** "Polishing surfaces always reduces friction." Students over-polish metal surfaces in labs and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Increasing friction involves enhancing the interlocking between surface irregularities or',
                  options: ['Increasing friction involves enhancing the interlocking between surface irregularities or', 'Newton\'s First Law of Motion (Law of Inertia) states that a body continues in its state', 'The resultant of multiple forces is the single vector force that produces the same effect', 'Balanced forces occur when the vector sum of all forces acting on an object is zero (net'],
                  hint: 'Revisit c9_physics_ch3_7 (Friction: Types and Causes) for friction types and c9_physics_ch3_8.',
                  misconception: '**Misconception:** "Polishing surfaces always reduces friction." Students over-polish metal surfaces in labs and observe friction.' }
          ],
            remediations: { 'misconception-polishing-surfaces-always-reduces': { steps: ['**Demo:** Take two identical metal blocks — one polished mirror-smooth, one with fine sandpaper scratches.', 'Use a spring balance to pull each horizontally at constant velocity on the same table.', '**Observe:** Polished block shows higher friction.', '**Explain:** At microscopic level, polished surfaces have more atoms in close contact → stronger electromagnetic.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
