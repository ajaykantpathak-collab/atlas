import type { SimDef } from '../../engine/types';
import C11_GeographyDrainageSystemSim from '../../../simulations/c6_12/C11_GeographyDrainageSystemSim';

/** v3 wrapped master — C11_GeographyDrainageSystemSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographydrainagesystemsim: SimDef = {
    id: 'v3w_c11_geographydrainagesystemsim',
    title: 'Drainage System',
    subtitle: 'Covers the six-fold physiographic classification of India at 1:5 million scale, including.',
    classLevel: 11, subject: 'geography', topic: 'Physiographic Divisions of India: Overview and Classification',
    chapters: [],
    nodeIds: ['c11_geo_cbse_09_001', 'c11_geo_cbse_09_002', 'c11_geo_cbse_09_003', 'c11_geo_cbse_09_004', 'c11_geo_cbse_09_009', 'c11_geo_cbse_13_002', 'c11_geo_cbse_21_001', 'c11_geo_cbse_24_001', 'c11_geo_cbse_08_005', 'c11_geo_cbse_09_005', 'c11_geo_cbse_09_006', 'c11_geo_cbse_09_007', 'c11_geo_cbse_13_006', 'c11_geo_cbse_24_004', 'c11_geo_cbse_24_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by asking students to observe a physical relief map of India (or Google Earth terrain view) and.', goal: 'Master Drainage System.' },
    discovery: {
        question: 'A student measures the width of the Himalayan belt at three longitudes: 76°E (Kashmir), 88°E (Sikkim), and 95°E (Arunachal).',
        options: ['Step 1: Identify the basement character at each longitude', 'more rainfall in Sikkim causes more erosion', 'Brahmaputra is antecedent'],
        answer: 'Step 1: Identify the basement character at each longitude',
        hook: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.',
    },
    teaching: [
        { title: 'Physiographic divisions of India refer to.', text: 'Physiographic divisions of India refer to the classification of the Indian landmass into six major physical units—The Himalayan Mountains, The Northern Plains, The Peninsular Plateau, The Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_001', title: 'Physiographic divisions of India refer.',
          scaffold: { problem: 'A Class 11 student is given a geological cross-section along 28°N latitude showing: (1) Siwalik Hills (Neogene molasse), (2) Main Boundary.',
            steps: [
            { text: 'Recall that physiographic divisions are defined by **major crustal-scale boundaries**, not individual thrust faults.' },
            { text: 'Identify the **Main Frontal Thrust (MFT)** — the southernmost thrust that emplaces Siwaliks over the alluvial plains.' },
            { text: 'Note that the **Northern Plains** begin where the **basement (Precambrian)** is buried beneath >1 km of Quaternary.' },
            { text: 'The **Himalayan Mountains** division includes everything north of the MFT: Siwaliks, Lesser, Greater, and Tethyan.' },
            { text: 'Verify: The MFT coincides with a sharp break in slope (mountain front), seismicity, and GPS velocity gradient —.', faded: true, blankAnswer: 'The physiographic boundary is the **Main Frontal Thrust.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_002', title: 'The Himalayan Mountains are a young.',
          scaffold: { problem: 'The Main Central Thrust (MCT) in the Sikkim Himalaya places high-grade gneisses of the Greater Himalayan Crystalline Complex (GHC) over.',
            steps: [
            { text: 'Identify the geometry — MCT is a low-angle thrust fault dipping 15° north. Horizontal displacement (heave) = 120 km.' },
            { text: 'Recall the trigonometric relationship for a planar fault: vertical displacement (throw) = heave × tan(dip angle).' },
            { text: 'Calculate throw = 120 km × tan(15°) = 120 × 0.2679 = 32.15 km.' },
            { text: 'Determine original depth of GHC = 15 km below surface. After thrusting, the GHC moves up by 32.15 km vertically.' },
            { text: 'Present structural elevation = original depth + vertical uplift = -15 km + 32.15 km = +17.15 km (i.e., 17.15 km above.' },
            { text: 'Interpret — The calculated structural elevation is the tectonic uplift; the difference from actual topography is.', faded: true, blankAnswer: 'Vertical uplift component = 32.15 km. Theoretical.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_003', title: 'The Northern Plains of India are a.',
          scaffold: { problem: 'The Yamuna River enters the plains at Faizabad (Uttar Pradesh) with a channel slope of 0.0002 and a bankfull discharge of 1,500 m³/s.',
            steps: [
            { text: 'Recall that sediment transport capacity is proportional to stream power (ω = ρgQS, where ρ=water density, g=gravity,.' },
            { text: 'Calculate relative stream power at Faizabad: ω₁ ∝ 1,500 × 0.0002 = 0.3 (arbitrary units).' },
            { text: 'Calculate relative stream power at Allahabad: ω₂ ∝ 3,000 × 0.00005 = 0.15 (arbitrary units).' },
            { text: 'Compare: stream power halves despite doubled discharge because slope drops by factor of 4.' },
            { text: 'Interpret: reduced stream power means reduced competence (max particle size) and capacity (total load), causing.' },
            { text: 'Verify with field evidence: Bhabar/Terai near Faizabad (coarse), meandering floodplain with Khaddar near Allahabad.', faded: true, blankAnswer: 'Transport capacity decreases by ~50% from Faizabad to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_004', title: 'The Northern Plains of India are.',
          scaffold: { problem: 'A student is given a map showing the Satluj, Beas, and Ravi rivers flowing through Punjab.',
            steps: [
            { text: 'Identify the rivers on the map – Satluj (south), Beas (middle), Ravi (north).' },
            { text: 'Recall the definition of a doab: the tract of land between two converging rivers.' },
            { text: 'List the doabs: Bist Doab (between Beas and Satluj), Bari Doab (between Beas and Ravi), and the area north of Ravi.' },
            { text: 'Analyse irrigation suitability: Doabs are flat, underlain by permeable alluvium, and have a natural slope from the.' },
            { text: 'Verify with real-world evidence: The Upper Bari Doab Canal (from Ravi) and Sirhind Canal (from Satluj) irrigate.', faded: true, blankAnswer: 'The doabs are Bist (Beas-Satluj), Bari (Beas-Ravi), and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_009', title: 'The drainage system of India comprises.',
          scaffold: { problem: 'A student observes that the river Brahmaputra is called Tsangpo in Tibet, makes a hairpin turn at Namcha Barwa, and enters Arunachal.',
            steps: [
            { text: 'Identify the river\'s Tibetan name (Tsangpo) and its eastward flow parallel to the Himalayas before the turn.' },
            { text: 'Recall the definition of antecedent drainage: a river that maintains its original course while the land uplifts beneath.' },
            { text: 'Apply to the Himalayas: the Tsangpo flowed on the Tethys sedimentary basin before the Himalayan uplift began (~50 Ma).' },
            { text: 'As the Indian plate collided, the Himalayas rose, but the river\'s erosional power (high gradient, glacial melt) matched.' },
            { text: 'Verify: the gorge depth and the river\'s transverse course across the structural grain confirm antecedent origin.', faded: true, blankAnswer: 'The Brahmaputra is an antecedent river that maintained its.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_13_002', title: 'A drainage basin (or catchment) is the.',
          scaffold: { problem: 'The catchment area of the Upper Krishna sub-basin (up to Almatti Dam) is 51,000 km².',
            steps: [
            { text: 'Identify the formula: Drainage Density (D_d) = Total Stream Length (L) / Basin Area (A).' },
            { text: 'Substitute given values: L = 12,750 km, A = 51,000 km².' },
            { text: 'Compute D_d = 12,750 / 51,000 = 0.25 km/km².' },
            { text: 'Compare with typical values: Himalayan basins (0.5–1.5 km/km²), Peninsular shield basins (0.1–0.3 km/km²).' },
            { text: 'Interpret: Low drainage density indicates fewer streams per unit area → longer overland flow paths → slower flood.' },
            { text: 'Conclude: Flood forecasting models for this sub-basin must use longer time-to-peak parameters; watershed interventions.', faded: true, blankAnswer: 'Drainage density = 0.25 km/km². Implication: Slow flood.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_09_002', title: 'Identify each idea',
          dissect: { specimen: 'Drainage System', spots: [
            { id: 's1', label: 'Physiographic divisions of India refer', prompt: 'Which idea is this? — Physiographic divisions of India refer to the classification of the Indian landmass into.', answer: 'Physiographic divisions of India refer', options: ['Physiographic divisions of India refer', 'The Himalayan Mountains are a', 'The Northern Plains of India', 'The drainage system of India'] },
            { id: 's2', label: 'The Himalayan Mountains are a', prompt: 'Which idea is this? — The Himalayan Mountains are a young fold mountain system formed by the convergent.', answer: 'The Himalayan Mountains are a', options: ['The Himalayan Mountains are a', 'Physiographic divisions of India refer', 'The Northern Plains of India', 'The drainage system of India'] },
            { id: 's3', label: 'The Northern Plains of India', prompt: 'Which idea is this? — The Northern Plains of India are a vast, flat alluvial tract formed by the continuous.', answer: 'The Northern Plains of India', options: ['The Northern Plains of India', 'Physiographic divisions of India refer', 'The Himalayan Mountains are a', 'The drainage system of India'] },
            { id: 's4', label: 'The drainage system of India', prompt: 'Which idea is this? — The drainage system of India comprises two distinct river regimes: Himalayan rivers.', answer: 'The drainage system of India', options: ['The drainage system of India', 'Physiographic divisions of India refer', 'The Himalayan Mountains are a', 'The Northern Plains of India'] },
            { id: 's5', label: 'A drainage basin or catchment', prompt: 'Which idea is this? — A drainage basin (or catchment) is the total land area drained by a river and its.', answer: 'A drainage basin or catchment', options: ['A drainage basin or catchment', 'Physiographic divisions of India refer', 'The Himalayan Mountains are a', 'The Northern Plains of India'] }
          ] } }
    ],
    explore: { component: C11_GeographyDrainageSystemSim, prompt: 'Explore the interactive — Drainage System' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_001', difficulty: 'standard',
          question: 'Physiographic divisions of India refer to the classification of the Indian.',
          hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) specifically the sections on **Convergent.',
          misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and.',
          parts: [
                { id: 'a', prompt: 'Using the concept of **isostatic compensation**, explain why the Himalayan Mountains (mean elevation ~6,000 m) and the Peninsular Plateau (mean elevation ~600.', answer: '**Step 1:** Recall Airy\'s isostasy: mountains have deep roots',
                  options: ['**Step 1:** Recall Airy\'s isostasy: mountains have deep roots', 'Peninsula is denser'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and sand dunes**.' }
          ],
            remediations: { 'the-thar-desert-is-a': { steps: ['** Overlay a **geological map of India** (showing basement age: Archean, Proterozoic, Phanerozoic) on a **relief map**.', '** Use a **cross-section drawing exercise** (paper or digital) along 24°N latitude: label crustal thickness from.', '** Ask: "Where does the *rock type* change abruptly?" That is the physiographic boundary.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_002', difficulty: 'standard',
          question: 'The Himalayan Mountains are a young fold mountain system formed by the.',
          hint: 'Revisit Class 9 Chapter 2 "Plate Tectonics" — specifically the section "Landforms Formed.',
          misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.',
          parts: [
                { id: 'a', prompt: 'A student measures the width of the Himalayan belt at three longitudes: 76°E (Kashmir), 88°E (Sikkim), and 95°E (Arunachal).', answer: 'Step 1: Identify the basement character at each longitude',
                  options: ['Step 1: Identify the basement character at each longitude', 'more rainfall in Sikkim causes more erosion', 'Brahmaputra is antecedent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' },
                { id: 'b', prompt: 'Compare the drainage characteristics of the Indus, Ganga, and Brahmaputra rivers where they exit the Himalayas.', answer: 'Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent',
                  options: ['Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' }
          ],
            remediations: { 'the-himalayas-are-a-single': { steps: ['Use a physical map of India (NCERT Atlas Plate 1) and trace the three longitudinal divisions with three coloured.', 'On the same map, draw the syntaxial bends — circle Nanga Parbat (76°E) and Namcha Barwa (95°E) — and draw arrows.', 'Overlay drainage — trace Indus, Sutlej, Ganga, Brahmaputra in blue; note which cut across ranges (antecedent) vs.', 'Re-read the NCERT text "The Himalayan Mountains" (Chapter 2, India Physical Environment) focusing on the table.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Karewa formations of the Kashmir Valley are lacustrine deposits that prove the Himalayas rose after the Pliocene." Is this fully.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' },
                { id: 'b', prompt: 'Compare the drainage characteristics of the Indus, Ganga, and Brahmaputra rivers where they exit the Himalayas.', answer: 'Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent',
                  options: ['Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' }
          ],
            remediations: { 'the-himalayas-are-a-single': { steps: ['Use a physical map of India (NCERT Atlas Plate 1) and trace the three longitudinal divisions with three coloured.', 'On the same map, draw the syntaxial bends — circle Nanga Parbat (76°E) and Namcha Barwa (95°E) — and draw arrows.', 'Overlay drainage — trace Indus, Sutlej, Ganga, Brahmaputra in blue; note which cut across ranges (antecedent) vs.', 'Re-read the NCERT text "The Himalayan Mountains" (Chapter 2, India Physical Environment) focusing on the table.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_003', difficulty: 'standard',
          question: 'The Northern Plains of India are a vast, flat alluvial tract formed by the.',
          hint: 'Review the fluvial landforms node (c9_geo_ch1_8) for erosion/deposition mechanics, and.',
          misconception: 'Students often believe the Northern Plains are a *single uniform layer* of alluvium deposited by one river system.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous',
                  options: ['The Northern Plains of India are a vast, flat alluvial tract formed by the continuous', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are divided into three major river basin systems: the Indus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Northern Plains are a *single uniform layer* of alluvium deposited by one river system.' }
          ],
            remediations: { 'the-northern-plains-are-a': { steps: ['Use a physical map of India to trace the courses of the Indus, Ganga, and Brahmaputra from their Himalayan sources to.', 'Mark the Bhabar (8-16 km wide), Terai (15-30 km), Bhangar, and Khaddar zones along a transect from Haridwar to Kolkata.', 'Compare sediment size and land use in each zone using soil maps.', 'Explain how each river system built its own megafan, and how they coalesced.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_004', difficulty: 'standard',
          question: 'The Northern Plains of India are divided into three major river basin systems:.',
          hint: 'If stuck, revisit the alluvial fan and floodplain formation processes in.',
          misconception: 'Students often treat the "Punjab Plain" as a separate major division of the Northern Plains, parallel to the Ganga and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Northern Plains of India are divided into three major river basin systems: the Indus',
                  options: ['The Northern Plains of India are divided into three major river basin systems: the Indus', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the "Punjab Plain" as a separate major division of the Northern Plains, parallel to the Ganga and Brahmaputra Plains.' }
          ],
            remediations: { 'students-often-treat-the-punjab': { steps: ['Draw a hierarchy chart: Northern Plains → (1) Indus Plain → [Punjab Plain, Haryana Plain, Sindh Plain]; (2) Ganga Plain.', 'On a physical map, shade the Indus Plain in one colour and label its sub-plains.', 'Compare the area: Indus Plain (~3.5 lakh km²) vs Ganga Plain (~3.7 lakh km²) vs Brahmaputra Plain (~0.6 lakh km²) to.', 'Practice writing the hierarchical classification in 30 words: "The Northern Plains comprise three divisions: Indus,.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_009', difficulty: 'standard',
          question: 'The drainage system of India comprises two distinct river regimes: Himalayan.',
          hint: 'Review Class 9 "Drainage Patterns" (c9_geo_ch1_8) and Class 11 "Himalayan Mountains".',
          misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The drainage system of India comprises two distinct river regimes: Himalayan rivers',
                  options: ['The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly classify them as.' }
          ],
            remediations: { 'the-narmada-and-tapi-are': { steps: ['On a tectonic map of India, locate the Narmada-Son lineament and the Satpura range.', 'Trace the Narmada from Amarkantak to the Gulf of Khambhat; note it flows through a graben (rift valley) bounded by.', 'Compare with the Indus which flows through a suture zone (Indus-Tsangpo suture) in the Himalayas.', 'List regime data: Narmada discharge drops to <10 m³/s in summer; Indus remains >500 m³/s.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_13_002', difficulty: 'standard',
          question: 'A drainage basin (or catchment) is the total land area drained by a river and.',
          hint: 'If unable to delineate a basin boundary, revisit topographic map interpretation (Class 11.',
          misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A drainage basin (or catchment) is the total land area drained by a river and its',
                  options: ['A drainage basin (or catchment) is the total land area drained by a river and its', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the *Ganga basin* is the largest in India by catchment area *within the country*, but the *Godavari basin* (≈3.12 lakh.' }
          ],
            remediations: { 'the-ganga-basin-is-the': { steps: ['On the political map of India, shade the *Indian portion* of each major basin using CWC data (Indus: 3.2L, Ganga: 2.5L,.', 'Calculate percentages of total Indian basin area for each.', 'Write a one-sentence rule: "For inter-state water disputes, only the Indian catchment area matters; for total.', 'Practise a past board question: "Compare the catchment areas of the Godavari and Ganga basins *within India* and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
