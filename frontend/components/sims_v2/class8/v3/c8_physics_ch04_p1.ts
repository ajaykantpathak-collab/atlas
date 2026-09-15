import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch04_p1: SimDef = {
    id: 'v3_c8_physics_ch04_p1',
    title: 'Pressure, Winds, Storms, and Cyclones · Part 1/2',
    subtitle: 'Why the pin end wins and the flat end loses',
    classLevel: 8, subject: 'physics', topic: 'Pressure, Winds, Storms, and Cyclones · Part 1/2',
    chapters: ['c8_physics_ch04'],
    nodeIds: ['c8_physics_ch4_1', 'c8_physics_ch4_10', 'c8_physics_ch4_11', 'c8_physics_ch4_12', 'c8_physics_ch4_2', 'c8_physics_ch4_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a pressure investigator', intro: 'Your thumb pushes a drawing pin with one force — yet only the sharp end pierces the board. Find out what \'per unit area\' really means, and why it decides who sinks and who survives.', goal: 'Understand pressure as force per unit area (P = F/A, in pascals) — why small areas amplify a push and large areas soften it — and compute it with correct unit conversions.' },
    discovery: {
        question: 'A camel outweighs a horse, yet its broad feet glide over sand while narrow hooves sink. Same desert, heavier animal — how?',
        options: ['Pressure = force ÷ area: the camel\'s weight spreads over wide feet, so each patch of sand feels less push', 'Camels are just magically adapted', 'Horses run faster so they dig in', 'Sand is softer under camels'],
        answer: 'Pressure = force ÷ area: the camel\'s weight spreads over wide feet, so each patch of sand feels less push',
        hook: 'Force and pressure aren\'t the same word. A drawing pin works because your thumb\'s push gets squeezed into a microscopic tip — and doubling the area doesn\'t double the pressure, it HALVES it.',
    },
    teaching: [
        { title: 'Pressure: Definition as Force Per Unit Area', text: 'Pressure is the thrust (force acting perpendicular to a surface) applied per unit area of that surface. Its SI unit is the pascal (Pa), where 1 Pa = 1 N/m².', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch4_1', title: 'Your mission',
          mission: { widget: 'gas', validate: 'gas:temperature=80',
            instruction: 'On the lab: heat the gas — watch the particles. Now compress the piston — same effect?.',
        context: 'Weaponise and tame pressure: explain why sharp knives slice while blunt ones crush, why two identical bricks press a table 4× differently depending on the face, and compute P = F/A with proper cm²-to-m² conversions.',
            observePrompt: 'What did the gas interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_physics_ch4_1', title: 'Pressure: Definition as Force Per Unit Area',
          scaffold: { problem: 'A woman of mass 60 kg stands on one heel of her high-heeled shoe. The heel is circular with a diameter of 1.0 cm.',
            steps: [
            { text: 'Identify given quantities: mass m = 60 kg, diameter d = 1.0 cm = 0.01 m, so radius r = 0.005 m. g = 10 m/s².' },
            { text: 'Force (weight) F = m × g = 60 kg × 10 m/s² = 600 N. Area A = πr² = 3.14 × (0.005 m)² = 3.14 × 0.000025 m² = 7.85 × 10⁻⁵.' },
            { text: 'Formula P = F/A. Substitute: P = 600 N / (7.85 × 10⁻⁵ m²).' },
            { text: 'Compute: 600 / 7.85e-5 = 7.64 × 10⁶ N/m² = 7.64 × 10⁶ Pa.' },
            { text: 'Verify: A typical high heel pressure is several MPa; 7.6 MPa is reasonable for a thin heel.', faded: true, blankAnswer: '7.6 × 10⁶ Pa' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch4_10', title: 'Cyclones: Formation, Structure, and Movement',
          caseStudy: { intro: 'Imagine watching a news report about a cyclone approaching the Odisha coast: you see satellite images of a giant spinning cloud with a clear center.',
            decisions: [{ prompt: 'What are the three essential conditions required for a tropical cyclone to form over the ocean?', options: [
                { text: 'The three essential conditions are: (1) Sea surface temperature of at least 26.5°C to a', outcome: 'The three essential conditions are: (1) Sea surface temperature of at least 26.5°C to a depth.' },
                { text: 'high pressure', outcome: 'Not quite — Students believe the "eye" of a cyclone is a region of high pressure because it\'s calm and clear.', reveals: 'the-eye-of-a-cyclone' },
                { text: 'cold water', outcome: 'Not quite — Students believe the "eye" of a cyclone is a region of high pressure because it\'s calm and clear.', reveals: 'the-eye-of-a-cyclone' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch4_11', title: 'Cyclone Preparedness and Safety Measures',
          caseStudy: { intro: 'Imagine you are in Odisha during October and the IMD issues a "Red Alert" for a Very Severe Cyclonic Storm approaching the coast in 24 hours.',
            decisions: [{ prompt: 'What are the three color-coded cyclone warning stages issued by the India Meteorological Department (IMD), and what action does each stage.', options: [
                { text: 'The three stages are: (1) Yellow Alert (Watch) – cyclone may affect area in 72 hours', outcome: 'The three stages are: (1) Yellow Alert (Watch) – cyclone may affect area in 72 hours; prepare.' },
                { text: 'cyclone safety = only evacuation to shelter', outcome: 'Not quite — Students think "cyclone safety = only evacuation to shelter." They ignore that 60% of cyclone.', reveals: 'cyclone-safety-only-evacuation-to' },
                { text: '"cyclone safety = only evacuation to shelter', outcome: 'Not quite — Students think "cyclone safety = only evacuation to shelter." They ignore that 60% of cyclone.', reveals: 'cyclone-safety-only-evacuation-to' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch4_12', title: 'Coriolis Effect: Earth\'s Rotation and Wind Deflection',
          caseStudy: { intro: 'Begin by asking students to observe a ceiling fan rotating clockwise from below – the blades appear to move right, but if you watch from above, they move left.',
            decisions: [{ prompt: 'What is the direction of deflection of wind due to the Coriolis Effect in the Northern Hemisphere?', options: [
                { text: 'In the Northern Hemisphere, wind is deflected to the right of its direction of motion', outcome: 'In the Northern Hemisphere, wind is deflected to the right of its direction of motion.' },
                { text: 'no deflection', outcome: 'Not quite — Students often think the Coriolis Effect is a real force (like gravity or magnetism) that actively.', reveals: 'the-coriolis-effect-is-a' },
                { text: 'pushes', outcome: 'Not quite — Students often think the Coriolis Effect is a real force (like gravity or magnetism) that actively.', reveals: 'the-coriolis-effect-is-a' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch4_2', title: 'SI Unit of Pressure: Pascal (N/m-squared)',
          scaffold: { problem: 'A school bag weighs 150 N and rests on a student\'s shoulder through a strap of width 5 cm.',
            steps: [
            { text: 'Identify given quantities: Force F = 150 N (weight of bag). Strap dimensions: width = 5 cm, length = 50 cm.' },
            { text: 'Convert dimensions to metres: width = 5 cm = 0.05 m, length = 50 cm = 0.5 m.' },
            { text: 'Substitute values with units: P = 150 N / 0.025 m².' },
            { text: 'Compute: 150 ÷ 0.025 = 6000. Unit cancellation: N/m² = Pa. So P = 6000 Pa.' },
            { text: 'Verify: 6000 Pa = 6 kPa. A typical school bag pressure is a few kPa; the answer is physically reasonable.', faded: true, blankAnswer: '6000 Pa (or 6 kPa)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch4_3', title: 'Factors Affecting Pressure: Force and Area',
          scaffold: { problem: 'A school bag weighs 120 N. Its straps are 4 cm wide and 30 cm long.',
            steps: [
            { text: 'Identify given: Force F = 120 N (weight of bag). Each strap area = width × length = 4 cm × 30 cm = 120 cm².' },
            { text: 'Convert area to m²: 1 m² = 10,000 cm², so A = 240 cm² ÷ 10,000 = 0.024 m².' },
            { text: 'Write formula P = F / A. Check units: N / m² = Pa.' },
            { text: 'Substitute: P = 120 N / 0.024 m² = 5000 Pa.' },
            { text: 'Verify: 5000 Pa is about 0.05 atm, reasonable for a school bag on thin straps.', faded: true, blankAnswer: '5000 Pa' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Chopping vegetables, Mira finds the blunt knife only mashes the tomato while the sharp one slices it cleanly — same hand, same push. Her brother insists, \'Same force means same pressure; the sharp knife just looks better.\'',
            decisions: [{ prompt: 'Why does the sharp knife really cut?', options: [
                { text: 'Pressure is force per unit area — the sharp edge concentrates the identical push onto a tiny contact area, producing pressure high enough to break the skin, while the blunt edge spreads it over a larger area and only crushes.', outcome: 'This applies P = F/A directly: the same force on a smaller area means greater pressure — that is the physics of every pin and knife.' },
                { text: 'The brother is right — pressure is just another name for force, so equal pushes give equal results.', outcome: 'Force and pressure are different quantities; ignoring area predicts both knives should behave identically, which the tomato disproves.', reveals: 'pressure-is-force' },
                { text: 'The sharp knife works because doubling the contact area doubles the pressure it delivers.', outcome: 'That inverts the relationship — larger area at the same force means less pressure, which is exactly why the blunt edge fails.', reveals: 'area-doubles-pressure' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch4_3', title: 'The bigger picture',
          caseStudy: { intro: 'Pressure is force concentrated. Same push, smaller area, bigger effect — the rule behind nails, knives, snowshoes and every drawing pin ever pressed.',
            decisions: [{ prompt: 'What comes next? Pressure, Winds, Storms, and Cyclones · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Pressure, Winds, Storms, and Cyclones · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'gas', prompt: 'Explore the gas interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'gas', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch4_1', difficulty: 'standard',
          question: 'Pressure is the thrust (force acting perpendicular to a surface) applied per.',
          hint: 'Revisit the definition of speed as distance per unit time (c7_physics_ch04_006) to see.',
          misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean.',
          parts: [
                { id: 'a', prompt: 'A force of 250 N acts perpendicularly on a rectangular surface of dimensions 50 cm × 20 cm. Calculate the pressure exerted on the surface in pascals.', answer: 'Step 1: Area = 50 cm × 20 cm = 1000 cm² = 1000 × 10⁻⁴ m² = 0.1 m²',
                  options: ['Step 1: Area = 50 cm × 20 cm = 1000 cm² = 1000 × 10⁻⁴ m² = 0.1 m²', 'I applied a lot of pressure', 'I pushed hard'],
                  hint: 'Revisit the definition of speed as distance per unit time (c7_physics_ch04_006) to see how a ratio.',
                  misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean "I pushed hard." They.' },
                { id: 'b', prompt: 'Two identical bricks each weigh 30 N. Brick A rests on its largest face (20 cm × 10 cm). Brick B rests on its smallest face (10 cm × 5 cm).', answer: 'Area_A = 200 cm² = 0.02 m² → P_A = 30/0.02 = 1500 Pa',
                  options: ['Area_A = 200 cm² = 0.02 m² → P_A = 30/0.02 = 1500 Pa', 'I applied a lot of pressure', 'I pushed hard', 'pressure depends only on force, ignoring the inverse relationship with area'],
                  hint: 'Revisit the definition of speed as distance per unit time (c7_physics_ch04_006) to see how a ratio.',
                  misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean "I pushed hard." They.' }
          ],
            remediations: { 'pressure-and-force-are-interchangeable': { steps: ['Have the student press the eraser end of a pencil and then the sharp tip onto their own palm with the *same* push (same.', 'Guide them to notice the force was the same but the contact area differed.', 'Then write P = F/A on the board and circle the A in the denominator: "Smaller A → larger P for same F." Finally, give.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean.',
          parts: [
                { id: 'a', prompt: 'A student writes: "If I double the force on a surface, the pressure doubles.', answer: 'The first part is correct (P ∝ F at constant A)',
                  options: ['The first part is correct (P ∝ F at constant A)', 'I applied a lot of pressure', 'I pushed hard'],
                  hint: 'Revisit the definition of speed as distance per unit time (c7_physics_ch04_006) to see how a ratio.',
                  misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean "I pushed hard." They.' },
                { id: 'b', prompt: 'Design a simple activity using a balloon, a flat book, and a few drawing pins to demonstrate that pressure depends on area.', answer: 'Place a drawing pin on the table with its sharp tip up',
                  options: ['Place a drawing pin on the table with its sharp tip up', 'I applied a lot of pressure', 'I pushed hard'],
                  hint: 'Revisit the definition of speed as distance per unit time (c7_physics_ch04_006) to see how a ratio.',
                  misconception: 'Students believe pressure and force are interchangeable terms — they say "I applied a lot of pressure" when they mean "I pushed hard." They.' }
          ],
            remediations: { 'pressure-and-force-are-interchangeable': { steps: ['Have the student press the eraser end of a pencil and then the sharp tip onto their own palm with the *same* push (same.', 'Guide them to notice the force was the same but the contact area differed.', 'Then write P = F/A on the board and circle the A in the denominator: "Smaller A → larger P for same F." Finally, give.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_10', difficulty: 'standard',
          question: 'A cyclone is a large-scale low-pressure weather system characterized.',
          hint: 'Review "Wind: Movement of Air Due to Pressure Differences" (c8_physics_ch4_7) and.',
          misconception: 'Students believe the "eye" of a cyclone is a region of high pressure because it\'s calm and clear.',
          parts: [
                { id: 'a', prompt: 'A cyclone in the Bay of Bengal at 15°N latitude has sustained winds of 120 km/h.', answer: 'Step 1: Convert wind speed to m/s: 120 km/h = 120 × (1000/3600) = 33.3 m/s',
                  options: ['Step 1: Convert wind speed to m/s: 120 km/h = 120 × (1000/3600) = 33.3 m/s', 'calm weather = high pressure', 'the "eye" of a cyclone is a region of high pressure'],
                  hint: 'Review "Wind: Movement of Air Due to Pressure Differences" (c8_physics_ch4_7) and "Convection".',
                  misconception: 'Students believe the "eye" of a cyclone is a region of high pressure because it\'s calm and clear.' },
                { id: 'b', prompt: 'Compare the structure and energy source of a tropical cyclone with a mid-latitude (extra-tropical) cyclone.', answer: '| Feature | Tropical Cyclone | Mid-latitude Cyclone |',
                  options: ['| Feature | Tropical Cyclone | Mid-latitude Cyclone |', 'warm core', 'cold core', 'calm weather = high pressure'],
                  hint: 'Review "Wind: Movement of Air Due to Pressure Differences" (c8_physics_ch4_7) and "Convection".',
                  misconception: 'Students believe the "eye" of a cyclone is a region of high pressure because it\'s calm and clear.' }
          ],
            remediations: { 'the-eye-of-a-cyclone': { steps: ['Show a cross-section diagram of a cyclone with pressure contours — ask student to identify lowest pressure (it\'s the.', 'Use a "spinning cup with tea leaves" demo: stir water in a cup, tea leaves gather at center bottom — analog for low.', 'Explain: as air spirals in, it spins faster (conservation of angular momentum), flinging air outward aloft, forcing.', 'Have student draw pressure profile from outer rainband to eye — must show steady decrease.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_11', difficulty: 'standard',
          question: 'Cyclone preparedness and safety measures refer to the systematic actions taken.',
          hint: 'Revisit c8_physics_ch4_10 (cyclone structure) and c8_physics_ch4_7 (wind from pressure.',
          misconception: 'Students think "cyclone safety = only evacuation to shelter." They ignore that 60% of cyclone deaths in India occur.',
          parts: [
                { id: 'a', prompt: 'Compare the safety of two houses during a cyclone: House A is a pucca (concrete) single-story house on stilts 2 m above ground in a coastal zone.', answer: 'House A is safer against storm surge',
                  options: ['House A is safer against storm surge', 'House B is safer for both', 'cyclone safety = only evacuation to shelter', '"cyclone safety = only evacuation to shelter'],
                  hint: 'Revisit c8_physics_ch4_10 (cyclone structure) and c8_physics_ch4_7 (wind from pressure difference).',
                  misconception: 'Students think "cyclone safety = only evacuation to shelter." They ignore that 60% of cyclone deaths in India occur post-landfall from.' }
          ],
            remediations: { 'cyclone-safety-only-evacuation-to': { steps: ['Show 5-min video of Cyclone Fani (2019) aftermath in Odisha – focus on post-storm hazards (electrocution, disease).', 'Conduct "Pressure Demo": Blow air into a sealed cardboard box with one open flap – flap lifts (Bernoulli/lift).', 'Have students list 3 post-cyclone dangers in their neighborhood and one mitigation for each.', 'Re-attempt Diagnostic Q6 checklist design.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_12', difficulty: 'standard',
          question: 'The Coriolis Effect is the apparent deflection of moving air (wind) or any.',
          hint: 'If stuck, review c7_physics_ch06_001 (Rotation of the Earth) and c8_physics_ch4_7 (Wind.',
          misconception: 'Students often think the Coriolis Effect is a real force (like gravity or magnetism) that actively "pushes" wind.',
          parts: [
                { id: 'a', prompt: 'A wind blows at 20 km/h from the south toward the north at a latitude of 30°N in the Northern Hemisphere.', answer: 'The wind will be deflected toward the east (right)',
                  options: ['The wind will be deflected toward the east (right)', ') reveals the student applied the Southern Hemisphere rule or confused', 'pushes', 'The Coriolis force pushes the cyclone to spin clockwise'],
                  hint: 'If stuck, review c7_physics_ch06_001 (Rotation of the Earth) and c8_physics_ch4_7 (Wind: Movement.',
                  misconception: 'Students often think the Coriolis Effect is a real force (like gravity or magnetism) that actively "pushes" wind sideways.' },
                { id: 'b', prompt: 'Compare the Coriolis deflection of two identical wind masses: one at 10°N latitude and another at 60°N latitude, both moving north at 15 m/s.', answer: 'The wind at 60°N experiences greater deflection',
                  options: ['The wind at 60°N experiences greater deflection', 'same deflection', 'greater at 10°N', 'pushes'],
                  hint: 'If stuck, review c7_physics_ch06_001 (Rotation of the Earth) and c8_physics_ch4_7 (Wind: Movement.',
                  misconception: 'Students often think the Coriolis Effect is a real force (like gravity or magnetism) that actively "pushes" wind sideways.' }
          ],
            remediations: { 'the-coriolis-effect-is-a': { steps: ['Revisit the rotating frame concept: Sit on a rotating office chair, hold a ball, and toss it straight to a friend.', 'From the ground, it goes straight; from the chair, it curves.', 'This shows the deflection is an *appearance* due to the observer\'s rotation.', 'Use a globe: Rotate it west-to-east.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_2', difficulty: 'standard',
          question: 'The SI unit of pressure is the pascal (symbol Pa), defined as one newton.',
          hint: 'Review the definition of pressure (c8_physics_ch4_1) and practice converting cm² to m² (1.',
          misconception: 'Students treat pressure and force as interchangeable, saying "heavy objects exert high pressure" regardless of contact.',
          parts: [
                { id: 'a', prompt: 'Why is the pascal considered a *derived* SI unit and not a base unit? Explain using the definition of pressure.', answer: 'Pressure is defined as force per unit area (P = F/A)',
                  options: ['Pressure is defined as force per unit area (P = F/A)', 'pascal is a base unit'],
                  hint: 'Review the definition of pressure (c8_physics_ch4_1) and practice converting cm² to m² (1 m².',
                  misconception: 'Students treat pressure and force as interchangeable, saying "heavy objects exert high pressure" regardless of contact area.' }
          ],
            remediations: { 'students-treat-pressure-and-force': { steps: ['If the student confuses pressure with force, have them press a balloon with an open palm (area ~100 cm²) and then with.', 'The fingertip bursts the balloon; the palm does not.', 'Then guide them through the calculation: Palm pressure = 10 N / 0.01 m² = 1000 Pa; Fingertip pressure = 10 N / 0.0001.', 'Emphasise the conversion: 1 m² = 10,000 cm², so divide cm² by 10,000 to get m².'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch4_3', difficulty: 'standard',
          question: 'Pressure is the thrust (force acting perpendicular to a surface) per unit area.',
          hint: 'If stuck, revisit c7_physics_ch04_006 (Speed formula and unit conversions) and practice.',
          misconception: 'Students often think “more force always means more pressure” and “larger area always means less pressure” as separate.',
          parts: [
                { id: 'a', prompt: 'State the formula for pressure and name its SI unit. If a force of 10 N acts on an area of 2 m², what is the pressure in pascals?', answer: 'Pressure = Force / Area = 10 N / 2 m² = 5 Pa',
                  options: ['Pressure = Force / Area = 10 N / 2 m² = 5 Pa', 'more force always means more pressure', 'larger area always means less pressure', 'the pressure of the brick is 30 N'],
                  hint: 'If stuck, revisit c7_physics_ch04_006 (Speed formula and unit conversions) and practice converting.',
                  misconception: 'Students often think “more force always means more pressure” and “larger area always means less pressure” as separate rules, but fail.' },
                { id: 'b', prompt: 'A camel walks easily on sand while a horse of similar weight sinks. Explain this using the concept of pressure, force, and area.', answer: 'The camel’s wide feet increase the contact area with sand',
                  options: ['The camel’s wide feet increase the contact area with sand', 'camel is lighter', 'camel has special feet', 'more force always means more pressure'],
                  hint: 'If stuck, revisit c7_physics_ch04_006 (Speed formula and unit conversions) and practice converting.',
                  misconception: 'Students often think “more force always means more pressure” and “larger area always means less pressure” as separate rules, but fail.' },
                { id: 'c', prompt: 'A rectangular brick of weight 30 N rests on a table. Its dimensions are 20 cm × 10 cm × 5 cm.', answer: 'Step 1: Convert cm to m: 20 cm = 0.20 m, 10 cm = 0.10 m, 5 cm = 0.05 m',
                  options: ['Step 1: Convert cm to m: 20 cm = 0.20 m, 10 cm = 0.10 m, 5 cm = 0.05 m', 'more force always means more pressure', 'larger area always means less pressure', 'the pressure of the brick is 30 N'],
                  hint: 'If stuck, revisit c7_physics_ch04_006 (Speed formula and unit conversions) and practice converting.',
                  misconception: 'Students often think “more force always means more pressure” and “larger area always means less pressure” as separate rules, but fail.' },
                { id: 'd', prompt: 'Two students push identical boxes with forces of 50 N and 80 N respectively. The first box has a base area of 0.25 m², the second 0.40 m².', answer: 'Box 1: P = 50 N / 0.25 m² = 200 Pa',
                  options: ['Box 1: P = 50 N / 0.25 m² = 200 Pa', 'Box 2 because force is larger', 'more force always means more pressure', 'larger area always means less pressure'],
                  hint: 'If stuck, revisit c7_physics_ch04_006 (Speed formula and unit conversions) and practice converting.',
                  misconception: 'Students often think “more force always means more pressure” and “larger area always means less pressure” as separate rules, but fail.' }
          ],
            remediations: { 'more-force-always-means-more': { steps: ['Have the student press a sponge with a fingertip (small area) and then with the whole palm (large area) using the same.', 'Guide them to write P = F/A and label F (same) and A (different).', 'Ask: “If F is same and A increases, what happens to P?”', 'Repeat with a heavy book on a large tray vs. same book on a small block to vary force while keeping area constant.'], labTask: { instruction: 'On the interactive: heat the gas — watch the particles. Now compress the piston — same effect? — then check.', widget: 'gas', validate: 'gas:temperature=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
