import type { SimDef } from '../../engine/types';

/** v3 generated — c9_physics_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_physics_ch06_p1: SimDef = {
    id: 'v3_c9_physics_ch06_p1',
    title: 'Earth\'s Atmosphere and Climate · Part 1/2',
    subtitle: 'Why the poles freeze and the equator bakes',
    classLevel: 9, subject: 'physics', topic: 'Earth\'s Atmosphere and Climate · Part 1/2',
    chapters: ['c9_physics_ch06'],
    nodeIds: ['c9_physics_ch6_1', 'c9_physics_ch6_10', 'c9_physics_ch6_11', 'c9_physics_ch6_2', 'c9_physics_ch6_3', 'c9_physics_ch6_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a solar-energy mapper', intro: 'Same Sun, same planet — wildly different heating. Follow one sunbeam from equator to pole and watch it stretch thin, and discover the cosine rule that runs Earth\'s entire climate engine.', goal: 'Explain uneven solar heating — angle of incidence, area spread, atmospheric path and day length — driven by Earth\'s spherical shape and 23.5° axial tilt.' },
    discovery: {
        question: 'Earth is closest to the Sun in January — yet that\'s when the Northern Hemisphere freezes through winter. If distance controlled the seasons, shouldn\'t January be the warmest?',
        options: ['No — the 23.5° axial tilt wins: the hemisphere tilted away gets slanted rays spread thin over more area, no matter the small distance change', 'Yes — it should be warmer; the seasons are broken', 'The calendar is misaligned with the Sun', 'January is actually Earth\'s farthest point'],
        answer: 'No — the 23.5° axial tilt wins: the hemisphere tilted away gets slanted rays spread thin over more area, no matter the small distance change',
        hook: 'Slant is everything: the same sunbeam covering 1 m² at the equator spreads across ~2 m² at 60° latitude, halving the heating. And in June, the far north\'s 18-hour days can out-collect the equator\'s intense noon — day length can beat ray angle.',
    },
    teaching: [
        { title: 'Uneven Heating of the Earth by Solar Radiation', text: 'Uneven heating of the Earth by solar radiation is the phenomenon where different regions of Earth\'s surface receive different amounts of solar energy per unit area due to the planet\'s spherical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_physics_ch6_1', title: 'Your mission',
          mission: { widget: 'circuit', validate: 'circuit:switch=1',
            instruction: 'On the lab: close the switch so the circuit is complete — does the bulb light?.',
        context: 'Quantify the slant: use insolation = solar constant × cos(zenith angle) to find noon heating at 45°, prove why poles stay cold, and test whether 60°N\'s endless June day really beats the equator\'s blazing noon.',
            observePrompt: 'What did the circuit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_1', title: 'Uneven Heating of the Earth by Solar Radiation',
          scaffold: { problem: 'On the December solstice, the subsolar point is at 23.5°S latitude.',
            steps: [
            { text: 'Identify geometry. On December solstice, Earth\'s North Pole is tilted 23.5° away from the Sun.' },
            { text: 'For a location at latitude φ, solar zenith angle θ at noon = |φ - φ_subsolar| where φ_subsolar = -23.5° (negative for.' },
            { text: '(a) At 23.5°N: θ = |23.5° + 23.5°| = 47.0°. Insolation I = 1361 × cos(47.0°). cos(47.0°) ≈ 0.682.' },
            { text: '(b) At 66.5°N: θ = |66.5° + 23.5°| = 90.0°. cos(90°) = 0. I = 1361 × 0 = 0 W/m².' },
            { text: 'Verify: At Arctic Circle on December solstice, Sun does not rise — insolation zero is correct.', faded: true, blankAnswer: '(a) θ = 47.0°, I ≈ 928 W/m²; (b) θ = 90.0°, I = 0 W/m²' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_10', title: 'Oxygen Cycle and Its Role in Nature',
          scaffold: { problem: 'A 500 mL respirometer contains germinating moong seeds at 25°C.',
            steps: [
            { text: 'Identify given quantities: V_tube = πr²h = π × (0.1 cm)² × 12 cm = 0.377 cm³ = 3.77 × 10⁻⁴ L; t = 30 min; T = 25°C.' },
            { text: 'Identify formula: PV = nRT → n = PV/RT for moles of O₂ consumed (since CO₂ absorbed, volume change = O₂ consumed).' },
            { text: 'Substitute values: n = (1 atm × 3.77 × 10⁻⁴ L) / (0.0821 L·atm/mol·K × 298 K) = 1.54 × 10⁻⁵ mol O₂.' },
            { text: 'Convert to μmol and rate: 1.54 × 10⁻⁵ mol = 15.4 μmol; Rate = 15.4 μmol / 30 min = 0.513 μmol/min.' },
            { text: 'Verify reasonableness: 0.5 μmol/min for ~20 seeds ≈ 0.025 μmol/min/seed — matches literature values for germinating.', faded: true, blankAnswer: '0.51 μmol/min (or 5.1 × 10⁻⁷ mol/min)' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch6_11', title: 'Human Impact on Climate: Pollution and Deforestation',
          caseStudy: { intro: 'Begin by asking students to observe the difference in temperature between a shaded area under a tree and an open concrete playground in their school at noon.',
            decisions: [{ prompt: 'State the primary greenhouse gases released by human activities and their main anthropogenic sources.', options: [
                { text: 'The primary greenhouse gases are carbon dioxide (CO₂) from fossil fuel combustion and', outcome: 'The primary greenhouse gases are carbon dioxide (CO₂) from fossil fuel combustion and cement.' },
                { text: 'lists only CO₂ or confuses natural sources (e', outcome: 'Not quite — Students often think that the greenhouse effect is caused by the ozone hole, or that all air.', reveals: 'the-greenhouse-effect-is-caused' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_physics_ch6_2', title: 'Latitude and Its Effect on Temperature',
          scaffold: { problem: 'Mumbai (19°N) and Delhi (29°N) experience solar noon on the autumn equinox.',
            steps: [
            { text: 'Identify given: latitude_Mumbai = 19°N, latitude_Delhi = 29°N, I₀ = 1361 W/m², equinox → solar altitude = 90°.' },
            { text: 'Compute incidence angle θ = latitude (since solar altitude = 90° – latitude, and incidence angle = 90° – altitude.' },
            { text: 'Calculate irradiance for Mumbai: I_M = 1361 × cos(19°) = 1361 × 0.9455 = 1286.7 W/m².' },
            { text: 'Calculate irradiance for Delhi: I_D = 1361 × cos(29°) = 1361 × 0.8746 = 1190.3 W/m².' },
            { text: 'Compute percentage difference = [(I_M – I_D) / I_M] × 100 = [(1286.7 – 1190.3) / 1286.7] × 100 = 7.5%.' },
            { text: 'Verify: cos decreases with angle, so higher latitude gets less irradiance; 7.5% is reasonable for 10° latitude.', faded: true, blankAnswer: 'Mumbai receives 7.5% more solar irradiance than Delhi.' }
            ] } },
        { type: 'case', nodeId: 'c9_physics_ch6_3', title: 'Structure of the Atmosphere: Layers and Composition',
          caseStudy: { intro: 'Begin by observing a hot-air balloon rising at a local fair: as it ascends, the air gets colder, then surprisingly warmer, then colder again, and finally.',
            decisions: [{ prompt: 'Name the five principal layers of Earth\'s atmosphere in order from the surface upward, and state the approximate altitude range of the.', options: [
                { text: 'Troposphere (0–12 km), Stratosphere (12–50 km), Mesosphere (50–85 km), Thermosphere', outcome: 'Troposphere (0–12 km), Stratosphere (12–50 km), Mesosphere (50–85 km), Thermosphere (85–600 km).' },
                { text: 'ozone layer', outcome: 'Not quite — Students often think the "ozone layer" is a distinct, thick shell of pure ozone gas.', reveals: 'the-ozone-layer-is-a' },
                { text: 'the "ozone layer" is a distinct, thick shell of pure ozone gas', outcome: 'Not quite — Students often think the "ozone layer" is a distinct, thick shell of pure ozone gas.', reveals: 'the-ozone-layer-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch6_4', title: 'Local Winds: Land and Sea Breezes',
          caseStudy: { intro: 'Imagine standing on Marina Beach in Chennai at noon: you feel a cool wind blowing from the sea toward the land. By midnight, that wind has reversed direction.',
            decisions: [{ prompt: 'Define sea breeze and land breeze, and state the typical time of day each occurs at a tropical coastal location.', options: [
                { text: 'Sea breeze: wind blowing from sea to land, typically from late morning (10-11 AM) to', outcome: 'Sea breeze: wind blowing from sea to land, typically from late morning (10-11 AM) to sunset.' },
                { text: 'wind blows *from* the warmer region *to* the cooler region (hot → cold)', outcome: 'Not quite — Students often believe wind blows *from* the warmer region *to* the cooler region (hot → cold).', reveals: 'wind-blows-from-the-warmer' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch6_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Reading that Earth is closest to the Sun in January, a student concludes: \'So Delhi\'s January should be its warmest month — less distance, more heat. The tilt idea is a myth.\'',
            decisions: [{ prompt: 'What actually drives the seasons?', options: [
                { text: 'Geometry, not distance: Earth\'s 23.5° tilt makes the Sun\'s rays strike the northern hemisphere at a slant in January, spreading the same beam over more area and shortening the day — that is why it is winter while Earth is near perihelion. The distance change is only a few per cent; the angle change is the dominant term.', outcome: 'This applies the cosine-of-zenith-angle idea — slanted light is diluted light — and correctly ranks tilt above orbital distance.' },
                { text: 'The student is right — nearer the Sun always means hotter, so the calendar confirms it.', outcome: 'The orbit is nearly circular — perihelion changes sunlight by only ~7% — while tilted incidence and day length swing heating far more; the Southern Hemisphere is in summer at the same moment.', reveals: 'distance-drives-seasons' },
                { text: 'Neither matters — seasons come from ocean currents carrying warm and cold water around the globe.', outcome: 'Currents redistribute heat but cannot create the global winter-summer pattern; the input is uneven insolation set by tilt and solar angle.', reveals: 'currents-make-seasons' }
            ] }] } },
        { type: 'case', nodeId: 'c9_physics_ch6_4', title: 'The bigger picture',
          caseStudy: { intro: 'It\'s not how far the Sun is — it\'s how squarely its rays hit. Spherical geometry, axial tilt and day length together decide who bakes and who freezes, driving every wind and current on Earth.',
            decisions: [{ prompt: 'What comes next? Earth\'s Atmosphere and Climate · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Earth\'s Atmosphere and Climate · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'circuit', prompt: 'Explore the circuit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'circuit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_physics_ch6_1', difficulty: 'standard',
          question: 'Uneven heating of the Earth by solar radiation is the phenomenon where.',
          hint: 'Revisit Class 7 node c7_physics_ch06_010 (Earth\'s Axis and Its Tilt) and practice drawing.',
          misconception: 'Students believe that the Earth\'s elliptical orbit (distance variation) is the primary cause of seasons and uneven.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Uneven heating of the Earth by solar radiation is the phenomenon where different regions',
                  options: ['Uneven heating of the Earth by solar radiation is the phenomenon where different regions', 'The oxygen cycle is the biogeochemical cycle that describes the movement of oxygen atoms', 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and', 'Latitude is the angular distance of a place north or south of the Earth\'s equator'],
                  hint: 'Revisit Class 7 node c7_physics_ch06_010 (Earth\'s Axis and Its Tilt) and practice drawing the.',
                  misconception: 'Students believe that the Earth\'s elliptical orbit (distance variation) is the primary cause of seasons and uneven heating, rather than the.' }
          ],
            remediations: { 'the-earth-s-elliptical-orbit': { steps: ['Use a globe and a single lamp in a dark room. Mark the subsolar point at solstices and equinoxes.', 'Measure the shadow of a vertical pin at different latitudes on the globe at "noon" — shadow length ∝ tan(zenith angle).', 'Plot shadow length vs latitude and compare to cos(zenith angle) curve.', 'Explicitly calculate the percentage change in solar constant due to distance variation (3.4%) versus the factor of 2–3.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_10', difficulty: 'standard',
          question: 'The oxygen cycle is the biogeochemical cycle that describes the movement.',
          hint: 'Revisit c9_physics_ch6_8 (Carbon Cycle) for the coupled C-O stoichiometry, and.',
          misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50%.',
          parts: [
                { id: 'a', prompt: 'State the balanced chemical equation for aerobic respiration and identify which side represents oxygen consumption.', answer: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy',
                  options: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy', 'produced by trees and stored in the atmosphere'],
                  hint: 'Revisit c9_physics_ch6_8 (Carbon Cycle) for the coupled C-O stoichiometry, and c8_physics_ch8_4 for.',
                  misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50% of photosynthetic O₂.' },
                { id: 'b', prompt: 'Compare the oxygen flux from marine photosynthesis vs. terrestrial photosynthesis.', answer: 'Terrestrial photosynthesis contributes slightly more O₂',
                  options: ['Terrestrial photosynthesis contributes slightly more O₂', 'marine because oceans are larger', 'produced by trees and stored in the atmosphere'],
                  hint: 'Revisit c9_physics_ch6_8 (Carbon Cycle) for the coupled C-O stoichiometry, and c8_physics_ch8_4 for.',
                  misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50% of photosynthetic O₂.' }
          ],
            remediations: { 'oxygen-is-produced-by-trees': { steps: ['Revisit the candle-in-jar demo — measure burn time vs. jar volume to calculate O₂ consumption rate empirically.', 'Use the balanced equation C₆H₁₂O₆ + 6O₂ ⇌ 6CO₂ + 6H₂O to show reversibility — have students write both directions and.', 'Calculate residence time together using real data (reservoir = 1.2 × 10¹⁸ kg, flux = 3 × 10¹⁴ kg/yr) emphasizing unit.', 'Compare with carbon cycle residence time (from c9_physics_ch6_8) to show coupling — O₂ and CO₂ fluxes are.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50%.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If all photosynthesis stopped today, we would run out of oxygen in a few years because humans consume so much." Evaluate this claim using.', answer: 'The claim is false',
                  options: ['The claim is false', 'produced by trees and stored in the atmosphere'],
                  hint: 'Revisit c9_physics_ch6_8 (Carbon Cycle) for the coupled C-O stoichiometry, and c8_physics_ch8_4 for.',
                  misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50% of photosynthetic O₂.' },
                { id: 'b', prompt: 'Design a simple experiment using germinating seeds, a respirometer, and KOH to demonstrate oxygen consumption during respiration.', answer: 'control setup, (',
                  options: ['control setup, (', 'produced by trees and stored in the atmosphere'],
                  hint: 'Revisit c9_physics_ch6_8 (Carbon Cycle) for the coupled C-O stoichiometry, and c8_physics_ch8_4 for.',
                  misconception: 'Students believe oxygen is "produced by trees and stored in the atmosphere" like a warehouse, ignoring that (1) ~50% of photosynthetic O₂.' }
          ],
            remediations: { 'oxygen-is-produced-by-trees': { steps: ['Revisit the candle-in-jar demo — measure burn time vs. jar volume to calculate O₂ consumption rate empirically.', 'Use the balanced equation C₆H₁₂O₆ + 6O₂ ⇌ 6CO₂ + 6H₂O to show reversibility — have students write both directions and.', 'Calculate residence time together using real data (reservoir = 1.2 × 10¹⁸ kg, flux = 3 × 10¹⁴ kg/yr) emphasizing unit.', 'Compare with carbon cycle residence time (from c9_physics_ch6_8) to show coupling — O₂ and CO₂ fluxes are.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_11', difficulty: 'standard',
          question: 'Human impact on climate refers to the alteration of Earth\'s atmospheric.',
          hint: 'Revisit the Carbon Cycle node (c9_physics_ch6_8) and the Role of Atmosphere node.',
          misconception: 'Students often think that the greenhouse effect is caused by the ozone hole, or that all air pollution (like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and',
                  options: ['Human impact on climate refers to the alteration of Earth\'s atmospheric composition and', 'Uneven heating of the Earth by solar radiation is the phenomenon where different regions', 'The oxygen cycle is the biogeochemical cycle that describes the movement of oxygen atoms', 'Latitude is the angular distance of a place north or south of the Earth\'s equator'],
                  hint: 'Revisit the Carbon Cycle node (c9_physics_ch6_8) and the Role of Atmosphere node (c8_physics_ch9_4).',
                  misconception: 'Students often think that the greenhouse effect is caused by the ozone hole, or that all air pollution (like smog/particulate matter) warms.' }
          ],
            remediations: { 'the-greenhouse-effect-is-caused': { steps: ['Show a side-by-side diagram of the greenhouse effect (tropospheric greenhouse gases trapping IR) vs.', 'Use a simple demo: two jars with thermometers, one with CO₂ (from vinegar+baking soda), one with air; shine a lamp.', 'Discuss how sulfates from volcanoes cause cooling (e.g., Pinatubo 1991), contrasting with CO₂ warming.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_2', difficulty: 'standard',
          question: 'Latitude is the angular distance of a place north or south of the Earth\'s.',
          hint: 'Revise Class 9 Maths Chapter 2 (Trigonometry) — specifically cosine values for 0°, 30°.',
          misconception: 'Students think "higher latitude is colder because it is farther from the Sun" — they treat the Earth-Sun distance.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Latitude is the angular distance of a place north or south of the Earth\'s equator',
                  options: ['Latitude is the angular distance of a place north or south of the Earth\'s equator', 'Uneven heating of the Earth by solar radiation is the phenomenon where different regions', 'The oxygen cycle is the biogeochemical cycle that describes the movement of oxygen atoms', 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and'],
                  hint: 'Revise Class 9 Maths Chapter 2 (Trigonometry) — specifically cosine values for 0°, 30°, 45°, 60°.',
                  misconception: 'Students think "higher latitude is colder because it is farther from the Sun" — they treat the Earth-Sun distance difference (equator.' }
          ],
            remediations: { 'higher-latitude-is-colder-because': { steps: ['Hold a flashlight 1 m from a wall; tilt the beam from perpendicular to 60° and trace the bright patch — area grows.', 'Calculate the actual Earth-Sun distance difference: equator 149,597,870 km, pole 149,604,240 km — difference 6,370.', 'Compare to the cosine effect: at 60° latitude, irradiance is cos(60°) = 0.5 of equator — a 50% drop vs 0.004%.', 'Conclude distance is irrelevant; geometry dominates.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_3', difficulty: 'standard',
          question: 'The atmosphere is a layered envelope of gases surrounding Earth, held.',
          hint: 'Revisit c8_physics_ch4_5 (Atmospheric Pressure: Weight of Air Column) and perform the.',
          misconception: 'Students often think the "ozone layer" is a distinct, thick shell of pure ozone gas.',
          parts: [
                { id: 'a', prompt: 'Explain why temperature increases with altitude in the stratosphere but decreases in the troposphere, identifying the specific gas and radiation responsible.', answer: 'In the troposphere, temperature decreases',
                  options: ['In the troposphere, temperature decreases', 'being closer to the Sun', 'greenhouse gases', 'ozone layer'],
                  hint: 'Revisit c8_physics_ch4_5 (Atmospheric Pressure: Weight of Air Column) and perform the "crushing.',
                  misconception: 'Students often think the "ozone layer" is a distinct, thick shell of pure ozone gas.' },
                { id: 'b', prompt: 'A weather balloon records a temperature of 15°C at sea level and –56.5°C at 11 km altitude.', answer: 'Given: ΔT = –56.5°C – 15°C = –71.5°C',
                  options: ['Given: ΔT = –56.5°C – 15°C = –71.5°C', 'ozone layer', 'the "ozone layer" is a distinct, thick shell of pure ozone gas'],
                  hint: 'Revisit c8_physics_ch4_5 (Atmospheric Pressure: Weight of Air Column) and perform the "crushing.',
                  misconception: 'Students often think the "ozone layer" is a distinct, thick shell of pure ozone gas.' }
          ],
            remediations: { 'the-ozone-layer-is-a': { steps: ['Have students calculate the total mass of ozone in a 1 m² column through the stratosphere using the peak mixing ratio.', 'Show that the column mass is only ~3 mm of pure ozone at STP.', 'Then demonstrate catalytic destruction: use a UV lamp, ozone generator, and CFC surrogate (e.g., Freon) in a sealed.', 'This replaces the "shell" mental model with a "trace-gas photochemistry" model.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } },
        { type: 'subpart', nodeId: 'c9_physics_ch6_4', difficulty: 'standard',
          question: 'Land breeze and sea breeze are local wind systems driven by differential.',
          hint: 'Revisit Class 8 "Pressure Exerted by Air" (c8_physics_ch4_5) and "Wind: Movement of Air.',
          misconception: 'Students often believe wind blows *from* the warmer region *to* the cooler region (hot → cold).',
          parts: [
                { id: 'a', prompt: 'At 2:00 PM on a clear summer day at a coastal town, the air temperature over land is 35°C and over the adjacent sea is 28°C.', answer: '1) Solar radiation heats land surface strongly (low specific heat capacity)',
                  options: ['1) Solar radiation heats land surface strongly (low specific heat capacity)', 'wind blows *from* the warmer region *to* the cooler region (hot → cold)'],
                  hint: 'Revisit Class 8 "Pressure Exerted by Air" (c8_physics_ch4_5) and "Wind: Movement of Air Due.',
                  misconception: 'Students often believe wind blows *from* the warmer region *to* the cooler region (hot → cold).' },
                { id: 'b', prompt: 'Compare the typical depth, speed, and duration of sea breeze versus land breeze.', answer: 'Sea breeze: deeper (500-1000 m), faster (5-10 m/s), longer duration (8-10 hours)',
                  options: ['Sea breeze: deeper (500-1000 m), faster (5-10 m/s), longer duration (8-10 hours)', 'wind blows *from* the warmer region *to* the cooler region (hot → cold)'],
                  hint: 'Revisit Class 8 "Pressure Exerted by Air" (c8_physics_ch4_5) and "Wind: Movement of Air Due.',
                  misconception: 'Students often believe wind blows *from* the warmer region *to* the cooler region (hot → cold).' }
          ],
            remediations: { 'wind-blows-from-the-warmer': { steps: ['Draw a two-column diagram: Day (Sun) and Night (Moon).', 'Label land and water temperatures (T_land > T_water day; T_land < T_water night).', 'Below each, draw pressure at surface: Day → Low over land, High over water.', 'Night → High over land, Low over water.'], labTask: { instruction: 'On the interactive: close the switch so the circuit is complete — does the bulb light? — then check.', widget: 'circuit', validate: 'circuit:switch=1' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
