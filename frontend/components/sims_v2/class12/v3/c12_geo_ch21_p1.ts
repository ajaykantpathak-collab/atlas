import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch21_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch21_p1: SimDef = {
    id: 'v3_c12_geo_ch21_p1',
    title: 'Field Surveys and Spatial Information Technology · Part 1/2',
    subtitle: 'The satellite saw the change — only the village knew why',
    classLevel: 12, subject: 'geography', topic: 'Field Surveys and Spatial Information Technology · Part 1/2',
    chapters: ['c12_geo_ch21'],
    nodeIds: ['c12_geo_cbse_21_001', 'c12_geo_cbse_21_002', 'c12_geo_cbse_21_003', 'c12_geo_cbse_21_004', 'c12_geo_cbse_21_005', 'c12_geo_cbse_21_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field researcher', intro: 'Every great map is a claim about the world. The field survey is where you go to check if it\'s true.', goal: 'Justify field surveys for ground-truthing, temporal currency and the human dimensions sensors can\'t read.' },
    discovery: {
        question: 'Google Maps shows a road; on the ground it\'s a footpath. A new slum rose after the satellite passed. Which source settles it?',
        options: ['The field survey — only ground truth carries the current, site-specific reality and the human \'why\' that sensors can\'t detect', 'The satellite — it\'s newer tech', 'The map — it\'s official', 'Whichever is cheaper'],
        answer: 'The field survey — only ground truth carries the current, site-specific reality and the human \'why\' that sensors can\'t detect',
        hook: 'Drones and LiDAR don\'t retire the field survey — satellites see that forest became farm, not why (displacement? subsidy? markets?), and every remote-sensing classification needs ground-truth points or the model hallucinates. Data volume is not explanatory depth.',
    },
    teaching: [
        { title: 'Field Surveys: Meaning, Need and Significance in Geography', text: 'A field survey in geography is a systematic primary data collection method where researchers directly observe, measure, and record spatial phenomena (physical features, human activities.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_21_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Get boots on the ground: split what instruments measure from what interviews reveal, design a groundwater survey for a semi-arid block, and defend the questionnaire against the satellite.',
        labels: ['Field Surveys: Meaning, Need', 'Field Survey Design: Steps', 'Field Survey Methods: Questionnaire,', 'Field Survey: Sampling Methods', 'Field Data Collection: Recording', 'Spatial Information Technology: Concept'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_001', title: 'Field Surveys: Meaning, Need and Significance in Geography',
          caseStudy: { intro: 'Start by asking students: "When Google Maps shows a road but you find a footpath on the ground — which do you trust?" This real-world mismatch introduces the.',
            decisions: [{ prompt: 'Define "field survey" in geography and state one fundamental way it differs from using topographical maps or satellite imagery as data.', options: [
                { text: 'A field survey is the systematic collection of primary geographic data through direct', outcome: 'A field survey is the systematic collection of primary geographic data through direct observation.' },
                { text: 'map reading', outcome: 'Not quite — Students think field surveys are just "asking people questions" or "taking GPS points." They miss.', reveals: 'field-surveys-are-just-asking' },
                { text: 'asking people questions', outcome: 'Not quite — Students think field surveys are just "asking people questions" or "taking GPS points." They miss.', reveals: 'field-surveys-are-just-asking' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_002', title: 'Field Survey Design: Steps and Planning',
          scaffold: { problem: 'Design the sampling strategy for a field survey on "Groundwater Irrigation Equity in a 12-village Gram Panchayat in Karnataka\'s Kolar.',
            steps: [
            { text: 'Define population and strata — Population = 2,400 borewells; Strata = 3 hydrogeological zones (natural strata based.' },
            { text: 'Calculate base sample size per stratum using finite population correction for each zone separately (since variability.' },
            { text: 'Apply Neyman allocation for optimal precision — but here strata ARE the comparison groups, so proportional allocation.' },
            { text: 'Select sampling method within strata — Systematic random sampling from the borewell list (available from BESCOM.' },
            { text: 'Plan field logistics — 777 wells × 20 min/well = 259 hours. With 3 enumerators × 6 hrs/day = 14.4 days.' },
            { text: 'Build protocol card — Variables: Well_ID, Zone, Depth_m, Yield_lps, Subsidy_Y/N, Crop_Type, GPS.', faded: true, blankAnswer: 'Sample 777 borewells (265 Hard Rock, 278 Weathered, 234.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_003', title: 'Field Survey Methods: Questionnaire, Interview, Observation',
          caseStudy: { intro: 'Imagine you are standing in a bustling weekly market in your town — vendors shouting prices, buyers bargaining, goods arranged in patterns.',
            decisions: [{ prompt: 'Define "structured questionnaire" and "unstructured interview" in the context of geographical field surveys.', options: [
                { text: 'A structured questionnaire uses pre-determined, fixed-response questions (e.g., multiple', outcome: 'A structured questionnaire uses pre-determined, fixed-response questions (e.g., multiple choice.' },
                { text: 'What percentage of farmers in Punjab use drip irrigation?', outcome: 'Not quite — Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative".', reveals: 'questionnaire-quantitative' },
                { text: 'Why do tribal communities in Bastar resist relocation from forest areas?', outcome: 'Not quite — Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative".', reveals: 'questionnaire-quantitative' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_004', title: 'Field Survey: Sampling Methods (Random, Stratified, Systematic)',
          scaffold: { problem: 'A geography student plans a field survey on crop diversification in a block with 1,200 operational holdings.',
            steps: [
            { text: 'Identify the three strata based on irrigation regime and their population sizes: N₁=500 (canal), N₂=400 (tube-well).' },
            { text: 'Compute the overall sampling fraction: f = n/N = 120/1200 = 0.10 (10%).' },
            { text: 'Apply proportional allocation: n_h = f × N_h for each stratum.' },
            { text: 'For each stratum, obtain the list of holdings (sampling frame).' },
            { text: 'Verify that no holding appears in more than one stratum (mutually exclusive strata) and that every holding has a known.', faded: true, blankAnswer: 'Canal: 50 holdings, Tube-well: 40 holdings, Rainfed: 30.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_005', title: 'Field Data Collection: Recording and Documentation Techniques',
          caseStudy: { intro: 'Imagine you are standing in a bustling weekly market in a village near Bhopal, Madhya Pradesh, tasked with mapping vendor locations and customer flow patterns.',
            decisions: [{ prompt: 'A student conducts a land-use survey in a peri-urban village using a GPS handheld device.', options: [
                { text: 'The student should have recorded: (1) the datum/projection system used by the GPS device', outcome: 'The student should have recorded: (1) the datum/projection system used by the GPS device (typically.' },
                { text: 'recording data', outcome: 'Not quite — Students believe "recording data" means writing down whatever they observe in a notebook, and that.', reveals: 'recording-data-means-writing-down' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_006', title: 'Spatial Information Technology: Concept and Components',
          caseStudy: { intro: 'Imagine you are the District Magistrate of Aligarh and need to decide where to build a new primary health centre.',
            decisions: [{ prompt: 'Define Spatial Information Technology and name the five technologies it amalgamates.', options: [
                { text: 'Spatial Information Technology is the use of technological inputs for collecting,', outcome: 'Spatial Information Technology is the use of technological inputs for collecting, storing.' },
                { text: 'decision support', outcome: 'Not quite — Students think "GIS is just software like ArcGIS or QGIS" and equate learning GIS with learning.', reveals: 'gis-is-just-software-like' },
                { text: 'GIS is just software like ArcGIS or QGIS', outcome: 'Not quite — Students think "GIS is just software like ArcGIS or QGIS" and equate learning GIS with learning.', reveals: 'gis-is-just-software-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A team planning a field survey on groundwater decline announces: \'We\'ll stand at the village bus stop, ask every tenth person about their well, skip the pilot since the questions look fine, and title it Water Problems in Our Area.\'',
            decisions: [{ prompt: 'What does survey design say is wrong with this plan?', options: [
                { text: 'Nearly everything — the objective needs measurable variables and spatial bounds, the bus-stop \'every tenth person\' is a convenience sample blind to housing types that drive water access, and skipping the pilot risks ambiguous questions and inconsistent units no analysis can repair.', outcome: 'The chapter\'s design loop — problem, population, instrument, pilot, logistics — exists because data quality is decided before the field; a vague title plus a handy crowd plus an untested schedule produces numbers that can\'t answer the question.' },
                { text: 'It\'s acceptable — every tenth person is random sampling, and a short questionnaire is efficient.', outcome: 'A bus-stop intercept is systematic sampling of whoever happens to pass the stop — a frame that excludes non-travellers and confuses regularity with representativeness.', reveals: 'every-tenth-is-random' },
                { text: 'Just fix the title to something measurable; the sampling and instrument can stay.', outcome: 'A sharper objective can\'t rescue a biased frame or an unpiloted instrument — design flaws downstream of the question still invalidate every observation collected.', reveals: 'title-fixes-design' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue why geography still needs the field — the map proposes, but the ground disposes.',
            decisions: [{ prompt: 'What comes next? Field Surveys and Spatial Information Technology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Field Surveys and Spatial Information Technology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_001', difficulty: 'standard',
          question: 'A field survey in geography is a systematic primary data collection method.',
          hint: 'If you cannot identify a "V-shaped valley" or "dendritic drainage" on a toposheet and.',
          misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A field survey in geography is a systematic primary data collection method where',
                  options: ['A field survey in geography is a systematic primary data collection method where', 'Field Survey Design is the systematic process of planning a primary data collection', 'Field survey methods are systematic techniques for collecting primary geographical data', 'Sampling in field surveys is the process of selecting a representative subset of units'],
                  hint: 'If you cannot identify a "V-shaped valley" or "dendritic drainage" on a toposheet and visualize its.',
                  misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field survey must start with.' }
          ],
            remediations: { 'field-surveys-are-just-asking': { steps: ['Revisit **c11_geo_cbse_24_003 (Interpreting Contours)** and **c11_geo_cbse_24_004 (Landform Identification)**.', 'Do a **micro-field task**: In 30 minutes, map *all* water sources (tap, handpump, well, tanker) in your school.', 'Write a 150-word reflection: "What did I find that the municipal water map didn\'t show?" 4.', 'Re-attempt Diagnostic Q3 with this experience.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "With advances in drones, LiDAR, and real-time satellite data, field surveys are becoming obsolete for geographic research." Argue for.', answer: '**Against — field surveys remain irreplaceable because:** 1',
                  options: ['**Against — field surveys remain irreplaceable because:** 1', 'asking people questions', 'taking GPS points', 'field surveys are just "asking people questions" or "taking GPS points'],
                  hint: 'If you cannot identify a "V-shaped valley" or "dendritic drainage" on a toposheet and visualize its.',
                  misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field survey must start with.' }
          ],
            remediations: { 'field-surveys-are-just-asking': { steps: ['Revisit **c11_geo_cbse_24_003 (Interpreting Contours)** and **c11_geo_cbse_24_004 (Landform Identification)**.', 'Do a **micro-field task**: In 30 minutes, map *all* water sources (tap, handpump, well, tanker) in your school.', 'Write a 150-word reflection: "What did I find that the municipal water map didn\'t show?" 4.', 'Re-attempt Diagnostic Q3 with this experience.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_002', difficulty: 'standard',
          question: 'Field Survey Design is the systematic process of planning a primary data.',
          hint: 'If stuck on operationalization, revisit **c11_soc_cbse_05_008** (sampling theory) and.',
          misconception: 'Students believe "field survey design" means only writing a questionnaire.',
          parts: [
                { id: 'a', prompt: 'A student writes the research objective as: "To study water problems in my city." Identify the specific flaw in this objective from a field survey design.', answer: 'The flaw: "water problems" is vague (quality?',
                  options: ['The flaw: "water problems" is vague (quality?', 'study X', 'field survey design', '"field survey design" means only writing a questionnaire'],
                  hint: 'If stuck on operationalization, revisit **c11_soc_cbse_05_008** (sampling theory) and.',
                  misconception: 'Students believe "field survey design" means only writing a questionnaire.' },
                { id: 'b', prompt: 'During reconnaissance for a survey on "changing cropping patterns in Narmada valley villages," a student decides to skip the pilot test because "the.', answer: 'Pilot testing is not optional',
                  options: ['Pilot testing is not optional', 'field survey design', '"field survey design" means only writing a questionnaire'],
                  hint: 'If stuck on operationalization, revisit **c11_soc_cbse_05_008** (sampling theory) and.',
                  misconception: 'Students believe "field survey design" means only writing a questionnaire.' },
                { id: 'c', prompt: 'Compare the field survey design requirements for studying (A) "Perception of heat stress among street vendors in Delhi\'s Chandni Chowk" vs (B) "Soil moisture.', answer: '| Design Element | (A) Street Vendors, Chandni Chowk | (B) Wheat Farm, Punjab |',
                  options: ['| Design Element | (A) Street Vendors, Chandni Chowk | (B) Wheat Farm, Punjab |', 'questionnaire surveys', 'field survey design', '"field survey design" means only writing a questionnaire'],
                  hint: 'If stuck on operationalization, revisit **c11_soc_cbse_05_008** (sampling theory) and.',
                  misconception: 'Students believe "field survey design" means only writing a questionnaire.' }
          ],
            remediations: { 'field-survey-design-means-only': { steps: ['If a student cannot design a survey plan: **Step 1**: Revisit **c12_geo_cbse_21_001** (Meaning, Need, Significance).', '**Step 2**: Take a *real* CBSE Class 12 practical file (senior\'s or teacher\'s sample) and reverse-engineer its design.', 'Annotate each with "This is Step X of design." **Step 3**: Do a **micro-pilot** in your own building: design.', 'This builds the *design reflex* — the habit of asking "Will this question work in the field?" before finalizing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_003', difficulty: 'standard',
          question: 'Field survey methods are systematic techniques for collecting primary.',
          hint: 'If stuck on method selection, revisit c12_geo_cbse_21_002 Step 3 (Objective Setting).',
          misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Field survey methods are systematic techniques for collecting primary geographical data',
                  options: ['Field survey methods are systematic techniques for collecting primary geographical data', 'A field survey in geography is a systematic primary data collection method where', 'Field Survey Design is the systematic process of planning a primary data collection', 'Sampling in field surveys is the process of selecting a representative subset of units'],
                  hint: 'If stuck on method selection, revisit c12_geo_cbse_21_002 Step 3 (Objective Setting) — ask: "Does.',
                  misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid categories.' }
          ],
            remediations: { 'questionnaire-quantitative': { steps: ['Revisit c12_geo_cbse_21_002 (Field Survey Design) — review how research questions dictate method choice.', 'Create a 2×3 matrix: Research Question Type (What/How much, Why/How, Where/When) × Method (Questionnaire, Interview.', 'Take a past CBSE practical question (e.g., 2023: "Design a questionnaire for land use survey") and rewrite it for.', 'Re-attempt Diagnostic Q2 and Q4 — if still incorrect, consult teacher for method-matching drill.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_004', difficulty: 'standard',
          question: 'Sampling in field surveys is the process of selecting a representative subset.',
          hint: 'If stuck, review the definitions of population vs. sample and the concept of a sampling.',
          misconception: 'Students often believe that systematic sampling is "random enough" and can replace stratified sampling when the.',
          parts: [
                { id: 'a', prompt: 'A village has 420 households arranged linearly along a main road. You need a systematic sample of 60 households.', answer: 'Sampling interval k = N/n = 420/60 = 7',
                  options: ['Sampling interval k = N/n = 420/60 = 7', 'random enough', '25 from each stratum'],
                  hint: 'If stuck, review the definitions of population vs. sample and the concept of a sampling frame.',
                  misconception: 'Students often believe that systematic sampling is "random enough" and can replace stratified sampling when the population.' }
          ],
            remediations: { 'systematic-sampling-is-random-enough': { steps: ['Revisit c12_geo_cbse_21_002 (Field Survey Design: Steps and Planning) to review how to define the target population and.', 'Use a deck of 52 cards as a physical analogue: shuffle (simple random), separate by suit then draw proportionally.', 'Re-attempt Diagnostic Questions 2 and 4 with this concrete analogy.', 'If confusion persists, consult the NCERT Practical Work in Geography Part-II, Chapter on Field Survey, worked examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_005', difficulty: 'standard',
          question: 'Field data collection recording and documentation techniques refer to the.',
          hint: 'If stuck on variable types or spatial referencing, revisit **c11_geo_cbse_22_006**.',
          misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone.',
          parts: [
                { id: 'a', prompt: 'A student sketches a transect profile of a riverbank in the Sundarbans showing vegetation zones.', answer: 'The five essential elements: (1) **Title/Feature name**',
                  options: ['The five essential elements: (1) **Title/Feature name**', 'recording data'],
                  hint: 'If stuck on variable types or spatial referencing, revisit **c11_geo_cbse_22_006** (Coordinate.',
                  misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone apps, GPS).' }
          ],
            remediations: { 'recording-data-means-writing-down': { steps: ['If the student cannot design a recording sheet with metadata headers, coded fields, and error-prevention features: (1).', '(2) Practice with **c11_geo_cbse_24_003** (Interpreting Contours) — the discipline of reading standardized symbols.', '(3) Complete a **mini-field exercise**: record 10 tree observations (species, girth, height, GPS, photo) in your school.', 'Gaps revealed = recording flaws to fix.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_006', difficulty: 'standard',
          question: 'Spatial Information Technology (SIT) is the integrated use of technological.',
          hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007, c11_geo_cbse_23_005) and.',
          misconception: 'Students think "GIS is just software like ArcGIS or QGIS" and equate learning GIS with learning software buttons.',
          parts: [
                { id: 'a', prompt: 'Why can a standalone Database Management System (DBMS) or Computer-Assisted Cartography not function as a decision support system for geographic problems?', answer: 'DBMS only processes data and presents it graphically',
                  options: ['DBMS only processes data and presents it graphically', 'what if', 'What happens if we shift this facility?', 'DBMS cannot store maps'],
                  hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007, c11_geo_cbse_23_005) and Coordinate Systems.',
                  misconception: 'Students think "GIS is just software like ArcGIS or QGIS" and equate learning GIS with learning software buttons.' }
          ],
            remediations: { 'gis-is-just-software-like': { steps: ['Re-read NCERT Fig. 4.2 and the five bullet points under "Components of GIS".', 'Take a paper map of your school campus. Identify: Hardware (your phone/laptop), Software (any map app), Data (the map.', 'Write one sentence for each component describing its role in *your* campus mapping project.', 'Attempt Diagnostic Question 2 again — if you can now explain why software alone isn\'t a GIS, the misconception.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
