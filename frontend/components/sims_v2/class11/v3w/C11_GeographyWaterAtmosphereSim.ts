import type { SimDef } from '../../engine/types';
import C11_GeographyWaterAtmosphereSim from '../../../simulations/c6_12/C11_GeographyWaterAtmosphereSim';

/** v3 wrapped master — C11_GeographyWaterAtmosphereSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographywateratmospheresim: SimDef = {
    id: 'v3w_c11_geographywateratmospheresim',
    title: 'Branches of Geography: Physical Geography and Its Sub-branches',
    subtitle: 'This node covers the classification, definition, and scope of Physical Geography and its.',
    classLevel: 11, subject: 'geography', topic: 'Branches of Geography: Physical Geography and Its Sub-branches',
    chapters: [],
    nodeIds: ['c11_geo_cbse_01_004', 'c11_geo_cbse_02_006', 'c11_geo_cbse_10_003', 'c11_geo_cbse_26_003', 'c11_geo_cbse_01_007', 'c11_geo_cbse_01_010', 'c11_geo_cbse_02_004', 'c11_geo_cbse_02_008', 'c11_geo_cbse_06_004', 'c11_geo_cbse_26_001', 'c11_geo_cbse_26_005', 'c11_geo_cbse_01_008', 'c11_geo_cbse_01_009', 'c11_geo_cbse_02_007', 'c11_geo_cbse_18_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe their immediate surroundings — the slope of the school ground, the.', goal: 'Master Branches of Geography: Physical Geography and Its Sub-branches.' },
    discovery: {
        question: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each in one phrase.',
        options: ['The six major sub-branches are: (1) Geomorphology', 'Meteorology', 'Climatology'],
        answer: 'The six major sub-branches are: (1) Geomorphology',
        hook: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
    },
    teaching: [
        { title: 'Physical Geography is the branch of.', text: 'Physical Geography is the branch of geography that systematically studies the natural environment — including the lithosphere (landforms), atmosphere (climate and weather), hydrosphere (water.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_004', title: 'Physical Geography is the branch of.',
          scaffold: { problem: 'A Class 11 student is asked: "The Thar Desert has sand dunes, extreme temperatures, low rainfall, sparse xerophytic vegetation, and saline.',
            steps: [
            { text: 'Identify the five features: (a) sand dunes, (b) extreme temperatures, (c) low rainfall, (d) xerophytic vegetation, (e).' },
            { text: 'Recall the six sub-branches and their core domains: Geomorphology (landforms), Climatology (weather/climate), Hydrology.' },
            { text: 'Match each feature to its primary sub-branch: (a) sand dunes → Geomorphology (aeolian deposition); (b) extreme.' },
            { text: 'Establish the process linkages: Climatology (low rainfall, high evaporation) → drives Geomorphology (aeolian processes.' },
            { text: 'Verify completeness: All five features assigned; processes flow from climate (driver) to landform/soil/vegetation.' },
            { text: 'Interpret geographically: The Thar Desert is a coupled system where Climatology is the primary driver, but.', faded: true, blankAnswer: 'Sand dunes — Geomorphology (aeolian deposition); Extreme.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_02_006', title: 'The evolution of Earth\'s atmosphere.',
          scaffold: { problem: 'A student claims: "Earth\'s first atmosphere was mostly nitrogen and oxygen, just like today, but thinner." Using the concept of planetary.',
            steps: [
            { text: 'Identify the primary atmosphere source — solar nebula capture during accretion (4.6 Ga).' },
            { text: 'Apply thermal escape physics — Earth\'s gravity (escape velocity 11.2 km/s) cannot retain H₂ (2 g/mol) and He (4 g/mol).' },
            { text: 'Identify the secondary atmosphere source — volcanic degassing from the cooling, differentiating Earth (magma ocean.' },
            { text: 'Trace the transition to the tertiary (modern) atmosphere — H₂O condensed to form oceans (~4.0 Ga), CO₂ dissolved and.' },
            { text: 'Synthesize the sequence: Primary (H₂/He) → Lost → Secondary (H₂O/CO₂/N₂) → Oceans form, CO₂ removed → Tertiary (N₂/O₂).', faded: true, blankAnswer: 'The student\'s claim is wrong because the primary atmosphere.' }
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
        { type: 'case', nodeId: 'c11_geo_cbse_26_003', title: 'The electromagnetic spectrum is the.',
          caseStudy: { intro: 'Begin with a real-world observation: "When you see a rainbow after rain in Kerala or a mirage on a Rajasthan highway, you are witnessing visible light — a tiny.',
            decisions: [{ prompt: 'A Landsat-8 OLI sensor acquires data in Band 5 (NIR: 0.85–0.88 µm) and Band 4 (Red: 0.64–0.67 µm).', options: [
                { text: '**Answer:** Frequency range = c/λ', outcome: '**Answer:** Frequency range = c/λ. For λ₁ = 0.85 µm = 8.5 × 10⁻⁷ m: ν₁ = 3×10⁸ / 8.5×10⁻⁷ = 3.53 ×.' },
                { text: 'infrared', outcome: 'Not quite — **Students believe that "infrared" is a single uniform region and that all infrared bands behave.', reveals: 'students-believe-that-infrared-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_01_007', title: 'Geography\'s relation with natural.',
          caseStudy: { intro: 'Stand on the Marina Beach in Chennai at noon in May and feel the intense heat on your skin — that is solar radiation (Physics) interacting with the coastal.',
            decisions: [{ prompt: 'Name the two specific laws of physics that directly explain why the equator receives more annual insolation than the poles, and state the.', options: [
                { text: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with', outcome: '(1) Inverse Square Law of radiation (intensity ∝ 1/d²) combined with Lambert\'s.' },
                { text: 'distance from sun', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' },
                { text: 'volcanoes', outcome: 'Not quite — Students believe "geography describes places, physics explains processes, geology studies rocks" as.', reveals: 'geography-describes-places' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_01_010', title: 'Physical Geography is the branch of.',
          scaffold: { problem: 'Explain the formation of the Indo-Gangetic Plain using concepts from both Geomorphology and Climatology.',
            steps: [
            { text: 'Identify the geomorphological driver — convergent collision of Indian and Eurasian plates (c9_geo_ch1_2) uplifted the.' },
            { text: 'Identify the climatological driver — the uplifted Himalayas altered atmospheric circulation, intensifying the South.' },
            { text: 'Link to exogenic geomorphic processes — the intensified monsoon rainfall increased chemical and physical weathering.' },
            { text: 'Trace sediment transport — the Ganga, Indus, and Brahmaputra river systems (exogenic agents) transported this sediment.' },
            { text: 'Recognize the feedback loop — sediment accumulation depressed the crust further (isostasy), creating more accommodation.' },
            { text: 'Synthesize — the Indo-Gangetic Plain is a *product* of the interaction: tectonics provided the relief and basin,.', faded: true, blankAnswer: 'The Indo-Gangetic Plain formed by the deposition of.' }
            ] } }
    ],
    explore: { component: C11_GeographyWaterAtmosphereSim, prompt: 'Explore the interactive — Branches of Geography: Physical Geography and Its Sub-branches' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that systematically studies the.',
          hint: 'Revisit c11_geo_cbse_01_003 (Systematic vs Regional Approach) and Class 9 Earth\'s spheres.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Name the six major sub-branches of Physical Geography as classified in the NCERT Class 11 textbook and state the primary focus of each in one phrase.', answer: 'The six major sub-branches are: (1) Geomorphology',
                  options: ['The six major sub-branches are: (1) Geomorphology', 'Meteorology', 'Climatology'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'b', prompt: 'A student claims: "Physical Geography only studies static features like mountains and rivers; it does not deal with processes." Using the definition of any two.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' },
                { id: 'c', prompt: 'The Brahmaputra River forms a large delta in Bangladesh. Identify which THREE sub-branches of Physical Geography are directly involved in explaining this.', answer: 'The three sub-branches are: (1) Geomorphology',
                  options: ['The three sub-branches are: (1) Geomorphology', 'Hydrology', 'Oceanography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Oceanography should be considered a separate discipline, not a sub-branch of Physical Geography, because it has its own theories,.', answer: 'Against the statement',
                  options: ['Against the statement', 'Hydrology', 'Oceanography', 'plant geography'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat each sub-branch as an isolated "subject" (e.g., "Climatology is only about weather maps") and fail to see the Earth.' }
          ],
            remediations: { 'students-often-treat-each-sub': { steps: ['Draw a 2x3 grid on paper. Label each cell with one sub-branch.', 'In each cell, write the "input" it receives from the other five (e.g., Pedology receives: parent material from.', 'Write the "output" it sends to others (e.g., Pedology sends: soil moisture to Climatology, sediment to Hydrology,.', 'Pick a local feature (e.g., the school\'s backyard soil) and trace the full cycle: bedrock → weathering (Geomorphology).'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_02_006', difficulty: 'standard',
          question: 'The evolution of Earth\'s atmosphere refers to the multi-stage process by which.',
          hint: 'Review the "Degassing and Formation of Secondary Atmosphere" subsection in NCERT Class 11.',
          misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).',
          parts: [
                { id: 'a', prompt: 'Explain why the primordial atmosphere\'s hydrogen and helium escaped to space, while nitrogen and carbon dioxide were retained, using the concepts of molecular.', answer: 'Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses',
                  options: ['Hydrogen (2 g/mol) and helium (4 g/mol) have low molecular masses', 'gravity pulled heavier gases down', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'b', prompt: 'Given that volcanic degassing releases H₂O (60%), CO₂ (20%), SO₂ (10%), N₂ (5%), and trace gases, calculate the approximate partial pressure of CO₂ in the.', answer: 'Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles',
                  options: ['Step 1: Identify CO₂ fraction = 20% of total outgassed volatiles', 'Earth is farther from Sun', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' },
                { id: 'c', prompt: 'Analyse the following statement: "The Great Oxidation Event (GOE) at 2.4 Ga was caused solely by the evolution of cyanobacteria." Identify two additional.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'oxygen appeared suddenly and uniformly across the planet at the GOE (2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe oxygen appeared suddenly and uniformly across the planet at the GOE (2.4 Ga).' }
          ],
            remediations: { 'oxygen-appeared-suddenly-and-uniformly': { steps: ['Draw a two-column timeline: left column "Biological Events" (origin of photosynthesis, cyanobacteria, eukaryotes),.', 'Mark the GOE at 2.4 Ga as the *crossover point* where O₂ sources exceeded sinks globally.', 'Use the "oxygen sink" analogy: imagine a bathtub (atmosphere) with the drain open (reduced minerals); only when the.', 'Re-read NCERT Class 11 Chapter 2 section "Evolution of the Atmosphere" focusing on the phrase "oxygen began to.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_10_003', difficulty: 'standard',
          question: 'The four seasons of India—Winter (December-February), Summer (March-May),.',
          hint: 'Revisit c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism) focusing on ITCZ migration,.',
          misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The four seasons of India—Winter (December-February), Summer (March-May), Southwest',
                  options: ['The four seasons of India—Winter (December-February), Summer (March-May), Southwest', 'Physical Geography is the branch of geography that systematically studies the natural', 'The evolution of Earth\'s atmosphere refers to the multi-stage process by', 'The electromagnetic spectrum is the continuous distribution of electromagnetic radiation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Southwest Monsoon winds blow uniformly from the southwest across all of India.' }
          ],
            remediations: { 'the-southwest-monsoon-winds-blow': { steps: ['Trace the Arabian Sea branch from Kerala to Gujarat to Punjab.', 'Trace the Bay of Bengal branch from Sundarbans to Assam to Punjab.', 'Mark the convergence zone over Punjab/Himachal.', 'Overlay rainfall data (isohyets) to show how wind direction matches heavy rainfall zones (windward sides).', 'Explain Coriolis deflection (Ferrel\'s Law) for the Bay branch turning right in the Northern Hemisphere.'] } } },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'standard',
          question: 'Geography\'s relation with natural sciences refers to the interdisciplinary.',
          hint: 'If stuck, revisit Class 9 Plate Tectonics (c9_geo_ch1_2) for geological mechanisms and.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'APPLY: Using the hypsometric formula ΔP/Δz = -ρg and the dry adiabatic lapse rate (DALR = 9.8°C/km), calculate the temperature at the summit of Doddabetta.', answer: 'Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km',
                  options: ['Correct working: Step 1: Elevation difference = 2,637 - 400 = 2,237 m = 2.237 km', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.',
          parts: [
                { id: 'a', prompt: 'EVALUATE: "The Indian monsoon is purely a thermal phenomenon driven by differential heating of land and sea; geological factors like the Himalaya and Tibetan.', answer: 'Correct evaluation: Statement is false',
                  options: ['Correct evaluation: Statement is false', 'geography describes places, physics explains processes, geology studies rocks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "geography describes places, physics explains processes, geology studies rocks" as separate boxes.' }
          ],
            remediations: { 'geography-describes-places': { steps: ['Revisit c9_geo_ch1_2 (plate tectonics) and c9_geo_ch2_3 (pressure/wind) — draw a concept map linking "convergent.', 'Take a topographic cross-section of the Western Ghats from a 1:50,000 toposheet (c8_geo_ch2_4); mark geological.', 'Use the hypsometric formula (ΔP/Δz = -ρg) and DALR (9.8°C/km) to calculate temperature at three elevations on a local.', 'Write a 150-word explanation of why the Deccan Traps\' stepped topography (geology) creates mesa-and-scarp landscape.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_010', difficulty: 'standard',
          question: 'Physical Geography is the branch of geography that studies the natural features.',
          hint: 'If stuck, revisit Class 9 "Plate Tectonics" (c9_geo_ch1_2) for Geomorphology and "Global.',
          misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate.',
          parts: [
                { id: 'a', prompt: 'Name the two primary sub-fields of Physical Geography discussed in this node and give one key process studied in each.', answer: 'The two primary sub-fields are Geomorphology and Climatology',
                  options: ['The two primary sub-fields are Geomorphology and Climatology', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'b', prompt: 'Explain why the windward side of the Western Ghats receives heavy rainfall while the leeward side remains relatively dry, using concepts from both.', answer: 'The Western Ghats act as a geomorphological barrier (orographic lift) forcing',
                  options: ['The Western Ghats act as a geomorphological barrier (orographic lift) forcing', 'mountains block rain', 'mountains are just there, and climate happens to them'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' },
                { id: 'c', prompt: 'A student claims that the Thar Desert exists solely because of low rainfall (climatology).', answer: 'The claim is incomplete',
                  options: ['The claim is incomplete', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' }
          ],
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists a.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Climatology is only about recording temperature and rainfall data." Provide a counter-argument using the concept of atmospheric.', answer: 'The statement reduces Climatology to mere data collection (meteorology)',
                  options: ['The statement reduces Climatology to mere data collection (meteorology)', 'mountains are just there, and climate happens to them', 'Geomorphology and Climatology operate independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Geomorphology and Climatology operate independently — e.g., "mountains are just there, and climate happens to them.".' }
          ],
            remediations: { 'geomorphology-and-climatology-operate-independen': { steps: ['Use a two-column table: Column A lists a landform (Himalayas, Western Ghats, Thar, Deccan Plateau); Column B lists a.', 'Ask students to draw arrows showing *how the landform modifies the climate* and *how the climate shapes the landform*.', 'Then, have them trace the origin of the sediment in the Northern Plains back to Himalayan uplift and monsoon-driven.', 'This forces integration of the two sub-fields through cause-effect chains.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
