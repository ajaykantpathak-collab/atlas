import type { SimDef } from '../../engine/types';
import C12_GeographyIndiaLocationalSettingSim from '../../../simulations/c6_12/C12_GeographyIndiaLocationalSettingSim';

/** v3 wrapped master — C12_GeographyIndiaLocationalSettingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographyindialocationalsettingsim: SimDef = {
    id: 'v3w_c12_geographyindialocationalsettingsim',
    title: 'India Locational Setting',
    subtitle: 'Covers only the four major natural disasters in the Indian context: earthquakes (seismic.',
    classLevel: 12, subject: 'geography', topic: 'Natural Disasters: Earthquakes, Floods, Droughts, Cyclones in India',
    chapters: [],
    nodeIds: ['c12_geo_cbse_17_007', 'c12_geo_cbse_12_007', 'c12_geo_cbse_17_008', 'c12_geo_cbse_21_001', 'c12_geo_cbse_21_003', 'c12_geo_cbse_21_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real observation: "Look at the news — every year we hear of Assam floods, Maharashtra droughts,.', goal: 'Master India Locational Setting.' },
    discovery: {
        question: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for Zone V.',
        options: ['Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', 'drought = no rain', 'flood = too much rain'],
        answer: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)',
        hook: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative.',
    },
    teaching: [
        { title: 'Natural disasters in India are extreme.', text: 'Natural disasters in India are extreme geophysical or hydro-meteorological events — earthquakes, floods, droughts, and cyclones — that exceed local coping capacity, causing widespread loss of life,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_007', title: 'Natural disasters in India are extreme.',
          scaffold: { problem: 'Using the 2002 seismic zone map of India (BIS 1893), a school building is proposed at 29.5°N, 79.5°E (near Nainital, Uttarakhand).',
            steps: [
            { text: 'Locate 29.5°N, 79.5°E on the seismic zone map — it falls in Zone IV (High Damage Risk Zone) covering parts of.' },
            { text: 'Recall Zone IV corresponds to MSK intensity VIII (Destructive) as per IS 1893:2002.' },
            { text: 'Identify site amplification factors: (a) The location sits on alluvial fan deposits (thick Quaternary sediments) which.' },
            { text: 'Check liquefaction susceptibility: shallow water table (< 5 m) in sandy alluvium + Zone IV shaking = high liquefaction.' },
            { text: 'Synthesize: The building must be designed for Zone IV forces WITH site coefficients for soft soil (Type D/E per IS.', faded: true, blankAnswer: 'Zone IV, MSK VIII, with mandatory site-specific response.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_007', title: 'Traditional rainwater harvesting.',
          scaffold: { problem: 'A farmer in Jaisalmer owns 2 ha of land with a gentle slope (1.5%) and a clay layer at 2 m depth.',
            steps: [
            { text: 'Calculate total catchment area = 2 ha (own) + 1 ha (upstream) = 3 ha = 30,000 m².' },
            { text: 'Compute total rainfall volume on catchment = 30,000 m² × 0.300 m = 9,000 m³.' },
            { text: 'Compute runoff volume = 9,000 m³ × 0.4 = 3,600 m³.' },
            { text: 'Account for seepage loss (20%) → net stored volume = 3,600 × 0.8 = 2,880 m³.' },
            { text: 'Wheat water requirement for 2 ha = 20,000 m² × 0.450 m = 9,000 m³.' },
            { text: 'Bund design: to store 2,880 m³ on 2 ha (20,000 m²), average water depth = 2,880 / 20,000 = 0.144 m.', faded: true, blankAnswer: 'Khadin bund ~1.5 m high, 200 m long, storing ~1,500 m³.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_008', title: 'Human-made industrial disasters are.',
          scaffold: { problem: 'A pesticide formulation unit in Ankleshwar (Gujarat) stores 15 tonnes of technical-grade monocrotophos (organophosphate insecticide, toxic.',
            steps: [
            { text: 'Identify chemical (monocrotophos) and inventory (15 tonnes). Check MSIHC Schedule 2 threshold = 5 tonnes.' },
            { text: 'Confirm OSEP mandate: Rule 14 requires occupier to prepare OSEP for MAH units; District Collector verifies.' },
            { text: 'Estimate vulnerable radius using simplified dense gas model (Britter-McQuaid correlation): cloud width ~ 100 m at 500 m.' },
            { text: 'Compare colony distance (800 m) with estimated vulnerable radius (1.5–2 km).' },
            { text: 'Conclude: OSEP mandatory; must include colony evacuation routes, shelter-in-place protocol, medical preparedness for.', faded: true, blankAnswer: 'Yes, OSEP required (inventory 15 t > threshold 5 t)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_001', title: 'A field survey in geography is a.',
          scaffold: { problem: 'A Class 12 student wants to conduct a field survey on "Changing cropping pattern in a village in the Indo-Gangetic Plain." They have the.',
            steps: [
            { text: '**Define the geographic question and hypotheses** — e.g., "Has wheat-rice rotation shifted to sugarcane/mentha in the.' },
            { text: '**Select survey method mix** — (a) Stratified random household questionnaire (strata: landholding size, caste) for crop.' },
            { text: '**Prepare field base map and sampling frame** — Overlay village boundary (from revenue map) on toposheet; use Bhuvan.' },
            { text: '**Pilot test instruments** — Conduct 5 questionnaires and 1 transect in a neighboring village; check for ambiguous.' },
            { text: '**Ethical clearance and community entry** — Meet Sarpanch, explain purpose in Hindi/local dialect, obtain written.', faded: true, blankAnswer: 'The first three steps are: (1) Define question/hypotheses.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_003', title: 'Field survey methods are systematic.',
          scaffold: { problem: 'A Class 12 student wants to investigate "Reasons for declining groundwater levels in their village in Rajasthan\'s Alwar district." They.',
            steps: [
            { text: 'Analyze the research problem — "Reasons for declining groundwater" requires both quantitative data (extent of decline,.' },
            { text: 'Match methods to sub-questions — "What is the rate of decline?" → Questionnaire to 50 well owners (structured, recall.' },
            { text: 'Address constraints — 3 days means: Day 1: Questionnaire (quick administration). Day 2: Interviews (time-intensive).' },
            { text: 'Plan triangulation — Compare questionnaire-reported crop patterns with observed crops; cross-check interview narratives.' },
            { text: 'Ethical check — Informed consent for all; anonymize questionnaire; avoid observing private domestic water use.', faded: true, blankAnswer: 'Mixed-method design: (1) Structured questionnaire (n=50).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_21_005', title: 'Field data collection recording and.',
          scaffold: { problem: 'A Class 12 student plans a field survey to map solid waste dumping sites along a 5 km stretch of the Yamuna floodplain in Delhi.',
            steps: [
            { text: 'Identify the core variables from the research question — "Where are dumping sites, what do they contain, how big are.' },
            { text: 'Choose recording medium — a waterproof A5 field notebook with pre-printed tables (better than loose sheets in.' },
            { text: 'Design the table with metadata header (Date, Investigators, Weather, River stage, GPS device model, Projection system).' },
            { text: 'Implement error-prevention rules: (a) Every site gets a unique ID (YAM-001, YAM-002) written on a physical tag placed.' },
            { text: 'Pilot test the protocol at 2 known sites near school, time the recording per site (target < 10 min), check if peer can.', faded: true, blankAnswer: 'A complete field protocol with metadata header, coded.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_12_007', title: 'Identify each idea',
          dissect: { specimen: 'India Locational Setting', spots: [
            { id: 's1', label: 'Natural disasters in India are', prompt: 'Which idea is this? — Natural disasters in India are extreme geophysical or hydro-meteorological events —.', answer: 'Natural disasters in India are', options: ['Natural disasters in India are', 'Traditional rainwater harvesting methods in', 'Human-made industrial disasters are catastrophic', 'A field survey in geography'] },
            { id: 's2', label: 'Traditional rainwater harvesting methods in', prompt: 'Which idea is this? — Traditional rainwater harvesting methods in India are indigenous, community-managed.', answer: 'Traditional rainwater harvesting methods in', options: ['Traditional rainwater harvesting methods in', 'Natural disasters in India are', 'Human-made industrial disasters are catastrophic', 'A field survey in geography'] },
            { id: 's3', label: 'Human-made industrial disasters are catastrophic', prompt: 'Which idea is this? — Human-made industrial disasters are catastrophic events resulting from technological or.', answer: 'Human-made industrial disasters are catastrophic', options: ['Human-made industrial disasters are catastrophic', 'Natural disasters in India are', 'Traditional rainwater harvesting methods in', 'A field survey in geography'] },
            { id: 's4', label: 'A field survey in geography', prompt: 'Which idea is this? — A field survey in geography is a systematic primary data collection method where.', answer: 'A field survey in geography', options: ['A field survey in geography', 'Natural disasters in India are', 'Traditional rainwater harvesting methods in', 'Human-made industrial disasters are catastrophic'] },
            { id: 's5', label: 'Field survey methods are systematic', prompt: 'Which idea is this? — Field survey methods are systematic techniques for collecting primary geographical data.', answer: 'Field survey methods are systematic', options: ['Field survey methods are systematic', 'Natural disasters in India are', 'Traditional rainwater harvesting methods in', 'Human-made industrial disasters are catastrophic'] },
            { id: 's6', label: 'Field data collection recording and', prompt: 'Which idea is this? — Field data collection recording and documentation techniques refer to the systematic.', answer: 'Field data collection recording and', options: ['Field data collection recording and', 'Natural disasters in India are', 'Traditional rainwater harvesting methods in', 'Human-made industrial disasters are catastrophic'] }
          ] } }
    ],
    explore: { component: C12_GeographyIndiaLocationalSettingSim, prompt: 'Explore the interactive — India Locational Setting' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_007', difficulty: 'standard',
          question: 'Natural disasters in India are extreme geophysical or hydro-meteorological.',
          hint: 'If stuck on earthquake distribution, revisit c11_geo_cbse_04_010 (Plate Tectonics:.',
          misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative.',
          parts: [
                { id: 'a', prompt: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for Zone V.', answer: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)',
                  options: ['Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', 'drought = no rain', 'flood = too much rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' },
                { id: 'b', prompt: 'A district receives 40% of its normal monsoon rainfall. Reservoir storage is at 30% of capacity. Kharif sowing is 60% of normal area.', answer: 'Meteorological drought (rainfall deficit > 25% of normal), hydrological drought',
                  options: ['Meteorological drought (rainfall deficit > 25% of normal), hydrological drought', 'drought = no rain', 'flood = too much rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' }
          ],
            remediations: { 'drought-no-rain-and-flood': { steps: ['Revisit c11_geo_cbse_11_004 (flood causes) and c11_geo_cbse_11_005 (drought types) — draw a 2x2 table: hazard vs.', 'On an outline map of India, shade seismic zones, flood-prone basins, drought-prone districts, and cyclone tracks in.', 'For each shade, write one tectonic/climatic driver and one human factor amplifying risk.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4 using the map as reference.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'standard',
          question: 'Traditional rainwater harvesting methods in India are indigenous,.',
          hint: 'If stuck, revisit "Variability of Rainfall and Water Scarcity in India".',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Name the traditional rainwater harvesting structure that is a covered underground tank used primarily for drinking water in western Rajasthan, and state the.', answer: 'Tanka (or Kund), lined with lime plaster (chuna)',
                  options: ['Correct answer: Tanka (or Kund), lined with lime plaster (chuna)', 'khadin', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Explain why khadins are built on gently sloping agricultural land with impermeable sub-soil, whereas johads are constructed across seasonal drainage lines in.', answer: 'Khadins require a large catchment area on gentle slopes to collect sheet runoff',
                  options: ['Khadins require a large catchment area on gentle slopes to collect sheet runoff', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'c', prompt: 'A village in Barmer district (average annual rainfall 250 mm, high intensity storms, sandy soil with underlying clay layer at 3 m depth) wants to build a.', answer: 'Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³',
                  options: ['Step 1: Convert tanka capacity to m³: 20,000 L = 20 m³', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Revival of johads in Alwar district (by Tarun Bharat Sangh) succeeded because the structures are technically simple; social.', answer: 'The statement is false',
                  options: ['The statement is false', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' },
                { id: 'b', prompt: 'Design a combined traditional harvesting plan for a 500-ha micro-watershed in a semi-arid region (rainfall 400 mm, undulating terrain with seasonal streams,.', answer: 'A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge',
                  options: ['A good answer: (a) 3-4 johads on 1st/2nd order streams for groundwater recharge', 'khadin, tanka, johad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "khadin, tanka, johad" are just synonyms for "pond" and can be used interchangeably.' }
          ],
            remediations: { 'khadin': { steps: ['Re-read the NCERT paragraph on "Rainwater Harvesting" (page 50-51) and label Figure 4.3 mentally: identify which sketch.', 'Watch a 5-min video of johad construction in Alwar (search "Tarun Bharat Sangh johad") — note the community labour and.', 'Do a quick water-balance calc: your roof area = 100 m², rainfall = 600 mm, runoff coeff.', '= 0.8, efficiency = 0.9 → how many litres can you store?'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_008', difficulty: 'standard',
          question: 'Human-made industrial disasters are catastrophic events resulting from.',
          hint: 'If confused, revisit c11_geo_cbse_11_001 (hazard vs disaster) and create a Venn diagram:.',
          misconception: 'Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial disaster" (acute,.',
          parts: [
                { id: 'a', prompt: 'A chemical plant stores 50 tonnes of chlorine (Cl₂) in tonner containers.', answer: 'Step 1: Identify the chemical',
                  options: ['Step 1: Identify the chemical', 'not MAH because chlorine is common'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "industrial pollution" (chronic, diffuse, long-term degradation) with "industrial disaster" (acute, discrete,.' }
          ],
            remediations: { 'students-conflate-industrial-pollution-chronic': { steps: ['Revisit c11_geo_cbse_11_001 (Natural Hazards vs Natural Disasters) to internalise the hazard-disaster distinction:.', 'Create a two-column table: left column "Chronic Industrial Pollution" (examples: effluent discharge, stack emissions,.', 'For each, note onset time (years vs minutes), spatial scale (watershed vs plume), and legal remedy (Water Act vs.', 'Practice writing a 30-word board answer distinguishing the two using Daurala (pollution) vs Bhopal (disaster).'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_001', difficulty: 'standard',
          question: 'A field survey in geography is a systematic primary data collection method.',
          hint: 'If you cannot identify a "V-shaped valley" or "dendritic drainage" on a toposheet and.',
          misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A field survey in geography is a systematic primary data collection method where',
                  options: ['A field survey in geography is a systematic primary data collection method where', 'Natural disasters in India are extreme geophysical or hydro-meteorological events', 'Traditional rainwater harvesting methods in India are indigenous, community-managed', 'Human-made industrial disasters are catastrophic events resulting from technological or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field survey must start with.' }
          ],
            remediations: { 'field-surveys-are-just-asking': { steps: ['Revisit **c11_geo_cbse_24_003 (Interpreting Contours)** and **c11_geo_cbse_24_004 (Landform Identification)** —.', 'Do a **micro-field task**: In 30 minutes, map *all* water sources (tap, handpump, well, tanker) in your school.', 'Write a 150-word reflection: "What did I find that the municipal water map didn\'t show?" 4.', 'Re-attempt Diagnostic Q3 with this experience.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "With advances in drones, LiDAR, and real-time satellite data, field surveys are becoming obsolete for geographic research." Argue for.', answer: '**Against — field surveys remain irreplaceable because:** 1',
                  options: ['**Against — field surveys remain irreplaceable because:** 1', 'asking people questions', 'taking GPS points', 'field surveys are just "asking people questions" or "taking GPS points'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think field surveys are just "asking people questions" or "taking GPS points." They miss that **every field survey must start with.' }
          ],
            remediations: { 'field-surveys-are-just-asking': { steps: ['Revisit **c11_geo_cbse_24_003 (Interpreting Contours)** and **c11_geo_cbse_24_004 (Landform Identification)** —.', 'Do a **micro-field task**: In 30 minutes, map *all* water sources (tap, handpump, well, tanker) in your school.', 'Write a 150-word reflection: "What did I find that the municipal water map didn\'t show?" 4.', 'Re-attempt Diagnostic Q3 with this experience.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_003', difficulty: 'standard',
          question: 'Field survey methods are systematic techniques for collecting primary.',
          hint: 'If stuck on method selection, revisit c12_geo_cbse_21_002 Step 3 (Objective Setting) —.',
          misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Field survey methods are systematic techniques for collecting primary geographical data',
                  options: ['Field survey methods are systematic techniques for collecting primary geographical data', 'Natural disasters in India are extreme geophysical or hydro-meteorological events', 'Traditional rainwater harvesting methods in India are indigenous, community-managed', 'Human-made industrial disasters are catastrophic events resulting from technological or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid categories.' }
          ],
            remediations: { 'questionnaire-quantitative': { steps: ['Revisit c12_geo_cbse_21_002 (Field Survey Design) — review how research questions dictate method choice.', 'Create a 2×3 matrix: Research Question Type (What/How much, Why/How, Where/When) × Method (Questionnaire, Interview,.', 'Take a past CBSE practical question (e.g., 2023: "Design a questionnaire for land use survey") and rewrite it for.', 'Re-attempt Diagnostic Q2 and Q4 — if still incorrect, consult teacher for method-matching drill.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid.',
          parts: [
                { id: 'a', prompt: 'You are designing a mixed-method field survey for "Urban heat island effect in Jaipur\'s walled city vs.', answer: 'One observation protocol (what, where, when, how), (',
                  options: ['One observation protocol (what, where, when, how), (', 'questionnaire = quantitative, interview = qualitative, observation = qualitative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "questionnaire = quantitative, interview = qualitative, observation = qualitative" as rigid categories.' }
          ],
            remediations: { 'questionnaire-quantitative': { steps: ['Revisit c12_geo_cbse_21_002 (Field Survey Design) — review how research questions dictate method choice.', 'Create a 2×3 matrix: Research Question Type (What/How much, Why/How, Where/When) × Method (Questionnaire, Interview,.', 'Take a past CBSE practical question (e.g., 2023: "Design a questionnaire for land use survey") and rewrite it for.', 'Re-attempt Diagnostic Q2 and Q4 — if still incorrect, consult teacher for method-matching drill.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_005', difficulty: 'standard',
          question: 'Field data collection recording and documentation techniques refer to the.',
          hint: 'If stuck on variable types or spatial referencing, revisit **c11_geo_cbse_22_006**.',
          misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone.',
          parts: [
                { id: 'a', prompt: 'A student sketches a transect profile of a riverbank in the Sundarbans showing vegetation zones.', answer: 'The five essential elements: (1) **Title/Feature name**',
                  options: ['The five essential elements: (1) **Title/Feature name**', 'recording data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone apps, GPS).' }
          ],
            remediations: { 'recording-data-means-writing-down': { steps: ['If the student cannot design a recording sheet with metadata headers, coded fields, and error-prevention features: (1).', '(2) Practice with **c11_geo_cbse_24_003** (Interpreting Contours) — the discipline of reading standardized symbols on.', '(3) Complete a **mini-field exercise**: record 10 tree observations (species, girth, height, GPS, photo) in your school.', 'Gaps revealed = recording flaws to fix.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_21_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone.',
          parts: [
                { id: 'a', prompt: 'Design a one-page field recording sheet for a soil moisture survey along a 2 km transect in the Deccan Plateau (black cotton soil region) during post-monsoon.', answer: '**FIELD RECORDING SHEET',
                  options: ['**FIELD RECORDING SHEET', 'recording data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "recording data" means writing down whatever they observe in a notebook, and that digital tools (phone apps, GPS).' }
          ],
            remediations: { 'recording-data-means-writing-down': { steps: ['If the student cannot design a recording sheet with metadata headers, coded fields, and error-prevention features: (1).', '(2) Practice with **c11_geo_cbse_24_003** (Interpreting Contours) — the discipline of reading standardized symbols on.', '(3) Complete a **mini-field exercise**: record 10 tree observations (species, girth, height, GPS, photo) in your school.', 'Gaps revealed = recording flaws to fix.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
