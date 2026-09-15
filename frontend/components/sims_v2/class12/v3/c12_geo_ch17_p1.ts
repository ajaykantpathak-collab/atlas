import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch17_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch17_p1: SimDef = {
    id: 'v3_c12_geo_ch17_p1',
    title: 'Geographical Perspective on Issues · Part 1/2',
    subtitle: 'The deadliest erosion is the kind you can\'t see',
    classLevel: 12, subject: 'geography', topic: 'Geographical Perspective on Issues · Part 1/2',
    chapters: ['c12_geo_ch17'],
    nodeIds: ['c12_geo_cbse_17_001', 'c12_geo_cbse_17_002', 'c12_geo_cbse_17_003', 'c12_geo_cbse_17_004', 'c12_geo_cbse_17_005', 'c12_geo_cbse_17_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Land-restoration planner', intro: 'Land can be wounded without being moved. Learn the difference between what\'s degraded and what\'s dead.', goal: 'Classify land degradation by cause and process, and evaluate conservation through the Jhabua model.' },
    discovery: {
        question: 'Gullies scar dramatically, sheet erosion strips invisibly — yet the quieter one is deadlier for farms. Why?',
        options: ['Sheet erosion lifts the fertile O and A horizons uniformly across whole fields — diffuse, invisible, and it takes the soil\'s best layer first', 'Gullies are deeper so they\'re worse', 'Sheet erosion is only surface dust', 'Visibility equals severity'],
        answer: 'Sheet erosion lifts the fertile O and A horizons uniformly across whole fields — diffuse, invisible, and it takes the soil\'s best layer first',
        hook: 'Degradation ≠ erosion alone — waterlogging in Punjab\'s canal country and salinisation degrade land without moving a gram of soil. And degraded ≠ wasteland: the first can be healed, the second is past economic repair. Jhabua\'s secret wasn\'t NGO money — it was social fencing that lowered the cost of conserving.',
    },
    teaching: [
        { title: 'Environmental Issues: Land Degradation and Soil Erosion', text: 'Land degradation is a temporary or permanent decline in the productive capacity of land caused by natural processes (e.g., erosion by water/wind, waterlogging, salinization) and human activities.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_17_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Field-diagnose degraded land: sort sheet from gully, waterlogged from saline, then design a Bundelkhand restoration — trenches, stall-feeding rules and the indicators that prove it worked.',
        labels: ['Environmental Issues: Land Degradation', 'Environmental Issues: Deforestation', 'Water Pollution: Sources', 'Air Pollution: Causes, Effects', 'Noise Pollution and Urban', 'Disasters: Types (Natural'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_001', title: 'Environmental Issues: Land Degradation and Soil Erosion',
          caseStudy: { intro: 'Begin by observing a local field or construction site after heavy rain — notice how topsoil washes/rills form where vegetation is removed.',
            decisions: [{ prompt: 'Define land degradation as per NCERT Class 12 Geography. How does it differ from wasteland?', options: [
                { text: 'Land degradation is a temporary or permanent decline in productive capacity of land', outcome: 'Land degradation is a temporary or permanent decline in productive capacity of land.' },
                { text: 'they are the same', outcome: 'Not quite — Students conflate "soil erosion" and "land degradation" as synonyms.', reveals: 'students-conflate-soil-erosion-and' },
                { text: 'wasteland is only desert', outcome: 'Not quite — Students conflate "soil erosion" and "land degradation" as synonyms.', reveals: 'students-conflate-soil-erosion-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_002', title: 'Environmental Issues: Deforestation and Loss of Biodiversity',
          scaffold: { problem: 'The Forest Survey of India reports that District X in Madhya Pradesh lost 120 km² of Moderately Dense Forest (MDF) between 2019-2021.',
            steps: [
            { text: 'Identify forest cover categories and their canopy density thresholds (VDF ≥70%, MDF 40-70%, OF 10-40%, Scrub <10%.' },
            { text: 'Compute net forest cover change: Forest cover = VDF + MDF + OF. Loss of 120 km² MDF; gain of 70 km² OF.' },
            { text: 'Degradation intensity index = (area moving to lower canopy class) / (total MDF loss) = (70+30+20) / 120 = 120/120 = 1.0.' },
            { text: 'Annual % MDF loss rate = (Total MDF loss / Initial MDF) × (1/years) × 100 = (120 / 850) × (1/2) × 100 = 7.06% per annum.' },
            { text: 'Interpret: 7% annual MDF loss is alarming (national average ~0.5%); suggests intense pressure from fuelwood, grazing.', faded: true, blankAnswer: '(a) -50 km² net forest cover loss; (b) Degradation.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_003', title: 'Water Pollution: Sources and Impact on Health and Ecosystem',
          caseStudy: { intro: 'Begin with a real-world observation: ask students to recall the last time they saw a river or lake near their city — was the water clear, foamy, or smelly?',
            decisions: [{ prompt: 'Name the three major categories of human activities that cause water pollution in India, as per NCERT Class 12 Geography Chapter 9.', options: [
                { text: 'The three major categories are industrial activities, agricultural activities, and', outcome: 'The three major categories are industrial activities, agricultural activities, and cultural.' },
                { text: 'urban run-off', outcome: 'Not quite — Students often think "water pollution" means only visible dirt or bad smell, and that if water.', reveals: 'water-pollution-means-only-visible' },
                { text: 'water pollution', outcome: 'Not quite — Students often think "water pollution" means only visible dirt or bad smell, and that if water.', reveals: 'water-pollution-means-only-visible' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_004', title: 'Air Pollution: Causes, Effects and Control Measures',
          scaffold: { problem: '** Using CPCB\'s AQI breakpoint table, calculate the AQI for a monitoring station in **Patna (Bihar)** that recorded the following 24-hour.',
            steps: [
            { text: 'Recall CPCB AQI breakpoints for each pollutant (24-hr avg). For PM2.5: 0–30 (Good), 31–60 (Satisfactory), 61–90.' },
            { text: 'For PM10: 0–50 (Good), 51–100 (Satisfactory), 101–250 (Moderate), 251–350 (Poor), 351–430 (Very Poor), >430 (Severe).' },
            { text: 'For SO₂: 0–40 (Good), 41–80 (Satisfactory), 81–380 (Moderate), 381–800 (Poor), 801–1600 (Very Poor), >1600 (Severe).' },
            { text: 'For NO₂: 0–40 (Good), 41–80 (Satisfactory), 81–180 (Moderate), 181–280 (Poor), 281–400 (Very Poor), >400 (Severe).' },
            { text: 'For CO (8-hr avg in mg/m³): 0–1.0 (Good), 1.1–2.0 (Satisfactory), 2.1–10 (Moderate), 10.1–17 (Poor), 17.1–34 (Very.' },
            { text: 'For O₃ (8-hr avg): 0–50 (Good), 51–100 (Satisfactory), 101–168 (Moderate), 169–208 (Poor), 209–748 (Very Poor), >748.' },
            { text: 'Compute sub-indices using linear interpolation formula. For PM2.5 (185 in 121–250 band, AQI 201–300):.' },
            { text: 'Overall AQI = **max(250, 270, 56, 72, 87, 135) = 270 (Poor category)**. Dominant pollutant = **PM10** (sub-index 270).' },
            { text: 'Health advisory for "Poor" (201–300): "Breathing discomfort to most people on prolonged exposure; discomfort to people.', faded: true, blankAnswer: '** AQI = 270 (Poor); Dominant pollutant = PM10; Health.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_005', title: 'Noise Pollution and Urban Environmental Problems',
          scaffold: { problem: 'A new highway is planned 200 m from a residential colony. Current ambient noise at the colony is 50 dB.',
            steps: [
            { text: 'Identify source type — highway traffic is a line source, so use L2 = L1 - 10*log10(d2/d1).' },
            { text: 'Plug values: L1 = 85 dB at d1 = 15 m; d2 = 200 m.' },
            { text: 'Calculate ratio d2/d1 = 200/15 = 13.33. log10(13.33) ≈ 1.125.' },
            { text: 'Compute attenuation = 10 * 1.125 = 11.25 dB. So L2 = 85 - 11.25 = 73.75 dB at colony.' },
            { text: 'Compare with WHO guideline (55 dB). Exceedance = 18.75 dB. Mitigation: Create a 50 m wide green belt (tree buffer).', faded: true, blankAnswer: 'Expected noise level ≈ 74 dB, exceeding WHO guideline.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_006', title: 'Disasters: Types (Natural and Human-Made) and Classification',
          caseStudy: { intro: 'Begin with a real-world observation: "When the 2001 Bhuj earthquake struck Gujarat, it killed 20,000 people.',
            decisions: [{ prompt: 'Define the term \'disaster\' as per the UNDRR (United Nations Office for Disaster Risk Reduction) and explain how it differs from a \'natural.', options: [
                { text: 'A disaster is "a serious disruption of the functioning of a community or society at any', outcome: 'A disaster is "a serious disruption of the functioning of a community or society at any scale due.' },
                { text: 'a disaster is just a big hazard', outcome: 'Not quite — Students often believe that "natural disaster" means the disaster is caused solely by nature and.', reveals: 'natural-disaster-means-the-disaster' },
                { text: 'the 2004 tsunami was a hazard', outcome: 'Not quite — Students often believe that "natural disaster" means the disaster is caused solely by nature and.', reveals: 'natural-disaster-means-the-disaster' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A developer diverting a patch of 50-year-old native forest shows the panchayat a \'compensation plan\': 20,000 fast-growing eucalyptus saplings on a revenue wasteland across the district. \'Two trees for every one lost — the ledger is green.\'',
            decisions: [{ prompt: 'How does this chapter assess that offset?', options: [
                { text: 'Reject the ledger — a monoculture plantation on non-forest land can\'t replace a complex native ecosystem\'s species, soil life and structure; compensatory planting fails ecological equivalence, lags decades behind the loss, and often bypasses the forest-dwellers\' consent.', outcome: 'The chapter\'s core distinction: tree cover is not a forest — fragmentation kills biodiversity through edge effects and genetic isolation that a sapling count cannot repay on human timescales.' },
                { text: 'Accept it — more trees planted than removed means net gain for the environment.', outcome: 'That counts stems and ignores ecosystems: eucalyptus rows register as \'forest cover\' in statistics while carrying a fraction of the biodiversity — exactly how plantations can mask net ecological loss.', reveals: 'tree-count-equals-forest' },
                { text: 'Accept it only if the plantation sits inside the same fenced boundary as the diverted forest.', outcome: 'Location fixes nothing: the failure is structural — plantation age, species mix and displaced community use don\'t change by moving the saplings next door.', reveals: 'same-site-fixes-offset' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_17_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read land\'s decline as a coupled human-environment process — and explain why the fix is social rules as much as engineering.',
            decisions: [{ prompt: 'What comes next? Geographical Perspective on Issues · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geographical Perspective on Issues · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_001', difficulty: 'standard',
          question: 'Land degradation is a temporary or permanent decline in the productive capacity.',
          hint: 'If stuck, review c11_geo_cbse_12_002 (soil horizons) and c11_geo_cbse_12_009 (erosion.',
          misconception: 'Students conflate "soil erosion" and "land degradation" as synonyms.',
          parts: [
                { id: 'a', prompt: 'Compare the NRSC wasteland categories "gullied/ravinous land" and "waterlogged/marshy land" in terms of: (a) primary causative agent (natural vs.', answer: 'primary causative agent (natural vs',
                  options: ['primary causative agent (natural vs', 'excess rain'],
                  hint: 'If stuck, review c11_geo_cbse_12_002 (soil horizons) and c11_geo_cbse_12_009 (erosion types) with.',
                  misconception: 'Students conflate "soil erosion" and "land degradation" as synonyms.' }
          ],
            remediations: { 'students-conflate-soil-erosion-and': { steps: ['Revisit c11_geo_cbse_12_009 (Soil Erosion: Types and Conservation) — list the 3 erosion types (sheet, rill, gully) and.', 'Re-read NCERT Class 12 Ch 9 "Land Degradation" section — make a 2-column table: "Erosion processes" vs "Non-erosion.', 'Take a blank India map; mark Chambal (gullied), Punjab (waterlogged), Thar (desertic), Western Ghats (mining wasteland).', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, review c10_geo_cbse_01_008 (Soil Erosion and Conservation Methods) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_002', difficulty: 'standard',
          question: 'Deforestation is the permanent removal of forest cover and conversion of forest.',
          hint: 'If ISFR tables are confusing, revisit c11_geo_cbse_14_007 (Forest Cover in India) and.',
          misconception: 'Students equate "deforestation" solely with clear-felling for timber, ignoring that in India the dominant drivers are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Deforestation is the permanent removal of forest cover and conversion of forest land to',
                  options: ['Deforestation is the permanent removal of forest cover and conversion of forest land to', 'Land degradation is a temporary or permanent decline in the productive capacity of land', 'Water pollution is the contamination of water bodies (rivers, lakes, groundwater, oceans)', 'Air pollution is the introduction of contaminants'],
                  hint: 'If ISFR tables are confusing, revisit c11_geo_cbse_14_007 (Forest Cover in India) and practice with.',
                  misconception: 'Students equate "deforestation" solely with clear-felling for timber, ignoring that in India the dominant drivers are: (1) **conversion.' }
          ],
            remediations: { 'students-equate-deforestation-solely-with': { steps: ['If a student cannot distinguish degradation from diversion, or misses fragmentation effects: (1) Revisit.', '(2) Use ISFR 2021 data: compare "Forest Cover" vs "Recorded Forest Area" for a state (e.g., Maharashtra: RFA 61,579.', '(3) Map a local forest patch (using Bhuvan/Google Earth) and identify edges, patches, corridors — calculate.', '(4) Re-attempt Diagnostic Q3 with a simpler landscape (2 patches) to grasp species-area math.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "deforestation" solely with clear-felling for timber, ignoring that in India the dominant drivers are.',
          parts: [
                { id: 'a', prompt: 'Critique the Compensatory Afforestation Fund Act (CAMPA) 2016 as a tool for mitigating biodiversity loss from forest diversion.', answer: 'Ecological equivalence: FAILS',
                  options: ['Ecological equivalence: FAILS', 'CAMPA plants trees so it compensates'],
                  hint: 'If ISFR tables are confusing, revisit c11_geo_cbse_14_007 (Forest Cover in India) and practice with.',
                  misconception: 'Students equate "deforestation" solely with clear-felling for timber, ignoring that in India the dominant drivers are: (1) **conversion.' }
          ],
            remediations: { 'students-equate-deforestation-solely-with': { steps: ['If a student cannot distinguish degradation from diversion, or misses fragmentation effects: (1) Revisit.', '(2) Use ISFR 2021 data: compare "Forest Cover" vs "Recorded Forest Area" for a state (e.g., Maharashtra: RFA 61,579.', '(3) Map a local forest patch (using Bhuvan/Google Earth) and identify edges, patches, corridors — calculate.', '(4) Re-attempt Diagnostic Q3 with a simpler landscape (2 patches) to grasp species-area math.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_003', difficulty: 'standard',
          question: 'Water pollution is the contamination of water bodies (rivers, lakes.',
          hint: 'If stuck, revisit c11_geo_cbse_13_002 (India\'s Drainage Systems) to map the Ganga and.',
          misconception: 'Students often think "water pollution" means only visible dirt or bad smell, and that if water looks clear, it is safe.',
          parts: [
                { id: 'a', prompt: 'Explain why agricultural run-off is considered a non-point source of pollution, while industrial discharge is a point source.', answer: 'Agricultural run-off is a non-point source',
                  options: ['Agricultural run-off is a non-point source', 'water pollution', 'turbidity', 'pollution level'],
                  hint: 'If stuck, revisit c11_geo_cbse_13_002 (India\'s Drainage Systems) to map the Ganga and Yamuna.',
                  misconception: 'Students often think "water pollution" means only visible dirt or bad smell, and that if water looks clear, it is safe.' },
                { id: 'b', prompt: 'A farmer in Punjab applies 150 kg/ha of nitrogen fertilizer. If 30% leaches into groundwater and the remaining 70% runs off into a nearby drain that joins the.', answer: 'Step 1: Total nitrogen applied = 150 kg/ha',
                  options: ['Step 1: Total nitrogen applied = 150 kg/ha', 'water pollution', 'turbidity', 'pollution level'],
                  hint: 'If stuck, revisit c11_geo_cbse_13_002 (India\'s Drainage Systems) to map the Ganga and Yamuna.',
                  misconception: 'Students often think "water pollution" means only visible dirt or bad smell, and that if water looks clear, it is safe.' }
          ],
            remediations: { 'water-pollution-means-only-visible': { steps: ['Revisit c11_geo_cbse_13_001 (Water Resources) to recall the difference between surface water and groundwater pollution.', 'Use a water testing kit (or simulated data) to test three local water samples — one turbid, one clear but contaminated.', 'Map the results to the pollutant categories in Table 9.1.', 'Write a 100-word explanation of why "clear ≠ safe" using the terms *dissolved*, *bioaccumulation*, and *pathogen*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_004', difficulty: 'standard',
          question: 'Air pollution is the introduction of contaminants — including particulate.',
          hint: 'If stuck on dispersion concepts, revisit **c9_geo_ch2_2 (Layers of Atmosphere)** and.',
          misconception: '**Students believe "air pollution is caused only by local emissions" and that "if we stop all factories and cars.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Air pollution is the introduction of contaminants',
                  options: ['Air pollution is the introduction of contaminants', 'Land degradation is a temporary or permanent decline in the productive capacity of land', 'Deforestation is the permanent removal of forest cover and conversion of forest land to', 'Water pollution is the contamination of water bodies (rivers, lakes, groundwater, oceans)'],
                  hint: 'If stuck on dispersion concepts, revisit **c9_geo_ch2_2 (Layers of Atmosphere)** and.',
                  misconception: '**Students believe "air pollution is caused only by local emissions" and that "if we stop all factories and cars in Delhi, the air will.' }
          ],
            remediations: { 'students-believe-air-pollution-is': { steps: ['** Revisit **c9_geo_ch2_3 (Air Pressure: Horizontal and Vertical Distribution)** and **c9_geo_ch2_4 (Winds: Causes and.', '** Re-study **c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism)** — focus on the **post-monsoon transition**.', '** Run a **box model simulation** (Excel/Python) for a hypothetical city: vary mixing height (100–2000 m) and wind.', '** Re-attempt **Diagnostic Question 2** (Delhi vs Mumbai) and **Diagnostic Question 3** (Singrauli box model) with the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_005', difficulty: 'standard',
          question: 'Noise pollution is unwanted or excessive sound that disrupts the natural.',
          hint: 'If stuck, review Class 11 nodes on urban settlements (c11_geo_cbse_17_004-006) and.',
          misconception: 'Students often think noise pollution is only a problem of loudness (volume) and ignore its chronic, low-frequency.',
          parts: [
                { id: 'a', prompt: 'Explain why traffic is considered the biggest nuisance for noise pollution in Indian metropolitan cities, referencing at least three factors that influence its.', answer: 'Traffic noise intensity depends on vehicle type (heavy vs light), road condition',
                  options: ['Traffic noise intensity depends on vehicle type (heavy vs light), road condition', 'number of vehicles'],
                  hint: 'If stuck, review Class 11 nodes on urban settlements (c11_geo_cbse_17_004-006) and industrial.',
                  misconception: 'Students often think noise pollution is only a problem of loudness (volume) and ignore its chronic, low-frequency components (e.g.' }
          ],
            remediations: { 'noise-pollution-is-only-a': { steps: ['Revisit Class 11 urban settlements node (c11_geo_cbse_17_006) to review slum definitions and problems.', 'Use a topographical map of your city (or Delhi/Mumbai) to locate industrial zones, highways, and slums; measure.', 'Conduct a mini-survey: record sound levels (using a phone app) at three locations (residential, commercial, near.', 'Re-read the Daurala and Jhabua case studies to identify the geographical principles (watershed, CPR, polluter pays).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_006', difficulty: 'standard',
          question: 'A disaster is a serious disruption of the functioning of a community or society.',
          hint: 'If unsure about hazard-disaster distinction or India\'s hazard map, revisit.',
          misconception: 'Students often believe that "natural disaster" means the disaster is caused solely by nature and humans have no role.',
          parts: [
                { id: 'a', prompt: 'Analyse the following statement: "The 2023 Joshimath land subsidence in Uttarakhand is a purely natural disaster caused by geological instability." Identify.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'natural because the ground moved on its own', 'natural disaster'],
                  hint: 'If unsure about hazard-disaster distinction or India\'s hazard map, revisit c11_geo_cbse_11_001 and.',
                  misconception: 'Students often believe that "natural disaster" means the disaster is caused solely by nature and humans have no role.' }
          ],
            remediations: { 'natural-disaster-means-the-disaster': { steps: ['Revisit c11_geo_cbse_11_001 (Natural Hazards vs Natural Disasters) and re-read the PAR (Pressure and Release) model.', 'Take the 2013 Uttarakhand case — list 5 human decisions made 10-20 years before the event that increased.', 'Compare with 1999 Odisha Super Cyclone vs 2019 Cyclone Fani — create a T-chart of "what changed in societal capacity."', 'Re-attempt DIAGNOSTIC_QUESTION_4 and DIAGNOSTIC_QUESTION_5. If still stuck, watch the 15-min NDMA video "From Hazard.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
