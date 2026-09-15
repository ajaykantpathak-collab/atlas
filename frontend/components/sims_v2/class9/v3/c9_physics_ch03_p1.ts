import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch03_p1: SimDef = {
    id: 'v3_c9_physics_ch03_p1',
    title: 'Force and Laws of Motion',
    subtitle: 'Inertia, momentum and action-reaction — Newton\'s three laws run every collision from cricket to car crashes.',
    classLevel: 9, subject: 'physics', topic: 'Force and Laws of Motion · Part 1/2',
    chapters: ['c9_physics_ch03'],
    nodeIds: ['c9_physics_ch3_1', 'c9_physics_ch3_10', 'c9_physics_ch3_2', 'c9_physics_ch3_3', 'c9_physics_ch3_4', 'c9_physics_ch3_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a crash-test engineer analysing an impact', intro: 'Two test cars collide — one heavier, one faster. Your job: use momentum to predict which dummy gets hurt before the crash happens.', goal: 'Apply all three laws to real collisions — calculate momentum, feel inertia, predict reaction forces.' },
    discovery: {
        question: 'A tablecloth is yanked out from under a full dinner setting — and the plates barely move. What law just saved dinner?',
        options: ['Inertia — objects resist changes to their state of rest', 'Friction held the plates', 'The cloth was too smooth to matter', 'Gravity pinned them down'],
        answer: 'Inertia — objects resist changes to their state of rest',
        hook: 'The plates didn\'t \'stay\' — they simply refused to start moving. Newton\'s first law: stillness is also a state that takes a force to change.',
    },
    teaching: [
        { title: 'Force: Definition and Effects on Objects', text: 'Newton\'s First Law of Motion (Law of Inertia) states that a body continues in its state of rest or uniform motion in a straight line unless acted upon by an external unbalanced force — meaning that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch3_1', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'On the collision lab: vary mass and velocity, measure momentum before and after — verify it never disappears.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c9_physics_ch3_1', title: 'Force: Definition and Effects on Objects',
          caseStudy: { intro: 'Imagine a book on a table. It stays there — it does not start moving on its own.',
            decisions: [{ prompt: 'State Newton\'s First Law of Motion.', options: [
                { text: 'A body continues in its state of rest or uniform motion in a straight line unless acted', outcome: 'A body continues in its state of rest or uniform motion in a straight line unless acted upon by.' },
                { text: 'a body at rest stays at rest', outcome: 'Not quite — Students think a force is needed to keep an object moving. The exact error: they observe that.', reveals: 'a-force-is-needed-to' },
                { text: 'a force is needed to keep an object moving', outcome: 'Not quite — Students think a force is needed to keep an object moving. The exact error: they observe that.', reveals: 'a-force-is-needed-to' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch3_10', title: 'Force Systems: Resultant of Multiple Forces',
          scaffold: { problem: 'Two children pull a sled on snow. Child A pulls with 50 N at 30° north of east. Child B pulls with 40 N at 60° north of west.',
            steps: [
            { text: 'Set up coordinate system: +x = east, +y = north. Identify given: F_A = 50 N, θ_A = 30°; F_B = 40 N, θ_B = 180° - 60°.' },
            { text: 'Resolve each force into components. F_Ax = 50 cos30° = 50 × 0.866 = 43.3 N. F_Ay = 50 sin30° = 50 × 0.5 = 25 N.' },
            { text: 'Sum components: R_x = 43.3 + (-20) = 23.3 N. R_y = 25 + 34.6 = 59.6 N.' },
            { text: 'Compute magnitude: R = √(23.3² + 59.6²) = √(542.9 + 3552.2) = √4095.1 = 64.0 N.' },
            { text: 'Verify: Both components positive → quadrant I, angle between 30° and 60°?', faded: true, blankAnswer: 'Resultant force = 64.0 N at 68.7° north of east.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch3_2', title: 'Balanced and Unbalanced Forces',
          scaffold: { problem: 'A 10 kg suitcase is pulled across a horizontal railway platform at constant velocity. The pulling force is 50 N at 37° above horizontal.',
            steps: [
            { text: 'Identify given: m = 10 kg, Fₚᵤₗₗ = 50 N at 37°, constant velocity ⇒ a = 0 ⇒ balanced forces. Find: friction f, normal N.' },
            { text: 'Draw free-body diagram — weight mg down, normal N up, pull F at 37° up from horizontal, friction f opposite motion.' },
            { text: 'Apply equilibrium conditions. Horizontal: ΣFₓ = 0 ⇒ Fₓ - f = 0 ⇒ f = Fₓ = 40 N.' },
            { text: 'Compute: mg = 10 × 9.8 = 98 N. N = 98 - 30 = 68 N. Friction f = 40 N.' },
            { text: 'Verify: Normal force (68 N) < weight (98 N) because upward pull reduces contact force.', faded: true, blankAnswer: 'Friction force = 40 N opposite to motion; Normal force = 68.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch3_3', title: 'Newton\'s First Law of Motion: Inertia',
          caseStudy: { intro: 'Observe a ceiling fan continuing to rotate for several seconds after you switch it off — it doesn\'t stop instantly because of inertia.',
            decisions: [{ prompt: 'State Newton\'s First Law of Motion and define inertia. What is the SI unit of the physical quantity that measures inertia?', options: [
                { text: 'Newton\'s First Law: An object remains at rest or in uniform straight-line motion unless', outcome: 'Newton\'s First Law: An object remains at rest or in uniform straight-line motion unless acted upon.' },
                { text: 'inertia is measured in newtons', outcome: 'Not quite — Students believe that "inertia is a force that keeps objects moving" — they treat inertia as.', reveals: 'inertia-is-a-force-that' },
                { text: 'a force is needed to keep an object moving', outcome: 'Not quite — Students believe that "inertia is a force that keeps objects moving" — they treat inertia as.', reveals: 'inertia-is-a-force-that' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch3_4', title: 'Newton\'s Second Law of Motion: F = ma',
          scaffold: { problem: 'A 2500 kg truck starts from rest and rolls down a hill with a constant acceleration of 0.6 m/s².',
            steps: [
            { text: 'Identify given quantities: mass m = 2500 kg, acceleration a = 0.6 m/s² (down the hill), friction force f = 800 N (up.' },
            { text: 'Draw a free-body diagram. Choose down the hill as positive. Net force F_net = F_d - f.' },
            { text: 'Apply Newton\'s Second Law: F_net = m a. Substitute: F_d - 800 = 2500 × 0.6.' },
            { text: 'Compute: 2500 × 0.6 = 1500 N. Then F_d = 1500 + 800 = 2300 N.' },
            { text: 'Verify: Net force = 2300 - 800 = 1500 N. Acceleration = 1500/2500 = 0.6 m/s². Units are consistent (N, kg, m/s²).', faded: true, blankAnswer: '2300 N down the hill.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch3_5', title: 'Newton\'s Third Law of Motion: Action and Reaction',
          caseStudy: { intro: 'Observe a student pushing against a wall while standing on a skateboard: the student rolls backward.',
            decisions: [{ prompt: 'State Newton\'s Third Law of Motion. Identify the action and reaction forces when a cricket ball is hit by a bat.', options: [
                { text: 'Newton\'s Third Law: For every action force, there is an equal and opposite reaction force', outcome: 'Newton\'s Third Law: For every action force, there is an equal and opposite reaction force acting.' },
                { text: 'both forces act on the ball', outcome: 'Not quite — Students believe action and reaction forces cancel each other out, preventing motion.', reveals: 'action-and-reaction-forces-cancel' },
                { text: 'action and reaction forces cancel each other out, preventing motion', outcome: 'Not quite — Students believe action and reaction forces cancel each other out, preventing motion.', reveals: 'action-and-reaction-forces-cancel' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'On a bus that brakes suddenly, Kabir lurches forward into the seat ahead. Explaining it later he says, \'a force threw me forward — motion needs force to keep going, so when the bus\'s force stopped, mine pushed me on.\'',
            decisions: [{ prompt: 'What does Newton\'s first law say instead?', options: [
                { text: 'No forward force existed — Kabir and the bus shared a velocity; braking acted on the bus, not directly on him, so his inertia kept him moving while the bus slowed. Force changes motion; it is not needed to maintain it — things only \'stop on their own\' because hidden friction does the changing.', outcome: 'This replaces the phantom forward push with inertia of motion — the law\'s actual content.' },
                { text: 'Kabir is right — a moving body needs continuous force, and losing it is what flung him ahead.', outcome: 'That is the pre-Newtonian error: a force is required to change velocity, not to sustain it — in frictionless space he would coast forever.', reveals: 'force-keeps-motion' },
                { text: 'He lurched because braking created a backward force on the bus that bounced off him.', outcome: 'Nothing bounced: the seat and floor simply decelerated while his body, left unforced, continued at the old speed.', reveals: 'brake-force-bounce' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch3_5', title: 'The bigger picture',
          caseStudy: { intro: 'Seatbelts, airbags, rocket launches, every cricket shot — three sentences Newton wrote in 1687 are still running all of it.',
            decisions: [{ prompt: 'What comes next? Force and Laws of Motion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Force and Laws of Motion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch3_1', difficulty: 'standard',
          question: 'Newton\'s First Law of Motion (Law of Inertia) states that a body continues.',
          hint: 'Revisit c9_physics_ch1_2 (Motion and Rest) for the concept of motion and c9_physics_ch2_1.',
          misconception: 'Students think a force is needed to keep an object moving. The exact error: they observe that moving objects.',
          parts: [
                { id: 'a', prompt: 'Why does a passenger in a suddenly braking car lurch forward? Explain using Newton\'s First Law.', answer: 'The passenger and car are moving together',
                  options: ['The passenger and car are moving together', 'the passenger is pushed forward', 'a force is needed to keep an object moving'],
                  hint: 'Revisit c9_physics_ch1_2 (Motion and Rest) for the concept of motion and c9_physics_ch2_1.',
                  misconception: 'Students think a force is needed to keep an object moving. The exact error: they observe that moving objects in everyday life stop on their.' }
          ],
            remediations: { 'a-force-is-needed-to': { steps: ['Show a puck on ice (low friction) — it slides far.', 'Show a puck on grass (high friction) — it stops quickly.', 'Ask: "Why does the ice puck slide farther?" (Less friction — less force opposing motion.) 3.', 'Imagine a frictionless surface: the puck would slide forever.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think a force is needed to keep an object moving. The exact error: they observe that moving objects.',
          parts: [
                { id: 'a', prompt: 'Why is it harder to push a heavy table than a light chair? Relate this to inertia and mass.', answer: 'The heavy table has more mass, and mass measures inertia',
                  options: ['The heavy table has more mass, and mass measures inertia', 'the table is heavier, so gravity pulls it more', 'a force is needed to keep an object moving'],
                  hint: 'Revisit c9_physics_ch1_2 (Motion and Rest) for the concept of motion and c9_physics_ch2_1.',
                  misconception: 'Students think a force is needed to keep an object moving. The exact error: they observe that moving objects in everyday life stop on their.' },
                { id: 'b', prompt: 'A student claims: "A force is needed to keep an object moving." Evaluate this statement using Newton\'s First Law and explain why moving objects seem to stop.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'a force is needed to keep an object moving'],
                  hint: 'Revisit c9_physics_ch1_2 (Motion and Rest) for the concept of motion and c9_physics_ch2_1.',
                  misconception: 'Students think a force is needed to keep an object moving. The exact error: they observe that moving objects in everyday life stop on their.' }
          ],
            remediations: { 'a-force-is-needed-to': { steps: ['Show a puck on ice (low friction) — it slides far.', 'Show a puck on grass (high friction) — it stops quickly.', 'Ask: "Why does the ice puck slide farther?" (Less friction — less force opposing motion.) 3.', 'Imagine a frictionless surface: the puck would slide forever.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_10', difficulty: 'standard',
          question: 'The resultant of multiple forces is the single vector force that produces the.',
          hint: 'Review vector addition using the triangle law (c8_physics_ch3_6) and practice resolving.',
          misconception: 'Students often believe the resultant force is simply the arithmetic sum of all force magnitudes, ignoring direction.',
          parts: [
                { id: 'a', prompt: 'State the parallelogram law of vector addition for two forces acting at a point. What is the SI unit of the resultant force?', answer: 'The parallelogram law states: If two forces acting at a point are represented in',
                  options: ['The parallelogram law states: If two forces acting at a point are represented in', 'resultant is the sum of magnitudes'],
                  hint: 'Review vector addition using the triangle law (c8_physics_ch3_6) and practice resolving a single.',
                  misconception: 'Students often believe the resultant force is simply the arithmetic sum of all force magnitudes, ignoring direction.' },
                { id: 'b', prompt: 'A force of 20 N acts at 30° above the horizontal. Another force of 15 N acts at 60° above the horizontal.', answer: 'Horizontal components: 20 cos30° ≈ 17.3 N, 15 cos60° = 7.5 N → total ≈ 24.8 N',
                  options: ['Horizontal components: 20 cos30° ≈ 17.3 N, 15 cos60° = 7.5 N → total ≈ 24.8 N', 'vertical is larger'],
                  hint: 'Review vector addition using the triangle law (c8_physics_ch3_6) and practice resolving a single.',
                  misconception: 'Students often believe the resultant force is simply the arithmetic sum of all force magnitudes, ignoring direction.' }
          ],
            remediations: { 'the-resultant-force-is-simply': { steps: ['Have the student physically push a toy car: first push east, then push west while it\'s moving.', 'Ask: "Did the pushes add up or cancel?" 2.', 'Draw arrows on paper for each push, then use the triangle method to find the resultant arrow.', 'Repeat with spring balances pulling a ring at different angles.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_2', difficulty: 'standard',
          question: 'Balanced forces occur when the vector sum of all forces acting on an object.',
          hint: 'Review c8_physics_ch3_6 (net force) and c9_math_ch6_1 (coordinate geometry for vector.',
          misconception: 'Students believe "balanced forces mean the object is stationary" because they conflate zero net force with zero.',
          parts: [
                { id: 'a', prompt: 'A 2 kg book rests on a horizontal table. The gravitational force on it is 19.6 N downward.', answer: 'The normal force is 19.6 N upward',
                  options: ['The normal force is 19.6 N upward', 'normal force is 9.8 N', 'unbalanced because gravity acts', 'balanced forces mean the object is stationary'],
                  hint: 'Review c8_physics_ch3_6 (net force) and c9_math_ch6_1 (coordinate geometry for vector resolution).',
                  misconception: 'Students believe "balanced forces mean the object is stationary" because they conflate zero net force with zero velocity.' },
                { id: 'b', prompt: 'A car moves at a constant 60 km/h on a straight, level road. The engine exerts a forward force of 4000 N.', answer: 'Balanced forces mean zero acceleration, not zero velocity',
                  options: ['Balanced forces mean zero acceleration, not zero velocity', 'balanced forces mean the object is stationary'],
                  hint: 'Review c8_physics_ch3_6 (net force) and c9_math_ch6_1 (coordinate geometry for vector resolution).',
                  misconception: 'Students believe "balanced forces mean the object is stationary" because they conflate zero net force with zero velocity.' },
                { id: 'c', prompt: 'Three forces act on a 5 kg box on a smooth horizontal floor: 30 N east, 40 N north, and 50 N at 225° (south-west).', answer: '**Step 1:** Resolve each force into x (east) and y (north) components',
                  options: ['**Step 1:** Resolve each force into x (east) and y (north) components', 'balanced forces mean the object is stationary'],
                  hint: 'Review c8_physics_ch3_6 (net force) and c9_math_ch6_1 (coordinate geometry for vector resolution).',
                  misconception: 'Students believe "balanced forces mean the object is stationary" because they conflate zero net force with zero velocity.' },
                { id: 'd', prompt: 'Two students push a stalled autorickshaw of mass 600 kg. Student A pushes with 400 N at 30° north of east. Student B pushes with 500 N at 60° south of east.', answer: '**Free-body diagram:** Four arrows from centre',
                  options: ['**Free-body diagram:** Four arrows from centre', 'balanced forces mean the object is stationary'],
                  hint: 'Review c8_physics_ch3_6 (net force) and c9_math_ch6_1 (coordinate geometry for vector resolution).',
                  misconception: 'Students believe "balanced forces mean the object is stationary" because they conflate zero net force with zero velocity.' }
          ],
            remediations: { 'balanced-forces-mean-the-object': { steps: ['** Show a video of an astronaut on the ISS pushing a wrench — it floats at constant velocity with no visible forces.', '** In class, use an air track or a hovercraft puck on a smooth floor — give it a push; it glides at nearly constant.', '** Contrast with same puck on rough carpet — it stops. Identify friction as the unbalanced force. **', '** Have students complete a table: Situation | Forces Balanced? | Velocity Constant? | Acceleration?'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_3', difficulty: 'standard',
          question: 'Newton\'s First Law of Motion states that an object remains at rest or.',
          hint: 'If stuck, review c8_physics_ch3_5 (Balanced and Unbalanced Forces) and practice drawing.',
          misconception: 'Students believe that "inertia is a force that keeps objects moving" — they treat inertia as an active push (like.',
          parts: [
                { id: 'a', prompt: 'Two identical trucks, one loaded (mass 20,000 kg) and one empty (mass 8,000 kg), are moving at the same constant velocity on a straight road.', answer: 'The empty truck stops in a shorter distance',
                  options: ['The empty truck stops in a shorter distance', 'heavier means harder to move, so it stops faster', 'inertia is a force that keeps objects moving'],
                  hint: 'If stuck, review c8_physics_ch3_5 (Balanced and Unbalanced Forces) and practice drawing free-body.',
                  misconception: 'Students believe that "inertia is a force that keeps objects moving" — they treat inertia as an active push (like momentum) rather than.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Revisit the coin-on-card experiment: flick the card slowly vs.', 'quickly; discuss why the coin falls vertically (no horizontal force on coin).', 'Use a dynamics trolley on a friction-compensated ramp: show that with zero net force, the trolley moves at constant.', 'Explicitly contrast "inertia" (property, measured in kg) with "momentum" (quantity of motion, kg·m/s) and "force".'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_4', difficulty: 'standard',
          question: 'Newton\'s Second Law of Motion states that the rate of change of momentum of.',
          hint: 'Review c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice drawing free-body.',
          misconception: 'Students often believe that a constant force produces a constant velocity because they observe that pushing a bicycle.',
          parts: [
                { id: 'a', prompt: 'State the mathematical form of Newton\'s Second Law for a constant mass system and give the SI unit of force with its definition in base units.', answer: 'The law is \\( F_{\\text{net}} = m a \\)',
                  options: ['The law is \\( F_{\\text{net}} = m a \\)', 'F = mv', 'unit is kg m/s'],
                  hint: 'Review c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice drawing free-body diagrams.',
                  misconception: 'Students often believe that a constant force produces a constant velocity because they observe that pushing a bicycle at a steady speed.' }
          ],
            remediations: { 'a-constant-force-produces-a': { steps: ['Revisit c9_physics_ch3_2 (Balanced and Unbalanced Forces) and identify all forces acting on a bicycle moving.', 'Draw a free-body diagram showing forward push, friction, and air resistance.', 'Calculate net force when speed is constant (zero).', 'Then imagine the push increases: net force becomes non-zero, causing acceleration.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch3_5', difficulty: 'standard',
          question: 'Newton\'s Third Law of Motion states that for every action force exerted.',
          hint: 'Revisit c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice isolating one.',
          misconception: 'Students believe action and reaction forces cancel each other out, preventing motion.',
          parts: [
                { id: 'a', prompt: 'A book of mass 0.5 kg rests on a horizontal table. The weight of the book is 4.9 N downwards. The table exerts a normal force of 4.9 N upwards on the book.', answer: 'No, they are not an action-reaction pair',
                  options: ['No, they are not an action-reaction pair', 'equal and opposite forces on one object', 'action-reaction pairs on two objects', 'action and reaction forces cancel each other out, preventing motion'],
                  hint: 'Revisit c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice isolating one object to list.',
                  misconception: 'Students believe action and reaction forces cancel each other out, preventing motion.' },
                { id: 'b', prompt: 'A 60 kg boy stands on a frictionless trolley of mass 40 kg. The boy jumps off the trolley with a velocity of 2 m/s relative to the ground.', answer: '**Step 1:** Identify system: boy + trolley',
                  options: ['**Step 1:** Identify system: boy + trolley', 'action and reaction forces cancel each other out, preventing motion'],
                  hint: 'Revisit c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice isolating one object to list.',
                  misconception: 'Students believe action and reaction forces cancel each other out, preventing motion.' },
                { id: 'c', prompt: 'Analyze the following statement: "When a rocket launches, the exhaust gases push the ground, and the ground pushes the rocket up." Identify the error and.', answer: 'The error: Rockets work in space where there is no ground',
                  options: ['The error: Rockets work in space where there is no ground', 'action and reaction forces cancel each other out, preventing motion'],
                  hint: 'Revisit c9_physics_ch3_2 (Balanced and Unbalanced Forces) and practice isolating one object to list.',
                  misconception: 'Students believe action and reaction forces cancel each other out, preventing motion.' }
          ],
            remediations: { 'action-and-reaction-forces-cancel': { steps: ['Draw a clear system boundary: circle the box alone.', 'List forces **on the box** (your push, friction, weight, normal).', 'List forces **on you** (box\'s push, ground friction, weight, normal).', 'Apply F=ma to each circle separately.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
