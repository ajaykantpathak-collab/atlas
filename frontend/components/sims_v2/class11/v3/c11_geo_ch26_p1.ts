import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch26_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch26_p1: SimDef = {
    id: 'v3_c11_geo_ch26_p1',
    title: 'Introduction to Remote Sensing · Part 1/2',
    subtitle: 'Read the Earth in invisible light — and learn why red forests are data, not paint.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Remote Sensing · Part 1/2',
    chapters: ['c11_geo_ch26'],
    nodeIds: ['c11_geo_cbse_26_001', 'c11_geo_cbse_26_002', 'c11_geo_cbse_26_003', 'c11_geo_cbse_26_004', 'c11_geo_cbse_26_005', 'c11_geo_cbse_26_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst choosing sensors for a flood map', intro: 'A satellite 700 km up sees infrared your eyes never will — the trick is knowing which platform and which bands answer the question.', goal: 'Explain remote-sensing principles, false-colour composites and the trade-offs among platforms.' },
    discovery: {
        question: 'The satellite image shows the forest glowing bright red — is India\'s vegetation actually scarlet?',
        options: ['No — it\'s a false-colour composite that paints near-infrared as red, and healthy vegetation reflects NIR intensely', 'Yes — tropical forests photograph red', 'Yes — iron-rich soil tints the trees', 'No — the sensor malfunctioned'],
        answer: 'No — it\'s a false-colour composite that paints near-infrared as red, and healthy vegetation reflects NIR intensely',
        hook: 'Sharper isn\'t always better either — a high-resolution sensor can lose the spectral bands that compute crop health and the swath that revisits often enough.',
    },
    teaching: [
        { title: 'Remote Sensing: Definition, Principle and Stages', text: 'Remote sensing is the science and technology of acquiring information about objects or phenomena on Earth\'s surface without physical contact, by detecting and measuring electromagnetic radiation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_26_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match ground, airborne and spaceborne platforms to a Punjab farmer\'s 3-day wheat-monitoring need, then weigh GPS stations against satellite radar for landslide warning.',
        labels: ['Remote Sensing: Definition, Principle', 'Remote Sensing Platforms: Ground,', 'Electromagnetic Spectrum and Its', 'Sensors: Active vs Passive', 'Resolution Types: Spatial, Spectral,', 'Indian Remote Sensing Satellites'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_001', title: 'Remote Sensing: Definition, Principle and Stages',
          caseStudy: { intro: 'Look at your smartphone camera — it captures images by detecting visible light reflected off objects.',
            decisions: [{ prompt: 'Define remote sensing in one sentence using the three essential components: object surface, energy waves, and recording device.', options: [
                { text: 'Remote sensing is the acquisition of information about an object\'s surface properties by', outcome: 'Remote sensing is the acquisition of information about an object\'s surface properties by.' },
                { text: 'taking photos from satellites', outcome: 'Not quite — Students believe "remote sensing = satellite photography" and that FCC images show "real colours".', reveals: 'remote-sensing-satellite-photography-and' },
                { text: 'remote sensing = satellite photography', outcome: 'Not quite — Students believe "remote sensing = satellite photography" and that FCC images show "real colours".', reveals: 'remote-sensing-satellite-photography-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_002', title: 'Remote Sensing Platforms: Ground, Airborne and Spaceborne',
          scaffold: { problem: 'A research team plans to map invasive water hyacinth (Eichhornia crassipes) coverage in Vembanad Lake, Kerala (approx.',
            steps: [
            { text: 'Determine drone coverage per flight. eBee X flies at 120 m AGL, 20 MP camera (5472×3648 px), 3.6 cm GSD.' },
            { text: 'Calculate flight time. Each line 20 km long. Total distance = 67 × 20 km = 1,340 km.' },
            { text: 'Estimate cost. Drone operation in India: ~₹8,000–12,000 per flight day (pilot, permissions, processing).' },
            { text: 'Compare Option A (ground). Boat-based points: 200 km² at 1 m resolution = 200 million pixels.' },
            { text: 'Compare Option C (spaceborne). Sentinel-2: 10 m resolution (insufficient for 1 m target), 5-day revisit (meets 2-week).' },
            { text: 'Conclude. Drone (B) is only platform meeting 1 m resolution and 2-week revisit for 200 km², but cost and permissions.', faded: true, blankAnswer: 'Drone requires ~67 flight lines, ~30 hours total flight.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_003', title: 'Electromagnetic Spectrum and Its Role in Remote Sensing',
          caseStudy: { intro: 'Begin with a real-world observation: "When you see a rainbow after rain in Kerala or a mirage on a Rajasthan highway, you are witnessing visible light — a tiny.',
            decisions: [{ prompt: 'A Landsat-8 OLI sensor acquires data in Band 5 (NIR: 0.85–0.88 µm) and Band 4 (Red: 0.64–0.67 µm).', options: [
                { text: '**Answer:** Frequency range = c/λ', outcome: '**Answer:** Frequency range = c/λ. For λ₁ = 0.85 µm = 8.5 × 10⁻⁷ m: ν₁ = 3×10⁸ / 8.5×10⁻⁷ = 3.53.' },
                { text: 'infrared', outcome: 'Not quite — **Students believe that "infrared" is a single uniform region and that all infrared bands behave.', reveals: 'students-believe-that-infrared-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_004', title: 'Sensors: Active vs Passive Sensors and Their Working',
          caseStudy: { intro: 'Open Google Earth on your phone and look at your neighbourhood—you are seeing a passive optical image captured by sunlight reflecting off roofs and trees.',
            decisions: [{ prompt: 'Name two active sensors and two passive sensors commonly used in Earth observation satellites, and state the primary energy source for each.', options: [
                { text: 'Active sensors: Synthetic Aperture Radar (SAR) on Sentinel-1 (microwave pulses generated', outcome: 'Active sensors: Synthetic Aperture Radar (SAR) on Sentinel-1 (microwave pulses generated by the.' },
                { text: 'active', outcome: 'Not quite — Students often believe that “active sensor” means the sensor actively moves (like a scanning.', reveals: 'active-sensor-means-the-sensor' },
                { text: 'active sensor', outcome: 'Not quite — Students often believe that “active sensor” means the sensor actively moves (like a scanning.', reveals: 'active-sensor-means-the-sensor' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_005', title: 'Resolution Types: Spatial, Spectral, Temporal and Radiometric',
          scaffold: { problem: 'Calculate the spatial resolution (GSD) of a pushbroom sensor on a sun-synchronous satellite at 705 km altitude with a detector IFOV of 42.5.',
            steps: [
            { text: 'Convert IFOV to radians: 42.5 µrad = 42.5 × 10⁻⁶ rad.' },
            { text: 'Apply GSD formula for nadir view: GSD = IFOV × Altitude = (42.5 × 10⁻⁶) × (705 × 10³ m) = 29.96 m ≈ 30 m.' },
            { text: 'Calculate theoretical swath from detector array: Swath = Number of detectors × GSD = 6000 × 30 m = 180,000 m = 180 km.' },
            { text: 'Compare with given swath (185 km) — difference due to off-nadir distortion at swath edges (IFOV projection increases.' },
            { text: 'Identify this sensor: 30 m GSD, 185 km swath, 705 km altitude matches Landsat-8 OLI specifications (Table 6.1 shows.' },
            { text: 'Interpret: Pushbroom\'s linear detector array (6000 elements) enables wide swath without moving parts — advantage over.', faded: true, blankAnswer: 'GSD = 30 m. Swath verification yields 180 km (nadir) vs 185.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_006', title: 'Indian Remote Sensing Satellites (IRS) Programme: Bhaskar, IRS-1A',
          caseStudy: { intro: 'Begin by showing students a side-by-side comparison of a 1979 Bhaskar-1 image (coarse, experimental) and a modern IRS Resourcesat-2 image (sharp.',
            decisions: [{ prompt: 'Name the two experimental satellites that preceded the operational IRS series, their launch years, and the primary objective each was.', options: [
                { text: 'Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981)', outcome: 'Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981). Bhaskar-1 carried a two-band TV camera and.' },
                { text: 'Indian satellites', outcome: 'Not quite — Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1.', reveals: 'irs-1a-was-india-s' },
                { text: 'IRS-1A is used for weather forecasting', outcome: 'Not quite — Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1.', reveals: 'irs-1a-was-india-s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Analysing a satellite false-colour composite in the lab, a student reports: \'The forest is red in this image, so this region has red trees. And for our crop study, we should hire drones — satellites fly too high to give useful data.\'',
            decisions: [{ prompt: 'What\'s wrong with both conclusions?', options: [
                { text: 'Decode the colours: FCC assigns near-infrared reflectance to red — healthy vegetation bounces NIR strongly, which is why forests render red; nothing on the ground is actually red. And altitude isn\'t quality: Sentinel-2 gives calibrated, multi-temporal 10 m data free over whole regions — vital for crop acreage — while drones cover small areas and need stitching and radiometric correction.', outcome: 'The lab report gets it right: spectral signatures are coded into channels, and platform choice is a resolution-coverage-cost trade-off, not a height contest.' },
                { text: 'Accept the red-forest reading — the image records what\'s really there.', outcome: 'FCC colours are assigned, not real: NIR→red is a display convention; misreading it leads to calling fallow fields water bodies and turbid water clear.', reveals: 'fcc-shows-real-colours' },
                { text: 'Back the drones — lower altitude always means better data for any job.', outcome: 'Spatial resolution isn\'t utility: satellites win on radiometric consistency, revisit reliability, coverage and cost-per-km² — exactly what regional crop estimation needs.', reveals: 'lower-altitude-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_006', title: 'The bigger picture',
          caseStudy: { intro: 'Remote sensing reads what eyes can\'t — every surface has a spectral signature, and the platform you pick is a trade of detail against coverage.',
            decisions: [{ prompt: 'What comes next? Introduction to Remote Sensing · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Remote Sensing · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_001', difficulty: 'standard',
          question: 'Remote sensing is the science and technology of acquiring information about.',
          hint: 'Revisit Class 9 Geography Chapter 2 (Atmosphere) for atmospheric composition and Class 11.',
          misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Remote sensing is the science and technology of acquiring information about objects or',
                  options: ['Remote sensing is the science and technology of acquiring information about objects or', 'Remote sensing platforms are the physical carriers or vehicles that host sensors for', 'The electromagnetic spectrum is the continuous distribution of electromagnetic radiation', 'Active sensors are remote sensing devices that emit their own electromagnetic energy'],
                  hint: 'Revisit Class 9 Geography Chapter 2 (Atmosphere) for atmospheric composition and Class 11 Physics.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' }
          ],
            remediations: { 'remote-sensing-satellite-photography-and': { steps: ['Take a printed FCC image (e.g., from NCERT Fig 6.11) and a true-colour image of the same area.', 'Identify three features (water, vegetation, urban) in both.', 'Write down the colour each appears in true-colour vs FCC.', 'Explain the band assignment: FCC = Band 4 (NIR)→Red, Band 3 (Red)→Green, Band 2 (Green)→Blue.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Higher spatial resolution always produces better thematic maps for agricultural monitoring." Justify with two arguments considering.', answer: 'The statement is false',
                  options: ['The statement is false', 'seeing smaller fields', 'remote sensing = satellite photography', 'real colours'],
                  hint: 'Revisit Class 9 Geography Chapter 2 (Atmosphere) for atmospheric composition and Class 11 Physics.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' },
                { id: 'b', prompt: 'Design a visual interpretation key for identifying three land cover types (dense forest, urban built-up, fallow agricultural land) on a standard FCC image.', answer: '| Land Cover | Tone/Colour (FCC) | Texture | Pattern | Association |',
                  options: ['| Land Cover | Tone/Colour (FCC) | Texture | Pattern | Association |', 'remote sensing = satellite photography', 'real colours'],
                  hint: 'Revisit Class 9 Geography Chapter 2 (Atmosphere) for atmospheric composition and Class 11 Physics.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' }
          ],
            remediations: { 'remote-sensing-satellite-photography-and': { steps: ['Take a printed FCC image (e.g., from NCERT Fig 6.11) and a true-colour image of the same area.', 'Identify three features (water, vegetation, urban) in both.', 'Write down the colour each appears in true-colour vs FCC.', 'Explain the band assignment: FCC = Band 4 (NIR)→Red, Band 3 (Red)→Green, Band 2 (Green)→Blue.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_002', difficulty: 'standard',
          question: 'Remote sensing platforms are the physical carriers or vehicles that host.',
          hint: 'Revisit c11_geo_cbse_26_001 Stages (b) Transmission and (e) Detection – focus on how the.',
          misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are.',
          parts: [
                { id: 'a', prompt: 'A student claims that "all remote sensing platforms are satellites because remote sensing means sensing from space." Is this statement correct?', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'remote sensing', 'satellite remote sensing', 'higher altitude always means worse data'],
                  hint: 'Revisit c11_geo_cbse_26_001 Stages (b) Transmission and (e) Detection – focus on how the sensor\'s.',
                  misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are inferior to airborne.' }
          ],
            remediations: { 'higher-altitude-always-means-worse': { steps: ['Draw a table on paper with columns: Platform, Altitude, Typical Resolution, Coverage per Scene, Revisit, Cost per km².', 'Pick a real Indian problem (e.g., "map paddy area in Krishna district, Andhra Pradesh").', 'For each platform, write one reason it would FAIL for this task (e.g., drone: "1000 km² too large for daily flights").', 'Identify which platform succeeds and why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_003', difficulty: 'standard',
          question: 'The electromagnetic spectrum is the continuous distribution of electromagnetic.',
          hint: 'If stuck on spectral calculations, revisit Class 11 Physics Chapter "Electromagnetic.',
          misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for.',
          parts: [
                { id: 'a', prompt: 'A Landsat-8 OLI sensor acquires data in Band 5 (NIR: 0.85–0.88 µm) and Band 4 (Red: 0.64–0.67 µm).', answer: '**Answer:** Frequency range = c/λ',
                  options: ['**Answer:** Frequency range = c/λ', 'infrared'],
                  hint: 'If stuck on spectral calculations, revisit Class 11 Physics Chapter "Electromagnetic Waves" (NCERT).',
                  misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for vegetation/water.' },
                { id: 'b', prompt: 'A spectral signature curve shows: Feature A has 5% reflectance in Blue (0.45 µm), 8% in Green (0.55 µm), 6% in Red (0.65 µm), 45% in NIR (0.85 µm), and 25%.', answer: '**Answer:** Feature A = healthy vegetation',
                  options: ['**Answer:** Feature A = healthy vegetation', 'it reflects more in visible bands', 'high SWIR for vegetation', 'infrared'],
                  hint: 'If stuck on spectral calculations, revisit Class 11 Physics Chapter "Electromagnetic Waves" (NCERT).',
                  misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for vegetation/water.' }
          ],
            remediations: { 'students-believe-that-infrared-is': { steps: ['** Draw a 3-panel spectral signature sketch on graph paper: X-axis = wavelength (0.4–2.5 µm), Y-axis = % reflectance.', '** Annotate each inflection point with the physical cause: "0.7 µm red edge = chlorophyll absorption cutoff", "1.4 µm.', '** Take a standard FCC image (download from Bhuvan/NRSC for your district).', '** Re-read NCERT Fig 6.4 (Spectral Signature of Soil, Vegetation and Water) and Table 6.2 (Colour Signatures.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_004', difficulty: 'standard',
          question: 'Active sensors are remote sensing devices that emit their own electromagnetic.',
          hint: 'Revisit the electromagnetic spectrum node (c11_geo_cbse_26_003) and the “Stages in Remote.',
          misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive.',
          parts: [
                { id: 'a', prompt: 'Why can a C-band radar sensor (active) acquire usable images of the Brahmaputra floodplain at 2 am during a cloudy monsoon night, while a Landsat-8 OLI sensor.', answer: 'The radar emits its own 5.6 cm microwave pulses',
                  options: ['The radar emits its own 5.6 cm microwave pulses', 'radar uses sunlight too', 'active sensor', 'passive sensor'],
                  hint: 'Revisit the electromagnetic spectrum node (c11_geo_cbse_26_003) and the “Stages in Remote Sensing”.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' },
                { id: 'b', prompt: 'You are tasked with mapping the extent of standing water in Punjab’s rice fields during the kharif season (July–September). Cloud cover is persistent.', answer: 'Choose Sentinel-1 SAR (C-band, VV/VH polarisation)',
                  options: ['Choose Sentinel-1 SAR (C-band, VV/VH polarisation)', 'it has better resolution', 'active sensor', 'passive sensor'],
                  hint: 'Revisit the electromagnetic spectrum node (c11_geo_cbse_26_003) and the “Stages in Remote Sensing”.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' },
                { id: 'c', prompt: 'Compare the geometric distortions introduced by a whiskbroom scanner and a pushbroom scanner when imaging a mountainous region like the Western Ghats.', answer: 'A whiskbroom scanner uses a single detector per band with an oscillating mirror',
                  options: ['A whiskbroom scanner uses a single detector per band with an oscillating mirror', 'it has a mirror', 'active sensor', 'passive sensor'],
                  hint: 'Revisit the electromagnetic spectrum node (c11_geo_cbse_26_003) and the “Stages in Remote Sensing”.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' }
          ],
            remediations: { 'active-sensor-means-the-sensor': { steps: ['Draw a simple energy-flow diagram on the board: **Passive**: Sun → Surface → Sensor **Active**: Sensor → Surface →.', 'Show two images of the same Mumbai suburb: a Sentinel-2 true-colour composite (passive, cloudy) and a Sentinel-1.', 'Ask students to identify which sensor “brought its own flashlight.” 3.', 'Have them complete a 3-row table: Sensor | Energy Source | Day/Night | Cloud Penetration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_005', difficulty: 'standard',
          question: 'Resolution in remote sensing refers to the ability of a sensor to distinguish.',
          hint: 'Revisit c11_geo_cbse_26_003 (EM spectrum bands) and c11_geo_cbse_26_004 (scanner.',
          misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g.',
          parts: [
                { id: 'a', prompt: 'A sensor has 7-bit radiometric resolution. Calculate the maximum number of distinct grey levels it can record.', answer: '7-bit = 2⁷ = 128 grey levels (0–127)',
                  options: ['7-bit = 2⁷ = 128 grey levels (0–127)', 'higher spatial resolution is always better', '1 m over 30 m for regional crop monitoring'],
                  hint: 'Revisit c11_geo_cbse_26_003 (EM spectrum bands) and c11_geo_cbse_26_004 (scanner geometry: IFOV.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30.' },
                { id: 'b', prompt: 'IRS Resourcesat-2 LISS-IV has a spatial resolution of 5.8 m and a revisit period of 5 days. SPOT-7 has 1.5 m resolution but a 26-day revisit.', answer: 'Choose Resourcesat-2 LISS-IV',
                  options: ['Choose Resourcesat-2 LISS-IV', 'higher spatial resolution is always better', '1 m over 30 m for regional crop monitoring'],
                  hint: 'Revisit c11_geo_cbse_26_003 (EM spectrum bands) and c11_geo_cbse_26_004 (scanner geometry: IFOV.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30.' },
                { id: 'c', prompt: 'Compare the spectral resolution of Landsat-8 OLI (9 bands, 0.43–2.29 µm) and IRS LISS-III (4 bands, 0.52–1.70 µm) for two applications: (a) mapping iron oxide.', answer: 'mapping iron oxide minerals in Chotanagpur plateau, (',
                  options: ['mapping iron oxide minerals in Chotanagpur plateau, (', 'higher spatial resolution is always better', '1 m over 30 m for regional crop monitoring'],
                  hint: 'Revisit c11_geo_cbse_26_003 (EM spectrum bands) and c11_geo_cbse_26_004 (scanner geometry: IFOV.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Draw a 1 km × 1 km grid on paper. Shade one 30 m × 30 m cell (Landsat pixel) and calculate how many 1 m × 1 m cells.', 'Use Table 6.1 — compare IRS LISS-III (23.5 m, 4 bands, 7-bit, 24-day revisit) vs IRS PAN (5.8 m, 1 band, 6-bit, 24-day.', 'Apply to a real task — "map rice variety distribution in 500 km² delta".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_006', difficulty: 'standard',
          question: 'The Indian Remote Sensing (IRS) Programme is India\'s indigenous series of Earth.',
          hint: 'Revisit c11_geo_cbse_26_002 (orbital characteristics) and c11_geo_cbse_26_004 (pushbroom.',
          misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.',
          parts: [
                { id: 'a', prompt: 'Name the two experimental satellites that preceded the operational IRS series, their launch years, and the primary objective each was designed to achieve.', answer: 'Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981)',
                  options: ['Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981)', 'Indian satellites', 'IRS-1A is used for weather forecasting', 'IRS-1A as experimental, or confusing Bhaskar with Aryabhata'],
                  hint: 'Revisit c11_geo_cbse_26_002 (orbital characteristics) and c11_geo_cbse_26_004 (pushbroom scanner.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' },
                { id: 'b', prompt: 'IRS-1A carried two sensors: LISS-I (spatial resolution 72.5 m, swath 148 km) and LISS-II (spatial resolution 36.25 m, swath 74 km).', answer: 'Choose LISS-II',
                  options: ['Choose LISS-II', 'Indian satellites', 'IRS-1A is used for weather forecasting'],
                  hint: 'Revisit c11_geo_cbse_26_002 (orbital characteristics) and c11_geo_cbse_26_004 (pushbroom scanner.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' }
          ],
            remediations: { 'irs-1a-was-india-s': { steps: ['Draw a two-column table on paper. Left column: "Bhaskar-1/2" — write: experimental, 1 km resolution, SLV-3 launch.', 'Below, draw orbit diagrams — sketch a polar orbit circling Earth 14 times/day (sun-synchronous) vs.', 'Use the NCERT Box 6.1 comparison table — read each row aloud and explain *why* altitude causes that difference (e.g.', 'Re-attempt Diagnostic Question 2 from memory. If stuck, revisit c11_geo_cbse_26_002 (platforms) for orbit fundamentals.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
