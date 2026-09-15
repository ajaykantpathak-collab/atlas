import type { SimDef } from '../../engine/types';

/** v3 generated — c11_phy_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_phy_ch04_p1: SimDef = {
    id: 'v3_c11_phy_ch04_p1',
    title: 'Laws of Motion · Part 1/3',
    subtitle: 'Unmask the hidden force that made Aristotle\'s fallacy feel true.',
    classLevel: 11, subject: 'physics', topic: 'Laws of Motion · Part 1/3',
    chapters: ['c11_phy_ch04'],
    nodeIds: ['c11_phy_cbse_04_001', 'c11_phy_cbse_04_002', 'c11_phy_cbse_04_003', 'c11_phy_cbse_04_004', 'c11_phy_cbse_04_005', 'c11_phy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Galileo rerunning the incline in thought', intro: 'A marble on carpet stops, on smooth floor rolls far, on frictionless ice — never. Removing the confounder was the whole insight.', goal: 'State the first law as net-force-zero and distinguish inertia from a force.' },
    discovery: {
        question: '\'Stop pedalling and my bicycle stops — so Galileo was wrong and motion does need force.\' Evaluate.',
        options: ['Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it', 'Completely right — Aristotle stands', 'Completely wrong — bicycles don\'t stop', 'Right — because road contact is a force'],
        answer: 'Observation right, conclusion wrong — friction is the net force; the pedal force was only ever cancelling it',
        hook: 'Inertia isn\'t a force keeping things moving — it\'s the property that makes a force necessary to change velocity at all.',
    },
    teaching: [
        { title: 'Aristotle\'s Fallacy and Galileo\'s Experiment', text: 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force is required to maintain a body in uniform motion; Galileo\'s experiments with inclined planes demonstrated that in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_phy_cbse_04_001', title: 'Your mission',
          mission: { widget: 'projectile', validate: 'projectile:angle=45',
            instruction: 'On the lab: launch at 45° — is that the maximum range?.',
        context: 'Run Galileo\'s double incline to its flat conclusion — same height, then infinite distance — then find the friction on a box pushed steadily at 2 m/s.',
            observePrompt: 'What did the projectile interactive show you?' } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_001', title: 'Aristotle\'s Fallacy and Galileo\'s Experiment',
          caseStudy: { intro: 'Observe a marble rolling on a smooth floor versus a rough carpet—on the smooth floor it travels farther before stopping.',
            decisions: [{ prompt: 'State Aristotle\'s law of motion in your own words and give one everyday example that seems to support it.', options: [
                { text: 'Aristotle\'s law: "An external force is required to keep a body in motion." Example: A', outcome: 'Aristotle\'s law: "An external force is required to keep a body in motion." Example: A child must.' },
                { text: 'force is needed to start motion only', outcome: 'Not quite — Students believe "inertia is a force that keeps things moving" or "inertia is the tendency.', reveals: 'inertia-is-a-force-that' },
                { text: 'inertia is a force that keeps things moving', outcome: 'Not quite — Students believe "inertia is a force that keeps things moving" or "inertia is the tendency.', reveals: 'inertia-is-a-force-that' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_002', title: 'Newton\'s First Law: Law of Inertia',
          scaffold: { problem: 'A 15 kg suitcase rests on the horizontal floor of a train compartment. The train accelerates horizontally at 2 m/s².',
            steps: [
            { text: 'Identify the system (suitcase) and given quantities: m = 15 kg, a_train = 2 m/s² forward, no slipping ⇒ a_suitcase = 2.' },
            { text: 'Since the suitcase accelerates with the train, it is NOT in equilibrium in the horizontal direction.' },
            { text: 'Vertical equilibrium: N - mg = 0 ⇒ N = mg = 15 × 10 = 150 N. Maximum static friction f_s,max = μ_s N, but μ_s not given.' },
            { text: 'Horizontal: Only horizontal force is static friction f_s (forward). So f_s = m a = 15 kg × 2 m/s² = 30 N forward.' },
            { text: 'Check reasonableness: f_s = 30 N. If μ_s ≥ 0.2, no slipping occurs (f_s ≤ μ_s N ⇒ 30 ≤ μ_s × 150 ⇒ μ_s ≥ 0.2).', faded: true, blankAnswer: '30 N, horizontally forward (in direction of train\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_003', title: 'Newton\'s Second Law: F = ma',
          scaffold: { problem: 'A 40 kg girl stands on a weighing scale in a lift. The lift ascends with a uniform acceleration of 2 m·s⁻².',
            steps: [
            { text: 'Identify the system (the girl). Forces on her: weight W = mg downward, normal reaction N by scale upward.' },
            { text: 'Choose upward as positive. Net force: F_net = N - mg. Acceleration a = +2 m·s⁻² (upward).' },
            { text: 'Apply Newton\'s Second Law: F_net = ma → N - mg = ma → N = m(g + a).' },
            { text: 'Substitute: m = 40 kg, g = 10 m·s⁻², a = 2 m·s⁻². N = 40 × (10 + 2) = 40 × 12 = 480 N.' },
            { text: 'For free fall: a = g downward = -10 m·s⁻² (taking up as +ve). N - mg = m(-g) → N = 0. Scale reads 0 N (weightlessness).', faded: true, blankAnswer: 'Ascending with a = 2 m·s⁻²: Scale reads 480 N (or 48 kg).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_004', title: 'Newton\'s Third Law: Action and Reaction',
          scaffold: { problem: 'A 10 kg block rests on a smooth horizontal table. A 3 kg block is placed on top of it.',
            steps: [
            { text: 'Define systems. System 1 = both blocks together (13 kg). System 2 = 3 kg block alone. System 3 = 10 kg block alone.' },
            { text: 'For System 1: F_net = 50 N (only external horizontal force). m_total = 13 kg. a = F_net / m_total = 50/13 ≈ 3.846 m/s².' },
            { text: 'For System 2 (3 kg block): Only horizontal force = contact force F_c (from 10 kg block).' },
            { text: 'For System 3 (10 kg block): Forces = 50 N forward, F_c\' backward (from 3 kg block).' },
            { text: 'Verify Third Law: F_c (on 3 kg by 10 kg) = +11.54 N (forward), F_c\' (on 10 kg by 3 kg) = –11.54 N (backward).', faded: true, blankAnswer: '(a) a = 50/13 ≈ 3.85 m/s², (b) Contact force = 150/13 ≈.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_005', title: 'Momentum and Impulse',
          scaffold: { problem: 'A 0.15 kg cricket ball travelling at 40 m/s is hit straight back by a bat at 50 m/s. The contact time is 0.002 s.',
            steps: [
            { text: 'Identify given: m = 0.15 kg, u = +40 m/s (toward batsman), v = -50 m/s (back to bowler), Δt = 0.002 s.' },
            { text: 'Use Δp = m(v - u) for vector change. F_avg = Δp/Δt. I = Δp (impulse-momentum theorem).' },
            { text: 'Δp = 0.15 × (-50 - 40) = 0.15 × (-90) = -13.5 kg·m/s. Magnitude = 13.5 kg·m/s.' },
            { text: 'F_avg = -13.5 / 0.002 = -6750 N. Magnitude = 6750 N, direction from batsman to bowler.' },
            { text: 'I = Δp = -13.5 N·s (or 13.5 N·s magnitude). Check: units N·s = kg·m/s ✓.', faded: true, blankAnswer: '(a) Δp = -13.5 kg·m/s (13.5 kg·m/s toward bowler), (b).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_phy_cbse_04_006', title: 'Conservation of Momentum',
          scaffold: { problem: 'A 60 kg astronaut floating at rest in space throws a 2 kg tool kit at 10 m/s away from the spaceship.',
            steps: [
            { text: 'Identify system = astronaut + tool kit. No external forces in space → isolated system.' },
            { text: 'Define direction: tool kit thrown in +x direction. Let astronaut recoil velocity be \\(v_a\\) (expected negative).' },
            { text: 'Apply conservation: \\(m_a u_a + m_t u_t = m_a v_a + m_t v_t\\). \\(0 = (60)v_a + (2)(10)\\).' },
            { text: 'Solve: \\(60 v_a = -20\\) → \\(v_a = -20/60 = -1/3 = -0.333\\ \\text{m/s}\\). Units: kg·m/s = kg·(m/s) ✓.' },
            { text: 'Interpret: Astronaut recoils at 0.333 m/s opposite to tool kit (negative sign).', faded: true, blankAnswer: '\\(v_a = -0.333\\ \\text{m/s}\\) (opposite to tool kit.' }
            ] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mechanics debate, a student defends Aristotle: \'A car cruising at 60 km/h clearly needs the engine\'s forward force to keep moving — without it, motion dies. Inertia is just the force that resists stopping.\'',
            decisions: [{ prompt: 'What did Galileo and Newton actually establish?', options: [
                { text: 'Expose the hidden balancing: the engine force doesn\'t sustain motion — it cancels friction and drag, leaving F_net = 0, which is why velocity is constant. Galileo\'s incline argument showed that removing friction lets motion continue forever. And inertia isn\'t a force at all — it\'s mass\'s resistance to CHANGE in velocity, the reason a net force is needed to accelerate, not to keep going.', outcome: 'The debate resolves: uniform motion and rest are the same state (zero acceleration); the car proves Aristotle wrong precisely because its forces balance.' },
                { text: 'Side with Aristotle — remove the engine and the car stops, so force sustains motion.', outcome: 'What stops the car is friction, not absence of a \'mover\': on frictionless ice the puck glides on — Galileo\'s whole point.', reveals: 'force-needed-to-sustain-motion' },
                { text: 'Accept \'inertia is a force\' — something must push back when motion changes.', outcome: 'Inertia is a property, not an agent: \'force of inertia\' is a category error — mass resists acceleration; no pushing force exists.', reveals: 'inertia-is-a-force' }
            ] }] } },
        { type: 'case', nodeId: 'c11_phy_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'A car cruising at constant 60 has engine thrust exactly balancing drag — net force zero, motion sustained; force changes motion, it doesn\'t keep it.',
            decisions: [{ prompt: 'What comes next? Laws of Motion · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Laws of Motion · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'projectile', prompt: 'Explore the projectile interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'projectile', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_001', difficulty: 'standard',
          question: 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force.',
          hint: 'Revisit Class 9 "Force and Laws of Motion" (Newton\'s First Law) and "Friction" topics.',
          misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion.".',
          parts: [
                { id: 'a', prompt: 'A ball is released from rest at height h on a smooth (frictionless) inclined plane. It rolls down and up a second smooth inclined plane of the same angle.', answer: 'On the second inclined plane, the ball reaches exactly height h (conservation of',
                  options: ['On the second inclined plane, the ball reaches exactly height h (conservation of', 'it stops after a finite distance', 'inertia is a force that keeps things moving', 'inertia is the tendency to resist motion'],
                  hint: 'Revisit Class 9 "Force and Laws of Motion" (Newton\'s First Law) and "Friction" topics; focus.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Place a coin on a card covering a glass. Flick the card horizontally. The coin drops into the glass.', 'Roll a ball on a smooth floor and a rough carpet from the same speed. Measure stopping distances.', 'Plot stopping distance vs. surface roughness.', 'Extrapolate the graph to zero roughness—distance → infinity. This sequence replaces the wrong mental model ("inertia.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion.".',
          parts: [
                { id: 'a', prompt: 'A student argues: "Galileo was wrong. If I stop pushing my bicycle on a level road, it stops. So force IS needed to keep it moving." Evaluate this claim.', answer: 'The observation is correct (bicycle stops), but the conclusion is wrong',
                  options: ['The observation is correct (bicycle stops), but the conclusion is wrong', 'applied force', 'net force', 'student is right'],
                  hint: 'Revisit Class 9 "Force and Laws of Motion" (Newton\'s First Law) and "Friction" topics; focus.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is.' },
                { id: 'b', prompt: 'Design a simple classroom demonstration using low-cost materials (e.g., a wooden plank, a marble, a towel, a book) that illustrates Galileo\'s insight: reducing.', answer: 'Setup: Place a wooden plank at a slight incline',
                  options: ['Setup: Place a wooden plank at a slight incline', 'inertia is a force that keeps things moving', 'inertia is the tendency to resist motion'],
                  hint: 'Revisit Class 9 "Force and Laws of Motion" (Newton\'s First Law) and "Friction" topics; focus.',
                  misconception: 'Students believe "inertia is a force that keeps things moving" or "inertia is the tendency to resist motion." In reality, inertia is.' }
          ],
            remediations: { 'inertia-is-a-force-that': { steps: ['Place a coin on a card covering a glass. Flick the card horizontally. The coin drops into the glass.', 'Roll a ball on a smooth floor and a rough carpet from the same speed. Measure stopping distances.', 'Plot stopping distance vs. surface roughness.', 'Extrapolate the graph to zero roughness—distance → infinity. This sequence replaces the wrong mental model ("inertia.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_002', difficulty: 'standard',
          question: 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its.',
          hint: 'Revisit c8_physics_ch3_6 (Net Force: Combining Multiple Forces) and c11_math_ch10_001.',
          misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the.',
          parts: [
                { id: 'a', prompt: 'A 2 kg book lies at rest on a horizontal table. The weight of the book is 19.6 N downward.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Revisit c8_physics_ch3_6 (Net Force: Combining Multiple Forces) and c11_math_ch10_001 (Vector.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' },
                { id: 'b', prompt: 'A spaceship of mass 5000 kg is drifting in interstellar space far from any gravitational influence with its engines off.', answer: 'Given: m = 5000 kg, v = 200 m/s (constant), no external forces',
                  options: ['Given: m = 5000 kg, v = 200 m/s (constant), no external forces', 'carries', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Revisit c8_physics_ch3_6 (Net Force: Combining Multiple Forces) and c11_math_ch10_001 (Vector.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' },
                { id: 'c', prompt: 'Analyze the following two situations and compare the net force on the body in each: (i) A 10 kg block rests on a frictionless horizontal surface.', answer: '(i) After the 50 N force is removed, no horizontal forces act (frictionless)',
                  options: ['(i) After the 50 N force is removed, no horizontal forces act (frictionless)', 'net force is zero in both cases', 'the engine force keeps the car moving', 'sustains'],
                  hint: 'Revisit c8_physics_ch3_6 (Net Force: Combining Multiple Forces) and c11_math_ch10_001 (Vector.',
                  misconception: 'Students believe that a body moving with uniform velocity *must* have a net forward force acting on it (e.g., "the engine force keeps the.' }
          ],
            remediations: { 'a-body-moving-with-uniform': { steps: ['Place a dynamics trolley on a friction-compensated runway (slight incline so trolley moves at constant velocity after.', 'Ask: "What forces act horizontally?" (Answer: None — friction is compensated by gravity component).', 'Ask: "Is there a forward force?" (No).', 'Show a force sensor reading zero while trolley moves uniformly.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_003', difficulty: 'standard',
          question: 'Newton\'s Second Law states that the rate of change of linear momentum of a body.',
          hint: 'If stuck on free-body diagrams, revisit c11_phy_cbse_04_014 (Solving Problems Using Free.',
          misconception: '**Misconception:** "ma is a force." Students write "F - ma = 0" or include "ma" as a separate force in free-body.',
          parts: [
                { id: 'a', prompt: 'A 2 kg block rests on a smooth horizontal table. A horizontal force of 10 N acts on it for 3 seconds. The force is then removed.', answer: '**Answer:** During 0–3 s: F = 10 N, m = 2 kg → a = F/m = 5 m·s⁻² (constant)',
                  options: ['**Answer:** During 0–3 s: F = 10 N, m = 2 kg → a = F/m = 5 m·s⁻² (constant)', 'the block stops after the force is removed'],
                  hint: 'If stuck on free-body diagrams, revisit c11_phy_cbse_04_014 (Solving Problems Using Free Body.',
                  misconception: '**Misconception:** "ma is a force." Students write "F - ma = 0" or include "ma" as a separate force in free-body diagrams (e.g., "forward.' }
          ],
            remediations: { 'misconception-ma-is-a-force': { steps: ['**Confront the error:** Place a dynamics cart on a track with a force sensor.', 'Pull with constant force F.', 'Ask: "Where is the \'ma force\' sensor?" There isn\'t one.', '**Free-body diagram drill:** For 5 scenarios (block pulled horizontally, block on incline, Atwood machine, car braking.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_004', difficulty: 'standard',
          question: 'Newton\'s Third Law states that for every force exerted by body A on body.',
          hint: 'If stuck, revisit c11_phy_cbse_04_003 (Newton\'s Second Law) and practice drawing FBDs for.',
          misconception: '**Misconception:** "Action and reaction forces cancel each other, so nothing can ever accelerate." **Exact wrong.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Newton\'s Third Law states that for every force exerted by body A on body B, there exists',
                  options: ['Newton\'s Third Law states that for every force exerted by body A on body B, there exists', 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force is', 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its state of', 'Newton\'s Second Law states that the rate of change of linear momentum of a body is'],
                  hint: 'If stuck, revisit c11_phy_cbse_04_003 (Newton\'s Second Law) and practice drawing FBDs for blocks.',
                  misconception: '**Misconception:** "Action and reaction forces cancel each other, so nothing can ever accelerate." **Exact wrong reasoning:** Students see.' }
          ],
            remediations: { 'misconception-action-and-reaction-forces': { steps: ['**Draw the system boundary explicitly:** Circle the body you are analyzing.', 'List ONLY forces **on** that body.', 'Cross out any force **by** that body.', '**Name every force as "Force on X by Y":** Write "Force on book by Earth" (weight) and "Force on book by Table".'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_005', difficulty: 'standard',
          question: 'Momentum (p) of a body is the product of its mass (m) and velocity (v).',
          hint: 'Revisit c11_phy_cbse_04_003 for F=ma derivation and c9_physics_ch3_6 for momentum basics.',
          misconception: 'Students think impulse is a force, saying "the impulse of the bat on the ball" as if impulse is the force itself.',
          parts: [
                { id: 'a', prompt: 'State the SI units of momentum and impulse. Are they dimensionally equivalent? Show the dimensional analysis.', answer: 'Momentum: kg·m/s',
                  options: ['Momentum: kg·m/s', 'the impulse of the bat on the ball'],
                  hint: 'Revisit c11_phy_cbse_04_003 for F=ma derivation and c9_physics_ch3_6 for momentum basics; practice.',
                  misconception: 'Students think impulse is a force, saying "the impulse of the bat on the ball" as if impulse is the force itself.' },
                { id: 'b', prompt: 'A 0.5 kg ball moving at 10 m/s hits a wall and rebounds at 8 m/s in the opposite direction. Calculate the change in momentum.', answer: 'Initial momentum = +5 kg·m/s (toward wall)',
                  options: ['Initial momentum = +5 kg·m/s (toward wall)', 'the impulse of the bat on the ball'],
                  hint: 'Revisit c11_phy_cbse_04_003 for F=ma derivation and c9_physics_ch3_6 for momentum basics; practice.',
                  misconception: 'Students think impulse is a force, saying "the impulse of the bat on the ball" as if impulse is the force itself.' },
                { id: 'c', prompt: 'A constant force of 20 N acts on a 2 kg block initially at rest for 3 seconds.', answer: 'impulse delivered, (',
                  options: ['impulse delivered, (', 'the impulse of the bat on the ball'],
                  hint: 'Revisit c11_phy_cbse_04_003 for F=ma derivation and c9_physics_ch3_6 for momentum basics; practice.',
                  misconception: 'Students think impulse is a force, saying "the impulse of the bat on the ball" as if impulse is the force itself.' },
                { id: 'd', prompt: 'The force-time graph for a collision is a triangle with base 0.02 s and peak force 500 N. Calculate the impulse.', answer: 'Impulse = area = ½ × 0.02 × 500 = 5 N·s',
                  options: ['Impulse = area = ½ × 0.02 × 500 = 5 N·s', 'the impulse of the bat on the ball'],
                  hint: 'Revisit c11_phy_cbse_04_003 for F=ma derivation and c9_physics_ch3_6 for momentum basics; practice.',
                  misconception: 'Students think impulse is a force, saying "the impulse of the bat on the ball" as if impulse is the force itself.' }
          ],
            remediations: { 'impulse-is-a-force': { steps: ['Hold a raw egg in a vertical tube and drop it on a foam pad vs. hard floor.', 'Plot F-t graphs for both using sensor data.', 'Show area (impulse) is same, peak F differs.', 'Practice unit conversion: 1 N·s = 1 kg·m/s by writing N = kg·m/s², multiplying by s.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } },
        { type: 'subpart', nodeId: 'c11_phy_cbse_04_006', difficulty: 'standard',
          question: 'The law of conservation of momentum states that for an isolated system (no net.',
          hint: 'If stuck, revisit c11_phy_cbse_04_004 (Newton\'s third law) to see how \\(\\vec{F}_{12}.',
          misconception: 'Students believe momentum is conserved in every collision, ignoring external forces like friction or gravity components.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The law of conservation of momentum states that for an isolated system (no net external',
                  options: ['The law of conservation of momentum states that for an isolated system (no net external', 'Aristotle\'s fallacy is the incorrect assertion that a continuous external force is', 'Newton\'s First Law of Motion (Law of Inertia) states that a body remains in its state of', 'Newton\'s Second Law states that the rate of change of linear momentum of a body is'],
                  hint: 'If stuck, revisit c11_phy_cbse_04_004 (Newton\'s third law) to see how \\(\\vec{F}_{12}.',
                  misconception: 'Students believe momentum is conserved in every collision, ignoring external forces like friction or gravity components along the motion.' }
          ],
            remediations: { 'momentum-is-conserved-in-every': { steps: ['Revisit Newton\'s third law (c11_phy_cbse_04_004): action-reaction pairs are internal to the system.', 'Practice identifying system boundaries: draw a dashed circle around interacting objects; any force crossing the circle.', 'Do vector addition drills: resolve momenta into x/y components before summing.', 'Use PhET "Collision Lab" simulation: toggle external friction on/off to see momentum conservation fail/succeed.'], labTask: { instruction: 'On the interactive: launch at 45° — is that the maximum range? — then check.', widget: 'projectile', validate: 'projectile:angle=45' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
