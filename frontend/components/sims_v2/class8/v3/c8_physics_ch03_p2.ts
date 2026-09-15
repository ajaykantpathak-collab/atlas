import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch03_p2: SimDef = {
    id: 'v3_c8_physics_ch03_p2',
    title: 'Exploring Forces · Part 2/2',
    subtitle: 'Pushes, pulls and the fights that end in stalemate',
    classLevel: 8, subject: 'physics', topic: 'Exploring Forces · Part 2/2',
    chapters: ['c8_physics_ch03'],
    nodeIds: ['c8_physics_ch3_4', 'c8_physics_ch3_5', 'c8_physics_ch3_6', 'c8_physics_ch3_7', 'c8_physics_ch3_8', 'c8_physics_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a force detective', intro: 'Something started the ceiling fan spinning — but what, exactly? Hunt for pushes and pulls in everyday scenes and learn to spot forces that leave no visible trace.', goal: 'Understand force as a directed push or pull measured in newtons, producing changes in speed, direction or shape — and recognise that opposing forces can cancel out.' },
    discovery: {
        question: 'Press a rubber ball and it squashes flat without moving an inch. Your friend says \'no force acted — it didn\'t move.\' Is he right?',
        options: ['No — force doesn\'t only move things; it can change shape too, and squashing counts', 'Yes — force only exists when something moves', 'Only if the ball stays squashed forever', 'Yes — squeezing is just touching firmly'],
        answer: 'No — force doesn\'t only move things; it can change shape too, and squashing counts',
        hook: 'Force isn\'t a thing objects \'have\' — it\'s an interaction between them. Even a book sitting still is in a tug-of-war: gravity pulls down, the table pushes up, and the net is zero. Two equal opposite pushes? Nobody wins, nothing moves.',
    },
    teaching: [
        { title: 'Effects of Force: Change in Shape and Size', text: 'A force can change the shape and size of an object by compressing, stretching, bending, or twisting it; this deformation is measured as a change in dimensions (length, volume, or shape) and occurs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch3_4', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Detect the invisible pushes and pulls all around you: kick a ball (change speed), squeeze a sponge (change shape), tug a chair (change direction) — then explain why two kids pushing a box from opposite sides get nowhere.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch3_4', title: 'Effects of Force: Change in Shape and Size',
          caseStudy: { intro: 'Start by asking students to press a soft rubber ball (like a tennis ball) between their palms and observe the flattening – a real-world observation.',
            decisions: [{ prompt: 'State the two main categories of deformation based on whether the object regains its original shape after the force is removed.', options: [
                { text: 'Elastic deformation (temporary, shape regained) and plastic deformation (permanent, shape', outcome: 'Elastic deformation (temporary, shape regained) and plastic deformation (permanent, shape not.' },
                { text: 'compression and tension', outcome: 'Not quite — Students often think that *only* soft materials like rubber or clay deform, and that "hard".', reveals: 'only-soft-materials-like-rubber' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_5', title: 'Balanced and Unbalanced Forces',
          caseStudy: { intro: 'Observe a book lying at rest on a classroom desk: it experiences gravity pulling down and the desk pushing up (normal force), yet it doesn\'t move.',
            decisions: [{ prompt: 'Define balanced forces and state the effect on an object\'s motion. Give an everyday example.', options: [
                { text: 'Balanced forces are equal in magnitude and opposite in direction, resulting in zero net', outcome: 'Balanced forces are equal in magnitude and opposite in direction, resulting in zero net force.' },
                { text: 'balanced forces make an object stop', outcome: 'Not quite — Students believe "balanced forces mean the object is at rest." They forget that an object moving.', reveals: 'balanced-forces-mean-the-object' },
                { text: 'no forces', outcome: 'Not quite — Students believe "balanced forces mean the object is at rest." They forget that an object moving.', reveals: 'balanced-forces-mean-the-object' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch3_6', title: 'Net Force: Combining Multiple Forces on an Object',
          scaffold: { problem: 'Two friends, Ravi and Priya, push a stalled car in the same direction. Ravi pushes with a force of 250 N, and Priya pushes with 300 N.',
            steps: [
            { text: 'Identify all forces with units and directions. Ravi: 250 N forward (+). Priya: 300 N forward (+).' },
            { text: 'Choose a positive direction (forward). Write the net force formula for collinear forces: F_net = ΣF = F_Ravi + F_Priya.' },
            { text: 'Substitute values with signs: F_net = (+250 N) + (+300 N) + (-100 N).' },
            { text: 'Compute: 250 + 300 - 100 = 450 N. Unit remains newton (N).' },
            { text: 'Verify: The net force is positive, meaning forward direction. 450 N is reasonable for a car being pushed by two people.', faded: true, blankAnswer: '450 N forward (in the direction of push)' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch3_7', title: 'Types of Forces: Contact Forces (Friction, Muscular, Spring)',
          caseStudy: { intro: 'Observe a bicycle coming to a stop when you squeeze the brake lever: your fingers apply muscular force on the lever, the brake pads press against the wheel rim.',
            decisions: [{ prompt: 'Name the three types of contact forces discussed in this topic and give one everyday example of each.', options: [
                { text: 'The three contact forces are muscular force (e.g., pushing a school bag), friction (e.g.,', outcome: 'The three contact forces are muscular force (e.g., pushing a school bag), friction (e.g., a book.' },
                { text: 'push from within', outcome: 'Not quite — Students often believe that muscular force is a non-contact force because the muscles are inside.', reveals: 'muscular-force-is-a-non' },
                { text: 'the force acts at a distance', outcome: 'Not quite — Students often believe that muscular force is a non-contact force because the muscles are inside.', reveals: 'muscular-force-is-a-non' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_8', title: 'Types of Forces: Non-Contact Forces (Gravity, Magnetic, Electrostatic)',
          caseStudy: { intro: 'Observe a compass needle deflecting when placed near a current-carrying wire in your school lab — the needle moves without being touched, showing a force.',
            decisions: [{ prompt: 'Name the three types of non-contact forces and give one everyday example where each force acts without physical contact.', options: [
                { text: 'The three non-contact forces are: (1) Gravitational force', outcome: 'The three non-contact forces are: (1) Gravitational force — Earth pulling a falling mango.' },
                { text: 'action through a material', outcome: 'Not quite — Students often believe that non-contact forces require a medium (like air) to act, thinking that.', reveals: 'non-contact-forces-require-a' },
                { text: 'push through', outcome: 'Not quite — Students often believe that non-contact forces require a medium (like air) to act, thinking that.', reveals: 'non-contact-forces-require-a' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_9', title: 'Friction: Definition and Factors Affecting Friction',
          caseStudy: { intro: 'Observe a bicycle slowing down when you stop pedalling on a level road — the tyres and road surface interact to create a force that opposes motion.',
            decisions: [{ prompt: 'What is the SI unit of friction and in which direction does it act relative to the motion of an object?', options: [
                { text: 'The SI unit of friction is the newton (N)', outcome: 'The SI unit of friction is the newton (N). Friction acts parallel to the contact surface and.' },
                { text: 'same direction as motion', outcome: 'Not quite — Students often believe that friction always opposes motion and therefore cannot act in the.', reveals: 'friction-always-opposes-motion-and' },
                { text: 'friction opposes motion, so it must act backward on the block', outcome: 'Not quite — Students often believe that friction always opposes motion and therefore cannot act in the.', reveals: 'friction-always-opposes-motion-and' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_4', title: 'Use it in the wild',
          caseStudy: { intro: 'At lunch, Pia squeezes her rubber stress ball flat and it stays in her fist, unmoving. Her friend says, \'No force was involved — nothing moved.\' Pia squeezes again and watches it deform.',
            decisions: [{ prompt: 'Did a force act on the ball?', options: [
                { text: 'Yes — force is a push or pull, and its effects include changing shape, not just motion; her squeeze is a compressive force that deformed the ball even though it stayed in place. Its SI unit is the newton.', outcome: 'This keeps the definition complete: speed change, direction change, and shape change are all effects of force.' },
                { text: 'The friend is right — force only exists when an object moves, so a still, squashed ball proves no force acted.', outcome: 'That limits force to motion; deformation without displacement is still the work of a force — the ball\'s changed shape is the evidence.', reveals: 'no-motion-no-force' },
                { text: 'The ball \'has force stored in it\' from the squeeze, which is what deformed it.', outcome: 'Force is not a possession an object stores; it is an interaction — Pia\'s hand pushing on the ball.', reveals: 'objects-store-force' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch3_9', title: 'You made it',
          caseStudy: { intro: 'Force is a push or pull with direction, measured in newtons. It can speed things up, turn them, or squish them — and when forces cancel, the world stays perfectly still.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch3_4', difficulty: 'standard',
          question: 'A force can change the shape and size of an object by compressing, stretching.',
          hint: 'Revisit c8_physics_ch3_1 (Force: Definition as Push or Pull) and practice drawing force.',
          misconception: 'Students often think that *only* soft materials like rubber or clay deform, and that "hard" materials like metal.',
          parts: [
                { id: 'a', prompt: 'Compare the deformation when a book is placed on (a) a foam mattress and (b) a wooden board of same dimensions. Both deform slightly.', answer: 'Foam has a much lower stiffness (higher compressibility) than wood',
                  options: ['Foam has a much lower stiffness (higher compressibility) than wood', 'foam is lighter'],
                  hint: 'Revisit c8_physics_ch3_1 (Force: Definition as Push or Pull) and practice drawing force diagrams.',
                  misconception: 'Students often think that *only* soft materials like rubber or clay deform, and that "hard" materials like metal, glass, or stone do not.' }
          ],
            remediations: { 'only-soft-materials-like-rubber': { steps: ['Show a video or demo of a laser interferometer measuring nanometre-scale compression of a steel block under a known.', 'Have students calculate the theoretical compression of a 1 m steel rod under 1000 N using Young\'s modulus (Y ≈ 2×10¹¹.', 'Discuss that "invisible" does not mean "zero", linking back to the idea that all matter is made of particles that can.', 'Ask them to revise their mental model: deformation is a spectrum, not a binary property.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_5', difficulty: 'standard',
          question: 'Balanced forces are forces acting on an object that are equal in magnitude and.',
          hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and.',
          misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity.',
          parts: [
                { id: 'a', prompt: 'A car moves at a constant speed of 60 km/h on a straight, level highway. The engine provides a forward force. Are the forces on the car balanced or unbalanced?', answer: 'The forces are balanced',
                  options: ['The forces are balanced', 'unbalanced because the engine is pushing', 'balanced forces mean the object is at rest', '"balanced forces mean the object is at rest'],
                  hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and c8_physics_ch3_2 (Effects.',
                  misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity (e.g., a bicycle.' },
                { id: 'b', prompt: 'A 15 kg box is pushed horizontally with a force of 60 N. The kinetic friction opposing the motion is 20 N.', answer: 'Are the horizontal forces balanced or unbalanced?',
                  options: ['Are the horizontal forces balanced or unbalanced?', 'moves at constant speed', 'balanced forces mean the object is at rest', '"balanced forces mean the object is at rest'],
                  hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and c8_physics_ch3_2 (Effects.',
                  misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity (e.g., a bicycle.' },
                { id: 'c', prompt: 'Two students push a heavy cupboard from opposite sides. Student A pushes left with 120 N, Student B pushes right with 80 N. The cupboard does not move.', answer: 'The cupboard doesn\'t move',
                  options: ['The cupboard doesn\'t move', 'balanced forces mean the object is at rest', '"balanced forces mean the object is at rest'],
                  hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and c8_physics_ch3_2 (Effects.',
                  misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity (e.g., a bicycle.' }
          ],
            remediations: { 'balanced-forces-mean-the-object': { steps: ['Show a video of a hockey puck sliding on smooth ice (low friction) vs. rough floor.', 'Draw free-body diagrams for both: on ice, tiny friction → nearly balanced horizontal forces → nearly constant velocity.', 'Have students practice drawing diagrams for: (a) car at constant speed, (b) car accelerating, (c) car braking.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity.',
          parts: [
                { id: 'a', prompt: 'A student claims: "A cricket ball moving through the air after being hit has no forces acting on it because it\'s moving freely." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'no forces', 'balanced forces', 'no contact forces'],
                  hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and c8_physics_ch3_2 (Effects.',
                  misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity (e.g., a bicycle.' },
                { id: 'b', prompt: 'Design a simple experiment using a spring balance, a wooden block (with a hook), a rough tabletop, and a smooth plastic sheet to demonstrate the transition.', answer: 'Steps: 1) Place block on rough table',
                  options: ['Steps: 1) Place block on rough table', 'balanced forces mean the object is at rest', '"balanced forces mean the object is at rest'],
                  hint: 'If stuck, review c8_physics_ch3_1 (Force: Definition as Push or Pull) and c8_physics_ch3_2 (Effects.',
                  misconception: 'Students believe "balanced forces mean the object is at rest." They forget that an object moving at constant velocity (e.g., a bicycle.' }
          ],
            remediations: { 'balanced-forces-mean-the-object': { steps: ['Show a video of a hockey puck sliding on smooth ice (low friction) vs. rough floor.', 'Draw free-body diagrams for both: on ice, tiny friction → nearly balanced horizontal forces → nearly constant velocity.', 'Have students practice drawing diagrams for: (a) car at constant speed, (b) car accelerating, (c) car braking.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_6', difficulty: 'standard',
          question: 'Net force is the vector sum of all individual forces acting on an object.',
          hint: 'Revisit c8_physics_ch3_1 (Force: Definition as Push or Pull) to practice drawing force.',
          misconception: 'Students frequently treat forces as scalars and simply add all magnitudes (e.g., 10 N left + 10 N right = 20 N) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Net force is the vector sum of all individual forces acting on an object, taking into',
                  options: ['Net force is the vector sum of all individual forces acting on an object, taking into', 'Force is a push or pull acting on an object that can change its state of motion (speed or', 'Increasing and reducing friction refers to the deliberate modification of contact', 'Gravitational force is the attractive non-contact force exerted by the Earth on any'],
                  hint: 'Revisit c8_physics_ch3_1 (Force: Definition as Push or Pull) to practice drawing force arrows, and.',
                  misconception: 'Students frequently treat forces as scalars and simply add all magnitudes (e.g., 10 N left + 10 N right = 20 N) instead of recognizing that.' }
          ],
            remediations: { 'students-frequently-treat-forces-as': { steps: ['Draw a large coordinate grid on the floor with chalk.', 'Have two students hold spring balances attached to a central ring, pulling along the x and y axes with known forces.', 'A third student pulls on a third spring balance to keep the ring stationary at the origin.', 'Read the third balance — it will show 5 N, and its direction will be exactly opposite the resultant (southwest).'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_7', difficulty: 'standard',
          question: 'Contact forces are forces that act between two objects only when they are.',
          hint: 'If stuck, revisit "Force: Definition as Push or Pull" (c8_physics_ch3_1) and practice.',
          misconception: 'Students often believe that muscular force is a non-contact force because the muscles are inside the body and "push.',
          parts: [
                { id: 'a', prompt: 'Explain why a book resting on a table experiences a contact force from the table, but the Earth\'s pull on the book is NOT a contact force.', answer: 'The table pushes up on the book only',
                  options: ['The table pushes up on the book only', 'push from within', 'any push/pull requires touch, missing that gravity works at a distance', 'the force acts at a distance'],
                  hint: 'If stuck, revisit "Force: Definition as Push or Pull" (c8_physics_ch3_1) and practice identifying.',
                  misconception: 'Students often believe that muscular force is a non-contact force because the muscles are inside the body and "push from within," so they.' },
                { id: 'b', prompt: 'Compare the contact forces acting on a cricket ball when: (a) a bowler holds it before release, (b) the ball is in mid-air after release, (c) the ball hits the.', answer: 'a bowler holds it before release, (',
                  options: ['a bowler holds it before release, (', 'push from within', 'the force acts at a distance'],
                  hint: 'If stuck, revisit "Force: Definition as Push or Pull" (c8_physics_ch3_1) and practice identifying.',
                  misconception: 'Students often believe that muscular force is a non-contact force because the muscles are inside the body and "push from within," so they.' }
          ],
            remediations: { 'muscular-force-is-a-non': { steps: ['Have the student press their palm firmly against a wall and feel the compression of their skin and the wall\'s.', 'Then ask them to push the wall *without* touching it – they cannot.', 'Next, use a spring balance: hook it to a block, pull until the block moves, and point out the hook touching the block.', 'Finally, rub hands together to feel friction heat, emphasizing both surfaces must touch.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_8', difficulty: 'standard',
          question: 'Non-contact forces are forces that act between two objects without any physical.',
          hint: 'Review c8_physics_ch3_1 (Force definition) and c8_physics_ch3_7 (Contact forces).',
          misconception: 'Students often believe that non-contact forces require a medium (like air) to act, thinking that in a vacuum gravity.',
          parts: [
                { id: 'a', prompt: 'Name the three types of non-contact forces and give one everyday example where each force acts without physical contact.', answer: 'The three non-contact forces are: (1) Gravitational force',
                  options: ['The three non-contact forces are: (1) Gravitational force', 'action through a material', 'push through', 'all forces need something to "push through"'],
                  hint: 'Review c8_physics_ch3_1 (Force definition) and c8_physics_ch3_7 (Contact forces) to reinforce the.',
                  misconception: 'Students often believe that non-contact forces require a medium (like air) to act, thinking that in a vacuum gravity would stop working.' },
                { id: 'b', prompt: 'A student says, "Magnetic force and electrostatic force are the same because both can attract objects without touching." Explain why this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'both attract', 'action through a material', 'push through'],
                  hint: 'Review c8_physics_ch3_1 (Force definition) and c8_physics_ch3_7 (Contact forces) to reinforce the.',
                  misconception: 'Students often believe that non-contact forces require a medium (like air) to act, thinking that in a vacuum gravity would stop working.' },
                { id: 'c', prompt: 'A bar magnet is brought near a heap containing iron nails, aluminium foil pieces, and plastic bits.', answer: 'Only the iron nails will be attracted',
                  options: ['Only the iron nails will be attracted', 'action through a material', 'push through', 'all forces need something to "push through"'],
                  hint: 'Review c8_physics_ch3_1 (Force definition) and c8_physics_ch3_7 (Contact forces) to reinforce the.',
                  misconception: 'Students often believe that non-contact forces require a medium (like air) to act, thinking that in a vacuum gravity would stop working.' },
                { id: 'd', prompt: 'Two identical balloons are rubbed with a wool cloth and then hung by strings so they hang freely side by side.', answer: 'The balloons will move apart (repel)',
                  options: ['The balloons will move apart (repel)', 'action through a material', 'push through', 'all forces need something to "push through"'],
                  hint: 'Review c8_physics_ch3_1 (Force definition) and c8_physics_ch3_7 (Contact forces) to reinforce the.',
                  misconception: 'Students often believe that non-contact forces require a medium (like air) to act, thinking that in a vacuum gravity would stop working.' }
          ],
            remediations: { 'non-contact-forces-require-a': { steps: ['Take a small magnet and a few iron pins into a syringe barrel, seal the nozzle, and pull the plunger to create.', 'Alternatively, show a video of a hammer and feather dropped on the Moon (no air) falling together.', 'Ask: "Did the force stop when air was removed?" This directly confronts the medium misconception with evidence that.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch3_9', difficulty: 'standard',
          question: 'Friction is a contact force that opposes the relative motion or tendency.',
          hint: 'Review c8_physics_ch3_5 (Balanced and Unbalanced Forces) and c8_physics_ch3_6 (Net Force).',
          misconception: 'Students often believe that friction always opposes motion and therefore cannot act in the direction of motion.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of friction and in which direction does it act relative to the motion of an object?', answer: 'The SI unit of friction is the newton (N)',
                  options: ['The SI unit of friction is the newton (N)', 'same direction as motion', 'friction opposes motion, so it must act backward on the block'],
                  hint: 'Review c8_physics_ch3_5 (Balanced and Unbalanced Forces) and c8_physics_ch3_6 (Net Force) with.',
                  misconception: 'Students often believe that friction always opposes motion and therefore cannot act in the direction of motion.' },
                { id: 'b', prompt: 'A 3 kg block is pulled horizontally on a rough floor with a force of 20 N. The friction force opposing the motion is 8 N.', answer: 'Step 1: Identify forces',
                  options: ['Step 1: Identify forces', 'balanced', 'friction opposes motion, so it must act backward on the block'],
                  hint: 'Review c8_physics_ch3_5 (Balanced and Unbalanced Forces) and c8_physics_ch3_6 (Net Force) with.',
                  misconception: 'Students often believe that friction always opposes motion and therefore cannot act in the direction of motion.' }
          ],
            remediations: { 'friction-always-opposes-motion-and': { steps: ['Place the car on the stationary belt — no friction.', 'Start the belt moving forward slowly — the car moves forward with it due to friction acting forward.', 'Ask: "Which force made the car accelerate forward?"', 'Guide them to see friction acted forward, not backward.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
