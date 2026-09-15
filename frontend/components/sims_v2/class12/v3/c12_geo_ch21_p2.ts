import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch21_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch21_p2: SimDef = {
    id: 'v3_c12_geo_ch21_p2',
    title: 'Field Surveys and Spatial Information Technology · Part 2/2',
    subtitle: 'The satellite saw the change — only the village knew why',
    classLevel: 12, subject: 'geography', topic: 'Field Surveys and Spatial Information Technology · Part 2/2',
    chapters: ['c12_geo_ch21'],
    nodeIds: ['c12_geo_cbse_21_007', 'c12_geo_cbse_21_008', 'c12_geo_cbse_21_009', 'c12_geo_cbse_21_010', 'c12_geo_cbse_21_011', 'c12_geo_cbse_21_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Field researcher', intro: 'Every great map is a claim about the world. The field survey is where you go to check if it\'s true.', goal: 'Justify field surveys for ground-truthing, temporal currency and the human dimensions sensors can\'t read.' },
    discovery: {
        question: 'Google Maps shows a road; on the ground it\'s a footpath. A new slum rose after the satellite passed. Which source settles it?',
        options: ['The field survey — only ground truth carries the current, site-specific reality and the human \'why\' that sensors can\'t detect', 'The satellite — it\'s newer tech', 'The map — it\'s official', 'Whichever is cheaper'],
        answer: 'The field survey — only ground truth carries the current, site-specific reality and the human \'why\' that sensors can\'t detect',
        hook: 'Drones and LiDAR don\'t retire the field survey — satellites see that forest became farm, not why (displacement? subsidy? markets?), and every remote-sensing classification needs ground-truth points or the model hallucinates. Data volume is not explanatory depth.',
    },
    teaching: [
        { title: 'Geographic Information System (GIS): Definition and Components', text: 'A Geographic Information System (GIS) is a computer-based system designed to capture, store, check, integrate, manipulate, analyse, and display spatially referenced data (data linked to locations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_21_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Get boots on the ground: split what instruments measure from what interviews reveal, design a groundwater survey for a semi-arid block, and defend the questionnaire against the satellite.',
        labels: ['Geographic Information System (GIS)', 'GIS: Vector and Raster', 'GIS: Spatial Data Analysis', 'Remote Sensing: Principle', 'Global Positioning System (GPS)', 'Applications of Spatial Information'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_007', title: 'Geographic Information System (GIS): Definition and Components',
          caseStudy: { intro: 'Open Google Maps on your phone and search for "shortest route from your school to the nearest metro station." The app instantly shows multiple routes, travel.',
            decisions: [{ prompt: 'State the NCERT definition of GIS and name the five components of a GIS.', options: [
                { text: '**Correct Answer:** GIS is "A system for capturing, storing, checking, integrating,', outcome: '**Correct Answer:** GIS is "A system for capturing, storing, checking, integrating, manipulating.' },
                { text: 'GIS is a software for making maps', outcome: 'Not quite — Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail.', reveals: 'gis-is-merely-computerised-mapping' },
                { text: 'computerised mapping', outcome: 'Not quite — Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail.', reveals: 'gis-is-merely-computerised-mapping' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_008', title: 'GIS: Vector and Raster Data Models',
          scaffold: { problem: 'The Karnataka State Remote Sensing Applications Centre (KSRSAC) has a Landsat 8 OLI scene (30 m resolution, 11 bands) covering Bengaluru.',
            steps: [
            { text: 'Calculate number of raster cells. District area = 2,200 km² = 2.2×10⁹ m². Cell area = 30 m × 30 m = 900 m².' },
            { text: 'Calculate raster storage. 11 bands × 2 bytes/cell/band × 2,444,444 cells = 53,777,768 bytes ≈ 51.3 MB.' },
            { text: 'Calculate vector storage. 15,000 parcels × 50 vertices/parcel × 2 coordinates/vertex × 8 bytes/coordinate = 12,000,000.' },
            { text: 'Compare. Raster (51.3 MB) is larger than vector (11.4 MB) by factor = 51.3 / 11.4 ≈ 4.5×.' },
            { text: 'Interpret. Even though vector has many vertices, raster stores a value for *every cell in the extent* across 11 bands.', faded: true, blankAnswer: 'Raster stack ≈ 51.3 MB; Vector parcels ≈ 11.4 MB; Raster.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_009', title: 'GIS: Spatial Data Analysis (Overlay, Buffer, Network Analysis)',
          caseStudy: { intro: 'Imagine you are a planner for the Delhi Metro Rail Corporation and must decide where to place a new station so it serves the maximum number of residential.',
            decisions: [{ prompt: 'Define overlay analysis in GIS and name the three geometric combinations (feature-type pairs) on which it can be performed.', options: [
                { text: 'Overlay analysis is a GIS operation that spatially integrates two or more thematic layers', outcome: 'Overlay analysis is a GIS operation that spatially integrates two or more thematic layers of the.' },
                { text: 'overlay only works on rasters', outcome: 'Not quite — Students often believe that “overlay” and “buffer” are interchangeable because both combine spatial.', reveals: 'overlay-and-buffer-are-interchangeable' },
                { text: 'it merges attribute tables without geometry', outcome: 'Not quite — Students often believe that “overlay” and “buffer” are interchangeable because both combine spatial.', reveals: 'overlay-and-buffer-are-interchangeable' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_010', title: 'Remote Sensing: Principle and Applications in Geography',
          scaffold: { problem: 'A farmer in Haryana wants to monitor wheat crop health at flowering stage (March) using free satellite data.',
            steps: [
            { text: 'Identify requirements — wheat flowering in March needs cloud-free optical data (passive sensor), red and NIR bands for.' },
            { text: 'Evaluate Indian satellites — Cartosat-2: no NIR band (reject); Resourcesat-2 LISS-III: 23.5 m, 4 bands (green, red.' },
            { text: 'Select Sentinel-2 MSI — provides Band 4 (Red, 10 m) and Band 8 (NIR, 10 m) for NDVI; also red-edge bands (Band 5,6,7).' },
            { text: 'Compute NDVI = (Band8 - Band4)/(Band8 + Band4) for each pixel; map values 0.5-0.8 indicate healthy flowering wheat.' },
            { text: 'Validate with ground truth — visit 5-10 fields, measure LAI or chlorophyll, correlate with NDVI.', faded: true, blankAnswer: 'Use Sentinel-2 MSI (free, 10 m, 5-day revisit, red+NIR.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_011', title: 'Global Positioning System (GPS): Principle and Uses',
          scaffold: { problem: 'A GPS receiver in Bhopal tracks four satellites with the following pseudoranges and satellite clock biases.',
            steps: [
            { text: 'Convert all satellite clock biases to distance: bias_dist = c × bias.' },
            { text: 'Remove satellite clock bias from pseudorange: ρ_corrected = pseudorange – c × sat_bias.' },
            { text: 'The four corrected pseudoranges equal geometric range + c × receiver_clock_bias.' },
            { text: 'Average corrected pseudorange = (20,149.8501 + 20,300.0899 + 20,049.9400 + 20,400.1199)/4 = 20,225.0000 km.' },
            { text: 'True geometric ranges = corrected pseudorange – receiver clock bias distance.', faded: true, blankAnswer: 'Receiver clock bias ≈ +83.4 μs. Corrected geometric ranges.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_012', title: 'Applications of Spatial Information Technology in India',
          caseStudy: { intro: 'Imagine you are a district planner in Aligarh, Uttar Pradesh, and you see the city expanding rapidly into surrounding farmland.',
            decisions: [{ prompt: 'What are the two primary spatial data formats used in GIS, and which one is more compatible with satellite imagery?', options: [
                { text: 'The two primary formats are **raster** (grid of cells/pixels) and **vector** (points,', outcome: 'The two primary formats are **raster** (grid of cells/pixels) and **vector** (points, lines.' },
                { text: 'GIS is just making maps on a computer', outcome: 'Not quite — Students often think **"GIS is just making maps on a computer"** and that **any satellite image can.', reveals: 'gis-is-just-making-maps' },
                { text: 'vector is better for satellite imagery', outcome: 'Not quite — Students often think **"GIS is just making maps on a computer"** and that **any satellite image can.', reveals: 'gis-is-just-making-maps' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A team planning a field survey on groundwater decline announces: \'We\'ll stand at the village bus stop, ask every tenth person about their well, skip the pilot since the questions look fine, and title it Water Problems in Our Area.\'',
            decisions: [{ prompt: 'What does survey design say is wrong with this plan?', options: [
                { text: 'Nearly everything — the objective needs measurable variables and spatial bounds, the bus-stop \'every tenth person\' is a convenience sample blind to housing types that drive water access, and skipping the pilot risks ambiguous questions and inconsistent units no analysis can repair.', outcome: 'The chapter\'s design loop — problem, population, instrument, pilot, logistics — exists because data quality is decided before the field; a vague title plus a handy crowd plus an untested schedule produces numbers that can\'t answer the question.' },
                { text: 'It\'s acceptable — every tenth person is random sampling, and a short questionnaire is efficient.', outcome: 'A bus-stop intercept is systematic sampling of whoever happens to pass the stop — a frame that excludes non-travellers and confuses regularity with representativeness.', reveals: 'every-tenth-is-random' },
                { text: 'Just fix the title to something measurable; the sampling and instrument can stay.', outcome: 'A sharper objective can\'t rescue a biased frame or an unpiloted instrument — design flaws downstream of the question still invalidate every observation collected.', reveals: 'title-fixes-design' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_21_012', title: 'You made it',
          caseStudy: { intro: 'You can now argue why geography still needs the field — the map proposes, but the ground disposes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_007', difficulty: 'standard',
          question: 'A Geographic Information System (GIS) is a computer-based system designed.',
          hint: 'If stuck on "what makes data spatial?", revisit **c11_geo_cbse_22_006** (Coordinate.',
          misconception: 'Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail to grasp that GIS.',
          parts: [
                { id: 'a', prompt: 'Explain why a stock register of a cycle shop (part number, quantity, description) is non-spatial data, while a table of "Literate Population in States" with.', answer: '**Correct Answer:** The cycle shop register lacks any geographic reference',
                  options: ['**Correct Answer:** The cycle shop register lacks any geographic reference', 'both are tables so both are non-spatial', 'computerised mapping', 'a software like ArcGIS/QGIS'],
                  hint: 'If stuck on "what makes data spatial?", revisit **c11_geo_cbse_22_006** (Coordinate Systems) and.',
                  misconception: 'Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail to grasp that GIS is a *system* where.' },
                { id: 'b', prompt: 'A city planner has a paper map of ward boundaries (1:10,000 scale) and an Excel sheet of ward-wise population density.', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'computerised mapping', 'a software like ArcGIS/QGIS', 'GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS'],
                  hint: 'If stuck on "what makes data spatial?", revisit **c11_geo_cbse_22_006** (Coordinate Systems) and.',
                  misconception: 'Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail to grasp that GIS is a *system* where.' }
          ],
            remediations: { 'gis-is-merely-computerised-mapping': { steps: ['Revisit **c11_geo_cbse_22_006** (Coordinate Systems) — practice converting a paper map\'s lat/long to decimal degrees.', 'Re-read **c12_geo_cbse_21_006** (Spatial Information Technology) — focus on the definition of Spatial Information.', 'Do a paper exercise: Take a printed ward map and a CSV of ward-wise literacy.', 'Manually "join" them using Ward ID (simulate GIS linkage).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail to grasp that GIS.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "For a project mapping groundwater potential zones in a hard-rock terrain, vector data format is always better than raster because it gives accurate.', answer: '**Correct Answer:** The statement is **false**',
                  options: ['**Correct Answer:** The statement is **false**', 'computerised mapping', 'a software like ArcGIS/QGIS', 'GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS'],
                  hint: 'If stuck on "what makes data spatial?", revisit **c11_geo_cbse_22_006** (Coordinate Systems) and.',
                  misconception: 'Students believe GIS is merely "computerised mapping" or "a software like ArcGIS/QGIS." They fail to grasp that GIS is a *system* where.' }
          ],
            remediations: { 'gis-is-merely-computerised-mapping': { steps: ['Revisit **c11_geo_cbse_22_006** (Coordinate Systems) — practice converting a paper map\'s lat/long to decimal degrees.', 'Re-read **c12_geo_cbse_21_006** (Spatial Information Technology) — focus on the definition of Spatial Information.', 'Do a paper exercise: Take a printed ward map and a CSV of ward-wise literacy.', 'Manually "join" them using Ward ID (simulate GIS linkage).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_008', difficulty: 'standard',
          question: 'Vector and Raster are the two fundamental spatial data models used in GIS.',
          hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007) and Coordinate Systems.',
          misconception: 'Students often believe **"vector is always more accurate than raster"** because vector stores "exact coordinates" while.',
          parts: [
                { id: 'a', prompt: 'A student says: "Raster data is just a picture made of pixels, so it cannot be used for analysis." Is this statement correct?', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'vector is always more accurate than raster', 'exact coordinates', 'approximate grid cells'],
                  hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007) and Coordinate Systems (c11_geo_cbse_22_006).',
                  misconception: 'Students often believe **"vector is always more accurate than raster"** because vector stores "exact coordinates" while raster uses.' },
                { id: 'b', prompt: 'You have a paper topographical sheet (1:50,000) showing contour lines, spot heights, and drainage.', answer: '**Raster** is more appropriate for the final DEM',
                  options: ['**Raster** is more appropriate for the final DEM', 'vector is always more accurate than raster', 'exact coordinates', 'approximate grid cells'],
                  hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007) and Coordinate Systems (c11_geo_cbse_22_006).',
                  misconception: 'Students often believe **"vector is always more accurate than raster"** because vector stores "exact coordinates" while raster uses.' },
                { id: 'c', prompt: 'A municipal corporation has a vector layer of all water pipelines (line features with attributes: diameter, material, year_laid).', answer: '**Step 1:** Identify the operation',
                  options: ['**Step 1:** Identify the operation', 'vector is always more accurate than raster', 'exact coordinates', 'approximate grid cells'],
                  hint: 'Revisit Class 11 Map Projections (c11_geo_cbse_22_007) and Coordinate Systems (c11_geo_cbse_22_006).',
                  misconception: 'Students often believe **"vector is always more accurate than raster"** because vector stores "exact coordinates" while raster uses.' }
          ],
            remediations: { 'vector-is-always-more-accurate': { steps: ['** Give them a 10 km × 10 km DEM at 30 m resolution (SRTM) — ~111,000 cells.', '** Show a Landsat band (raster) and ask: "How would you store this as vector without losing radiometric information?".', '** Run a simple map algebra exercise in QGIS: `slope = ATAN(SQRT((dz/dx)² + (dz/dy)²))` on a raster DEM (takes.', '** Re-read NCERT Box 4.2 together, highlighting "Compatible with satellite imagery" (raster) vs "Not compatible with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_009', difficulty: 'standard',
          question: 'Spatial data analysis in GIS refers to the set of geo-processing operations.',
          hint: 'If stuck, review c12_geo_cbse_21_008 (vector data model) and practice loading a shapefile.',
          misconception: 'Students often believe that “overlay” and “buffer” are interchangeable because both combine spatial layers.',
          parts: [
                { id: 'a', prompt: 'A city planner has two vector layers: (1) hospitals (point) and (2) residential wards (polygon).', answer: 'Step 1: Run Buffer tool on hospital point layer with distance = 3 km → output:',
                  options: ['Step 1: Run Buffer tool on hospital point layer with distance = 3 km → output:', 'overlay', 'buffer', '“overlay” and “buffer” are interchangeable'],
                  hint: 'If stuck, review c12_geo_cbse_21_008 (vector data model) and practice loading a shapefile in QGIS.',
                  misconception: 'Students often believe that “overlay” and “buffer” are interchangeable because both combine spatial layers.' },
                { id: 'b', prompt: 'Compare overlay analysis and buffer analysis in terms of (a) number of input layers, (b) primary geometric operation, and (c) typical output use-case.', answer: 'number of input layers, (',
                  options: ['number of input layers, (', 'both need two layers', 'both produce line outputs', 'overlay'],
                  hint: 'If stuck, review c12_geo_cbse_21_008 (vector data model) and practice loading a shapefile in QGIS.',
                  misconception: 'Students often believe that “overlay” and “buffer” are interchangeable because both combine spatial layers.' }
          ],
            remediations: { 'overlay-and-buffer-are-interchangeable': { steps: ['Revisit the geometric definitions: draw a point, line, and polygon on paper; manually sketch a 1 cm buffer around each.', 'Then draw two overlapping polygons (soil, land use) and shade their intersection — this is overlay.', 'Label each output with its attribute source(s).', 'Next, open QGIS/ArcGIS and run both tools on the same sample data (e.g., NCERT’s Aligarh land-use layers).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_010', difficulty: 'standard',
          question: 'Remote sensing is the science and technology of acquiring information about.',
          hint: 'If stuck on sensor selection, revisit c11_geo_cbse_26_005 (Resolution Types) and make.',
          misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop.',
          parts: [
                { id: 'a', prompt: 'A student claims: "RISAT-1 uses C-band synthetic aperture radar (SAR) so it can see through clouds and operate at night, making it better than Cartosat-2 for.', answer: 'The statement is partially correct but overgeneralized',
                  options: ['The statement is partially correct but overgeneralized', 'RISAT is always better', 'better', 'higher spatial resolution is always better'],
                  hint: 'If stuck on sensor selection, revisit c11_geo_cbse_26_005 (Resolution Types) and make a decision.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' },
                { id: 'b', prompt: 'You are given a Resourcesat-2 LISS-IV image (spatial resolution 5.8 m, 3 spectral bands: green, red, NIR) of a 10 km × 10 km agricultural region.', answer: '**Steps**: 1) Area = 10 km × 10 km = 100 km² = 100 × 10⁶ m²',
                  options: ['**Steps**: 1) Area = 10 km × 10 km = 100 km² = 100 × 10⁶ m²', 'more pixels = better', 'higher spatial resolution is always better', '"higher spatial resolution is always better" and choose Cartosat-2 (0'],
                  hint: 'If stuck on sensor selection, revisit c11_geo_cbse_26_005 (Resolution Types) and make a decision.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' },
                { id: 'c', prompt: 'Compare the temporal resolution of Cartosat-2 (revisit 4-5 days) and a geostationary satellite like INSAT-3D (revisit 15-30 minutes).', answer: 'monitoring rapid flood inundation in Assam during monsoon, (',
                  options: ['monitoring rapid flood inundation in Assam during monsoon, (', 'Cartosat for floods', 'higher spatial resolution is always better', '"higher spatial resolution is always better" and choose Cartosat-2 (0'],
                  hint: 'If stuck on sensor selection, revisit c11_geo_cbse_26_005 (Resolution Types) and make a decision.',
                  misconception: 'Students often believe "higher spatial resolution is always better" and choose Cartosat-2 (0.8 m) for everything — crop health, flood.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) and c11_geo_cbse_26_004 (Active vs Passive Sensors) to rebuild.', 'Create a comparison table: Sensor | Platform | Spatial Res | Spectral Bands | Temporal Res | Best For.', 'Fill for 5 Indian satellites.', 'Take a specific case (e.g., "map paddy area in West Bengal in July") and reason step-by-step: cloud cover?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_011', difficulty: 'standard',
          question: 'Global Positioning System (GPS) is a satellite-based navigation system that.',
          hint: 'If stuck on trilateration, review c11_geo_cbse_22_006 (coordinate systems) and.',
          misconception: 'Students often think GPS satellites "track" the user or that the receiver sends signals to satellites.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of GPS satellites a receiver must track to determine a three-dimensional position (latitude, longitude, altitude) and why?', answer: 'A receiver needs signals from at least four satellites',
                  options: ['A receiver needs signals from at least four satellites', 'three satellites', 'perfect synchronization', 'GPS satellites "track" the user or that the receiver sends signals to satellites'],
                  hint: 'If stuck on trilateration, review c11_geo_cbse_22_006 (coordinate systems) and c11_geo_cbse_26_003.',
                  misconception: 'Students often think GPS satellites "track" the user or that the receiver sends signals to satellites.' },
                { id: 'b', prompt: 'Explain why GPS signals are transmitted on two carrier frequencies (L1 = 1575.42 MHz and L2 = 1227.60 MHz) and how this helps reduce ionospheric error.', answer: 'The ionosphere delays GPS signals proportionally to 1/f²',
                  options: ['The ionosphere delays GPS signals proportionally to 1/f²', 'for redundancy', 'to increase bandwidth', 'GPS satellites "track" the user or that the receiver sends signals to satellites'],
                  hint: 'If stuck on trilateration, review c11_geo_cbse_22_006 (coordinate systems) and c11_geo_cbse_26_003.',
                  misconception: 'Students often think GPS satellites "track" the user or that the receiver sends signals to satellites.' },
                { id: 'c', prompt: 'A GPS receiver in Mumbai measures pseudoranges of 20,200 km, 20,450 km, 20,100 km, and 20,600 km from four satellites.', answer: 'Clock bias distance = bias × c = 0.0012 s × 299,792.458 km/s ≈ 359.75 km',
                  options: ['Clock bias distance = bias × c = 0.0012 s × 299,792.458 km/s ≈ 359.75 km', 'GPS satellites "track" the user or that the receiver sends signals to satellites'],
                  hint: 'If stuck on trilateration, review c11_geo_cbse_22_006 (coordinate systems) and c11_geo_cbse_26_003.',
                  misconception: 'Students often think GPS satellites "track" the user or that the receiver sends signals to satellites.' }
          ],
            remediations: { 'gps-satellites-track-the-user': { steps: ['Revisit c11_geo_cbse_26_003 (Electromagnetic Spectrum) to recall radio wave propagation and frequency-dependent.', 'Review c11_geo_cbse_22_006 (Coordinate Systems) to solidify latitude/longitude/ellipsoidal height concepts.', 'Draw a trilateration diagram: three circles intersecting at two points, fourth sphere resolves ambiguity and clock bias.', 'Practice converting time delay to distance: Δt = 0.067 s → d = 20,086 km.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_012', difficulty: 'standard',
          question: 'Applications of Spatial Information Technology in India refer to the practical.',
          hint: 'If stuck, re-read the "Sequence of GIS Activities" (NCERT pp. 53–57) and the "Data.',
          misconception: 'Students often think **"GIS is just making maps on a computer"** and that **any satellite image can be directly.',
          parts: [
                { id: 'a', prompt: 'A planner wants to identify all villages within 5 km of a proposed highway alignment in Madhya Pradesh to assess land acquisition impact.', answer: '**Operation:** Buffer analysis on the highway line layer with a 5 km distance',
                  options: ['**Operation:** Buffer analysis on the highway line layer with a 5 km distance', 'use overlay directly without buffer', 'GIS is just making maps on a computer'],
                  hint: 'If stuck, re-read the "Sequence of GIS Activities" (NCERT pp. 53–57) and the "Data Conversion" and.',
                  misconception: 'Students often think **"GIS is just making maps on a computer"** and that **any satellite image can be directly overlaid on any map**.' },
                { id: 'b', prompt: 'Compare the suitability of **raster** vs. **vector** data for the following three Indian applications. Justify each choice in one sentence.', answer: '(a) **Raster** — SAR imagery is natively raster',
                  options: ['(a) **Raster** — SAR imagery is natively raster', 'GIS is just making maps on a computer'],
                  hint: 'If stuck, re-read the "Sequence of GIS Activities" (NCERT pp. 53–57) and the "Data Conversion" and.',
                  misconception: 'Students often think **"GIS is just making maps on a computer"** and that **any satellite image can be directly overlaid on any map**.' }
          ],
            remediations: { 'gis-is-just-making-maps': { steps: ['**Revisit Node c12_geo_cbse_21_008 (Vector vs.', 'Raster)** — re-learn the *native format of satellite data* (raster) and *native format of digitised maps* (vector).', '**Revisit Node c12_geo_cbse_21_009 (Spatial Data Analysis)** — practice the **exact sequence**: geo-referencing →.', 'Use the Aligarh example (Fig.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
