import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch09_p1: SimDef = {
    id: 'v3_c8_physics_ch09_p1',
    title: 'Our Home: Earth, a Unique Life Sustaining Planet · Part 1/2',
    subtitle: 'The rare recipe that lets a planet host life',
    classLevel: 8, subject: 'physics', topic: 'Our Home: Earth, a Unique Life Sustaining Planet · Part 1/2',
    chapters: ['c8_physics_ch09'],
    nodeIds: ['c8_physics_ch9_1', 'c8_physics_ch9_10', 'c8_physics_ch9_11', 'c8_physics_ch9_2', 'c8_physics_ch9_3', 'c8_physics_ch9_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planet habitability inspector', intro: 'Every rock in the solar system had a shot at life — only ours pulled it off. Inspect Earth\'s five survival conditions and test which neighbouring planets failed which check.', goal: 'Understand the physical conditions that make Earth life-sustaining — habitable distance, liquid water, atmosphere, gravity and magnetic field — and why each is necessary but alone not sufficient.' },
    discovery: {
        question: 'The Moon sits at the same distance from the Sun as Earth — yet it swings from 127°C by day to −173°C by night. What\'s the one thing Earth has that stops that?',
        options: ['An atmosphere — it traps heat like a blanket; without it Earth\'s average would be a freezing −18°C', 'Oceans — water alone keeps Earth warm', 'Luck — planets just differ', 'Earth spins faster, which heats it'],
        answer: 'An atmosphere — it traps heat like a blanket; without it Earth\'s average would be a freezing −18°C',
        hook: '\'Right distance from the Sun\' isn\'t the whole recipe. Venus is Earth\'s-size with air — but 96% CO₂ cooked it to 464°C. And strip away the magnetic field, like on Mars, and solar wind slowly peels the air away entirely.',
    },
    teaching: [
        { title: 'Earth as a Unique Planet: Conditions for Life', text: 'Earth is a unique planet in our solar system because it possesses a specific combination of physical conditions — including a stable temperature range allowing liquid water, a protective atmosphere.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch9_1', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Run the habitability checklist on Earth, Venus, Mars and a fictional Earth-twin with no magnetic field. For each, figure out which life-condition fails — temperature, liquid water, atmosphere or radiation shielding.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch9_1', title: 'Earth as a Unique Planet: Conditions for Life',
          caseStudy: { intro: 'Look up at the night sky from your terrace in Delhi or a village in Kerala — you see the Moon, maybe Venus or Mars, but no signs of life.',
            decisions: [{ prompt: 'Name any three physical conditions that make Earth suitable for life, and state the SI unit used to measure the temperature condition.', options: [
                { text: 'Three conditions: (1) Suitable temperature range for liquid water (measured in kelvin, K,', outcome: 'Three conditions: (1) Suitable temperature range for liquid water (measured in kelvin, K, or degree.' },
                { text: 'gravity', outcome: 'Not quite — Students think "Earth is at the right distance from the Sun, so it has the right temperature for.', reveals: 'earth-is-at-the-right' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_10', title: 'Satellite Images: Studying Earth from Space (ISRO, NASA)',
          caseStudy: { intro: 'Look at a weather forecast on your phone or TV – the moving clouds you see over India are not drawn by an artist; they are real pictures taken by a camera.',
            decisions: [{ prompt: 'What are the two primary types of satellite orbits used for Earth observation, and what is the key difference in how they view the Earth?', options: [
                { text: 'The two primary types are **geostationary orbit** (approx', outcome: 'The two primary types are **geostationary orbit** (approx. 36,000 km above equator) and.' },
                { text: 'takes a photograph', outcome: 'Not quite — Students often believe that a satellite "takes a photograph" exactly like a smartphone camera.', reveals: 'a-satellite-takes-a-photograph' },
                { text: 'both stay over one place, or confusing altitude', outcome: 'Not quite — Students often believe that a satellite "takes a photograph" exactly like a smartphone camera.', reveals: 'a-satellite-takes-a-photograph' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_11', title: 'Earth as a Self-Sustaining System: Cycles and Balance',
          caseStudy: { intro: 'Observe a puddle after rain disappearing by afternoon — where did the water go?',
            decisions: [{ prompt: 'What are the three major biogeochemical cycles that make Earth a self-sustaining system, and what is the primary energy source driving them?', options: [
                { text: 'The three major cycles are the water cycle, carbon cycle, and nitrogen cycle', outcome: 'The three major cycles are the water cycle, carbon cycle, and nitrogen cycle.' },
                { text: 'oxygen cycle', outcome: 'Not quite — Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s.', reveals: 'self-sustaining-means-unchanging-or' },
                { text: 'geothermal energy drives the water cycle', outcome: 'Not quite — Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s.', reveals: 'self-sustaining-means-unchanging-or' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch9_2', title: 'Earth\'s Crust: Thin Life-Supporting Layer',
          scaffold: { problem: 'Earth\'s average radius is 6,371 km. The average thickness of continental crust is 35 km and oceanic crust is 7 km.',
            steps: [
            { text: 'Identify given quantities: R_earth = 6,371 km, T_cont = 35 km, T_ocean = 7 km. Find: %_cont and %_ocean.' },
            { text: 'Formula: Percentage = (Crust Thickness / Earth Radius) × 100%. Units: km/km cancels, giving dimensionless percentage.' },
            { text: 'Substitute continental: %_cont = (35 km / 6,371 km) × 100% = 0.005494 × 100%.' },
            { text: 'Compute: %_cont = 0.5494% ≈ 0.55%. Substitute oceanic: %_ocean = (7 km / 6,371 km) × 100% = 0.001099 × 100% = 0.1099% ≈.' },
            { text: 'Verify reasonableness: Crust is less than 1% of radius for both, continental ~5× thicker than oceanic.', faded: true, blankAnswer: 'Continental crust = 0.55% of Earth\'s radius; Oceanic crust.' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch9_3', title: 'Atmosphere: Composition and Layers of Air Around Earth',
          caseStudy: { intro: 'Look up at the sky on a clear day in Delhi — the blue color comes from nitrogen and oxygen molecules scattering sunlight.',
            decisions: [{ prompt: 'What are the two most abundant gases in Earth\'s atmosphere and their approximate percentages by volume in dry air?', options: [
                { text: 'Nitrogen (~78%) and oxygen (~21%)', outcome: 'Nitrogen (~78%) and oxygen (~21%). A wrong answer (e.g., oxygen and carbon dioxide) reveals the.' },
                { text: '"temperature increases with altitude everywhere', outcome: 'Not quite — Students think "temperature increases with altitude everywhere because you are closer to the Sun.".', reveals: 'temperature-increases-with-altitude-everywhere' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_4', title: 'Role of Atmosphere in Sustaining Life: Oxygen, Carbon Dioxide',
          caseStudy: { intro: 'Observe a potted plant on a windowsill and a pet dog sleeping nearby – both are alive but the plant grows toward light while the dog breathes steadily.',
            decisions: [{ prompt: 'State the approximate percentage of oxygen and carbon dioxide in dry air by volume, and name the two major biological processes that cycle.', options: [
                { text: 'Oxygen ≈ 21%, carbon dioxide ≈ 0.04% (400 ppm)', outcome: 'Oxygen ≈ 21%, carbon dioxide ≈ 0.04% (400 ppm). The two processes are photosynthesis (plants take.' },
                { text: 'removing all CO₂ from the atmosphere would be beneficial for life', outcome: 'Not quite — Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them.', reveals: 'carbon-dioxide-is-bad-and' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In a quiz, a team argues Earth supports life \'simply because it is at the right distance from the Sun.\' The opposing team points out the Moon sits at essentially the same distance, yet swings between 127°C and −173°C.',
            decisions: [{ prompt: 'What does the Moon comparison prove?', options: [
                { text: 'That distance alone cannot explain habitability — Earth stays temperate because its atmosphere traps heat and holds breathable gases, its gravity retains that atmosphere, and its magnetic field shields it from solar wind; life needs all these conditions at once, not just a good orbit.', outcome: 'This replaces the single-factor answer with the real bundle of conditions — the Moon shares the orbit but lacks the atmosphere.' },
                { text: 'Nothing — the Moon is small and dead anyway, so the team\'s original point about distance stands.', outcome: 'The Moon is the perfect control case: same sunlight, no atmosphere, extreme temperatures — showing atmosphere, not distance, moderates heat.', reveals: 'distance-is-everything' },
                { text: 'It proves Venus is a better comparison, since being nearer the Sun is the real reason it is hot — so distance is still the main factor.', outcome: 'Venus is only modestly closer in solar terms; its 464°C comes from a runaway greenhouse of dense CO2 — again an atmosphere story, not a distance story.', reveals: 'venus-is-distance' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch9_4', title: 'The bigger picture',
          caseStudy: { intro: 'Earth is a bundle of lucky conditions that must ALL hold at once: right distance, liquid water, breathable air, gravity to keep it, and a magnetic shield. Remove any one and the planet goes silent.',
            decisions: [{ prompt: 'What comes next? Our Home: Earth, a Unique Life Sustaining Planet · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Our Home: Earth, a Unique Life Sustaining Planet · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch9_1', difficulty: 'standard',
          question: 'Earth is a unique planet in our solar system because it possesses a specific.',
          hint: 'If stuck, revisit c7_physics_ch06_001 (rotation/day-night) and c6_physics_ch07_023 (water.',
          misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating.',
          parts: [
                { id: 'a', prompt: 'Compare Earth and Venus: both are similar in size and have atmospheres, but Venus has a surface temperature of 464°C while Earth averages 15°C.', answer: 'Venus fails the "suitable temperature" condition',
                  options: ['Venus fails the "suitable temperature" condition', 'closer to Sun'],
                  hint: 'If stuck, revisit c7_physics_ch06_001 (rotation/day-night) and c6_physics_ch07_023 (water cycle).',
                  misconception: 'Students think "Earth is at the right distance from the Sun, so it has the right temperature for life" — treating distance as the sole.' }
          ],
            remediations: { 'earth-is-at-the-right': { steps: ['Show a 2-minute video of Moon surface temperatures (day: 127°C, night: -173°C) — same distance as Earth, no atmosphere.', 'In class, use two thermometers: one in a sealed transparent box under a lamp, one in open air.', 'Plot both curves.', 'Guide students to calculate Earth\'s expected temperature without atmosphere using Stefan-Boltzmann idea (simplified.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_10', difficulty: 'standard',
          question: 'Satellite images are digital representations of Earth\'s surface and atmosphere.',
          hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection.',
          misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single.',
          parts: [
                { id: 'a', prompt: 'What are the two primary types of satellite orbits used for Earth observation, and what is the key difference in how they view the Earth?', answer: 'The two primary types are **geostationary orbit** (approx',
                  options: ['The two primary types are **geostationary orbit** (approx', 'takes a photograph', 'both stay over one place, or confusing altitude'],
                  hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection of Light\'.',
                  misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single snapshot of the whole.' },
                { id: 'b', prompt: 'Why does healthy vegetation appear bright red in a standard false-colour composite (where Near-Infrared is displayed as Red, Red as Green, Green as Blue), even.', answer: 'Healthy leaves contain chlorophyll',
                  options: ['Healthy leaves contain chlorophyll', 'leaves reflect red light', 'the satellite adds red colour', 'takes a photograph'],
                  hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection of Light\'.',
                  misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single snapshot of the whole.' },
                { id: 'c', prompt: 'A polar-orbiting satellite (like ISRO\'s Resourcesat) has a swath width of 140 km and orbits at 817 km altitude.', answer: '**Step 1:** Identify given: Swath width W = 140 km, Orbits per day N = 14',
                  options: ['**Step 1:** Identify given: Swath width W = 140 km, Orbits per day N = 14', 'takes a photograph'],
                  hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection of Light\'.',
                  misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single snapshot of the whole.' }
          ],
            remediations: { 'a-satellite-takes-a-photograph': { steps: ['** Show a raw "Level-0" satellite data strip (available from ISRO\'s NRSC open data portal or USGS EarthExplorer) –.', '** Demonstrate the push-broom principle: Use a flatbed scanner (or phone panorama sweep) to scan a coloured paper – the.', '** Open a multi-band viewer (e.g., SNAP toolbox free from ESA, or QGIS). Load a Sentinel-2 product.', '** Create a False Colour composite in the software (assign Band 8→R, Band 4→G, Band 3→B). Watch vegetation turn red.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Microwave radar satellites (like RISAT) are better than optical satellites (like Cartosat) for *all* Earth observation tasks because they.', answer: 'The claim is **partially correct but overstated**',
                  options: ['The claim is **partially correct but overstated**', 'takes a photograph'],
                  hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection of Light\'.',
                  misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single snapshot of the whole.' },
                { id: 'b', prompt: 'Design a simple classroom activity using publicly available satellite imagery (e.g., ISRO\'s Bhuvan portal, NASA Worldview, or Google Earth) to demonstrate the.', answer: '**Activity: "Spectral Detective" using Bhuvan/Google Earth.** **Steps:** 1',
                  options: ['**Activity: "Spectral Detective" using Bhuvan/Google Earth.** **Steps:** 1', 'takes a photograph'],
                  hint: 'If stuck, revisit \'Light Travels in Straight Lines\' (c6_physics_ch11_036) and \'Reflection of Light\'.',
                  misconception: 'Students often believe that a satellite "takes a photograph" exactly like a smartphone camera – capturing a single snapshot of the whole.' }
          ],
            remediations: { 'a-satellite-takes-a-photograph': { steps: ['** Show a raw "Level-0" satellite data strip (available from ISRO\'s NRSC open data portal or USGS EarthExplorer) –.', '** Demonstrate the push-broom principle: Use a flatbed scanner (or phone panorama sweep) to scan a coloured paper – the.', '** Open a multi-band viewer (e.g., SNAP toolbox free from ESA, or QGIS). Load a Sentinel-2 product.', '** Create a False Colour composite in the software (assign Band 8→R, Band 4→G, Band 3→B). Watch vegetation turn red.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_11', difficulty: 'standard',
          question: 'Earth as a self-sustaining system means the planet maintains stable conditions.',
          hint: 'Revisit c6_physics_ch07_023 (The Water Cycle and Heat Transfer) and c7_physics_ch03_008.',
          misconception: 'Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s cycles are like.',
          parts: [
                { id: 'a', prompt: 'What are the three major biogeochemical cycles that make Earth a self-sustaining system, and what is the primary energy source driving them?', answer: 'The three major cycles are the water cycle, carbon cycle, and nitrogen cycle',
                  options: ['The three major cycles are the water cycle, carbon cycle, and nitrogen cycle', 'oxygen cycle', 'geothermal energy drives the water cycle', 'self-sustaining'],
                  hint: 'Revisit c6_physics_ch07_023 (The Water Cycle and Heat Transfer) and c7_physics_ch03_008 (Water.',
                  misconception: 'Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s cycles are like a perpetual motion machine.' },
                { id: 'b', prompt: 'Explain why Earth is considered a "closed system for matter but an open system for energy" and how this relates to the cycles being self-sustaining.', answer: 'Earth is closed for matter',
                  options: ['Earth is closed for matter', 'Earth gets new matter from the Sun', 'self-sustaining', 'unchanging'],
                  hint: 'Revisit c6_physics_ch07_023 (The Water Cycle and Heat Transfer) and c7_physics_ch03_008 (Water.',
                  misconception: 'Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s cycles are like a perpetual motion machine.' },
                { id: 'c', prompt: 'A farmer clears a forest to create a rice paddy. Trace the effect on the water cycle and carbon cycle in this area over 5 years.', answer: 'Water cycle: (1) Reduced transpiration → less local humidity and rainfall',
                  options: ['Water cycle: (1) Reduced transpiration → less local humidity and rainfall', 'less trees', 'self-sustaining', 'unchanging'],
                  hint: 'Revisit c6_physics_ch07_023 (The Water Cycle and Heat Transfer) and c7_physics_ch03_008 (Water.',
                  misconception: 'Students think "self-sustaining" means "unchanging" or "indestructible" — they imagine Earth\'s cycles are like a perpetual motion machine.' }
          ],
            remediations: { 'self-sustaining-means-unchanging-or': { steps: ['Revisit the water cycle diagram from Class 6 (c6_physics_ch07_023) and Class 7 (c7_physics_ch03_008) — trace a single.', 'Do the "bottle biosphere" activity: seal a plant with soil and water in a clear jar, place in sunlight, observe.', 'Use a bathtub analogy: water flowing in (tap) = solar energy driving cycles; drain open = heat radiating to space.', 'Plug the drain slightly (greenhouse gases) → level rises (temperature increases) until a new equilibrium.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_2', difficulty: 'standard',
          question: 'Earth\'s crust is the outermost solid rocky layer of our planet, averaging only.',
          hint: 'Review unit conversions (km ↔ m ↔ mm) and ratio calculations from Class 6/7 measurement.',
          misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds.',
          parts: [
                { id: 'a', prompt: 'If Earth were scaled down to a sphere of radius 50 cm (like a large beach ball), calculate the thickness of continental crust and oceanic crust on this model.', answer: '**Step 1:** Identify scale factor',
                  options: ['**Step 1:** Identify scale factor', 'lithosphere'],
                  hint: 'Review unit conversions (km ↔ m ↔ mm) and ratio calculations from Class 6/7 measurement topics.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' },
                { id: 'b', prompt: 'Compare the following two statements and identify which is scientifically accurate.', answer: 'Statement B is accurate',
                  options: ['Statement B is accurate', 'lithosphere'],
                  hint: 'Review unit conversions (km ↔ m ↔ mm) and ratio calculations from Class 6/7 measurement topics.',
                  misconception: 'Students often think "crust" and "lithosphere" are the same, or that the crust is a thick, uniform shell hundreds of kilometres deep.' }
          ],
            remediations: { 'crust-and-lithosphere-are-the': { steps: ['**Apple Demo:** Slice an apple horizontally.', 'Show skin = crust (∼0.3 mm), flesh = mantle, seeds = core.', 'Measure apple radius (∼35 mm) and skin thickness.', 'Calculate ratio (0.3/35 ≈ 1/117).'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_3', difficulty: 'standard',
          question: 'The atmosphere is the envelope of gases surrounding Earth, held by gravity.',
          hint: 'Review Class 7 convection (c7_physics_ch03_004) and radiation (c7_physics_ch03_006) with.',
          misconception: 'Students think "temperature increases with altitude everywhere because you are closer to the Sun." They ignore that the.',
          parts: [
                { id: 'a', prompt: 'What are the two most abundant gases in Earth\'s atmosphere and their approximate percentages by volume in dry air?', answer: 'Nitrogen (~78%) and oxygen (~21%)',
                  options: ['Nitrogen (~78%) and oxygen (~21%)', '"temperature increases with altitude everywhere'],
                  hint: 'Review Class 7 convection (c7_physics_ch03_004) and radiation (c7_physics_ch03_006) with the water.',
                  misconception: 'Students think "temperature increases with altitude everywhere because you are closer to the Sun." They ignore that the Sun\'s energy mostly.' },
                { id: 'b', prompt: 'Compare the troposphere and thermosphere: which has higher particle density, which has higher temperature, and why does the thermosphere not feel "hot" to.', answer: 'Troposphere has much higher particle density (most mass of atmosphere)',
                  options: ['Troposphere has much higher particle density (most mass of atmosphere)', 'thermosphere is hot so satellites melt', '"temperature increases with altitude everywhere'],
                  hint: 'Review Class 7 convection (c7_physics_ch03_004) and radiation (c7_physics_ch03_006) with the water.',
                  misconception: 'Students think "temperature increases with altitude everywhere because you are closer to the Sun." They ignore that the Sun\'s energy mostly.' }
          ],
            remediations: { 'temperature-increases-with-altitude-everywhere': { steps: ['Take the student to a sunny wall and a shaded wall at the same time of day.', 'Feel the temperature difference — the ground heats the air, not the Sun directly.', 'Then use a thermometer at ground level and on a high balcony (if safe) to show temperature drops with height.', 'Finally, show a graph of atmospheric temperature vs altitude and ask them to locate where the Sun\'s rays first hit.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_4', difficulty: 'standard',
          question: 'The atmosphere sustains life by providing oxygen (O₂) for aerobic respiration.',
          hint: 'Revisit the pie-chart of air composition in c8_physics_ch9_3 and the respiration activity.',
          misconception: 'Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them to believe that.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage of oxygen and carbon dioxide in dry air by volume, and name the two major biological processes that cycle these gases between.', answer: 'Oxygen ≈ 21%, carbon dioxide ≈ 0.04% (400 ppm)',
                  options: ['Oxygen ≈ 21%, carbon dioxide ≈ 0.04% (400 ppm)', 'removing all CO₂ from the atmosphere would be beneficial for life'],
                  hint: 'Revisit the pie-chart of air composition in c8_physics_ch9_3 and the respiration activity (blowing.',
                  misconception: 'Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them to believe that removing all CO₂ from the.' },
                { id: 'b', prompt: 'Explain why a sealed glass jar containing only a mouse and no plants will eventually kill the mouse, whereas a jar with both a mouse and a healthy plant can.', answer: 'The mouse respires continuously, consuming O₂ and producing CO₂',
                  options: ['The mouse respires continuously, consuming O₂ and producing CO₂', 'creates oxygen from nothing', 'removing all CO₂ from the atmosphere would be beneficial for life'],
                  hint: 'Revisit the pie-chart of air composition in c8_physics_ch9_3 and the respiration activity (blowing.',
                  misconception: 'Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them to believe that removing all CO₂ from the.' },
                { id: 'c', prompt: 'A classroom of volume 180 m³ has air with 21% oxygen by volume.', answer: 'Step 1: Total air volume = 180 m³ = 180,000 L',
                  options: ['Step 1: Total air volume = 180 m³ = 180,000 L', 'removing all CO₂ from the atmosphere would be beneficial for life'],
                  hint: 'Revisit the pie-chart of air composition in c8_physics_ch9_3 and the respiration activity (blowing.',
                  misconception: 'Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them to believe that removing all CO₂ from the.' },
                { id: 'd', prompt: 'Compare the role of carbon dioxide in (a) the greenhouse effect and (b) ocean acidification.', answer: 'the greenhouse effect and (',
                  options: ['the greenhouse effect and (', 'removing all CO₂ from the atmosphere would be beneficial for life'],
                  hint: 'Revisit the pie-chart of air composition in c8_physics_ch9_3 and the respiration activity (blowing.',
                  misconception: 'Students often think carbon dioxide is "bad" and oxygen is "good" in absolute terms, leading them to believe that removing all CO₂ from the.' }
          ],
            remediations: { 'carbon-dioxide-is-bad-and': { steps: ['Show a 2-minute video of a time-lapse plant growing in a sealed bottle garden (search "bottle garden David Latimer").', 'Have students blow through a straw into lime water (turns milky) and then place a sprig of hydrilla in the same water.', 'Ask: "If we removed all CO₂, what happens to the plant?', 'What happens to Earth\'s temperature?" 4.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
