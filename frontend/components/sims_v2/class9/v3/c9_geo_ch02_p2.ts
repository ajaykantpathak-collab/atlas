import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch02_p2: SimDef = {
    id: 'v3_c9_geo_ch02_p2',
    title: 'Atmosphere and Climate · Part 2/2',
    subtitle: 'The invisible cocktail inside every breath',
    classLevel: 9, subject: 'geography', topic: 'Atmosphere and Climate · Part 2/2',
    chapters: ['c9_geo_ch02'],
    nodeIds: ['c9_geo_ch2_5', 'c9_geo_ch2_6', 'c9_geo_ch2_7', 'c9_geo_ch2_8', 'c9_geo_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an atmospheric analyst', intro: 'Sticky Mumbai monsoon air and crisp Delhi winter air are the \'same\' air — with different water vapour. Decode what air is actually made of, and why the tiniest ingredient steers the climate.', goal: 'Understand the atmosphere\'s composition — permanent gases (N₂ ~78%, O₂ ~21%, Ar ~1%) versus variable water vapour — and the distinct climate roles of CO₂, water vapour and ozone.' },
    discovery: {
        question: 'We breathe oxygen — so the atmosphere must be mostly oxygen, right? What actually fills 78% of every breath you take?',
        options: ['Nitrogen — the quiet majority that dilutes oxygen enough to stop everything from bursting into flames', 'Oxygen — it\'s what we need most', 'Carbon dioxide — it\'s the famous one', 'Water vapour — it\'s everywhere'],
        answer: 'Nitrogen — the quiet majority that dilutes oxygen enough to stop everything from bursting into flames',
        hook: '\'Trace gas\' doesn\'t mean \'unimportant.\' CO₂ is just 0.04% of air yet it\'s the climate\'s control knob — water vapour (up to 4%) only amplifies what CO₂ starts. And water vapour is the variable gas that makes monsoon air feel heavy while desert air stays crisp.',
    },
    teaching: [
        { title: 'Local Winds: Loo, Mistral and Chinook', text: 'Local winds are winds that blow over a limited geographical area due to local pressure gradients created by differential heating of land and water surfaces or topographic funneling effects.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch2_5', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect a breath of air: pin down the percentages of nitrogen, oxygen and argon, figure out why oxygen stays at ~21% up to 100 km then thins out above, and judge whether methane\'s 28× heat-trapping punch makes it scarier than CO₂.',
        labels: ['Local Winds: Loo, Mistral', 'Seasons: Rotation, Revolution', 'Indian Monsoon: Onset, Withdrawal', 'Climate vs Weather: Difference', 'Climate Change: Causes'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_geo_ch2_5', title: 'Local Winds: Loo, Mistral and Chinook',
          caseStudy: { intro: 'Imagine standing in Delhi on a May afternoon at 2 PM: the air is still, the sun is scorching, and suddenly a hot, gritty wind hits your face, raising the.',
            decisions: [{ prompt: 'Define the term \'Loo\' and state the specific months and region in India where it is most intensely experienced.', options: [
                { text: 'Loo is a hot, dry, dust-laden local wind that blows over the North Indian plains (Punjab,', outcome: 'Loo is a hot, dry, dust-laden local wind that blows over the North Indian plains (Punjab, Haryana.' },
                { text: 'summer monsoon wind', outcome: 'Not quite — Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because.', reveals: 'the-loo-is-a-summer' },
                { text: 'it blows in winter or brings rain', outcome: 'Not quite — Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because.', reveals: 'the-loo-is-a-summer' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch2_6', title: 'Seasons: Rotation, Revolution and the Sun\'s Position',
          caseStudy: { intro: 'Observe how the shadow of your school flagpole changes length and direction from June to December — it is shortest in June and longest in December.',
            decisions: [{ prompt: 'What is the angle of Earth\'s axial tilt relative to its orbital plane, and how does this tilt remain oriented as Earth revolves around the.', options: [
                { text: 'Earth\'s axial tilt is 23.5° relative to the perpendicular of its orbital plane (ecliptic)', outcome: 'Earth\'s axial tilt is 23.5° relative to the perpendicular of its orbital plane (ecliptic).' },
                { text: 'tilt changes during orbit', outcome: 'Not quite — Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.', reveals: 'earth-is-closer-to-the' },
                { text: 'tilt is 90°', outcome: 'Not quite — Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.', reveals: 'earth-is-closer-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch2_7', title: 'Indian Monsoon: Onset, Withdrawal and Mechanism',
          caseStudy: { intro: 'Start by asking students to observe the sudden change in their local weather around early June: the oppressive summer heat breaks with the first heavy rain.',
            decisions: [{ prompt: 'What is the primary cause of the seasonal reversal of winds in the Indian Monsoon system?', options: [
                { text: 'The primary cause is differential heating of the Indian landmass and the surrounding', outcome: 'The primary cause is differential heating of the Indian landmass and the surrounding Indian Ocean.' },
                { text: 'Earth\'s rotation', outcome: 'Not quite — Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because.', reveals: 'the-southwest-monsoon-winds-originate' },
                { text: 'Himalayas blocking winds', outcome: 'Not quite — Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because.', reveals: 'the-southwest-monsoon-winds-originate' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_8', title: 'Climate vs Weather: Difference and Elements',
          scaffold: { problem: 'The India Meteorological Department (IMD) releases the 30-year climate normal (1981–2010) for Pune: June mean maximum temperature = 35.2°C.',
            steps: [
            { text: 'Identify the climate normal values (30-year averages) for temperature and rainfall from the IMD table.' },
            { text: 'Identify the observed June 2023 values (single month = weather).' },
            { text: 'Compute temperature anomaly = Observed - Normal = 37.8 - 35.2 = +2.6°C.' },
            { text: 'Compute rainfall anomaly = Observed - Normal = 80 - 145 = -65 mm (deficit).' },
            { text: 'Classify: The normal is climate (30-year average); June 2023 values are weather (one month).', faded: true, blankAnswer: 'Temperature anomaly +2.6°C (warmer than climate normal).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_9', title: 'Climate Change: Causes and Evidence',
          scaffold: { problem: 'Using the CO₂ forcing formula, calculate the radiative forcing from pre-industrial (280 ppm) to 2023 (419 ppm).',
            steps: [
            { text: 'Identify the formula ΔF = 5.35 × ln(C/C₀) for CO₂ radiative forcing.' },
            { text: 'Substitute C = 419 ppm, C₀ = 280 ppm → ΔF = 5.35 × ln(419/280) = 5.35 × ln(1.496) ≈ 5.35 × 0.403 ≈ 2.16 W/m².' },
            { text: 'Calculate equilibrium warming ΔT = λ × ΔF = 0.8 × 2.16 ≈ 1.73°C.' },
            { text: 'Note observed warming is ~1.2°C (1850–1900 to 2023). Discrepancy = 0.53°C.' },
            { text: 'Explain: (a) Ocean thermal inertia delays full equilibrium response (~0.4°C unrealized warming).', faded: true, blankAnswer: 'CO₂ forcing ≈ 2.16 W/m²; equilibrium warming ≈ 1.73°C.' }
            ] } },
        { type: 'case', nodeId: 'c9_geo_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling in an atmosphere pie chart, Meera writes: \'Air is basically all oxygen — that\'s what we breathe — and CO₂ at 0.04% is so tiny it cannot matter for climate.\'',
            decisions: [{ prompt: 'What does the real composition show?', options: [
                { text: 'Nitrogen dominates at ~78%, oxygen is ~21%, argon ~0.93% — oxygen is not even half of air. And 0.04% is not insignificant: CO₂ absorbs infrared where water vapour is transparent, so a trace gas steers the whole climate. Water vapour, meanwhile, is the variable gas driving weather.', outcome: 'This replaces \'we breathe it so it\'s most of air\' with the measured percentages, and shows trace does not mean trivial.' },
                { text: 'Meera is right — since we breathe oxygen, air must be mostly oxygen; filler gases like nitrogen don\'t count.', outcome: 'Breathing uses a minority gas; nitrogen\'s bulk is not filler — it dilutes oxygen enough to prevent runaway combustion and feeds the soil\'s nitrogen cycle.', reveals: 'air-is-mostly-oxygen' },
                { text: 'Water vapour is the biggest gas since it drives all weather — permanent gases are the minor part.', outcome: 'Water vapour tops out near 4% and swings with place and season; the weather-maker is a variable trace, while nitrogen quietly forms four-fifths of the air.', reveals: 'water-vapour-dominates' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Air is a precise cocktail: ~78% nitrogen, ~21% oxygen, ~1% argon, plus a variable splash of water vapour that runs all our weather. Change the trace gases by a whisker and the climate notices.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch2_5', difficulty: 'standard',
          question: 'Local winds are winds that blow over a limited geographical area due to local.',
          hint: 'If stuck, revisit the adiabatic lapse rate concept (dry vs. moist) from physics and the.',
          misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before.',
          parts: [
                { id: 'a', prompt: 'On an outline map of North America, the Rocky Mountains run north-south.', answer: 'The wind is the Chinook',
                  options: ['The wind is the Chinook', 'warm air from the south', 'compression heating without mentioning adiabatic processes', 'summer monsoon wind'],
                  hint: 'If stuck, revisit the adiabatic lapse rate concept (dry vs. moist) from physics and the.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' }
          ],
            remediations: { 'the-loo-is-a-summer': { steps: ['Draw a cross-section of the Thar Desert-North Indian plain at 2 PM in May: show surface heating → low pressure → inflow.', 'Draw a map of Western Europe: plot high pressure over Bay of Biscay, low over Mediterranean, trace air funneling down.', 'Draw a cross-section of the Rockies: moist ascent (cool, rain) → dry descent (warm, dry) → Chinook.', 'Create a comparison table with columns: Wind, Region, Season, Thermal Nature, Driving Mechanism, Topographic Role.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Mistral is essentially a European version of the Loo because both are dry winds caused by high pressure pushing air into low.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'dry wind = same mechanism', 'summer monsoon wind'],
                  hint: 'If stuck, revisit the adiabatic lapse rate concept (dry vs. moist) from physics and the.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' },
                { id: 'b', prompt: 'Design a simple early-warning advisory for farmers in western Uttar Pradesh to mitigate Loo damage to late-sown wheat.', answer: 'the meteorological threshold to trigger the alert, (',
                  options: ['the meteorological threshold to trigger the alert, (', 'summer monsoon wind'],
                  hint: 'If stuck, revisit the adiabatic lapse rate concept (dry vs. moist) from physics and the.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' }
          ],
            remediations: { 'the-loo-is-a-summer': { steps: ['Draw a cross-section of the Thar Desert-North Indian plain at 2 PM in May: show surface heating → low pressure → inflow.', 'Draw a map of Western Europe: plot high pressure over Bay of Biscay, low over Mediterranean, trace air funneling down.', 'Draw a cross-section of the Rockies: moist ascent (cool, rain) → dry descent (warm, dry) → Chinook.', 'Create a comparison table with columns: Wind, Region, Season, Thermal Nature, Driving Mechanism, Topographic Role.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_6', difficulty: 'standard',
          question: 'Seasons are the periodic changes in weather patterns caused by Earth\'s.',
          hint: 'Review Class 7 "Seasons in India" (c7_geo_ch03_002) and Class 8 "Earth as an Oblate.',
          misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate day length at 30°N latitude on the June Solstice (June 21), given that the Sun\'s declination is 23.5°N.', answer: 'Step 1: Latitude = 30°N, Declination = 23.5°N',
                  options: ['Step 1: Latitude = 30°N, Declination = 23.5°N', 'equal day/night everywhere or cannot apply the spherical geometry formula', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Review Class 7 "Seasons in India" (c7_geo_ch03_002) and Class 8 "Earth as an Oblate Spheroid".',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' },
                { id: 'b', prompt: 'Compare the seasonal temperature range at 60°N (e.g., Oslo) versus 10°N (e.g., Chennai).', answer: 'At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)',
                  options: ['At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)', 'distance from equator', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Review Class 7 "Seasons in India" (c7_geo_ch03_002) and Class 8 "Earth as an Oblate Spheroid".',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' }
          ],
            remediations: { 'earth-is-closer-to-the': { steps: ['Show a diagram of Earth\'s orbit with correct perihelion/aphelion dates labeled.', 'Have students calculate solar constant at perihelion (1412 W/m²) vs. aphelion (1321 W/m²) — only 7% difference.', 'Compare with solar angle change: at 30°N, noon Sun altitude is 83.5° in June vs.', 'Conclude distance effect is minor; tilt effect is dominant.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_7', difficulty: 'standard',
          question: 'The Indian Monsoon is a seasonal reversal of wind direction over the Indian.',
          hint: 'Revisit c9_geo_ch2_3 (Air Pressure: Horizontal and Vertical Distribution) – specifically.',
          misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize.',
          parts: [
                { id: 'a', prompt: 'Compare the withdrawal of the Southwest Monsoon with the onset of the Northeast Monsoon. Are they the same process?', answer: 'No, they are distinct',
                  options: ['No, they are distinct', 'just reversal'],
                  hint: 'Revisit c9_geo_ch2_3 (Air Pressure: Horizontal and Vertical Distribution) – specifically the.',
                  misconception: 'Students believe the Southwest Monsoon winds originate *only* from the Bay of Bengal because textbooks often emphasize the Bay of Bengal.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-originate': { steps: ['Show a wind streamline map of June (from IMD or NCERT atlas) with arrows clearly marking both branches originating from.', 'Trace the Arabian Sea branch: hits Kerala coast June 1 → Mumbai June 10 → Gujarat → Madhya Pradesh → merges with Bay.', 'Trace the Bay branch: hits Andaman May 20 → Myanmar coast → West Bengal → splits along Himalayas (Brahmaputra valley).', 'Overlay rainfall data (June-Sept) showing highest totals on Western Ghats windward side (Arabian Sea branch) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_8', difficulty: 'standard',
          question: 'Weather is the short-term state of the atmosphere at a specific place and time.',
          hint: 'Revisit c7_geo_ch02_001 (Weather: Definition and Elements) and c7_geo_ch02_007 (Weather.',
          misconception: 'Students think "climate is just weather averaged over many years" and therefore believe that if they average a few.',
          parts: [
                { id: 'a', prompt: 'A weather station in Bhopal records the following daily maximum temperatures (°C) for June 1–5: 42, 44, 41, 45, 43. The 30-year normal for June 1–5 is 40°C.', answer: 'Step 1: Find deviations: +2, +4, +1, +5, +3',
                  options: ['Step 1: Find deviations: +2, +4, +1, +5, +3', 'climate', 'climate is just weather averaged over many years', 'if they average a few years of weather data they get climate'],
                  hint: 'Revisit c7_geo_ch02_001 (Weather: Definition and Elements) and c7_geo_ch02_007 (Weather.',
                  misconception: 'Students think "climate is just weather averaged over many years" and therefore believe that if they average a few years of weather data.' }
          ],
            remediations: { 'climate-is-just-weather-averaged': { steps: ['Show a graph of 10-year running means of annual rainfall for Mumbai (1901–2020) — point out how the mean shifts with.', 'Overlay the 30-year normal (1981–2010) as a horizontal line.', 'Ask: "Does the 10-year average equal the 30-year normal?"', 'Conclude that climate normals require a fixed, internationally agreed window to be comparable across stations.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_9', difficulty: 'standard',
          question: 'Climate change refers to long-term shifts in global or regional temperature and.',
          hint: 'Review c9_geo_ch2_1 (atmospheric composition) and c9_geo_ch2_2 (vertical temperature.',
          misconception: 'Students often think \'climate change\' and \'global warming\' are synonyms, and that evidence relies solely on thermometer.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Climate change refers to long-term shifts in global or regional temperature and weather',
                  options: ['Climate change refers to long-term shifts in global or regional temperature and weather', 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting primarily of', 'Carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide,', 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and'],
                  hint: 'Review c9_geo_ch2_1 (atmospheric composition) and c9_geo_ch2_2 (vertical temperature structure).',
                  misconception: 'Students often think \'climate change\' and \'global warming\' are synonyms, and that evidence relies solely on thermometer records.' }
          ],
            remediations: { 'climate-change-and-global-warming': { steps: ['Show the NASA GISS temperature anomaly map for a recent year — point out that \'global warming\' means planetary average.', 'Use the \'fingerprint\' diagram (IPCC AR6 Fig. 3.8) showing observed vs.', 'Have students plot CO₂ and temperature from Vostok ice core (800 kyr) — they\'ll see tight coupling but also that CO₂.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
