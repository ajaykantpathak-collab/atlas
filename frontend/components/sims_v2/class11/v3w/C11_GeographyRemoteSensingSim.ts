import type { SimDef } from '../../engine/types';
import C11_GeographyRemoteSensingSim from '../../../simulations/c6_12/C11_GeographyRemoteSensingSim';

/** v3 wrapped master — C11_GeographyRemoteSensingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographyremotesensingsim: SimDef = {
    id: 'v3w_c11_geographyremotesensingsim',
    title: 'Remote Sensing: Definition, Principle and Stages',
    subtitle: 'This node covers the fundamental definition, energy-matter interaction principles, the.',
    classLevel: 11, subject: 'geography', topic: 'Remote Sensing: Definition, Principle and Stages',
    chapters: [],
    nodeIds: ['c11_geo_cbse_26_001', 'c11_geo_cbse_26_002', 'c11_geo_cbse_26_003', 'c11_geo_cbse_26_004', 'c11_geo_cbse_26_005', 'c11_geo_cbse_26_006', 'c11_geo_cbse_26_007', 'c11_geo_cbse_26_008', 'c11_geo_cbse_25_008', 'c11_geo_cbse_13_006', 'c11_geo_cbse_18_002', 'c11_geo_cbse_22_002', 'c11_geo_cbse_25_003', 'c11_geo_cbse_25_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Look at your smartphone camera — it captures images by detecting visible light reflected off objects.', goal: 'Master Remote Sensing: Definition, Principle and Stages.' },
    discovery: {
        question: 'Evaluate the statement: "Higher spatial resolution always produces better thematic maps for agricultural monitoring." Justify with two arguments considering.',
        options: ['The statement is false', 'seeing smaller fields', 'remote sensing = satellite photography'],
        answer: 'The statement is false',
        hook: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.',
    },
    teaching: [
        { title: 'Remote sensing is the science and technology.', text: 'Remote sensing is the science and technology of acquiring information about objects or phenomena on Earth\'s surface without physical contact, by detecting and measuring electromagnetic radiation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_001', title: 'Remote sensing is the science and.',
          scaffold: { problem: 'A satellite sensor captures an image of the Sundarbans mangrove forest in three bands: Band 2 (Green, 0.52-0.59 µm), Band 3 (Red, 0.63-0.69.',
            steps: [
            { text: 'Recall standard FCC band assignment: Band 4 (NIR) → Red, Band 3 (Red) → Green, Band 2 (Green) → Blue.' },
            { text: 'For mangrove pixel: High NIR (DN=120) → strong Red; Low Red (DN=30) → weak Green; Medium Green (DN=45) → medium Blue.' },
            { text: 'For turbid water pixel: Low NIR (DN=20) → weak Red; Medium Red (DN=60) → medium Green; High Green (DN=80) → strong.' },
            { text: 'Interpret physically: Mangrove leaves have high NIR reflectance (healthy vegetation); turbid water reflects green/red.' },
            { text: 'Conclude: In FCC, mangroves appear red/magenta, turbid water appears light blue — clear visual separation.', faded: true, blankAnswer: 'Mangrove appears bright red/magenta (high NIR→Red), turbid.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_002', title: 'Remote sensing platforms are the.',
          scaffold: { problem: 'A research team plans to map invasive water hyacinth (Eichhornia crassipes) coverage in Vembanad Lake, Kerala (approx.',
            steps: [
            { text: 'Determine drone coverage per flight. eBee X flies at 120 m AGL, 20 MP camera (5472×3648 px), 3.6 cm GSD.' },
            { text: 'Calculate flight time. Each line 20 km long. Total distance = 67 × 20 km = 1,340 km.' },
            { text: 'Estimate cost. Drone operation in India: ~₹8,000–12,000 per flight day (pilot, permissions, processing).' },
            { text: 'Compare Option A (ground). Boat-based points: 200 km² at 1 m resolution = 200 million pixels.' },
            { text: 'Compare Option C (spaceborne). Sentinel-2: 10 m resolution (insufficient for 1 m target), 5-day revisit (meets 2-week),.' },
            { text: 'Conclude. Drone (B) is only platform meeting 1 m resolution and 2-week revisit for 200 km², but cost and permissions.', faded: true, blankAnswer: 'Drone requires ~67 flight lines, ~30 hours total flight.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_26_003', title: 'The electromagnetic spectrum is the.',
          caseStudy: { intro: 'Begin with a real-world observation: "When you see a rainbow after rain in Kerala or a mirage on a Rajasthan highway, you are witnessing visible light — a tiny.',
            decisions: [{ prompt: 'A Landsat-8 OLI sensor acquires data in Band 5 (NIR: 0.85–0.88 µm) and Band 4 (Red: 0.64–0.67 µm).', options: [
                { text: '**Answer:** Frequency range = c/λ', outcome: '**Answer:** Frequency range = c/λ. For λ₁ = 0.85 µm = 8.5 × 10⁻⁷ m: ν₁ = 3×10⁸ / 8.5×10⁻⁷ = 3.53 ×.' },
                { text: 'infrared', outcome: 'Not quite — **Students believe that "infrared" is a single uniform region and that all infrared bands behave.', reveals: 'students-believe-that-infrared-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_004', title: 'Active sensors are remote sensing.',
          scaffold: { problem: 'The Assam State Disaster Management Authority needs daily flood-extent maps during the peak monsoon (June–August) when cloud cover is >80.',
            steps: [
            { text: 'Identify the constraint – persistent thick clouds block visible/NIR radiation, and floods require frequent (daily).' },
            { text: 'Recall that microwave radiation (1 mm–1 m) penetrates cloud droplets; active sensors emit their own microwaves.' },
            { text: 'Select Sentinel-1 C-band SAR (5.6 cm wavelength) – an active sensor with 6-day revisit (12-day with single satellite).' },
            { text: 'Describe working: (a) Satellite transmits a pulsed microwave beam sideways; (b) Pulse interacts with surface – smooth.' },
            { text: 'Verify suitability – all-weather, day/night, sensitive to water/vegetation contrast, revisit matches flood dynamics.', faded: true, blankAnswer: 'Sentinel-1 C-band SAR (active). Working: emits microwave.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_005', title: 'Resolution in remote sensing refers to.',
          scaffold: { problem: 'Calculate the spatial resolution (GSD) of a pushbroom sensor on a sun-synchronous satellite at 705 km altitude with a detector IFOV of 42.5.',
            steps: [
            { text: 'Convert IFOV to radians: 42.5 µrad = 42.5 × 10⁻⁶ rad.' },
            { text: 'Apply GSD formula for nadir view: GSD = IFOV × Altitude = (42.5 × 10⁻⁶) × (705 × 10³ m) = 29.96 m ≈ 30 m.' },
            { text: 'Calculate theoretical swath from detector array: Swath = Number of detectors × GSD = 6000 × 30 m = 180,000 m = 180 km.' },
            { text: 'Compare with given swath (185 km) — difference due to off-nadir distortion at swath edges (IFOV projection increases.' },
            { text: 'Identify this sensor: 30 m GSD, 185 km swath, 705 km altitude matches Landsat-8 OLI specifications (Table 6.1 shows.' },
            { text: 'Interpret: Pushbroom\'s linear detector array (6000 elements) enables wide swath without moving parts — advantage over.', faded: true, blankAnswer: 'GSD = 30 m. Swath verification yields 180 km (nadir) vs 185.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_26_006', title: 'The Indian Remote Sensing (IRS).',
          scaffold: { problem: 'A watershed management team in 1990 wants to map seasonal surface water bodies in a 5,000 km² semi-arid region using IRS-1A data.',
            steps: [
            { text: 'Define minimum mapping unit (MMU) — 1 ha = 10,000 m². For 90% detection confidence, need ≥ 3×3 pixels on target.' },
            { text: 'Calculate scenes needed to cover 5,000 km². LISS-II swath = 74 km.' },
            { text: 'Evaluate temporal requirement — need pre- and post-monsoon. IRS-1A revisit = 22 days.' },
            { text: 'Assess spectral suitability — both have Band 4 (0.77–0.86 µm, NIR) where water absorbs strongly (appears dark).' },
            { text: 'Decide — LISS-II is optimal because it meets MMU for 1 ha water bodies; LISS-I does not.' },
            { text: 'Recommend acquisition: LISS-II, May 15 ± 11 days and November 15 ± 11 days (centered on peak dry/wet seasons), with.', faded: true, blankAnswer: 'Use LISS-II sensor; acquire cloud-free scenes in mid-May.' }
            ] } }
    ],
    explore: { component: C11_GeographyRemoteSensingSim, prompt: 'Explore the interactive — Remote Sensing: Definition, Principle and Stages' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_001', difficulty: 'standard',
          question: 'Remote sensing is the science and technology of acquiring information about.',
          hint: 'Revisit Class 9 Geography Chapter 2 (Atmosphere) for atmospheric composition and Class 11.',
          misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Remote sensing is the science and technology of acquiring information about objects or',
                  options: ['Remote sensing is the science and technology of acquiring information about objects or', 'Remote sensing platforms are the physical carriers or vehicles that host sensors for', 'The electromagnetic spectrum is the continuous distribution of electromagnetic radiation', 'Active sensors are remote sensing devices that emit their own electromagnetic energy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' }
          ],
            remediations: { 'remote-sensing-satellite-photography-and': { steps: ['Take a printed FCC image (e.g., from NCERT Fig 6.11) and a true-colour image of the same area.', 'Identify three features (water, vegetation, urban) in both.', 'Write down the colour each appears in true-colour vs FCC.', 'Explain the band assignment: FCC = Band 4 (NIR)→Red, Band 3 (Red)→Green, Band 2 (Green)→Blue.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Higher spatial resolution always produces better thematic maps for agricultural monitoring." Justify with two arguments considering.', answer: 'The statement is false',
                  options: ['The statement is false', 'seeing smaller fields', 'remote sensing = satellite photography', 'real colours'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' },
                { id: 'b', prompt: 'Design a visual interpretation key for identifying three land cover types (dense forest, urban built-up, fallow agricultural land) on a standard FCC image.', answer: '| Land Cover | Tone/Colour (FCC) | Texture | Pattern | Association |',
                  options: ['| Land Cover | Tone/Colour (FCC) | Texture | Pattern | Association |', 'remote sensing = satellite photography', 'real colours'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "remote sensing = satellite photography" and that FCC images show "real colours" of Earth.' }
          ],
            remediations: { 'remote-sensing-satellite-photography-and': { steps: ['Take a printed FCC image (e.g., from NCERT Fig 6.11) and a true-colour image of the same area.', 'Identify three features (water, vegetation, urban) in both.', 'Write down the colour each appears in true-colour vs FCC.', 'Explain the band assignment: FCC = Band 4 (NIR)→Red, Band 3 (Red)→Green, Band 2 (Green)→Blue.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_002', difficulty: 'standard',
          question: 'Remote sensing platforms are the physical carriers or vehicles that host.',
          hint: 'Revisit c11_geo_cbse_26_001 Stages (b) Transmission and (e) Detection – focus on how the.',
          misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are.',
          parts: [
                { id: 'a', prompt: 'A student claims that "all remote sensing platforms are satellites because remote sensing means sensing from space." Is this statement correct?', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'remote sensing', 'satellite remote sensing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are inferior to airborne.' }
          ],
            remediations: { 'higher-altitude-always-means-worse': { steps: ['Draw a table on paper with columns: Platform, Altitude, Typical Resolution, Coverage per Scene, Revisit, Cost per km².', 'Pick a real Indian problem (e.g., "map paddy area in Krishna district, Andhra Pradesh").', 'For each platform, write one reason it would FAIL for this task (e.g., drone: "1000 km² too large for daily flights").', 'Identify which platform succeeds and why.', 'Re-read NCERT Box 6.1 (Sun-synchronous vs Geostationary) and add a row for "Consistent Illumination Geometry" – tick.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "For landslide early warning in the Himalayas, a network of ground-based GPS stations is more effective than satellite InSAR.', answer: 'The statement is partially valid but incomplete',
                  options: ['The statement is partially valid but incomplete', 'higher altitude always means worse data', 'spaceborne platforms are inferior to airborne for all applications'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "higher altitude always means worse data" and therefore assume spaceborne platforms are inferior to airborne.' }
          ],
            remediations: { 'higher-altitude-always-means-worse': { steps: ['Draw a table on paper with columns: Platform, Altitude, Typical Resolution, Coverage per Scene, Revisit, Cost per km².', 'Pick a real Indian problem (e.g., "map paddy area in Krishna district, Andhra Pradesh").', 'For each platform, write one reason it would FAIL for this task (e.g., drone: "1000 km² too large for daily flights").', 'Identify which platform succeeds and why.', 'Re-read NCERT Box 6.1 (Sun-synchronous vs Geostationary) and add a row for "Consistent Illumination Geometry" – tick.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_003', difficulty: 'standard',
          question: 'The electromagnetic spectrum is the continuous distribution of electromagnetic.',
          hint: 'If stuck on spectral calculations, revisit Class 11 Physics Chapter "Electromagnetic.',
          misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for.',
          parts: [
                { id: 'a', prompt: 'A Landsat-8 OLI sensor acquires data in Band 5 (NIR: 0.85–0.88 µm) and Band 4 (Red: 0.64–0.67 µm).', answer: '**Answer:** Frequency range = c/λ',
                  options: ['**Answer:** Frequency range = c/λ', 'infrared'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for vegetation/water.' },
                { id: 'b', prompt: 'A spectral signature curve shows: Feature A has 5% reflectance in Blue (0.45 µm), 8% in Green (0.55 µm), 6% in Red (0.65 µm), 45% in NIR (0.85 µm), and 25% in.', answer: '**Answer:** Feature A = healthy vegetation',
                  options: ['**Answer:** Feature A = healthy vegetation', 'it reflects more in visible bands', 'high SWIR for vegetation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for vegetation/water.' }
          ],
            remediations: { 'students-believe-that-infrared-is': { steps: ['** Draw a 3-panel spectral signature sketch on graph paper: X-axis = wavelength (0.4–2.5 µm), Y-axis = % reflectance.', '** Annotate each inflection point with the physical cause: "0.7 µm red edge = chlorophyll absorption cutoff", "1.4 µm.', '** Take a standard FCC image (download from Bhuvan/NRSC for your district).', '** Re-read NCERT Fig 6.4 (Spectral Signature of Soil, Vegetation and Water) and Table 6.2 (Colour Signatures on.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Thermal Infrared (TIR: 8–14 µm) remote sensing measures the temperature of the land surface directly, so it can replace weather.', answer: '**Answer:** The statement is **incorrect**',
                  options: ['**Answer:** The statement is **incorrect**', 'TIR measures heat, not temperature', 'infrared'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe that "infrared" is a single uniform region and that all infrared bands behave similarly for vegetation/water.' }
          ],
            remediations: { 'students-believe-that-infrared-is': { steps: ['** Draw a 3-panel spectral signature sketch on graph paper: X-axis = wavelength (0.4–2.5 µm), Y-axis = % reflectance.', '** Annotate each inflection point with the physical cause: "0.7 µm red edge = chlorophyll absorption cutoff", "1.4 µm.', '** Take a standard FCC image (download from Bhuvan/NRSC for your district).', '** Re-read NCERT Fig 6.4 (Spectral Signature of Soil, Vegetation and Water) and Table 6.2 (Colour Signatures on.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_004', difficulty: 'standard',
          question: 'Active sensors are remote sensing devices that emit their own electromagnetic.',
          hint: 'Revisit the electromagnetic spectrum node (c11_geo_cbse_26_003) and the “Stages in Remote.',
          misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive.',
          parts: [
                { id: 'a', prompt: 'Why can a C-band radar sensor (active) acquire usable images of the Brahmaputra floodplain at 2 am during a cloudy monsoon night, while a Landsat-8 OLI sensor.', answer: 'The radar emits its own 5.6 cm microwave pulses',
                  options: ['The radar emits its own 5.6 cm microwave pulses', 'radar uses sunlight too', 'active sensor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' },
                { id: 'b', prompt: 'You are tasked with mapping the extent of standing water in Punjab’s rice fields during the kharif season (July–September). Cloud cover is persistent.', answer: 'Choose Sentinel-1 SAR (C-band, VV/VH polarisation)',
                  options: ['Choose Sentinel-1 SAR (C-band, VV/VH polarisation)', 'it has better resolution', 'active sensor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' },
                { id: 'c', prompt: 'Compare the geometric distortions introduced by a whiskbroom scanner and a pushbroom scanner when imaging a mountainous region like the Western Ghats.', answer: 'A whiskbroom scanner uses a single detector per band with an oscillating mirror',
                  options: ['A whiskbroom scanner uses a single detector per band with an oscillating mirror', 'it has a mirror', 'active sensor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that “active sensor” means the sensor actively moves (like a scanning mirror) while “passive sensor” sits still.' }
          ],
            remediations: { 'active-sensor-means-the-sensor': { steps: ['Draw a simple energy-flow diagram on the board: **Passive**: Sun → Surface → Sensor **Active**: Sensor → Surface →.', 'Show two images of the same Mumbai suburb: a Sentinel-2 true-colour composite (passive, cloudy) and a Sentinel-1 VV.', 'Ask students to identify which sensor “brought its own flashlight.” 3.', 'Have them complete a 3-row table: Sensor | Energy Source | Day/Night | Cloud Penetration.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_005', difficulty: 'standard',
          question: 'Resolution in remote sensing refers to the ability of a sensor to distinguish.',
          hint: 'Revisit c11_geo_cbse_26_003 (EM spectrum bands) and c11_geo_cbse_26_004 (scanner.',
          misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g.,.',
          parts: [
                { id: 'a', prompt: 'A sensor has 7-bit radiometric resolution. Calculate the maximum number of distinct grey levels it can record.', answer: '7-bit = 2⁷ = 128 grey levels (0–127)',
                  options: ['7-bit = 2⁷ = 128 grey levels (0–127)', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30 m.' },
                { id: 'b', prompt: 'IRS Resourcesat-2 LISS-IV has a spatial resolution of 5.8 m and a revisit period of 5 days. SPOT-7 has 1.5 m resolution but a 26-day revisit.', answer: 'Choose Resourcesat-2 LISS-IV',
                  options: ['Choose Resourcesat-2 LISS-IV', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30 m.' },
                { id: 'c', prompt: 'Compare the spectral resolution of Landsat-8 OLI (9 bands, 0.43–2.29 µm) and IRS LISS-III (4 bands, 0.52–1.70 µm) for two applications: (a) mapping iron oxide.', answer: 'mapping iron oxide minerals in Chotanagpur plateau, (',
                  options: ['mapping iron oxide minerals in Chotanagpur plateau, (', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30 m.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Draw a 1 km × 1 km grid on paper. Shade one 30 m × 30 m cell (Landsat pixel) and calculate how many 1 m × 1 m cells.', 'Use Table 6.1 — compare IRS LISS-III (23.5 m, 4 bands, 7-bit, 24-day revisit) vs IRS PAN (5.8 m, 1 band, 6-bit, 24-day.', 'Apply to a real task — "map rice variety distribution in 500 km² delta".'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g.,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "For flood extent mapping in the Brahmaputra valley during monsoon, temporal resolution is more critical than spatial resolution.".', answer: 'The statement is largely correct',
                  options: ['The statement is largely correct', 'higher spatial resolution is always better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "higher spatial resolution is always better" and select sensors solely on minimum pixel size (e.g., choosing 1 m over 30 m.' }
          ],
            remediations: { 'higher-spatial-resolution-is-always': { steps: ['Draw a 1 km × 1 km grid on paper. Shade one 30 m × 30 m cell (Landsat pixel) and calculate how many 1 m × 1 m cells.', 'Use Table 6.1 — compare IRS LISS-III (23.5 m, 4 bands, 7-bit, 24-day revisit) vs IRS PAN (5.8 m, 1 band, 6-bit, 24-day.', 'Apply to a real task — "map rice variety distribution in 500 km² delta".'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_006', difficulty: 'standard',
          question: 'The Indian Remote Sensing (IRS) Programme is India\'s indigenous series of Earth.',
          hint: 'Revisit c11_geo_cbse_26_002 (orbital characteristics) and c11_geo_cbse_26_004 (pushbroom.',
          misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.',
          parts: [
                { id: 'a', prompt: 'Name the two experimental satellites that preceded the operational IRS series, their launch years, and the primary objective each was designed to achieve.', answer: 'Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981)',
                  options: ['Bhaskar-1 (launched 1979) and Bhaskar-2 (launched 1981)', 'Indian satellites', 'IRS-1A is used for weather forecasting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' },
                { id: 'b', prompt: 'IRS-1A carried two sensors: LISS-I (spatial resolution 72.5 m, swath 148 km) and LISS-II (spatial resolution 36.25 m, swath 74 km).', answer: 'Choose LISS-II',
                  options: ['Choose LISS-II', 'Indian satellites', 'IRS-1A is used for weather forecasting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' }
          ],
            remediations: { 'irs-1a-was-india-s': { steps: ['Draw a two-column table on paper. Left column: "Bhaskar-1/2" — write: experimental, 1 km resolution, SLV-3 launch,.', 'Below, draw orbit diagrams — sketch a polar orbit circling Earth 14 times/day (sun-synchronous) vs.', 'Use the NCERT Box 6.1 comparison table — read each row aloud and explain *why* altitude causes that difference (e.g.,.', 'Re-attempt Diagnostic Question 2 from memory. If stuck, revisit c11_geo_cbse_26_002 (platforms) for orbit fundamentals.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_26_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Bhaskar-1 and Bhaskar-2 were failures because their spatial resolution (~1 km) was too coarse for practical resource mapping." Support.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'product-only', 'Indian satellites', 'IRS-1A is used for weather forecasting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' },
                { id: 'b', prompt: 'Design a 1988-era proposal for a state agricultural department to use IRS-1A data for kharif crop acreage estimation.', answer: 'which sensor (LISS-I or LISS-II), (',
                  options: ['which sensor (LISS-I or LISS-II), (', 'Indian satellites', 'IRS-1A is used for weather forecasting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe IRS-1A was India\'s *first* remote sensing satellite, overlooking Bhaskar-1 and Bhaskar-2.' }
          ],
            remediations: { 'irs-1a-was-india-s': { steps: ['Draw a two-column table on paper. Left column: "Bhaskar-1/2" — write: experimental, 1 km resolution, SLV-3 launch,.', 'Below, draw orbit diagrams — sketch a polar orbit circling Earth 14 times/day (sun-synchronous) vs.', 'Use the NCERT Box 6.1 comparison table — read each row aloud and explain *why* altitude causes that difference (e.g.,.', 'Re-attempt Diagnostic Question 2 from memory. If stuck, revisit c11_geo_cbse_26_002 (platforms) for orbit fundamentals.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
