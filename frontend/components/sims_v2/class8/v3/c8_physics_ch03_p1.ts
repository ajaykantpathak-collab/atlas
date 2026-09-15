import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch03_p1: SimDef = {
    id: 'v3_c8_physics_ch03_p1',
    title: 'Exploring Forces · Part 1/2',
    subtitle: 'Pushes, pulls and the fights that end in stalemate',
    classLevel: 8, subject: 'physics', topic: 'Exploring Forces · Part 1/2',
    chapters: ['c8_physics_ch03'],
    nodeIds: ['c8_physics_ch3_1', 'c8_physics_ch3_10', 'c8_physics_ch3_11', 'c8_physics_ch3_12', 'c8_physics_ch3_2', 'c8_physics_ch3_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a force detective', intro: 'Something started the ceiling fan spinning — but what, exactly? Hunt for pushes and pulls in everyday scenes and learn to spot forces that leave no visible trace.', goal: 'Understand force as a directed push or pull measured in newtons, producing changes in speed, direction or shape — and recognise that opposing forces can cancel out.' },
    discovery: {
        question: 'Press a rubber ball and it squashes flat without moving an inch. Your friend says \'no force acted — it didn\'t move.\' Is he right?',
        options: ['No — force doesn\'t only move things; it can change shape too, and squashing counts', 'Yes — force only exists when something moves', 'Only if the ball stays squashed forever', 'Yes — squeezing is just touching firmly'],
        answer: 'No — force doesn\'t only move things; it can change shape too, and squashing counts',
        hook: 'Force isn\'t a thing objects \'have\' — it\'s an interaction between them. Even a book sitting still is in a tug-of-war: gravity pulls down, the table pushes up, and the net is zero. Two equal opposite pushes? Nobody wins, nothing moves.',
    },
    teaching: [
        { title: 'Force: Definition as Push or Pull', text: 'Force is a push or pull acting on an object that can change its state of motion (speed or direction) or its shape and size; it is a vector quantity having both magnitude and direction, measured.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch3_1', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Detect the invisible pushes and pulls all around you: kick a ball (change speed), squeeze a sponge (change shape), tug a chair (change direction) — then explain why two kids pushing a box from opposite sides get nowhere.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch3_1', title: 'Force: Definition as Push or Pull',
          caseStudy: { intro: 'Observe a ceiling fan starting up: the blades are at rest, then they begin to rotate — something must have pushed or pulled them.',
            decisions: [{ prompt: 'Define force in your own words and state its SI unit.', options: [
                { text: 'Force is a push or pull acting on an object that can change its state of motion or shape', outcome: 'Force is a push or pull acting on an object that can change its state of motion or shape; its.' },
                { text: 'force is energy', outcome: 'Not quite — Students believe "force is something an object has" (like a property) rather than an interaction.', reveals: 'force-is-something-an-object' },
                { text: 'unit is joule', outcome: 'Not quite — Students believe "force is something an object has" (like a property) rather than an interaction.', reveals: 'force-is-something-an-object' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch3_10', title: 'Increasing and Reducing Friction: Real-Life Applications',
          scaffold: { problem: 'A 1500 kg car is parked on a dry asphalt road (μ_s = 0.8). The driver applies the handbrake, which acts on the rear wheels only (60%.',
            steps: [
            { text: 'Identify given: m = 1500 kg, μ_dry = 0.8, μ_wet = 0.4, rear weight fraction = 0.6, g = 10 m/s².' },
            { text: 'Calculate total weight W = mg = 1500 kg × 10 m/s² = 15000 N. Rear normal force N_rear = 0.6 × 15000 N = 9000 N.' },
            { text: 'Apply formula f_max = μN for rear wheels. Dry: f_max = 0.8 × 9000 N = 7200 N. Wet: f_max = 0.4 × 9000 N = 3600 N.' },
            { text: 'Unit check: μ (dimensionless) × N (N) = N. Both answers in newtons.' },
            { text: 'Physical reasonableness: Wet road halves the coefficient, so braking force halves (7200 N → 3600 N).', faded: true, blankAnswer: 'Dry road: 7200 N. Wet road: 3600 N.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch3_11', title: 'Gravitational Force: Pull of Earth on Objects',
          scaffold: { problem: 'A watermelon of mass 3.2 kg is placed on a weighing scale in a grocery shop in Mumbai. What is the reading on the scale in newtons?',
            steps: [
            { text: 'Identify given quantities: mass m = 3.2 kg, g = 9.8 m/s². We need to find weight W in newtons (N).' },
            { text: 'Recall the formula for weight: W = m × g. Check units: kg × m/s² = kg·m/s² = N. Units are consistent.' },
            { text: 'Substitute the values with units: W = 3.2 kg × 9.8 m/s².' },
            { text: 'Perform multiplication: 3.2 × 9.8 = 31.36. Unit: kg·m/s² = N. So W = 31.36 N.' },
            { text: 'Verify reasonableness: A 3 kg object weighs about 30 N; 31.36 N is plausible for a watermelon.', faded: true, blankAnswer: '31.36 N' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch3_12', title: 'Newton\'s First Law of Motion: Inertia',
          caseStudy: { intro: 'Observe a coin placed on a stiff card covering a glass tumbler. When the card is flicked horizontally with a finger, the coin drops into the glass.',
            decisions: [{ prompt: 'State Newton\'s First Law of Motion in your own words. What physical quantity measures inertia, and what is its SI unit?', options: [
                { text: 'Newton\'s First Law: An object at rest stays at rest, and an object in uniform motion', outcome: 'Newton\'s First Law: An object at rest stays at rest, and an object in uniform motion stays.' },
                { text: 'inertia is measured in newtons', outcome: 'Not quite — Students often think "inertia is a force that keeps things moving" or "heavier objects have more.', reveals: 'inertia-is-a-force-that' },
                { text: 'force is needed to keep an object moving', outcome: 'Not quite — Students often think "inertia is a force that keeps things moving" or "heavier objects have more.', reveals: 'inertia-is-a-force-that' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_2', title: 'Effects of Force: Change in Speed of an Object',
          caseStudy: { intro: 'Observe a bicycle on the road: when you pedal, you push the pedals forward, applying a force in the direction of motion, and the bicycle speeds up.',
            decisions: [{ prompt: 'A ball is rolling on a smooth horizontal floor. You give it a sharp push in the exact direction it is already moving.', options: [
                { text: 'The speed of the ball increases', outcome: 'The speed of the ball increases. A wrong answer (e.g., "speed stays the same" or "speed decreases").' },
                { text: 'speed stays the same', outcome: 'Not quite — Students believe that **a force is needed to *keep* an object moving at constant speed**.', reveals: 'a-force-is-needed-to' },
                { text: 'speed decreases', outcome: 'Not quite — Students believe that **a force is needed to *keep* an object moving at constant speed**.', reveals: 'a-force-is-needed-to' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_3', title: 'Effects of Force: Change in Direction of Motion',
          caseStudy: { intro: 'Watch a cricket bowler deliver a ball that curves in the air (swing) or a batsman hit a straight ball to the boundary at a sharp angle — both show force.',
            decisions: [{ prompt: 'A ball is moving horizontally to the right. A vertical upward force acts on it briefly. What happens to the ball\'s direction of motion?', options: [
                { text: 'The ball\'s direction changes to an upward-right diagonal', outcome: 'The ball\'s direction changes to an upward-right diagonal. The vertical force adds an upward.' },
                { text: 'direction doesn\'t change', outcome: 'Not quite — Students believe that a force is required to *keep* an object moving in a circle and that this.', reveals: 'a-force-is-required-to' },
                { text: 'ball moves straight up', outcome: 'Not quite — Students believe that a force is required to *keep* an object moving in a circle and that this.', reveals: 'a-force-is-required-to' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Pia squeezes her rubber stress ball flat and it stays in her fist, unmoving. Her friend says, \'No force was involved — nothing moved.\' Pia squeezes again and watches it deform.',
            decisions: [{ prompt: 'Did a force act on the ball?', options: [
                { text: 'Yes — force is a push or pull, and its effects include changing shape, not just motion; her squeeze is a compressive force that deformed the ball even though it stayed in place. Its SI unit is the newton.', outcome: 'This keeps the definition complete: speed change, direction change, and shape change are all effects of force.' },
                { text: 'The friend is right — force only exists when an object moves, so a still, squashed ball proves no force acted.', outcome: 'That limits force to motion; deformation without displacement is still the work of a force — the ball\'s changed shape is the evidence.', reveals: 'no-motion-no-force' },
                { text: 'The ball \'has force stored in it\' from the squeeze, which is what deformed it.', outcome: 'Force is not a possession an object stores; it is an interaction — Pia\'s hand pushing on the ball.', reveals: 'objects-store-force' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_3', title: 'The bigger picture',
          caseStudy: { intro: 'Force is a push or pull with direction, measured in newtons. It can speed things up, turn them, or squish them — and when forces cancel, the world stays perfectly still.',
            decisions: [{ prompt: 'What comes next? Exploring Forces · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Exploring Forces · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch3_1', difficulty: 'standard',
          question: 'Force is a push or pull acting on an object that can change its state of motion.',
          hint: 'Revisit Class 7 "Uniform and Non-Uniform Linear Motion" (c7_physics_ch04_008) and.',
          misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects.',
          parts: [
                { id: 'a', prompt: 'A boy kicks a football at rest. The ball starts moving forward. Identify the force, its direction, and which effect of force is demonstrated here.', answer: 'The force is the push from the boy\'s foot on the ball',
                  options: ['The force is the push from the boy\'s foot on the ball', 'the force is the ball moving', 'direction is backward', 'force is something an object has'],
                  hint: 'Revisit Class 7 "Uniform and Non-Uniform Linear Motion" (c7_physics_ch04_008) and "Relationship.',
                  misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects — e.g., they say "the ball.' },
                { id: 'b', prompt: 'A force of 5 N acts on a 2 kg block initially at rest on a smooth horizontal surface. If the force acts for 3 seconds, what is the final speed of the block?', answer: 'Given: F = 5 N, m = 2 kg, u = 0 m/s, t = 3 s',
                  options: ['Given: F = 5 N, m = 2 kg, u = 0 m/s, t = 3 s', 'force is something an object has', 'the ball has force', 'the book on the table has no force'],
                  hint: 'Revisit Class 7 "Uniform and Non-Uniform Linear Motion" (c7_physics_ch04_008) and "Relationship.',
                  misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects — e.g., they say "the ball.' }
          ],
            remediations: { 'force-is-something-an-object': { steps: ['Ask: "What forces act on the book?" Most will say "none." Then push the book gently — it doesn\'t move.', 'Guide them to realize the table pushes up (normal force) and Earth pulls down (gravity) — these forces are balanced.', 'Use a spring balance to pull the book horizontally with 1 N, then 2 N, showing the reading increases but the book stays.', 'This makes invisible forces visible and shows force as interaction, not possession.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects.',
          parts: [
                { id: 'a', prompt: 'A student writes: "When I press a rubber ball, it changes shape.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'force is something an object has', 'the ball has force', 'the book on the table has no force'],
                  hint: 'Revisit Class 7 "Uniform and Non-Uniform Linear Motion" (c7_physics_ch04_008) and "Relationship.',
                  misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects — e.g., they say "the ball.' },
                { id: 'b', prompt: 'Design a simple classroom activity using only a rubber band, a toy car, and a spring balance to demonstrate that force has both magnitude and direction.', answer: 'Attach the rubber band to the toy car',
                  options: ['Attach the rubber band to the toy car', 'force is something an object has', 'the ball has force', 'the book on the table has no force'],
                  hint: 'Revisit Class 7 "Uniform and Non-Uniform Linear Motion" (c7_physics_ch04_008) and "Relationship.',
                  misconception: 'Students believe "force is something an object has" (like a property) rather than an interaction between objects — e.g., they say "the ball.' }
          ],
            remediations: { 'force-is-something-an-object': { steps: ['Ask: "What forces act on the book?" Most will say "none." Then push the book gently — it doesn\'t move.', 'Guide them to realize the table pushes up (normal force) and Earth pulls down (gravity) — these forces are balanced.', 'Use a spring balance to pull the book horizontally with 1 N, then 2 N, showing the reading increases but the book stays.', 'This makes invisible forces visible and shows force as interaction, not possession.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_10', difficulty: 'standard',
          question: 'Increasing and reducing friction refers to the deliberate modification.',
          hint: 'If stuck, revisit c8_physics_ch3_9 (Friction: Definition and Factors Affecting Friction).',
          misconception: 'Students believe that "smoother surfaces always have less friction" and that polishing metal surfaces to a mirror.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Increasing and reducing friction refers to the deliberate modification of contact',
                  options: ['Increasing and reducing friction refers to the deliberate modification of contact', 'Force is a push or pull acting on an object that can change its state of motion (speed or', 'Gravitational force is the attractive non-contact force exerted by the Earth on any', 'Newton\'s First Law of Motion states that an object will remain at rest or continue moving'],
                  hint: 'If stuck, revisit c8_physics_ch3_9 (Friction: Definition and Factors Affecting Friction) and.',
                  misconception: 'Students believe that "smoother surfaces always have less friction" and that polishing metal surfaces to a mirror finish will minimize.' }
          ],
            remediations: { 'smoother-surfaces-always-have-less': { steps: ['If the student holds this misconception, conduct the "sticky blocks" demo: Take two gauge blocks (or flat glass.', 'Then apply a drop of oil and show they slide freely.', 'Next, rub chalk on one surface to roughen it – friction increases again.', 'Guide the student to plot a mental graph: friction vs.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_11', difficulty: 'standard',
          question: 'Gravitational force is the attractive non-contact force exerted by the Earth.',
          hint: 'If stuck, revisit c8_physics_ch3_1 (Force definition) and c8_physics_ch3_8 (Non-contact.',
          misconception: 'Students believe "heavier objects fall faster" because they feel a heavier object pulls harder on their hand.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of gravitational force (weight) acting on an object, and how does it differ from the unit of mass?', answer: 'The SI unit of weight is the newton (N)',
                  options: ['The SI unit of weight is the newton (N)', 'kilogram', 'heavier objects fall faster'],
                  hint: 'If stuck, revisit c8_physics_ch3_1 (Force definition) and c8_physics_ch3_8 (Non-contact forces).',
                  misconception: 'Students believe "heavier objects fall faster" because they feel a heavier object pulls harder on their hand.' },
                { id: 'b', prompt: 'Two objects, a 2 kg brick and a 0.5 kg sponge, are dropped from the same height in a vacuum. Which hits the ground first, and why?', answer: 'They hit the ground simultaneously',
                  options: ['They hit the ground simultaneously', 'the brick falls faster', 'heavier objects fall faster'],
                  hint: 'If stuck, revisit c8_physics_ch3_1 (Force definition) and c8_physics_ch3_8 (Non-contact forces).',
                  misconception: 'Students believe "heavier objects fall faster" because they feel a heavier object pulls harder on their hand.' },
                { id: 'c', prompt: 'A schoolbag has a mass of 4.5 kg. Calculate its weight on Earth. (Take g = 9.8 m/s²)', answer: 'Step 1: Identify given: m = 4.5 kg, g = 9.8 m/s²',
                  options: ['Step 1: Identify given: m = 4.5 kg, g = 9.8 m/s²', 'heavier objects fall faster'],
                  hint: 'If stuck, revisit c8_physics_ch3_1 (Force definition) and c8_physics_ch3_8 (Non-contact forces).',
                  misconception: 'Students believe "heavier objects fall faster" because they feel a heavier object pulls harder on their hand.' },
                { id: 'd', prompt: 'A student claims: "If I take the same schoolbag to the Moon, its mass becomes less because gravity is weaker." Analyze this statement and correct the error.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'heavier objects fall faster'],
                  hint: 'If stuck, revisit c8_physics_ch3_1 (Force definition) and c8_physics_ch3_8 (Non-contact forces).',
                  misconception: 'Students believe "heavier objects fall faster" because they feel a heavier object pulls harder on their hand.' }
          ],
            remediations: { 'heavier-objects-fall-faster-because': { steps: ['Drop a crumpled paper ball and a flat sheet of paper from the same height; observe the flat sheet falls slower due.', 'Then drop the crumpled paper and a heavy book together; they hit the floor simultaneously.', 'Discuss: "If air weren\'t there, even the flat sheet would fall at the same rate." 4.', 'Use a vacuum pump demonstration (or video) to confirm.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_12', difficulty: 'standard',
          question: 'Newton\'s First Law of Motion states that an object will remain at rest.',
          hint: 'If stuck, revisit "Balanced and Unbalanced Forces" (c8_physics_ch3_5) and "Uniform and.',
          misconception: 'Students often think "inertia is a force that keeps things moving" or "heavier objects have more inertia because.',
          parts: [
                { id: 'a', prompt: 'A hockey puck slides on ice at constant speed. A student says, "A force must be acting on the puck to keep it moving." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'inertia is a force that keeps things moving', 'heavier objects have more inertia'],
                  hint: 'If stuck, revisit "Balanced and Unbalanced Forces" (c8_physics_ch3_5) and "Uniform and Non-Uniform.',
                  misconception: 'Students often think "inertia is a force that keeps things moving" or "heavier objects have more inertia because gravity pulls them down.' },
                { id: 'b', prompt: 'Two identical boxes rest on a frictionless floor. Box A is empty (mass 2 kg). Box B is filled with books (mass 20 kg).', answer: 'Box A (empty) will have a greater change in velocity',
                  options: ['Box A (empty) will have a greater change in velocity', 'both change equally', 'Box B changes more', 'inertia is a force that keeps things moving'],
                  hint: 'If stuck, revisit "Balanced and Unbalanced Forces" (c8_physics_ch3_5) and "Uniform and Non-Uniform.',
                  misconception: 'Students often think "inertia is a force that keeps things moving" or "heavier objects have more inertia because gravity pulls them down.' },
                { id: 'c', prompt: 'Analyze this situation: A car travels at 60 km/h on a straight highway. The driver takes his foot off the accelerator. The car gradually slows down.', answer: 'No, it does not violate the law',
                  options: ['No, it does not violate the law', 'it violates the law', 'inertia is a force that keeps things moving', 'heavier objects have more inertia'],
                  hint: 'If stuck, revisit "Balanced and Unbalanced Forces" (c8_physics_ch3_5) and "Uniform and Non-Uniform.',
                  misconception: 'Students often think "inertia is a force that keeps things moving" or "heavier objects have more inertia because gravity pulls them down.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Use a balance to measure mass of two objects (e.g., 1 kg and 5 kg) on Earth.', 'Ask: "If we took these to the Moon, would their masses change? Would their weights change?"', 'Show a video of astronauts moving large equipment easily on the Moon (low weight) but struggling to start/stop it (high.', 'Conclude: Inertia depends on mass, not weight. Mass is constant; weight varies with gravity.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_2', difficulty: 'standard',
          question: 'A force acting on an object can change its speed: a force applied in the.',
          hint: 'Revisit "Uniform and Non-uniform Linear Motion" (c7_physics_ch04_008) to solidify the.',
          misconception: 'Students believe that **a force is needed to *keep* an object moving at constant speed**.',
          parts: [
                { id: 'a', prompt: 'A ball is rolling on a smooth horizontal floor. You give it a sharp push in the exact direction it is already moving. What happens to its speed?', answer: 'The speed of the ball increases',
                  options: ['The speed of the ball increases', 'speed stays the same', 'speed decreases', '**a force is needed to *keep* an object moving at constant speed**'],
                  hint: 'Revisit "Uniform and Non-uniform Linear Motion" (c7_physics_ch04_008) to solidify the idea that.',
                  misconception: 'Students believe that **a force is needed to *keep* an object moving at constant speed**.' },
                { id: 'b', prompt: 'A cricket ball is moving horizontally through the air. Gravity pulls it vertically downwards.', answer: 'No, gravity does not change the horizontal speed',
                  options: ['No, gravity does not change the horizontal speed', 'yes, gravity slows it down', '**a force is needed to *keep* an object moving at constant speed**'],
                  hint: 'Revisit "Uniform and Non-uniform Linear Motion" (c7_physics_ch04_008) to solidify the idea that.',
                  misconception: 'Students believe that **a force is needed to *keep* an object moving at constant speed**.' },
                { id: 'c', prompt: 'A toy car moves at 2 m/s on a smooth table. A constant force is applied in the direction of motion for 3 seconds.', answer: '**Step 1:** Initial speed = 2 m/s (given)',
                  options: ['**Step 1:** Initial speed = 2 m/s (given)', '**a force is needed to *keep* an object moving at constant speed**'],
                  hint: 'Revisit "Uniform and Non-uniform Linear Motion" (c7_physics_ch04_008) to solidify the idea that.',
                  misconception: 'Students believe that **a force is needed to *keep* an object moving at constant speed**.' },
                { id: 'd', prompt: 'Two identical blocks, A and B, are pushed across a rough floor with the *same* force for the same time.', answer: 'Block A has a greater change in speed',
                  options: ['Block A has a greater change in speed', 'both change speed equally', 'only the applied force matters', '**a force is needed to *keep* an object moving at constant speed**'],
                  hint: 'Revisit "Uniform and Non-uniform Linear Motion" (c7_physics_ch04_008) to solidify the idea that.',
                  misconception: 'Students believe that **a force is needed to *keep* an object moving at constant speed**.' }
          ],
            remediations: { 'a-force-is-needed-to': { steps: ['**Demo:** Use an air track or a smooth glass sheet with a toy car.', 'Give it a push and let it go.', 'Ask: "What force keeps it moving?" (Answer: None – it moves because of inertia).', '**Contrast:** Repeat on a rough carpet.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_3', difficulty: 'standard',
          question: 'A force can change the direction of motion of an object by altering its.',
          hint: 'Revisit c8_physics_ch3_1 (Force definition) and c7_physics_ch04_008 (Uniform.',
          misconception: 'Students believe that a force is required to *keep* an object moving in a circle and that this force acts **outward**.',
          parts: [
                { id: 'a', prompt: 'A ball is moving horizontally to the right. A vertical upward force acts on it briefly. What happens to the ball\'s direction of motion?', answer: 'The ball\'s direction changes to an upward-right diagonal',
                  options: ['The ball\'s direction changes to an upward-right diagonal', 'direction doesn\'t change', 'ball moves straight up'],
                  hint: 'Revisit c8_physics_ch3_1 (Force definition) and c7_physics_ch04_008 (Uniform vs non-uniform motion).',
                  misconception: 'Students believe that a force is required to *keep* an object moving in a circle and that this force acts **outward** (centrifugal force).' }
          ],
            remediations: { 'a-force-is-required-to': { steps: ['**Inertia demo**: Place a coin on a card over a glass.', 'Flick the card horizontally.', 'Coin drops straight down (inertia — no horizontal force).', '**String pull**: Whirl a rubber stopper on a string.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
