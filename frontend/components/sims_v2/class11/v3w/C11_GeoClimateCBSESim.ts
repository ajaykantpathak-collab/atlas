import type { SimDef } from '../../engine/types';
import C11_GeoClimateCBSESim from '../../../simulations/c6_12_new/C11_GeoClimateCBSESim';

/** v3 wrapped master — C11_GeoClimateCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geoclimatecbsesim: SimDef = {
    id: 'v3w_c11_geoclimatecbsesim',
    title: 'Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)',
    subtitle: 'Covers latitude (tropical/subtropical division at Tropic of Cancer), altitude (lapse rate.',
    classLevel: 11, subject: 'science', topic: 'Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)',
    chapters: [],
    nodeIds: ['c11_geo_cbse_10_001', 'c11_geo_cbse_10_002', 'c11_geo_cbse_10_003', 'c11_geo_cbse_10_004', 'c11_geo_cbse_10_005', 'c11_geo_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe how Shimla (31°N, 2200m) is pleasant in May while Delhi (28°N, 216m) scorches at 45°C — same latitude.', goal: 'Master Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance).' },
    discovery: {
        question: 'A REMEMBER level question: State the approximate latitudinal extent of mainland India and name the parallel that divides the country into tropical and.',
        options: ['Mainland India extends from 8°4\'N to 37°6\'N latitude', 'Equator divides India', '30°N is the dividing line'],
        answer: 'Mainland India extends from 8°4\'N to 37°6\'N latitude',
        hook: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.',
    },
    teaching: [
        { title: 'India\'s climate is controlled by three.', text: 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N to 37°6\'N) determines the angle and duration of solar insolation, creating tropical and subtropical zones;.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_001', title: 'India\'s climate is controlled by three.',
          scaffold: { problem: 'Using IMD 1981-2010 normals, analyze why Srinagar (34.08°N, 1585m) has January mean minimum -2.1°C while Hyderabad (17.38°N, 545m) has.',
            steps: [
            { text: 'Identify the three factor differences: Latitude Δφ = 16.7° (Srinagar poleward); Altitude Δz = 1040m (Srinagar higher);.' },
            { text: 'Quantify latitude effect: Poleward insolation reduction in January ~0.8°C per degree latitude (empirical for India) →.' },
            { text: 'Quantify altitude effect: Lapse rate 6.5°C/km × 1.04km = 6.76°C cooler for Srinagar.' },
            { text: 'Combine: Expected ΔT = 13.4 + 6.76 = 20.16°C cooler. Observed ΔT = 16.8°C.' },
            { text: 'Interpret residual: Srinagar\'s valley location traps cold air (inversion) but also receives western disturbance cloud.', faded: true, blankAnswer: 'Latitude accounts for ~13.4°C (66%), altitude for ~6.8°C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_002', title: 'The Indian monsoon is a seasonal.',
          scaffold: { problem: 'On a given day in late May, the 200 hPa wind chart shows the subtropical westerly jet (STWJ) core at 35°N, 70°E with speed 40 m/s.',
            steps: [
            { text: 'Identify the STWJ position change — from south of Himalayas (35°N) to north of Himalayas (42°N) indicates the "jet.' },
            { text: 'Recognise that STWJ withdrawal allows the ITCZ to shift north rapidly from ~15°N to ~22°N (observed in surface pressure.' },
            { text: 'Link the strengthening cross-equatorial flow at 850 hPa to the Mascarene High intensification — this is the Somali Jet.' },
            { text: 'Note the moisture transport: Somali Jet brings high θe (equivalent potential temperature) air from the southern Indian.' },
            { text: 'Connect to onset criteria: IMD declares onset when (a) rainfall ≥ 2.5 mm/day for 2 consecutive days at 60% of Kerala.' },
            { text: 'Verify with timing — STWJ jump typically precedes onset by 3-7 days; Somali Jet peaks at onset.', faded: true, blankAnswer: 'The STWJ shift north of the Himalayas (Step 1) removes.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_003', title: 'The four seasons of India—Winter.',
          scaffold: { problem: 'A farmer in western Rajasthan (Jaisalmer) wants to know why his region receives less than 150 mm annual rainfall, mostly in July-August,.',
            steps: [
            { text: 'Identify the two branches of the Southwest Monsoon: Arabian Sea branch and Bay of Bengal branch.' },
            { text: 'Trace the Arabian Sea branch: strikes Western Ghats (windward = heavy rain), crosses Peninsula, reaches Rajasthan as.' },
            { text: 'Trace the Bay of Bengal branch: moves up the Gangetic Plains, deflected by Himalayas westward, loses moisture.' },
            { text: 'Analyze Mawsynram: Located on windward side of Khasi Hills (Bay branch).' },
            { text: 'Synthesize: Jaisalmer is in the rain shadow of the Western Ghats for the Arabian Sea branch and too far inland for the.', faded: true, blankAnswer: 'Jaisalmer\'s aridity is due to its location in the rain.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_004', title: 'Distribution of rainfall in India.',
          scaffold: { problem: 'A farmer in Nashik district (Maharashtra) receives 650 mm annual rainfall with CV = 28%.',
            steps: [
            { text: 'Identify the rainfall regime: 650 mm places Nashik in the "low rainfall" zone (50–100 cm), typical of the rain-shadow.' },
            { text: 'Determine crop water requirement: Sugarcane needs 1,500–2,500 mm water over 12–18 months; sorghum needs 400–600 mm over.' },
            { text: 'Assess groundwater recharge: In rain-shadow zones with high-intensity, low-duration rain (30–40 rainy days),.' },
            { text: 'Analyze drought probability: With CV = 28%, probability of rainfall <500 mm (severe drought) ≈ 15–20% (assuming.' },
            { text: 'Evaluate economic risk: Sugarcane input cost ₹1.5–2 lakh/ha; total loss in drought years.' },
            { text: 'Synthesize recommendation: Shift only if (a) canal command area confirmed, (b) groundwater depth <15 m with sustainable.', faded: true, blankAnswer: 'Not feasible without assured surface irrigation. High CV.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_005', title: 'The Köppen Climate Classification.',
          scaffold: { problem: 'Classify the climate of Station A (fictional, but realistic for interior Karnataka) using Köppen\'s system.',
            steps: [
            { text: 'Identify coldest month temperature. Coldest = Dec at 21°C. Since 21°C ≥ 18°C → First letter = **A** (Tropical).' },
            { text: 'Identify driest month rainfall. Driest = Feb at 3 mm (< 60 mm). So a dry season exists. Now determine if Aw or Am.' },
            { text: 'Tropical climates (A) do not use a third letter in the basic scheme (some variants add a/b/c for temperature but NCERT.' },
            { text: 'Verify against known regions. Interior Karnataka (rain shadow of Western Ghats) is classic Aw (Tropical Savannah) —.' },
            { text: 'Interpret: Distinct winter dry season (5 dry months), summer monsoon rainfall, warm year-round → supports deciduous.', faded: true, blankAnswer: '**Aw** (Tropical Savannah / Tropical Wet-and-Dry)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_10_006', title: 'Natural vegetation refers to plant.',
          scaffold: { problem: 'A researcher collects climate data from a weather station at 14.5°N, 75.5°E (Western Ghats, Karnataka): Annual rainfall = 320 cm, Mean.',
            steps: [
            { text: 'Identify the location using coordinates — 14.5°N, 75.5°E falls on the windward slope of the Western Ghats in Karnataka.' },
            { text: 'Evaluate rainfall — 320 cm far exceeds the 200 cm threshold for Tropical Evergreen Forests; the short dry season (2.' },
            { text: 'Evaluate temperature — 24.5°C mean annual temperature at 600 m altitude confirms tropical zone (lapse rate: sea level.' },
            { text: 'Evaluate altitude — 600 m is well below the 1500 m lower limit for Montane forests; no temperature-induced zonation.' },
            { text: 'Synthesise — High rainfall (>200 cm), warm temperature (>24°C), short dry season (2 months), low altitude → Tropical.' },
            { text: 'Characteristic species — Dipterocarpus indicus (Gurjan), Hopea parviflora (Ironwood), Mesua ferrea (Nagkesar); plus.', faded: true, blankAnswer: 'Tropical Evergreen Forest. Species: Dipterocarpus indicus,.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_10_002', title: 'Identify each idea',
          dissect: { specimen: 'Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)', spots: [
            { id: 's1', label: 'Indias climate is controlled by', prompt: 'Which idea is this? — India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N.', answer: 'Indias climate is controlled by', options: ['Indias climate is controlled by', 'The Indian monsoon is a', 'The four seasons of IndiaWinter', 'Distribution of rainfall in India'] },
            { id: 's2', label: 'The Indian monsoon is a', prompt: 'Which idea is this? — The Indian monsoon is a seasonal reversal of wind systems driven by differential heating.', answer: 'The Indian monsoon is a', options: ['The Indian monsoon is a', 'Indias climate is controlled by', 'The four seasons of IndiaWinter', 'Distribution of rainfall in India'] },
            { id: 's3', label: 'The four seasons of IndiaWinter', prompt: 'Which idea is this? — The four seasons of India—Winter (December-February), Summer (March-May), Southwest.', answer: 'The four seasons of IndiaWinter', options: ['The four seasons of IndiaWinter', 'Indias climate is controlled by', 'The Indian monsoon is a', 'Distribution of rainfall in India'] },
            { id: 's4', label: 'Distribution of rainfall in India', prompt: 'Which idea is this? — Distribution of rainfall in India refers to the spatial and temporal pattern of.', answer: 'Distribution of rainfall in India', options: ['Distribution of rainfall in India', 'Indias climate is controlled by', 'The Indian monsoon is a', 'The four seasons of IndiaWinter'] },
            { id: 's5', label: 'The Kppen Climate Classification system', prompt: 'Which idea is this? — The Köppen Climate Classification system categorizes India\'s climatic regions based on.', answer: 'The Kppen Climate Classification system', options: ['The Kppen Climate Classification system', 'Indias climate is controlled by', 'The Indian monsoon is a', 'The four seasons of IndiaWinter'] },
            { id: 's6', label: 'Natural vegetation refers to plant', prompt: 'Which idea is this? — Natural vegetation refers to plant communities that have grown naturally without human.', answer: 'Natural vegetation refers to plant', options: ['Natural vegetation refers to plant', 'Indias climate is controlled by', 'The Indian monsoon is a', 'The four seasons of IndiaWinter'] }
          ] } }
    ],
    explore: { component: C11_GeoClimateCBSESim, prompt: 'Explore the interactive — Climate: Factors Affecting India\'s Climate (Latitude, Altitude, Distance)' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_001', difficulty: 'standard',
          question: 'India\'s climate is controlled by three primary physiographic factors:.',
          hint: 'If stuck on lapse rate calculation: revisit Class 7 "Temperature: Measurement and Factors.',
          misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.',
          parts: [
                { id: 'a', prompt: 'A REMEMBER level question: State the approximate latitudinal extent of mainland India and name the parallel that divides the country into tropical and.', answer: 'Mainland India extends from 8°4\'N to 37°6\'N latitude',
                  options: ['Mainland India extends from 8°4\'N to 37°6\'N latitude', 'Equator divides India', '30°N is the dividing line'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'b', prompt: 'An APPLY level question: Using the environmental lapse rate of 6.5°C per 1000m, calculate the expected temperature at Ooty (2240m) if the sea-level temperature.', answer: 'Step 1: Altitude difference = 2240m = 2.24km',
                  options: ['Step 1: Altitude difference = 2240m = 2.24km', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'c', prompt: 'An ANALYZE level question: Compare the annual temperature range of Chennai (13°N, coastal) = 8°C, Hyderabad (17°N, 500m, 600km inland) = 16°C, and Delhi (28°N,.', answer: 'Chennai: maritime moderation dominates (small range)',
                  options: ['Chennai: maritime moderation dominates (small range)', 'latitude', 'Latitude is the primary control everywhere in India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' }
          ],
            remediations: { 'latitude-is-the-primary-control': { steps: ['On India map, mark three station triplets at similar latitudes: (a) 19°N — Mumbai (coast), Nagpur (inland),.', 'Fetch 30-year normal temperature data (IMD website) for each.', 'Calculate annual range and mean annual temperature.', 'Plot "Altitude vs Temperature" and "Distance-from-coast vs Range" scatter graphs.', 'Visually confirm: at fixed latitude, altitude explains temperature *level*, distance explains temperature *range*.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.',
          parts: [
                { id: 'a', prompt: 'An EVALUATE level question: A student claims "Altitude is the most important factor controlling India\'s climate because the Himalayas create the maximum.', answer: 'The claim is **partially correct but incomplete**',
                  options: ['The claim is **partially correct but incomplete**', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' },
                { id: 'b', prompt: 'A CREATE level question: Design a climate-data investigation for your school\'s geography lab: select three Indian stations (one coastal, one interior plain,.', answer: 'Good answer: Stations',
                  options: ['Good answer: Stations', 'Latitude is the primary control everywhere in India', '**"Latitude is the primary control everywhere in India"**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"Latitude is the primary control everywhere in India"** because textbooks list it first.' }
          ],
            remediations: { 'latitude-is-the-primary-control': { steps: ['On India map, mark three station triplets at similar latitudes: (a) 19°N — Mumbai (coast), Nagpur (inland),.', 'Fetch 30-year normal temperature data (IMD website) for each.', 'Calculate annual range and mean annual temperature.', 'Plot "Altitude vs Temperature" and "Distance-from-coast vs Range" scatter graphs.', 'Visually confirm: at fixed latitude, altitude explains temperature *level*, distance explains temperature *range*.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_002', difficulty: 'standard',
          question: 'The Indian monsoon is a seasonal reversal of wind systems driven by.',
          hint: 'Revisit Class 9 "Winds: Causes and Types of Global Wind Systems" (c9_geo_ch2_4) for.',
          misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating',
                  options: ['The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest', 'Distribution of rainfall in India refers to the spatial and temporal pattern of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating it as a simple.' }
          ],
            remediations: { 'the-monsoon-is-caused-only': { steps: ['Show the student a 200 hPa wind animation for May-June (available on IMD/NCERT portals) — observe the STWJ core at 30°N.', 'Overlay 850 hPa winds — watch the Somali Jet form *before* the ITCZ jumps.', 'Use a pressure-time series for Thiruvananthapuram — show pressure falling steadily from April, but rainfall starts only.', 'Contrast with a "failed onset" year (e.g., 2002) where STWJ didn\'t shift north despite Tibetan heating.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The tropical easterly jet (TEJ) is a *result* of the monsoon, not a *cause* of monsoon onset." Support your evaluation with dynamical.', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'TEJ causes onset'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the monsoon is caused *only* by the ITCZ shifting north due to the sun\'s apparent movement, treating it as a simple.' }
          ],
            remediations: { 'the-monsoon-is-caused-only': { steps: ['Show the student a 200 hPa wind animation for May-June (available on IMD/NCERT portals) — observe the STWJ core at 30°N.', 'Overlay 850 hPa winds — watch the Somali Jet form *before* the ITCZ jumps.', 'Use a pressure-time series for Thiruvananthapuram — show pressure falling steadily from April, but rainfall starts only.', 'Contrast with a "failed onset" year (e.g., 2002) where STWJ didn\'t shift north despite Tibetan heating.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_003', difficulty: 'standard',
          question: 'The four seasons of India—Winter (December-February), Summer (March-May),.',
          hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) focusing on ITCZ migration,.',
          misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest',
                  options: ['The four seasons of India—Winter (December-February), Summer (March-May), Southwest', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'Distribution of rainfall in India refers to the spatial and temporal pattern of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-blow': { steps: ['Trace the Arabian Sea branch from Kerala to Gujarat to Punjab.', 'Trace the Bay of Bengal branch from Sundarbans to Assam to Punjab.', 'Mark the convergence zone over Punjab/Himachal.', 'Overlay rainfall data (isohyets) to show how wind direction matches heavy rainfall zones (windward sides).', 'Explain Coriolis deflection (Ferrel\'s Law) for the Bay branch turning right in the Northern Hemisphere.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_004', difficulty: 'standard',
          question: 'Distribution of rainfall in India refers to the spatial and temporal pattern of.',
          hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) — specifically the section on.',
          misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and.',
          parts: [
                { id: 'a', prompt: 'Given the following annual rainfall data (in mm) for Station X over 10 years: 820, 760, 910, 680, 850, 720, 890, 650, 940, 780.', answer: 'Step 1: Mean = (820+760+910+680+850+720+890+650+940+780)/10 = 800 mm',
                  options: ['Step 1: Mean = (820+760+910+680+850+720+890+650+940+780)/10 = 800 mm', 'wall of rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and that rainfall.' }
          ],
            remediations: { 'the-southwest-monsoon-advances-uniformly': { steps: ['Take a physical map of India and trace the Arabian Sea branch (arrow from Arabian Sea → Mumbai → Western Ghats → Deccan.', 'Overlay an isohyet map (from NCERT Fig 4.5 or IMD atlas).', 'Mark three cross-sections: (a) Mumbai–Pune–Solapur (windward to leeward), (b) Kolkata–Patna–Delhi (Bay branch inland),.', 'For each, note rainfall at 50 km intervals and explain the drop/rise using "forced ascent" or "rain shadow" terminology.', 'Re-attempt Diagnostic Question 2 and 4 using this visual framework.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Areas receiving >200 cm annual rainfall in India are guaranteed water security for agriculture." Use the concepts of rainfall.', answer: 'The statement is false',
                  options: ['The statement is false', 'wall of rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and that rainfall.' },
                { id: 'b', prompt: 'Design a rainfall-based agro-climatic zoning map for a hypothetical district spanning the Western Ghats escarpment to the Deccan Plateau (width 80 km).', answer: 'Zone 1 (Windward Ghats, 0–20 km): 300–400 cm, CV ~15%, 80–100 rainy days',
                  options: ['Zone 1 (Windward Ghats, 0–20 km): 300–400 cm, CV ~15%, 80–100 rainy days', 'wall of rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon advances uniformly across India like a "wall of rain" from south to north, and that rainfall.' }
          ],
            remediations: { 'the-southwest-monsoon-advances-uniformly': { steps: ['Take a physical map of India and trace the Arabian Sea branch (arrow from Arabian Sea → Mumbai → Western Ghats → Deccan.', 'Overlay an isohyet map (from NCERT Fig 4.5 or IMD atlas).', 'Mark three cross-sections: (a) Mumbai–Pune–Solapur (windward to leeward), (b) Kolkata–Patna–Delhi (Bay branch inland),.', 'For each, note rainfall at 50 km intervals and explain the drop/rise using "forced ascent" or "rain shadow" terminology.', 'Re-attempt Diagnostic Question 2 and 4 using this visual framework.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_005', difficulty: 'standard',
          question: 'The Köppen Climate Classification system categorizes India\'s climatic regions.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice extracting.',
          misconception: 'Students treat Köppen codes as descriptive labels ("Am means monsoon climate") rather than *computed outcomes* of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Köppen Climate Classification system categorizes India\'s climatic regions based on',
                  options: ['The Köppen Climate Classification system categorizes India\'s climatic regions based on', 'India\'s climate is controlled by three primary physiographic factors: **latitude** (8°4\'N', 'The Indian monsoon is a seasonal reversal of wind systems driven by differential heating', 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat Köppen codes as descriptive labels ("Am means monsoon climate") rather than *computed outcomes* of threshold formulas.' }
          ],
            remediations: { 'students-treat-k-ppen-codes': { steps: ['Remediation steps: 1) Give the student a blank Köppen decision table with only the threshold formulas (no codes).', '2) Provide monthly data for 3 stations: Thiruvananthapuram (Af), Nagpur (Aw), Jaisalmer (BWh).', '3) Walk through *only* the first two decisions for each: compute T_coldest, compare to 18°C and -3°C; compute P_th for.', '4) Have them re-do the classification *without* looking at the answer key, writing the formula used at each step.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_006', difficulty: 'standard',
          question: 'Natural vegetation refers to plant communities that have grown naturally.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and practice drawing the 75.',
          misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in.',
          parts: [
                { id: 'a', prompt: 'Name the five major types of natural vegetation in India and state the approximate annual rainfall range (in cm) that characterises each type.', answer: 'The five types and their rainfall ranges: (1) Tropical Evergreen Forests',
                  options: ['The five types and their rainfall ranges: (1) Tropical Evergreen Forests', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' },
                { id: 'b', prompt: 'Given the following climate data for three stations, identify the natural vegetation type for each and justify using quantitative thresholds: Station A: Annual.', answer: 'Station A: Tropical Evergreen Forest',
                  options: ['Station A: Tropical Evergreen Forest', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' }
          ],
            remediations: { 'tropical-deciduous-forests-are-a': { steps: ['Draw a rainfall gradient line on paper: 0 cm — 50 — 75 — 100 — 200 — 300 cm.', 'Place five vegetation cards (Thorn, Dry Deciduous, Moist Deciduous, Evergreen, Montane) at correct positions.', 'For Montane, draw a vertical altitude axis (0-5000 m) and place four belts at 1000, 2000, 3000, 4000 m with temperature.', 'Use the NCERT India Physical Map — trace the 75 cm, 100 cm, 200 cm isohyets from c11_geo_cbse_10_004 and verify each.', 'Memorise the Sal vs. Teak geographic split: Sal east of 82°E (Chotanagpur), Teak west of 82°E (Satpura-Maikal).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Mangrove forests in the Sundarbans are primarily determined by high rainfall (180 cm) rather than tidal salinity." Use evidence from.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' },
                { id: 'b', prompt: 'Design a vegetation transect map annotation for a north-south cross-section from Jaisalmer (Rajasthan) to Thiruvananthapuram (Kerala) at 77°E longitude.', answer: 'A good answer shows: (1) ~26°N Jaisalmer',
                  options: ['A good answer shows: (1) ~26°N Jaisalmer', 'Tropical Deciduous Forests', 'Himalayan forests'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Tropical Deciduous Forests" are a single type and that Teak (Tectona grandis) grows everywhere in this category.' }
          ],
            remediations: { 'tropical-deciduous-forests-are-a': { steps: ['Draw a rainfall gradient line on paper: 0 cm — 50 — 75 — 100 — 200 — 300 cm.', 'Place five vegetation cards (Thorn, Dry Deciduous, Moist Deciduous, Evergreen, Montane) at correct positions.', 'For Montane, draw a vertical altitude axis (0-5000 m) and place four belts at 1000, 2000, 3000, 4000 m with temperature.', 'Use the NCERT India Physical Map — trace the 75 cm, 100 cm, 200 cm isohyets from c11_geo_cbse_10_004 and verify each.', 'Memorise the Sal vs. Teak geographic split: Sal east of 82°E (Chotanagpur), Teak west of 82°E (Satpura-Maikal).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
