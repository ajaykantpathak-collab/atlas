import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch10_p1: SimDef = {
    id: 'v3_c11_geo_ch10_p1',
    title: 'Climate, Vegetation and Wildlife · Part 1/2',
    subtitle: 'Break the \'latitude decides climate\' habit and meet the monsoon\'s real machinery.',
    classLevel: 11, subject: 'geography', topic: 'Climate, Vegetation and Wildlife · Part 1/2',
    chapters: ['c11_geo_ch10'],
    nodeIds: ['c11_geo_cbse_10_001', 'c11_geo_cbse_10_002', 'c11_geo_cbse_10_003', 'c11_geo_cbse_10_004', 'c11_geo_cbse_10_005', 'c11_geo_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forecaster explaining why two cities share a latitude but not a summer', intro: 'Delhi scorches at 45°C while Shimla stays pleasant — same latitude band, 2,000 metres apart in the sky.', goal: 'Weigh latitude, altitude and distance-from-sea as climate controls and outline the monsoon mechanism.' },
    discovery: {
        question: 'Kanyakumari (8°N) and Bhopal (23°N) both sit in the \'tropical zone\' — so their climates should be similar?',
        options: ['No — coastal Kanyakumari\'s annual range is ~4°C while inland Bhopal\'s is ~18°C; distance-from-sea and altitude override latitude', 'Yes — latitude is the first control, so it decides everything', 'Yes — both get the same monsoon', 'No — only because Bhopal is farther north'],
        answer: 'No — coastal Kanyakumari\'s annual range is ~4°C while inland Bhopal\'s is ~18°C; distance-from-sea and altitude override latitude',
        hook: 'Textbooks list latitude first, so students crown it king — but Shimla\'s May cool and Mumbai\'s mild January are won by altitude and the sea.',
    },
    teaching: [
        { title: 'Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)', text: 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N to 37°6\'N) determines the angle and duration of solar insolation, creating tropical and subtropical zones.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Use the 6.5°C/km lapse rate to price Shimla\'s coolness, then track the ITCZ\'s northward jump and the jet stream that gates the monsoon.',
        labels: ['Climate: Factors Affecting India\'s', 'Monsoon: Origin and Mechanism', 'Seasons in India: Winter,', 'Distribution of Rainfall', 'Climatic Regions of India', 'Natural Vegetation: Types'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_001', title: 'Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)',
          scaffold: { problem: 'Using IMD 1981-2010 normals, analyze why Srinagar (34.08°N, 1585m) has January mean minimum -2.1°C while Hyderabad (17.38°N, 545m) has.',
            steps: [
            { text: 'Identify the three factor differences: Latitude Δφ = 16.7° (Srinagar poleward); Altitude Δz = 1040m (Srinagar higher).' },
            { text: 'Quantify latitude effect: Poleward insolation reduction in January ~0.8°C per degree latitude (empirical for India) →.' },
            { text: 'Quantify altitude effect: Lapse rate 6.5°C/km × 1.04km = 6.76°C cooler for Srinagar.' },
            { text: 'Combine: Expected ΔT = 13.4 + 6.76 = 20.16°C cooler. Observed ΔT = 16.8°C.' },
            { text: 'Interpret residual: Srinagar\'s valley location traps cold air (inversion) but also receives western disturbance cloud.', faded: true, blankAnswer: 'Latitude accounts for ~13.4°C (66%), altitude for ~6.8°C.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_002', title: 'Monsoon: Origin and Mechanism (ITCZ, Jet Streams)',
          caseStudy: { intro: 'Begin by observing the daily weather map in a newspaper during June — notice how the "low pressure area" over northwest India deepens while the "high pressure".',
            decisions: [{ prompt: 'Define the Inter-Tropical Convergence Zone (ITCZ) and state its typical latitudinal position over India during the peak southwest monsoon.', options: [
                { text: 'The ITCZ is a low-pressure trough where northeast and southeast trade winds converge,', outcome: 'The ITCZ is a low-pressure trough where northeast and southeast trade winds converge, characterised.' },
                { text: 'ITCZ stays at the equator', outcome: 'Not quite — Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent.', reveals: 'the-monsoon-is-caused-only' },
                { text: 'ITCZ is a high-pressure zone', outcome: 'Not quite — Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent.', reveals: 'the-monsoon-is-caused-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_003', title: 'Seasons in India: Winter, Summer, Southwest Monsoon, Retreating Monsoon',
          caseStudy: { intro: 'Observe how your local weather changes from the crisp, dry mornings of January to the scorching April afternoons, then the sudden arrival of moisture-laden.',
            decisions: [{ prompt: 'State the typical duration (months) of the Southwest Monsoon season as defined by the India Meteorological Department (IMD) and name the.', options: [
                { text: 'The Southwest Monsoon season lasts from June to September', outcome: 'The Southwest Monsoon season lasts from June to September. It splits into the Arabian Sea branch.' },
                { text: 'May-October or naming only one branch', outcome: 'Not quite — Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.', reveals: 'the-southwest-monsoon-winds-blow' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_004', title: 'Distribution of Rainfall in India: Regional Variation',
          scaffold: { problem: 'A farmer in Nashik district (Maharashtra) receives 650 mm annual rainfall with CV = 28%.',
            steps: [
            { text: 'Identify the rainfall regime: 650 mm places Nashik in the "low rainfall" zone (50–100 cm), typical of the rain-shadow.' },
            { text: 'Determine crop water requirement: Sugarcane needs 1,500–2,500 mm water over 12–18 months; sorghum needs 400–600 mm over.' },
            { text: 'Assess groundwater recharge: In rain-shadow zones with high-intensity, low-duration rain (30–40 rainy days).' },
            { text: 'Analyze drought probability: With CV = 28%, probability of rainfall <500 mm (severe drought) ≈ 15–20% (assuming.' },
            { text: 'Evaluate economic risk: Sugarcane input cost ₹1.5–2 lakh/ha; total loss in drought years.' },
            { text: 'Synthesize recommendation: Shift only if (a) canal command area confirmed, (b) groundwater depth <15 m with sustainable.', faded: true, blankAnswer: 'Not feasible without assured surface irrigation. High.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_005', title: 'Climatic Regions of India (Koppen Classification)',
          scaffold: { problem: 'Classify the climate of Station A (fictional, but realistic for interior Karnataka) using Köppen\'s system.',
            steps: [
            { text: 'Identify coldest month temperature. Coldest = Dec at 21°C. Since 21°C ≥ 18°C → First letter = **A** (Tropical).' },
            { text: 'Identify driest month rainfall. Driest = Feb at 3 mm (< 60 mm). So a dry season exists. Now determine if Aw or Am.' },
            { text: 'Tropical climates (A) do not use a third letter in the basic scheme (some variants add a/b/c for temperature but NCERT.' },
            { text: 'Verify against known regions. Interior Karnataka (rain shadow of Western Ghats) is classic Aw (Tropical Savannah).' },
            { text: 'Interpret: Distinct winter dry season (5 dry months), summer monsoon rainfall, warm year-round → supports deciduous.', faded: true, blankAnswer: '**Aw** (Tropical Savannah / Tropical Wet-and-Dry)' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_006', title: 'Natural Vegetation: Types and Distribution in India',
          caseStudy: { intro: 'Look at a satellite image of India during the monsoon season—notice how the Western Ghats glow deep green while Rajasthan remains brownish-yellow.',
            decisions: [{ prompt: 'Name the five major types of natural vegetation in India and state the approximate annual rainfall range (in cm) that characterises each.', options: [
                { text: 'The five types and their rainfall ranges: (1) Tropical Evergreen Forests', outcome: 'The five types and their rainfall ranges: (1) Tropical Evergreen Forests — >200 cm; (2) Tropical.' },
                { text: 'Tropical Deciduous Forests', outcome: 'Not quite — Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis).', reveals: 'tropical-deciduous-forests-are-a' },
                { text: 'Himalayan forests', outcome: 'Not quite — Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis).', reveals: 'tropical-deciduous-forests-are-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a weather-lab project, a classmate predicts: \'Kanyakumari and Bhopal are both tropical, so their climates must be similar. And the monsoon arrives when the ITCZ slowly drifts north with the sun — onset should be gradual.\'',
            decisions: [{ prompt: 'Why do both predictions fail?', options: [
                { text: 'Latitude isn\'t the boss everywhere: Bhopal (inland, elevated) swings ~18°C across the year while coastal Kanyakumari varies ~4°C — altitude and distance-from-sea override latitude. And monsoon onset is abrupt (June 1 ± 5 days in Kerala) because the subtropical westerly jet jumps north of the Himalayas like a gatekeeper — a coupled ocean-atmosphere response, not a smooth ITCZ drift.', outcome: 'Climate becomes a vector sum — latitude, altitude, continentality — and the monsoon a triggered switch, not a slow slide.' },
                { text: 'Back the latitude argument — textbooks list it first, so it\'s the primary control everywhere.', outcome: 'Listing order isn\'t a law: same-latitude pairs like Mumbai vs Nagpur diverge sharply on range because maritime moderation and continentality act simultaneously.', reveals: 'latitude-is-primary-everywhere' },
                { text: 'Keep the gradual-onset model — the ITCZ moves with the sun, and the sun moves gradually.', outcome: 'The westerly jet\'s sudden northward jump is the missing mechanism — that\'s why onset is a burst around June 1, not a creep.', reveals: 'monsoon-is-gradual-itcz-drift' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'Latitude, altitude, continentality — the climate you feel is a three-way negotiation, and latitude doesn\'t always win.',
            decisions: [{ prompt: 'What comes next? Climate, Vegetation and Wildlife · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Climate, Vegetation and Wildlife · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_001', difficulty: 'standard',
          question: 'India\'s climate is controlled by three primary physiographic factors.',
          hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors.',
          misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: State the approximate latitudinal extent of mainland India and name the parallel that divides the country into tropical and.', answer: 'Mainland India extends from 8°4\'N to 37°6\'N latitude',
                  options: ['Mainland India extends from 8°4\'N to 37°6\'N latitude', 'Equator divides India', '30°N is the dividing line', 'Latitude is the primary control everywhere in India'],
                  hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors Affecting.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'b', prompt: 'An APPLY level question: Using the environmental lapse rate of 6.5°C per 1000m, calculate the expected temperature at Ooty (2240m) if the sea-level temperature.', answer: 'Step 1: Altitude difference = 2240m = 2.24km',
                  options: ['Step 1: Altitude difference = 2240m = 2.24km', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors Affecting.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'c', prompt: 'An ANALYZE level question: Compare the annual temperature range of Chennai (13°N, coastal) = 8°C, Hyderabad (17°N, 500m, 600km inland) = 16°C, and Delhi (28°N.', answer: 'Chennai: maritime moderation dominates (small range)',
                  options: ['Chennai: maritime moderation dominates (small range)', 'latitude', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors Affecting.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' }
          ],
            remediations: { 'latitude-is-the-primary-control': { steps: ['On India map, mark three station triplets at similar latitudes: (a) 19°N — Mumbai (coast), Nagpur (inland).', 'Fetch 30-year normal temperature data (IMD website) for each.', 'Calculate annual range and mean annual temperature.', 'Plot "Altitude vs Temperature" and "Distance-from-coast vs Range" scatter graphs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student claims "Altitude is the most important factor controlling India\'s climate because the Himalayas create the maximum.', answer: 'The claim is **partially correct but incomplete**',
                  options: ['The claim is **partially correct but incomplete**', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors Affecting.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'b', prompt: 'A CREATE level question: Design a climate-data investigation for your school\'s geography lab: select three Indian stations (one coastal, one interior plain.', answer: 'Good answer: Stations',
                  options: ['Good answer: Stations', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors Affecting.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' }
          ],
            remediations: { 'latitude-is-the-primary-control': { steps: ['On India map, mark three station triplets at similar latitudes: (a) 19°N — Mumbai (coast), Nagpur (inland).', 'Fetch 30-year normal temperature data (IMD website) for each.', 'Calculate annual range and mean annual temperature.', 'Plot "Altitude vs Temperature" and "Distance-from-coast vs Range" scatter graphs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_002', difficulty: 'standard',
          question: 'The Indian monsoon is a seasonal reversal of wind systems driven.',
          hint: 'Revisit Class 9 "Winds: Causes and Types of Global Wind Systems" (c9_geo_ch2_4) for.',
          misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating',
                  options: ['The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest', 'Distribution of rainfall in India refers to the spatial and temporal pattern of'],
                  hint: 'Revisit Class 9 "Winds: Causes and Types of Global Wind Systems" (c9_geo_ch2_4) for pressure.',
                  misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating it as a simple.' }
          ],
            remediations: { 'the-monsoon-is-caused-only': { steps: ['Show the student a 200 hPa wind animation for May-June (available on IMD/NCERT portals) — observe the STWJ core at 30°N.', 'Overlay 850 hPa winds — watch the Somali Jet form *before* the ITCZ jumps.', 'Use a pressure-time series for Thiruvananthapuram — show pressure falling steadily from April, but rainfall starts only.', 'Contrast with a "failed onset" year (e.g., 2002) where STWJ didn\'t shift north despite Tibetan heating.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_003', difficulty: 'standard',
          question: 'The four seasons of India—Winter (December-February), Summer (March-May).',
          hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) focusing on ITCZ migration.',
          misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.',
          parts: [
                { id: 'a', prompt: 'State the typical duration (months) of the Southwest Monsoon season as defined by the India Meteorological Department (IMD) and name the two branches into.', answer: 'The Southwest Monsoon season lasts from June to September',
                  options: ['The Southwest Monsoon season lasts from June to September', 'May-October or naming only one branch'],
                  hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) focusing on ITCZ migration, jet.',
                  misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-blow': { steps: ['Trace the Arabian Sea branch from Kerala to Gujarat to Punjab.', 'Trace the Bay of Bengal branch from Sundarbans to Assam to Punjab.', 'Mark the convergence zone over Punjab/Himachal.', 'Overlay rainfall data (isohyets) to show how wind direction matches heavy rainfall zones (windward sides).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_004', difficulty: 'standard',
          question: 'Distribution of rainfall in India refers to the spatial and temporal pattern.',
          hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) — specifically the section.',
          misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and.',
          parts: [
                { id: 'a', prompt: 'Given the following annual rainfall data (in mm) for Station X over 10 years: 820, 760, 910, 680, 850, 720, 890, 650, 940, 780.', answer: 'Step 1: Mean = (820+760+910+680+850+720+890+650+940+780)/10 = 800 mm',
                  options: ['Step 1: Mean = (820+760+910+680+850+720+890+650+940+780)/10 = 800 mm', 'wall of rain'],
                  hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) — specifically the section on "Branches.',
                  misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and that rainfall.' }
          ],
            remediations: { 'the-southwest-monsoon-advances-uniformly': { steps: ['Take a physical map of India and trace the Arabian Sea branch (arrow from Arabian Sea → Mumbai → Western Ghats → Deccan.', 'Overlay an isohyet map (from NCERT Fig 4.5 or IMD atlas).', 'Mark three cross-sections: (a) Mumbai–Pune–Solapur (windward to leeward), (b) Kolkata–Patna–Delhi (Bay branch inland).', 'For each, note rainfall at 50 km intervals and explain the drop/rise using "forced ascent" or "rain shadow" terminology.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_005', difficulty: 'standard',
          question: 'The Köppen Climate Classification system categorizes India\'s climatic regions.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice extracting.',
          misconception: 'Students treat Köppen codes as descriptive labels ("Am means monsoon climate") rather than *computed outcomes*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Köppen Climate Classification system categorizes India\'s climatic regions based on',
                  options: ['The Köppen Climate Classification system categorizes India\'s climatic regions based on', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice extracting monthly.',
                  misconception: 'Students treat Köppen codes as descriptive labels ("Am means monsoon climate") rather than *computed outcomes* of threshold formulas.' }
          ],
            remediations: { 'students-treat-k-ppen-codes': { steps: ['Remediation steps: 1) Give the student a blank Köppen decision table with only the threshold formulas (no codes).', '2) Provide monthly data for 3 stations: Thiruvananthapuram (Af), Nagpur (Aw), Jaisalmer (BWh).', '3) Walk through *only* the first two decisions for each: compute T_coldest, compare to 18°C and -3°C; compute P_th for.', '4) Have them re-do the classification *without* looking at the answer key, writing the formula used at each step.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_006', difficulty: 'standard',
          question: 'Natural vegetation refers to plant communities that have grown naturally.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice drawing the 75.',
          misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere.',
          parts: [
                { id: 'a', prompt: 'Name the five major types of natural vegetation in India and state the approximate annual rainfall range (in cm) that characterises each type.', answer: 'The five types and their rainfall ranges: (1) Tropical Evergreen Forests',
                  options: ['The five types and their rainfall ranges: (1) Tropical Evergreen Forests', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice drawing the 75 cm, 100.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' },
                { id: 'b', prompt: 'Given the following climate data for three stations, identify the natural vegetation type for each and justify using quantitative thresholds: Station A: Annual.', answer: 'Station A: Tropical Evergreen Forest',
                  options: ['Station A: Tropical Evergreen Forest', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice drawing the 75 cm, 100.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' }
          ],
            remediations: { 'tropical-deciduous-forests-are-a': { steps: ['Draw a rainfall gradient line on paper: 0 cm — 50 — 75 — 100 — 200 — 300 cm.', 'Place five vegetation cards (Thorn, Dry Deciduous, Moist Deciduous, Evergreen, Montane) at correct positions.', 'For Montane, draw a vertical altitude axis (0-5000 m) and place four belts at 1000, 2000, 3000, 4000 m with temperature.', 'Use the NCERT India Physical Map — trace the 75 cm, 100 cm, 200 cm isohyets from c11_geo_cbse_10_004 and verify each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
