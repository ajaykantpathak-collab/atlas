import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch09_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch09_p2: SimDef = {
    id: 'v3_c8_physics_ch09_p2',
    title: 'Our Home: Earth, a Unique Life Sustaining Planet · Part 2/2',
    subtitle: 'The rare recipe that lets a planet host life',
    classLevel: 8, subject: 'physics', topic: 'Our Home: Earth, a Unique Life Sustaining Planet · Part 2/2',
    chapters: ['c8_physics_ch09'],
    nodeIds: ['c8_physics_ch9_5', 'c8_physics_ch9_6', 'c8_physics_ch9_7', 'c8_physics_ch9_8', 'c8_physics_ch9_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planet habitability inspector', intro: 'Every rock in the solar system had a shot at life — only ours pulled it off. Inspect Earth\'s five survival conditions and test which neighbouring planets failed which check.', goal: 'Understand the physical conditions that make Earth life-sustaining — habitable distance, liquid water, atmosphere, gravity and magnetic field — and why each is necessary but alone not sufficient.' },
    discovery: {
        question: 'The Moon sits at the same distance from the Sun as Earth — yet it swings from 127°C by day to −173°C by night. What\'s the one thing Earth has that stops that?',
        options: ['An atmosphere — it traps heat like a blanket; without it Earth\'s average would be a freezing −18°C', 'Oceans — water alone keeps Earth warm', 'Luck — planets just differ', 'Earth spins faster, which heats it'],
        answer: 'An atmosphere — it traps heat like a blanket; without it Earth\'s average would be a freezing −18°C',
        hook: '\'Right distance from the Sun\' isn\'t the whole recipe. Venus is Earth\'s-size with air — but 96% CO₂ cooked it to 464°C. And strip away the magnetic field, like on Mars, and solar wind slowly peels the air away entirely.',
    },
    teaching: [
        { title: 'Gravity on Earth: Holding Atmosphere and Objects', text: 'Gravity on Earth is the attractive force exerted by Earth\'s mass that pulls objects toward its center, giving them weight (W = mg, where g ≈ 9.8 m/s²) and preventing atmospheric gases from escaping.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch9_5', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Run the habitability checklist on Earth, Venus, Mars and a fictional Earth-twin with no magnetic field. For each, figure out which life-condition fails — temperature, liquid water, atmosphere or radiation shielding.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_physics_ch9_5', title: 'Gravity on Earth: Holding Atmosphere and Objects',
          scaffold: { problem: 'A student of mass 40 kg stands on a weighing scale in a school in Delhi. What is the reading on the scale in newtons? (Take g = 9.8 m/s²)',
            steps: [
            { text: 'Identify given quantities: mass m = 40 kg, acceleration due to gravity g = 9.8 m/s². Find weight W in newtons.' },
            { text: 'Recall the formula for weight: W = m × g. Check units: kg × m/s² = kg·m/s² = N (newton).' },
            { text: 'Substitute the values with units: W = 40 kg × 9.8 m/s².' },
            { text: 'Perform multiplication: 40 × 9.8 = 392. Track unit cancellation: kg × m/s² = N.' },
            { text: 'Verify reasonableness: 40 kg mass corresponds to about 40 kgf, and 1 kgf ≈ 9.8 N, so 40 × 9.8 ≈ 392 N is physically.', faded: true, blankAnswer: '392 N' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch9_6', title: 'Water on Earth: Oceans, Rivers, and the Water Cycle',
          scaffold: { problem: 'Total water on Earth is 1.386 billion km³. Oceans hold 97.5%. Freshwater is the rest.',
            steps: [
            { text: 'Identify given: Total water = 1.386 × 10⁹ km³. Ocean % = 97.5%. Freshwater % = 2.5%.' },
            { text: 'Compute freshwater volume = 2.5% of total = 0.025 × 1.386 × 10⁹ = 3.465 × 10⁷ km³.' },
            { text: 'Compute groundwater volume = 30.1% of freshwater = 0.301 × 3.465 × 10⁷ = 1.042965 × 10⁷ km³.' },
            { text: 'Track units: percentages are dimensionless, so result is in km³.' },
            { text: 'Verify reasonableness: Groundwater is about 10 million km³, which matches known estimates (≈10.5 million km³).', faded: true, blankAnswer: '1.04 × 10⁷ km³ (or 10.4 million km³)' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch9_7', title: 'Temperature Range on Earth: Suitable for Life',
          caseStudy: { intro: 'Begin by asking students to touch a metal bench and a wooden bench in the schoolyard at noon — the metal feels much hotter despite both receiving the same.',
            decisions: [{ prompt: 'What is the approximate average surface temperature of Earth, and why is this specific value critical for life as we know it?', options: [
                { text: 'Earth\'s average surface temperature is ~15°C (288 K)', outcome: 'Earth\'s average surface temperature is ~15°C (288 K). This is critical because it allows water.' },
                { text: 'greenhouse effect', outcome: 'Not quite — Students think "greenhouse effect" means the atmosphere acts like a glass greenhouse that traps.', reveals: 'greenhouse-effect-means-the-atmosphere' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_8', title: 'Earth\'s Rotation and Revolution: Day-Night and Seasons',
          caseStudy: { intro: 'Observe a ceiling fan rotating: the blades move but the center stays fixed. Similarly, Earth spins on its axis. Take a globe and a lamp (Sun) in a dark room.',
            decisions: [{ prompt: 'What is the approximate duration of one complete rotation of Earth on its axis relative to the stars (sidereal day), and in which direction.', options: [
                { text: 'One sidereal day is 23 hours 56 minutes 4 seconds', outcome: 'One sidereal day is 23 hours 56 minutes 4 seconds. Earth rotates counterclockwise (west to east).' },
                { text: 'Earth is closer to the Sun in summer, farther in winter', outcome: 'Not quite — Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun.', reveals: 'the-earth-s-elliptical-orbit' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_9', title: 'Diversity of Life on Earth: Plants, Animals, Microorganisms',
          caseStudy: { intro: 'Look at a school garden or a nearby park. You see trees, grasses, insects, birds, and maybe a pond with algae.',
            decisions: [{ prompt: 'List the three major groups of living organisms on Earth and give one example of each.', options: [
                { text: 'Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria)', outcome: 'Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria).' },
                { text: 'only visible macro-organisms count as life', outcome: 'Not quite — Students often think \'diversity\' only means number of species (species richness) and ignore genetic.', reveals: 'diversity-only-means-number-of' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz, a team argues Earth supports life \'simply because it is at the right distance from the Sun.\' The opposing team points out the Moon sits at essentially the same distance, yet swings between 127°C and −173°C.',
            decisions: [{ prompt: 'What does the Moon comparison prove?', options: [
                { text: 'That distance alone cannot explain habitability — Earth stays temperate because its atmosphere traps heat and holds breathable gases, its gravity retains that atmosphere, and its magnetic field shields it from solar wind; life needs all these conditions at once, not just a good orbit.', outcome: 'This replaces the single-factor answer with the real bundle of conditions — the Moon shares the orbit but lacks the atmosphere.' },
                { text: 'Nothing — the Moon is small and dead anyway, so the team\'s original point about distance stands.', outcome: 'The Moon is the perfect control case: same sunlight, no atmosphere, extreme temperatures — showing atmosphere, not distance, moderates heat.', reveals: 'distance-is-everything' },
                { text: 'It proves Venus is a better comparison, since being nearer the Sun is the real reason it is hot — so distance is still the main factor.', outcome: 'Venus is only modestly closer in solar terms; its 464°C comes from a runaway greenhouse of dense CO2 — again an atmosphere story, not a distance story.', reveals: 'venus-is-distance' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_9', title: 'You made it',
          caseStudy: { intro: 'Earth is a bundle of lucky conditions that must ALL hold at once: right distance, liquid water, breathable air, gravity to keep it, and a magnetic shield. Remove any one and the planet goes silent.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch9_5', difficulty: 'standard',
          question: 'Gravity on Earth is the attractive force exerted by Earth\'s mass that pulls.',
          hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
          misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of weight, and how does it differ from the SI unit of mass?', answer: 'Weight is measured in newtons (N), mass in kilograms (kg)',
                  options: ['Weight is measured in newtons (N), mass in kilograms (kg)', 'weight in kg', 'gravity only acts on solid objects that visibly fall, not on gases'],
                  hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
                  misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.' },
                { id: 'b', prompt: 'A school bag has a mass of 5 kg. Calculate its weight on Earth. (Take g = 9.8 m/s²)', answer: 'Step 1: Identify given: m = 5 kg, g = 9.8 m/s²',
                  options: ['Step 1: Identify given: m = 5 kg, g = 9.8 m/s²', 'gravity only acts on solid objects that visibly fall, not on gases'],
                  hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
                  misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.' },
                { id: 'c', prompt: 'Compare two planets: Planet A has mass 2× Earth\'s mass and radius 2× Earth\'s radius. Planet B has mass 4× Earth\'s mass and radius 2× Earth\'s radius.', answer: 'Surface gravity g ∝ M/R²',
                  options: ['Surface gravity g ∝ M/R²', 'Planet A because it\'s more massive', 'only mass matters', 'gravity only acts on solid objects that visibly fall, not on gases'],
                  hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
                  misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.' }
          ],
            remediations: { 'gravity-only-acts-on-solid': { steps: ['Show a digital balance reading zero with an empty balloon (tared).', 'Inflate the balloon, place it on the balance – reading increases (e.g., +2 g).', 'Explain: the extra mass is air; gravity pulls it down, registering as weight.', 'Compare with helium balloon (lighter than air) rising – gravity still pulls it, but buoyancy wins.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If gravity pulls everything down, a helium balloon should fall too, but it rises. So gravity doesn\'t act on it." Evaluate this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'gravity only acts on solid objects that visibly fall, not on gases'],
                  hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
                  misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.' },
                { id: 'b', prompt: 'Design a simple experiment using a kitchen scale, a balloon, and a pump to demonstrate that air has weight because of gravity.', answer: 'Weigh an empty balloon on the scale (tare it)',
                  options: ['Weigh an empty balloon on the scale (tare it)', 'gravity only acts on solid objects that visibly fall, not on gases'],
                  hint: 'Revisit Class 6/7 concepts of force and motion (c6_physics_ch08_029, c7_physics_ch04_006).',
                  misconception: 'Students believe gravity only acts on solid objects that visibly fall, not on gases.' }
          ],
            remediations: { 'gravity-only-acts-on-solid': { steps: ['Show a digital balance reading zero with an empty balloon (tared).', 'Inflate the balloon, place it on the balance – reading increases (e.g., +2 g).', 'Explain: the extra mass is air; gravity pulls it down, registering as weight.', 'Compare with helium balloon (lighter than air) rising – gravity still pulls it, but buoyancy wins.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_6', difficulty: 'standard',
          question: 'Water on Earth exists in interconnected reservoirs (oceans, ice caps.',
          hint: 'Revisit the water cycle and heat transfer topics from Class 6 (c6_physics_ch07_023) and.',
          misconception: 'Students think the water cycle is only "ocean → evaporation → rain → river → ocean", ignoring groundwater flow.',
          parts: [
                { id: 'a', prompt: 'What percentage of Earth\'s total water is freshwater, and what fraction of that freshwater is easily accessible in lakes and rivers?', answer: 'Freshwater is 2.5% of total water',
                  options: ['Freshwater is 2.5% of total water', 'blue planet', 'ocean → evaporation → rain → river → ocean', 'freshwater is 50% or that rivers hold most freshwater'],
                  hint: 'Revisit the water cycle and heat transfer topics from Class 6 (c6_physics_ch07_023) and Class 7.',
                  misconception: 'Students think the water cycle is only "ocean → evaporation → rain → river → ocean", ignoring groundwater flow, transpiration from plants.' },
                { id: 'b', prompt: 'The average residence time of water in the atmosphere is 9 days, while in the ocean it is about 3,000 years.', answer: 'Atmospheric water cycles very quickly (9 days)',
                  options: ['Atmospheric water cycles very quickly (9 days)', 'ocean → evaporation → rain → river → ocean'],
                  hint: 'Revisit the water cycle and heat transfer topics from Class 6 (c6_physics_ch07_023) and Class 7.',
                  misconception: 'Students think the water cycle is only "ocean → evaporation → rain → river → ocean", ignoring groundwater flow, transpiration from plants.' }
          ],
            remediations: { 'the-water-cycle-is-only': { steps: ['Have the student draw the full water cycle diagram including all reservoirs (oceans, ice, groundwater, soil moisture.', 'Then trace a single water molecule starting from the ocean: write a short story of its journey through at least four.', 'This forces confrontation with the missing pathways.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_7', difficulty: 'standard',
          question: 'The temperature range on Earth refers to the span of surface temperatures.',
          hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c7_physics_ch03_001 (Heat and.',
          misconception: 'Students think "greenhouse effect" means the atmosphere acts like a glass greenhouse that traps heat by blocking.',
          parts: [
                { id: 'a', prompt: 'What is the approximate average surface temperature of Earth, and why is this specific value critical for life as we know it?', answer: 'Earth\'s average surface temperature is ~15°C (288 K)',
                  options: ['Earth\'s average surface temperature is ~15°C (288 K)', 'greenhouse effect'],
                  hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c7_physics_ch03_001 (Heat and Temperature.',
                  misconception: 'Students think "greenhouse effect" means the atmosphere acts like a glass greenhouse that traps heat by blocking convection.' },
                { id: 'b', prompt: 'Explain why the Moon, which is roughly the same distance from the Sun as Earth, has surface temperatures ranging from -173°C to 127°C, while Earth\'s range.', answer: 'The Moon lacks an atmosphere and large water bodies',
                  options: ['The Moon lacks an atmosphere and large water bodies', 'no air', 'greenhouse effect'],
                  hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c7_physics_ch03_001 (Heat and Temperature.',
                  misconception: 'Students think "greenhouse effect" means the atmosphere acts like a glass greenhouse that traps heat by blocking convection.' },
                { id: 'c', prompt: 'Analyze this statement: "Deserts are hot because sand is a good conductor of heat." Is this correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'greenhouse effect'],
                  hint: 'Revisit c6_physics_ch07_024 (Heat vs Temperature) and c7_physics_ch03_001 (Heat and Temperature.',
                  misconception: 'Students think "greenhouse effect" means the atmosphere acts like a glass greenhouse that traps heat by blocking convection.' }
          ],
            remediations: { 'greenhouse-effect-means-the-atmosphere': { steps: ['Use a thermal camera or infrared thermometer to measure: (1) temperature of a car interior with windows closed.', 'Have students explain why the CO₂ box stays warmer even though no air escapes — this directly confronts the "trapped.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_8', difficulty: 'standard',
          question: 'Earth\'s rotation is its spin on an axis tilted at 23.5° relative to its orbital.',
          hint: 'If stuck, revisit c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance).',
          misconception: 'Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun in summer, farther.',
          parts: [
                { id: 'a', prompt: 'What is the approximate duration of one complete rotation of Earth on its axis relative to the stars (sidereal day), and in which direction does Earth rotate.', answer: 'One sidereal day is 23 hours 56 minutes 4 seconds',
                  options: ['One sidereal day is 23 hours 56 minutes 4 seconds', 'Earth is closer to the Sun in summer, farther in winter'],
                  hint: 'If stuck, revisit c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to solidify the.',
                  misconception: 'Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun in summer, farther in winter." They cite.' },
                { id: 'b', prompt: 'Why does the Northern Hemisphere experience summer in June even though Earth is actually farther from the Sun (aphelion) in early July?', answer: 'Seasons are caused by the tilt of Earth\'s axis, not by distance from the Sun',
                  options: ['Seasons are caused by the tilt of Earth\'s axis, not by distance from the Sun', 'Earth is closer to the Sun in summer, farther in winter'],
                  hint: 'If stuck, revisit c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to solidify the.',
                  misconception: 'Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun in summer, farther in winter." They cite.' },
                { id: 'c', prompt: 'If it is 12:00 noon (solar time) in New Delhi (77° E longitude), what is the solar time in London (0° longitude)?', answer: 'Earth rotates 360° in 24 hours = 15° per hour',
                  options: ['Earth rotates 360° in 24 hours = 15° per hour', 'Earth is closer to the Sun in summer, farther in winter'],
                  hint: 'If stuck, revisit c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to solidify the.',
                  misconception: 'Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun in summer, farther in winter." They cite.' },
                { id: 'd', prompt: 'Compare the length of daytime on the June solstice at three latitudes: Equator (0°), Tropic of Cancer (23.5° N), and Arctic Circle (66.5° N).', answer: 'Equator: 12 hours (always)',
                  options: ['Equator: 12 hours (always)', 'Earth is closer to the Sun in summer, farther in winter'],
                  hint: 'If stuck, revisit c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to solidify the.',
                  misconception: 'Students often think the Earth\'s elliptical orbit causes seasons: "Earth is closer to the Sun in summer, farther in winter." They cite.' }
          ],
            remediations: { 'the-earth-s-elliptical-orbit': { steps: ['Use a flashlight and a tilted book in a dark room.', 'Shine the light straight down (equinox) — the beam makes a circle.', 'Tilt the book 23.5° toward the light (summer) — the beam stretches into an ellipse, covering more area near the top.', 'Measure the illuminated length along a meridian line: the top (pole) gets continuous light.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_9', difficulty: 'standard',
          question: 'Biodiversity refers to the variety of life forms on Earth, including plants.',
          hint: 'Review c8_physics_ch9_1 (Conditions for Life) and c6_physics_ch02_009 (Exploring the.',
          misconception: 'Students often think \'diversity\' only means number of species (species richness) and ignore genetic diversity within.',
          parts: [
                { id: 'a', prompt: 'List the three major groups of living organisms on Earth and give one example of each.', answer: 'Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria)',
                  options: ['Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria)', 'only visible macro-organisms count as life'],
                  hint: 'Review c8_physics_ch9_1 (Conditions for Life) and c6_physics_ch02_009 (Exploring the Local.',
                  misconception: 'Students often think \'diversity\' only means number of species (species richness) and ignore genetic diversity within a species and.' }
          ],
            remediations: { 'diversity-only-means-number-of': { steps: ['Remediation: Take the student to two sites: a natural grove and a monoculture plantation.', 'Ask them to list all different \'kinds\' of plants they see in 10 minutes.', 'Then ask: \'Are all teak trees identical?', 'Check leaf size, bark texture.\' Guide them to see variation within species (genetic diversity) and the variety.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
