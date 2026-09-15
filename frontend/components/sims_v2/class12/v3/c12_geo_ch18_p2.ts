import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch18_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch18_p2: SimDef = {
    id: 'v3_c12_geo_ch18_p2',
    title: 'Data: Sources and Types · Part 2/2',
    subtitle: 'The river averaged 0.95 m — and the child drowned anyway',
    classLevel: 12, subject: 'geography', topic: 'Data: Sources and Types · Part 2/2',
    chapters: ['c12_geo_ch18'],
    nodeIds: ['c12_geo_cbse_18_007', 'c12_geo_cbse_18_008', 'c12_geo_cbse_18_009', 'c12_geo_cbse_18_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geographical data analyst', intro: 'Numbers measure the world — but only processed numbers describe it. The gap between the two is where bad decisions live.', goal: 'Distinguish data from information and unmask the statistical fallacy of averaging away spatial variation.' },
    discovery: {
        question: 'A river averages 0.95 m deep; a 1-metre-tall child wades in — and drowns. The mean said \'safe.\' What did it hide?',
        options: ['Spatial variation — one stretch was 1.5 m; a single average erases the extremes that actually decide outcomes, the statistical fallacy geography warns against', 'Nothing — the child misjudged', 'The data was wrong', 'Rivers are always safe under 1m'],
        answer: 'Spatial variation — one stretch was 1.5 m; a single average erases the extremes that actually decide outcomes, the statistical fallacy geography warns against',
        hook: 'Data aren\'t information: 42°C in Delhi, 33 in Mumbai, 22 in Shimla are raw numbers — \'India averages 34°C, so a heat wave\' is a fallacy because geography varies over space. Ratios, rates and maps turn numbers into answers; the mean alone turns them into traps.',
    },
    teaching: [
        { title: 'Census of India: Organisation and Data Collection Methods', text: 'The Census of India is a decennial (every 10 years) nationwide enumeration of population, housing, and demographic characteristics conducted by the Office of the Registrar General and Census.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_18_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Rescue decisions from bad averages: separate data from information, expose the river-depth fallacy, and prove why Cherrapunji\'s 11,000 mm and Jaisalmer\'s 150 mm can\'t share one national mean.',
        labels: ['Census of India: Organisation', 'Data Quality: Reliability, Validity', 'Spatial Data: Vector', 'Data Storage and Formats'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_007', title: 'Census of India: Organisation and Data Collection Methods',
          caseStudy: { intro: 'Imagine you are a Census enumerator standing at a household door in a remote village of Rajasthan during the 2011 Census — you hold a 29-question schedule,.',
            decisions: [{ prompt: 'What is the legal statute that provides the authority for conducting the Census of India, and which ministry administers it?', options: [
                { text: 'The Census of India is conducted under the Census Act, 1948, and is administered by the', outcome: 'The Census of India is conducted under the Census Act, 1948, and is administered by the Office.' },
                { text: 'Statistics Act', outcome: 'Not quite — Students often believe the Census of India uses a *de jure* (usual residence) method like the.', reveals: 'the-census-of-india-uses' },
                { text: 'Ministry of Statistics', outcome: 'Not quite — Students often believe the Census of India uses a *de jure* (usual residence) method like the.', reveals: 'the-census-of-india-uses' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_18_009', title: 'Spatial Data: Vector and Raster Data Formats',
          scaffold: { problem: 'A student downloads a Shapefile of India\'s river network (polylines) and a GeoTIFF of SRTM 30 m DEM.',
            steps: [
            { text: 'Open both layers in QGIS/ArcGIS. Check the CRS of each layer (Layer Properties → Information → CRS).' },
            { text: 'Verify the DEM covers the full extent of the river network. If not, mosaic adjacent DEM tiles (Raster → Miscellaneous →.' },
            { text: 'Use the "Drape (set Z value from raster)" algorithm (Processing Toolbox → Vector geometry → Drape) to assign elevation.' },
            { text: 'For each river segment (or the entire network), use "Profiles from line" (Processing → Raster analysis → Profiles from.' },
            { text: 'Validate: Spot-check a few known locations (e.g., river source elevation from literature) against the extracted values.', faded: true, blankAnswer: 'Workflow: CRS check → reproject vector to DEM\'s projected.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_18_010', title: 'Data Storage and Formats: Tables, Databases and GIS',
          scaffold: { problem: 'The annual rainfall (mm) recorded at 30 stations in the Western Ghats is: 2100, 2350, 1980, 2750, 3100, 2450, 2890, 3200, 1850, 2650, 2950.',
            steps: [
            { text: 'Find range = 3300 – 1850 = 1450. Class interval = 300 → 5 classes: 1800–2100, 2100–2400, 2400–2700, 2700–3000.' },
            { text: 'Tally each value (exclusive: 2100 goes to 2100–2400). Count frequencies: 1800–2100: 4, 2100–2400: 5, 2400–2700: 6.' },
            { text: 'Compute less-than cumulative frequency: <2100:4, <2400:9, <2700:15, <3000:22, <3300:30.' },
            { text: 'Plot ogive: X-axis = upper class limits (2100, 2400, 2700, 3000, 3300), Y-axis = cumulative frequency.' },
            { text: 'Locate N/2 = 15 on Y-axis, draw horizontal to curve, drop vertical to X-axis → median ≈ 2700 mm.', faded: true, blankAnswer: 'Median rainfall ≈ 2700 mm (graphical estimate). Frequency.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a geography project on literacy in a low-literacy tribal block, a teammate designs a beautiful written questionnaire to hand out at the weekly haat, and calls the satellite image she downloaded \'my primary data since I processed it myself.\'',
            decisions: [{ prompt: 'What two corrections does data-sourcing require?', options: [
                { text: 'Swap the questionnaire for an enumerator-filled schedule so non-literate respondents aren\'t excluded, and relabel the imagery — data is primary only if you collected it for this investigation; processed-by-me is still secondary.', outcome: 'Both fixes come from the same rule: source is defined by who collected the data and why, not by publication status or who formatted it — and instrument choice decides who your dataset can even hear.' },
                { text: 'Keep the questionnaire — people can ask a literate neighbour to fill it for them.', outcome: 'That builds selection bias straight into the sample: the non-literate households you most need to reach are precisely the ones the self-filled form systematically drops.', reveals: 'proxy-filling-fixes-literacy' },
                { text: 'Keep calling the imagery primary since unpublished field notes are the only real secondary source.', outcome: 'It inverts the rule: unpublished patwari records are secondary because you didn\'t collect them, and published satellite scenes are secondary for you even though they were primary for the space agency.', reveals: 'publication-decides-primary' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_18_010', title: 'You made it',
          caseStudy: { intro: 'You can now spot when a single number is lying by omission — the first reflex of anyone who works with geographical data.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_007', difficulty: 'standard',
          question: 'The Census of India is a decennial (every 10 years) nationwide enumeration.',
          hint: 'If stuck on organisational hierarchy or phase linkage, revisit the **walkthrough\'s.',
          misconception: 'Students often believe the Census of India uses a *de jure* (usual residence) method like the US Census, and that.',
          parts: [
                { id: 'a', prompt: 'A student is analysing Census 2011 data for a district and notices that the "Total Population" in the Primary Census Abstract (PCA) differs from the sum.', answer: 'The discrepancy arises',
                  options: ['The discrepancy arises', 'Census night'],
                  hint: 'If stuck on organisational hierarchy or phase linkage, revisit the **walkthrough\'s enumerator.',
                  misconception: 'Students often believe the Census of India uses a *de jure* (usual residence) method like the US Census, and that "Census night" is just.' }
          ],
            remediations: { 'the-census-of-india-uses': { steps: ['If the student cannot distinguish *de facto* vs *de jure* or explain the two-phase linkage: 1.', 'Revisit **c12_geo_cbse_18_004** (Secondary Data Sources: Census) — focus on the Census as a *government publication*.', 'Revisit **c11_geo_cbse_16_002** (Population Growth: Trends Since 1901 and Census Data) — see how Census data feeds.', 'Do this re-diagnostic: "Draw a flowchart showing how a household in a migrant-sending village (e.g., Bihar) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Census of India uses a *de jure* (usual residence) method like the US Census, and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The introduction of digital mapping (GIS-based) and mobile app-based data collection in Census 2021 (postponed) will eliminate.', answer: 'The statement is **over-optimistic**',
                  options: ['The statement is **over-optimistic**', 'Census night'],
                  hint: 'If stuck on organisational hierarchy or phase linkage, revisit the **walkthrough\'s enumerator.',
                  misconception: 'Students often believe the Census of India uses a *de jure* (usual residence) method like the US Census, and that "Census night" is just.' },
                { id: 'b', prompt: 'Design a 5-step field verification protocol that a District Census Officer could use during the revisional round (1–5 March) to detect and correct: (i) missed.', answer: '**5-Step District-Level Field Verification Protocol:** 1',
                  options: ['**5-Step District-Level Field Verification Protocol:** 1', 'Census night'],
                  hint: 'If stuck on organisational hierarchy or phase linkage, revisit the **walkthrough\'s enumerator.',
                  misconception: 'Students often believe the Census of India uses a *de jure* (usual residence) method like the US Census, and that "Census night" is just.' }
          ],
            remediations: { 'the-census-of-india-uses': { steps: ['If the student cannot distinguish *de facto* vs *de jure* or explain the two-phase linkage: 1.', 'Revisit **c12_geo_cbse_18_004** (Secondary Data Sources: Census) — focus on the Census as a *government publication*.', 'Revisit **c11_geo_cbse_16_002** (Population Growth: Trends Since 1901 and Census Data) — see how Census data feeds.', 'Do this re-diagnostic: "Draw a flowchart showing how a household in a migrant-sending village (e.g., Bihar) and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_008', difficulty: 'standard',
          question: 'Data quality in geography refers to the degree to which a dataset accurately.',
          hint: 'If stuck, revisit c12_geo_cbse_18_003 (Primary Data Sources) and c11_psy_cbse_02_007.',
          misconception: 'Students often equate \'official government data\' (Census, NSSO, IMD) with \'error-free data\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Data quality in geography refers to the degree to',
                  options: ['Data quality in geography refers to the degree to', 'Geographical data are systematically collected numerical or categorical measurements', 'Primary data are original measurements collected firsthand by the researcher through', 'Primary data sources in geography are original data collected firsthand by the researcher'],
                  hint: 'If stuck, revisit c12_geo_cbse_18_003 (Primary Data Sources) and c11_psy_cbse_02_007.',
                  misconception: 'Students often equate \'official government data\' (Census, NSSO, IMD) with \'error-free data\'.' }
          ],
            remediations: { 'students-often-equate-official-government': { steps: ['Revisit c12_geo_cbse_18_002 (Sources of Data) to recall primary vs secondary source errors.', 'Review c11_psy_cbse_02_007 (Psychological Tests: Characteristics of a Good Test) for the standard definitions.', 'Take a real dataset (e.g., District-wise Groundwater Level from CGWB) and explicitly list: (a) how it was measured.', 'Re-attempt Diagnostic Questions 2 and 5 with this dataset.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_009', difficulty: 'standard',
          question: 'Spatial data represents geographic features and phenomena through two.',
          hint: 'Revisit c12_geo_cbse_18_006 (spatial vs. non-spatial data) and c11_geo_cbse_26_008 (GIS.',
          misconception: '**Misconception:** "Vector is always more accurate than raster because it uses exact coordinates." **Reality:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Spatial data represents geographic features and phenomena through two fundamental digital',
                  options: ['Spatial data represents geographic features and phenomena through two fundamental digital', 'Geographical data are systematically collected numerical or categorical measurements', 'Primary data are original measurements collected firsthand by the researcher through', 'Primary data sources in geography are original data collected firsthand by the researcher'],
                  hint: 'Revisit c12_geo_cbse_18_006 (spatial vs. non-spatial data) and c11_geo_cbse_26_008 (GIS concept).',
                  misconception: '**Misconception:** "Vector is always more accurate than raster because it uses exact coordinates." **Reality:** Accuracy depends on *source.' }
          ],
            remediations: { 'misconception-vector-is-always-more': { steps: ['If the student conflates coordinate precision with accuracy: (1) Revisit **c11_geo_cbse_26_005** (Resolution Types.', '(2) Do a hands-on exercise: Download a 30 m SRTM DEM (raster) and a 1:50k contour Shapefile (vector) for the same hill.', 'Overlay them in QGIS; measure the horizontal offset of contours vs.', '(3) Re-diagnostic: "A vector well point has coordinates (77.123456, 28.654321) from a GPS with ±5 m accuracy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_18_010', difficulty: 'standard',
          question: 'Data storage formats in geography refer to the structured systems used.',
          hint: 'If unable to group data or draw ogives, immediately practice with the NCERT Table 1.4 (60.',
          misconception: 'Students think "GIS is just software like ArcGIS/QGIS" and "data storage = saving a map project file".',
          parts: [
                { id: 'a', prompt: 'Define \'statistical table\' in the context of geographical data presentation and state its two primary purposes as per NCERT.', answer: 'A statistical table is a systematic arrangement of data in columns and rows',
                  options: ['A statistical table is a systematic arrangement of data in columns and rows', 'a table is just a list of numbers', 'GIS is just software like ArcGIS/QGIS', 'data storage = saving a map project file'],
                  hint: 'If unable to group data or draw ogives, immediately practice with the NCERT Table 1.4 (60 students\'.',
                  misconception: 'Students think "GIS is just software like ArcGIS/QGIS" and "data storage = saving a map project file".' },
                { id: 'b', prompt: 'Given raw data of wheat yield (quintals/hectare) for 40 villages: 12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50, 52, 55, 58, 60, 62, 65, 68, 70.', answer: '**Step 1:** Range = 110 – 12 = 98',
                  options: ['**Step 1:** Range = 110 – 12 = 98', 'GIS is just software like ArcGIS/QGIS', 'data storage = saving a map project file'],
                  hint: 'If unable to group data or draw ogives, immediately practice with the NCERT Table 1.4 (60 students\'.',
                  misconception: 'Students think "GIS is just software like ArcGIS/QGIS" and "data storage = saving a map project file".' },
                { id: 'c', prompt: 'Compare the \'less than ogive\' and \'more than ogive\' for the same dataset.', answer: 'The intersection of the less-than and more-than ogives gives the **median**',
                  options: ['The intersection of the less-than and more-than ogives gives the **median**', 'intersection gives the mode', 'GIS is just software like ArcGIS/QGIS', 'data storage = saving a map project file'],
                  hint: 'If unable to group data or draw ogives, immediately practice with the NCERT Table 1.4 (60 students\'.',
                  misconception: 'Students think "GIS is just software like ArcGIS/QGIS" and "data storage = saving a map project file".' }
          ],
            remediations: { 'gis-is-just-software-like': { steps: ['Revisit **c12_geo_cbse_18_009** (Vector vs Raster) — draw a table comparing how a point, line, polygon, and DEM are.', 'Open QGIS → Layer → Add Layer → Add Vector Layer → select a .shp file → right-click → Export → Save Features As →.', 'Observe the single .gpkg output.', 'Re-do Diagnostic Question 5 with this hands-on experience.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
