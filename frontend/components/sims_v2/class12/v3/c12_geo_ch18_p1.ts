import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch18_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch18_p1: SimDef = {
    id: 'v3_c12_geo_ch18_p1',
    title: 'Data: Sources and Types · Part 1/2',
    subtitle: 'The river averaged 0.95 m — and the child drowned anyway',
    classLevel: 12, subject: 'geography', topic: 'Data: Sources and Types · Part 1/2',
    chapters: ['c12_geo_ch18'],
    nodeIds: ['c12_geo_cbse_18_001', 'c12_geo_cbse_18_002', 'c12_geo_cbse_18_003', 'c12_geo_cbse_18_004', 'c12_geo_cbse_18_005', 'c12_geo_cbse_18_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geographical data analyst', intro: 'Numbers measure the world — but only processed numbers describe it. The gap between the two is where bad decisions live.', goal: 'Distinguish data from information and unmask the statistical fallacy of averaging away spatial variation.' },
    discovery: {
        question: 'A river averages 0.95 m deep; a 1-metre-tall child wades in — and drowns. The mean said \'safe.\' What did it hide?',
        options: ['Spatial variation — one stretch was 1.5 m; a single average erases the extremes that actually decide outcomes, the statistical fallacy geography warns against', 'Nothing — the child misjudged', 'The data was wrong', 'Rivers are always safe under 1m'],
        answer: 'Spatial variation — one stretch was 1.5 m; a single average erases the extremes that actually decide outcomes, the statistical fallacy geography warns against',
        hook: 'Data aren\'t information: 42°C in Delhi, 33 in Mumbai, 22 in Shimla are raw numbers — \'India averages 34°C, so a heat wave\' is a fallacy because geography varies over space. Ratios, rates and maps turn numbers into answers; the mean alone turns them into traps.',
    },
    teaching: [
        { title: 'Geographical Data: Definition and Significance', text: 'Geographical data are systematically collected numerical or categorical measurements representing real-world spatial phenomena (such as temperature, population, elevation, crop yield, or rainfall).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_18_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rescue decisions from bad averages: separate data from information, expose the river-depth fallacy, and prove why Cherrapunji\'s 11,000 mm and Jaisalmer\'s 150 mm can\'t share one national mean.',
        labels: ['Geographical Data: Definition', 'Sources of Data: Primary', 'Primary Data Sources: Field', 'Secondary Data Sources: Census,', 'Types of Data: Quantitative', 'Types of Data: Spatial'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_001', title: 'Geographical Data: Definition and Significance',
          caseStudy: { intro: 'Begin with the familiar TV news ticker showing temperatures of Indian cities (Delhi 42°C, Mumbai 33°C, Shimla 22°C) — these numbers are *data*.',
            decisions: [{ prompt: 'Define geographical data and give one concrete example from the Indian context that matches the NCERT definition.', options: [
                { text: 'Geographical data are numbers representing measurements from the real world (e.g., 20 cm', outcome: 'Geographical data are numbers representing measurements from the real world (e.g., 20 cm rainfall.' },
                { text: 'data are facts', outcome: 'Not quite — Students often treat **data and information as synonyms**, writing "data means information".', reveals: 'students-often-treat-data-and' },
                { text: 'data are information', outcome: 'Not quite — Students often treat **data and information as synonyms**, writing "data means information".', reveals: 'students-often-treat-data-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_002', title: 'Sources of Data: Primary and Secondary Data',
          caseStudy: { intro: 'Imagine you are standing in a farm in Punjab during kharif season — you see paddy fields, hear tube wells running, and notice soil moisture.',
            decisions: [{ prompt: 'A researcher visits 50 villages in Rajasthan’s Thar Desert and records the depth of each open well using a measuring tape.', options: [
                { text: 'Both variables are primary data', outcome: 'Both variables are primary data. Depth is collected via **personal observation with instrumental.' },
                { text: 'secondary', outcome: 'Not quite — Students believe **"published data is always secondary"** and **"unpublished data is always.', reveals: 'published-data-is-always-secondary' },
                { text: 'Personal Observations', outcome: 'Not quite — Students believe **"published data is always secondary"** and **"unpublished data is always.', reveals: 'published-data-is-always-secondary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_004', title: 'Secondary Data Sources: Census, Government Publications, Reports',
          caseStudy: { intro: 'Imagine you need to compare groundwater depletion in Punjab and Rajasthan for your Class 12 project — you cannot drill wells yourself, so you turn to the.',
            decisions: [{ prompt: 'Which of the following is a quasi-government secondary data source for urban infrastructure in India?', options: [
                { text: 'Correct answer: (b) Municipal Corporation development plan documents', outcome: 'Correct answer: (b) Municipal Corporation development plan documents.' },
                { text: 'secondary data', outcome: 'Not quite — Students believe "secondary data" means *only* published books and reports, ignoring unpublished.', reveals: 'secondary-data-means-only-published' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_005', title: 'Types of Data: Quantitative and Qualitative Data',
          caseStudy: { intro: 'Imagine you are looking at a weather report for your city: it shows "Temperature: 32°C" (a number) and "Sky condition: Partly cloudy" (a description).',
            decisions: [{ prompt: 'Define quantitative data and qualitative data in geography. Give one example of each from Indian physical geography.', options: [
                { text: 'Quantitative data: numerical measurements that can be counted or measured (e.g., annual', outcome: 'Quantitative data: numerical measurements that can be counted or measured (e.g., annual rainfall.' },
                { text: 'Laterite', outcome: 'Not quite — Students often believe that any data expressed in numbers is quantitative.', reveals: 'any-data-expressed-in-numbers' },
                { text: 'any data expressed in numbers is quantitative', outcome: 'Not quite — Students often believe that any data expressed in numbers is quantitative.', reveals: 'any-data-expressed-in-numbers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_006', title: 'Types of Data: Spatial and Non-Spatial Data',
          caseStudy: { intro: 'Imagine you open a weather app showing a map of India with colored circles for temperature: the circles\' positions (latitude/longitude) are spatial data, while.',
            decisions: [{ prompt: 'Define spatial data and give one example from a topographical map.', options: [
                { text: 'Spatial data refers to data that has a geographic location reference (e.g., coordinates,', outcome: 'Spatial data refers to data that has a geographic location reference (e.g., coordinates, address.' },
                { text: 'temperature values on a map', outcome: 'Not quite — Students often think any data displayed on a map is spatial data.', reveals: 'any-data-displayed-on-a' },
                { text: 'any data displayed on a map is spatial data', outcome: 'Not quite — Students often think any data displayed on a map is spatial data.', reveals: 'any-data-displayed-on-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a geography project on literacy in a low-literacy tribal block, a teammate designs a beautiful written questionnaire to hand out at the weekly haat, and calls the satellite image she downloaded \'my primary data since I processed it myself.\'',
            decisions: [{ prompt: 'What two corrections does data-sourcing require?', options: [
                { text: 'Swap the questionnaire for an enumerator-filled schedule so non-literate respondents aren\'t excluded, and relabel the imagery — data is primary only if you collected it for this investigation; processed-by-me is still secondary.', outcome: 'Both fixes come from the same rule: source is defined by who collected the data and why, not by publication status or who formatted it — and instrument choice decides who your dataset can even hear.' },
                { text: 'Keep the questionnaire — people can ask a literate neighbour to fill it for them.', outcome: 'That builds selection bias straight into the sample: the non-literate households you most need to reach are precisely the ones the self-filled form systematically drops.', reveals: 'proxy-filling-fixes-literacy' },
                { text: 'Keep calling the imagery primary since unpublished field notes are the only real secondary source.', outcome: 'It inverts the rule: unpublished patwari records are secondary because you didn\'t collect them, and published satellite scenes are secondary for you even though they were primary for the space agency.', reveals: 'publication-decides-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now spot when a single number is lying by omission — the first reflex of anyone who works with geographical data.',
            decisions: [{ prompt: 'What comes next? Data: Sources and Types · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Data: Sources and Types · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_001', difficulty: 'standard',
          question: 'Geographical data are systematically collected numerical or categorical.',
          hint: 'If stuck, revisit Class 11 Practical Work in Geography (Map Reading c11_geo_cbse_22_005.',
          misconception: 'Students often treat **data and information as synonyms**, writing "data means information" in exams.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Geographical data are systematically collected numerical or categorical measurements',
                  options: ['Geographical data are systematically collected numerical or categorical measurements', 'Primary data are original measurements collected firsthand by the researcher through', 'Primary data sources in geography are original data collected firsthand by the researcher', 'Secondary data sources are pre-existing datasets collected, compiled, and published by'],
                  hint: 'If stuck, revisit Class 11 Practical Work in Geography (Map Reading c11_geo_cbse_22_005 and Remote.',
                  misconception: 'Students often treat **data and information as synonyms**, writing "data means information" in exams.' }
          ],
            remediations: { 'students-often-treat-data-and': { steps: ['Re-read the NCERT river-depth story (Fig.', 'Plot the four depths (0.6, 0.8, 0.9, 1.5) on a number line; mark the mean (0.95) and the child\'s height (1.0).', 'Visually see that the mean is not the maximum.', 'Collect heights of 5 classmates.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_002', difficulty: 'standard',
          question: 'Primary data are original measurements collected firsthand by the researcher.',
          hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1.',
          misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.',
          parts: [
                { id: 'a', prompt: 'A researcher visits 50 villages in Rajasthan’s Thar Desert and records the depth of each open well using a measuring tape.', answer: 'Both variables are primary data',
                  options: ['Both variables are primary data', 'secondary', 'Personal Observations', 'published data is always secondary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' },
                { id: 'b', prompt: 'Why does NCERT distinguish between a "questionnaire" (filled by respondent) and a "schedule" (filled by trained enumerator)?', answer: 'A questionnaire requires respondent literacy',
                  options: ['A questionnaire requires respondent literacy', 'who fills the form', 'published data is always secondary', 'unpublished data is always primary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' },
                { id: 'c', prompt: 'You are studying the change in forest cover of the Western Ghats between 2000 and 2020.', answer: '(A) Secondary — satellite imagery processed by ISRO (original collector)',
                  options: ['(A) Secondary — satellite imagery processed by ISRO (original collector)', 'published data is always secondary', 'unpublished data is always primary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' },
                { id: 'd', prompt: 'Compare the *spatial resolution* and *temporal frequency* of secondary data from: (i) Census of India (decadal), (ii) IMD daily rainfall grids (0.25° × 0.25°).', answer: 'Choose **IMD daily rainfall grids**',
                  options: ['Choose **IMD daily rainfall grids**', 'published data is always secondary', 'unpublished data is always primary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' }
          ],
            remediations: { 'published-data-is-always-secondary': { steps: ['Revisit **c12_geo_cbse_18_001** (Geographical Data: Definition and Significance) — confirm the definition of "data".', 'Create a **2×2 matrix** on paper: rows = Primary/Secondary, columns = Published/Unpublished.', 'Take the **re-diagnostic**: classify these three — (i) Census 2011 PDF, (ii) your interview recording of a farmer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement for a Class 12 board exam answer: "Secondary data is always less reliable than primary data because the researcher cannot verify the.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'secondary = less reliable', 'published data is always secondary', 'unpublished data is always primary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' },
                { id: 'b', prompt: 'Design a mixed-method data collection plan for a geographical investigation of **urban heat island intensity** in Delhi NCR.', answer: 'two primary data methods with instruments, (',
                  options: ['two primary data methods with instruments, (', 'published data is always secondary', 'unpublished data is always primary'],
                  hint: 'If stuck, re-read the "What is Data?" and "Need of Data" sections in NCERT Chapter 1 (Practical.',
                  misconception: 'Students believe **"published data is always secondary"** and **"unpublished data is always primary"**.' }
          ],
            remediations: { 'published-data-is-always-secondary': { steps: ['Revisit **c12_geo_cbse_18_001** (Geographical Data: Definition and Significance) — confirm the definition of "data".', 'Create a **2×2 matrix** on paper: rows = Primary/Secondary, columns = Published/Unpublished.', 'Take the **re-diagnostic**: classify these three — (i) Census 2011 PDF, (ii) your interview recording of a farmer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_003', difficulty: 'standard',
          question: 'Primary data sources in geography are original data collected firsthand by the.',
          hint: 'If confused about questionnaire vs schedule, revisit c12_geo_cbse_18_002 (primary data.',
          misconception: 'Students equate "questionnaire" and "schedule" as interchangeable terms for any written question set.',
          parts: [
                { id: 'a', prompt: 'Design a 5-item interview schedule (not questionnaire) to investigate the impact of groundwater depletion on cropping pattern shift in a Punjab village.', answer: 'quantitative water table depth, (',
                  options: ['quantitative water table depth, (', 'last five years'],
                  hint: 'If confused about questionnaire vs schedule, revisit c12_geo_cbse_18_002 (primary data definition).',
                  misconception: 'Students equate "questionnaire" and "schedule" as interchangeable terms for any written question set.' },
                { id: 'b', prompt: 'Compare the data quality risks of using a mailed questionnaire versus a face-to-face schedule for a literacy-rate survey in a tribal block of Chhattisgarh.', answer: '(i) Mailed questionnaire: near-zero response from illiterate 40%',
                  options: ['(i) Mailed questionnaire: near-zero response from illiterate 40%', 'only the literate and educated people can be approached', 'information from both literate and illiterate respondents can be collected'],
                  hint: 'If confused about questionnaire vs schedule, revisit c12_geo_cbse_18_002 (primary data definition).',
                  misconception: 'Students equate "questionnaire" and "schedule" as interchangeable terms for any written question set.' }
          ],
            remediations: { 'students-equate-questionnaire-and-schedule': { steps: ['Revisit c12_geo_cbse_18_002 (Primary vs Secondary Data) to re-anchor the definition of primary data as "collected for.', 'Create a 2×2 comparison table: Questionnaire vs Schedule × Literate vs Illiterate Respondent — fill each cell with.', 'Role-play an interview with a classmate playing a farmer: practice all eight NCERT precautions; record where you fail.', 'Redo Diagnostic Question 3 (design schedule) after step 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_004', difficulty: 'standard',
          question: 'Secondary data sources are pre-existing datasets collected, compiled, and.',
          hint: 'If unclear on primary vs. secondary distinction, re-read NCERT Chapter 1 "Sources.',
          misconception: 'Students believe "secondary data" means *only* published books and reports, ignoring unpublished government records.',
          parts: [
                { id: 'a', prompt: 'Which of the following is a quasi-government secondary data source for urban infrastructure in India?', answer: 'Correct answer: (b) Municipal Corporation development plan documents',
                  options: ['Correct answer: (b) Municipal Corporation development plan documents', 'secondary data'],
                  hint: 'If unclear on primary vs. secondary distinction, re-read NCERT Chapter 1 "Sources of Data" section.',
                  misconception: 'Students believe "secondary data" means *only* published books and reports, ignoring unpublished government records (village revenue.' },
                { id: 'b', prompt: 'Compare the Census of India and the National Sample Survey Office (NSSO) as sources for studying rural employment patterns.', answer: 'Two fundamental differences: (1) **Coverage vs',
                  options: ['Two fundamental differences: (1) **Coverage vs', 'secondary data', 'treats them as interchangeable ignores the spatial resolution vs'],
                  hint: 'If unclear on primary vs. secondary distinction, re-read NCERT Chapter 1 "Sources of Data" section.',
                  misconception: 'Students believe "secondary data" means *only* published books and reports, ignoring unpublished government records (village revenue.' }
          ],
            remediations: { 'secondary-data-means-only-published': { steps: ['Revisit node **c12_geo_cbse_18_002** (Sources of Data: Primary and Secondary Data) — re-read the NCERT Fig.', 'Visit the Census of India website (censusindia.gov.in) and MOSPI portal (mospi.gov.in) — navigate to "Data Access".', 'For your own district, locate the District Statistical Handbook (published by DES) and the Village Directory (Census).', 'Re-attempt Diagnostic Question 6 with this hands-on familiarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_005', difficulty: 'standard',
          question: 'Quantitative data in geography refers to numerical measurements that can.',
          hint: 'If stuck, re-read the "What is Data?" section in NCERT Chapter 18 and complete the.',
          misconception: 'Students often believe that any data expressed in numbers is quantitative.',
          parts: [
                { id: 'a', prompt: 'A student records the following during a field survey in a Rajasthan village: "Number of households: 150", "Dominant caste group: Meena", "Average landholding.', answer: 'Quantitative: Number of households (150), Average landholding size (2.5 ha)',
                  options: ['Quantitative: Number of households (150), Average landholding size (2.5 ha)', 'any data expressed in numbers is quantitative'],
                  hint: 'If stuck, re-read the "What is Data?" section in NCERT Chapter 18 and complete the classification.',
                  misconception: 'Students often believe that any data expressed in numbers is quantitative.' }
          ],
            remediations: { 'any-data-expressed-in-numbers': { steps: ['Revisit c12_geo_cbse_18_001 (Geographical Data: Definition) to reinforce that data are "numbers representing.', 'Create a two-column table: list 10 geographical variables (e.g., temperature, soil type, population, crop name.', 'Classify each as quantitative/qualitative and justify in one sentence.', 'Practice with NCERT Table 1.1 (population data) and Table 1.2 (literacy rates) — identify which columns are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_006', difficulty: 'standard',
          question: 'Spatial data refers to information that identifies the geographic location.',
          hint: 'Revisit c11_geo_cbse_22_001 (map elements) and c11_geo_cbse_22_006 (coordinate systems).',
          misconception: 'Students often think any data displayed on a map is spatial data.',
          parts: [
                { id: 'a', prompt: 'Explain why a table of state-wise population totals is non-spatial data, but becomes spatial when joined to a state boundary shapefile.', answer: 'The table alone lacks geographic coordinates',
                  options: ['The table alone lacks geographic coordinates', 'the table has coordinates', 'any data displayed on a map is spatial data'],
                  hint: 'Revisit c11_geo_cbse_22_001 (map elements) and c11_geo_cbse_22_006 (coordinate systems) to solidify.',
                  misconception: 'Students often think any data displayed on a map is spatial data.' },
                { id: 'b', prompt: 'Given a dataset of 50 soil sample points with pH values, classify each column as spatial or non-spatial: Sample_ID, Latitude, Longitude, Depth_cm,.', answer: 'Spatial: Latitude, Longitude (direct coordinates)',
                  options: ['Spatial: Latitude, Longitude (direct coordinates)', 'any numerical field is spatial', 'any data displayed on a map is spatial data'],
                  hint: 'Revisit c11_geo_cbse_22_001 (map elements) and c11_geo_cbse_22_006 (coordinate systems) to solidify.',
                  misconception: 'Students often think any data displayed on a map is spatial data.' },
                { id: 'c', prompt: 'Compare the role of spatial and non-spatial data in creating a choropleth map of literacy rates by district.', answer: 'Spatial data (district boundary polygons) defines the "where"',
                  options: ['Spatial data (district boundary polygons) defines the "where"', 'any data displayed on a map is spatial data'],
                  hint: 'Revisit c11_geo_cbse_22_001 (map elements) and c11_geo_cbse_22_006 (coordinate systems) to solidify.',
                  misconception: 'Students often think any data displayed on a map is spatial data.' }
          ],
            remediations: { 'any-data-displayed-on-a': { steps: ['Take a printed topographical map (SOI toposheet) and a printed table of village amenities.', 'Physically cut out the map features (points, lines, polygons) and the table rows.', 'Match each village point on the map to its row in the table using the village name — the map piece is spatial, the.', 'Repeat with a digital GIS software (QGIS) by opening a shapefile and its attribute table; toggle between map view and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
