import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch09_p1: SimDef = {
    id: 'v3_c11_geo_ch09_p1',
    title: 'Physiography of India · Part 1/2',
    subtitle: 'Read India\'s six landform regions as six different geological histories.',
    classLevel: 11, subject: 'geography', topic: 'Physiography of India · Part 1/2',
    chapters: ['c11_geo_ch09'],
    nodeIds: ['c11_geo_cbse_09_001', 'c11_geo_cbse_09_002', 'c11_geo_cbse_09_003', 'c11_geo_cbse_09_004', 'c11_geo_cbse_09_005', 'c11_geo_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physiographer flying the country in terrain view', intro: 'Towering arc, flat plain, worn-down plateau — one country assembled from very different crust.', goal: 'Identify India\'s physiographic divisions and the structural logic behind them.' },
    discovery: {
        question: 'Sand dunes, scorching aridity — so the Thar surely earns its own physiographic division?',
        options: ['No — structurally it\'s the Peninsular Plateau\'s western margin; a climatic region painted on a physiographic unit', 'Yes — deserts are always separate divisions', 'Yes — its climate makes it geologically distinct', 'No — it actually belongs to the Northern Plains'],
        answer: 'No — structurally it\'s the Peninsular Plateau\'s western margin; a climatic region painted on a physiographic unit',
        hook: 'Physiography reads the bones, not the weather — the Thar sits on Precambrian craton like the rest of the peninsula.',
    },
    teaching: [
        { title: 'Physiographic Divisions of India: Overview and Classification', text: 'Physiographic divisions of India refer to the classification of the Indian landmass into six major physical units—The Himalayan Mountains, The Northern Plains, The Peninsular Plateau, The Indian.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Divide India into its six physiographic units by structure and history, then explain why the Himalayan width varies from 150 to 400 km along the arc.',
        labels: ['Physiographic Divisions of India', 'The Himalayan Mountains: Structure', 'The Northern Plains: Formation', 'The Northern Plains: Divisions', 'The Peninsular Plateau: Deccan', 'The Indian Desert: Characteristics'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_002', title: 'The Himalayan Mountains: Structure and Divisions (NW, Central, NE)',
          caseStudy: { intro: 'Begin with a real observation: Ask students to open Google Earth and fly from Leh (Ladakh) to Tawang (Arunachal Pradesh) along the Himalayan crest.',
            decisions: [{ prompt: 'Name the three longitudinal divisions of the Himalayas from north to south and state the typical altitude range (in meters) for each.', options: [
                { text: 'The three longitudinal divisions from north to south are: (1) Himadri (Greater Himalaya)', outcome: 'The three longitudinal divisions from north to south are: (1) Himadri (Greater Himalaya) — altitude.' },
                { text: 'Brahmaputra is antecedent', outcome: 'Not quite — Students believe the Himalayas are a single continuous range with uniform structure throughout.', reveals: 'the-himalayas-are-a-single' },
                { text: 'the Himalayas are a single continuous range with uniform structure throughout', outcome: 'Not quite — Students believe the Himalayas are a single continuous range with uniform structure throughout.', reveals: 'the-himalayas-are-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_004', title: 'The Northern Plains: Divisions (Indus, Ganga, Brahmaputra Plains)',
          caseStudy: { intro: 'Imagine flying from Amritsar to Guwahati: the vast, flat expanse below appears uniform, but the soil colour, river patterns, and agricultural landscapes change.',
            decisions: [{ prompt: 'Name the three major divisions of the Northern Plains and the primary river system associated with each division.', options: [
                { text: 'The three divisions are: (1) Indus Plain – Indus River system, (2) Ganga Plain – Ganga', outcome: 'The three divisions are: (1) Indus Plain – Indus River system, (2) Ganga Plain – Ganga River.' },
                { text: 'Punjab Plain', outcome: 'Not quite — Students often treat the "Punjab Plain" as a separate major division of the Northern Plains.', reveals: 'students-often-treat-the-punjab' },
                { text: 'Punjab Plain" as a separate division instead of a subdivision of the Indus Plain', outcome: 'Not quite — Students often treat the "Punjab Plain" as a separate major division of the Northern Plains.', reveals: 'students-often-treat-the-punjab' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_005', title: 'The Peninsular Plateau: Deccan and Central Highlands',
          caseStudy: { intro: 'Look at a physical map of India and trace your finger from the Aravalli Range near Delhi southwest to Kanyakumari — you are following the western edge of the.',
            decisions: [{ prompt: 'Name the two major subdivisions of the Peninsular Plateau separated by the Narmada-Son lineament, and state the general elevation trend.', options: [
                { text: 'The two subdivisions are the Central Highlands (north of Narmada-Son) and the Deccan', outcome: 'The two subdivisions are the Central Highlands (north of Narmada-Son) and the Deccan Plateau.' },
                { text: 'Vindhyas and Satpuras', outcome: 'Not quite — Students treat the Peninsular Plateau as a **single flat tableland** of uniform basalt, ignoring.', reveals: 'students-treat-the-peninsular-plateau' },
                { text: 'elevation increases southward', outcome: 'Not quite — Students treat the Peninsular Plateau as a **single flat tableland** of uniform basalt, ignoring.', reveals: 'students-treat-the-peninsular-plateau' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_006', title: 'The Indian Desert: Characteristics and Extent (Thar)',
          scaffold: { problem: 'A researcher measures annual rainfall at three stations in the Thar: Jaisalmer (160 mm), Bikaner (260 mm), Jodhpur (360 mm).',
            steps: [
            { text: 'Locate the three stations on a map of Rajasthan — Jaisalmer (west), Bikaner (north-central), Jodhpur (east, near.' },
            { text: 'Recall the rain-shadow principle: leeward aridity decreases with distance from the barrier as moisture-laden winds.' },
            { text: 'Note the Aravali Hills run NE-SW; the eastern stations (Jodhpur) are closer to the hills where occasional orographic.' },
            { text: 'Calculate the rainfall gradient: (360 - 160) mm / ~300 km ≈ 0.67 mm/km eastward increase.' },
            { text: 'Interpret: The gradient confirms the desert\'s aridity is primarily orographic (rain-shadow) not just continental; the.', faded: true, blankAnswer: 'Rainfall increases eastward from 160 mm (Jaisalmer) to 360.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a map exhibition you must label India\'s physiographic divisions. A teammate draws a separate \'Thar Desert division\' bounded by the 250 mm rainfall line, and shades the whole Himalayan arc as one uniform \'mountain division\'.',
            decisions: [{ prompt: 'What should the map actually show?', options: [
                { text: 'Redraw on structural grounds: the Thar is a climatic region superimposed on the Peninsular Plateau\'s western margin — its boundary is the geological contact with the Aravalli basement, not the 250 mm isohyet. And the Himalayas are three distinct longitudinal belts — Himadri, Himachal, Shiwaliks — with different geology and origins; the Shiwaliks are a foreland-basin unit, not mere \'foothills\'.', outcome: 'The map now reflects what the divisions are — surface expressions of distinct tectonic provinces — instead of climate zones and a single wall of mountain.' },
                { text: 'Keep the Thar division — a desert that looks that different deserves its own unit.', outcome: 'Physiographic divisions are geological, not climatic: the Thar sits on Precambrian peninsula basement under wind-blown deposits — aridity is a climate overlay.', reveals: 'thar-is-own-division' },
                { text: 'Keep the single Himalayan unit — it\'s one continuous chain, so subdividing is overkill.', outcome: 'The chain is neither uniform nor single: the belts differ in lithology, structure and origin — Pir Panjal, for instance, is Himachal, not Himadri.', reveals: 'himalayas-one-uniform-range' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'The Himalaya, the plains, the peninsula, the desert, the coasts, the islands — six units, six different geological biographies.',
            decisions: [{ prompt: 'What comes next? Physiography of India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Physiography of India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_001', difficulty: 'standard',
          question: 'Physiographic divisions of India refer to the classification of the Indian.',
          hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) specifically the sections on **Convergent.',
          misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and.',
          parts: [
                { id: 'a', prompt: 'Using the concept of **isostatic compensation**, explain why the Himalayan Mountains (mean elevation ~6,000 m) and the Peninsular Plateau (mean elevation ~600.', answer: '**Step 1:** Recall Airy\'s isostasy: mountains have deep roots',
                  options: ['**Step 1:** Recall Airy\'s isostasy: mountains have deep roots', 'Peninsula is denser'],
                  hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) specifically the sections on **Convergent Boundaries.',
                  misconception: 'Students often believe the **Thar Desert is a separate physiographic division solely because of its arid climate and sand dunes**.' }
          ],
            remediations: { 'the-thar-desert-is-a': { steps: ['** Overlay a **geological map of India** (showing basement age: Archean, Proterozoic, Phanerozoic) on a **relief map**.', '** Use a **cross-section drawing exercise** (paper or digital) along 24°N latitude: label crustal thickness from.', '** Ask: "Where does the *rock type* change abruptly?" That is the physiographic boundary.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_002', difficulty: 'standard',
          question: 'The Himalayan Mountains are a young fold mountain system formed by the.',
          hint: 'Revisit Class 9 Chapter 2 "Plate Tectonics" — specifically the section "Landforms Formed.',
          misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.',
          parts: [
                { id: 'a', prompt: 'A student measures the width of the Himalayan belt at three longitudes: 76°E (Kashmir), 88°E (Sikkim), and 95°E (Arunachal).', answer: 'Step 1: Identify the basement character at each longitude',
                  options: ['Step 1: Identify the basement character at each longitude', 'more rainfall in Sikkim causes more erosion', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Revisit Class 9 Chapter 2 "Plate Tectonics" — specifically the section "Landforms Formed by Plate.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' },
                { id: 'b', prompt: 'Compare the drainage characteristics of the Indus, Ganga, and Brahmaputra rivers where they exit the Himalayas.', answer: 'Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent',
                  options: ['Indus at 76°E (Nanga Parbat syntaxial bend): Antecedent', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Revisit Class 9 Chapter 2 "Plate Tectonics" — specifically the section "Landforms Formed by Plate.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' }
          ],
            remediations: { 'the-himalayas-are-a-single': { steps: ['Use a physical map of India (NCERT Atlas Plate 1) and trace the three longitudinal divisions with three coloured.', 'On the same map, draw the syntaxial bends — circle Nanga Parbat (76°E) and Namcha Barwa (95°E) — and draw arrows.', 'Overlay drainage — trace Indus, Sutlej, Ganga, Brahmaputra in blue; note which cut across ranges (antecedent) vs.', 'Re-read the NCERT text "The Himalayan Mountains" (Chapter 2, India Physical Environment) focusing on the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Karewa formations of the Kashmir Valley are lacustrine deposits that prove the Himalayas rose after the Pliocene." Is this fully.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'Brahmaputra is antecedent', 'the Himalayas are a single continuous range with uniform structure throughout'],
                  hint: 'Revisit Class 9 Chapter 2 "Plate Tectonics" — specifically the section "Landforms Formed by Plate.',
                  misconception: 'Students believe the Himalayas are a single continuous range with uniform structure throughout.' }
          ],
            remediations: { 'the-himalayas-are-a-single': { steps: ['Use a physical map of India (NCERT Atlas Plate 1) and trace the three longitudinal divisions with three coloured.', 'On the same map, draw the syntaxial bends — circle Nanga Parbat (76°E) and Namcha Barwa (95°E) — and draw arrows.', 'Overlay drainage — trace Indus, Sutlej, Ganga, Brahmaputra in blue; note which cut across ranges (antecedent) vs.', 'Re-read the NCERT text "The Himalayan Mountains" (Chapter 2, India Physical Environment) focusing on the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_003', difficulty: 'standard',
          question: 'The Northern Plains of India are a vast, flat alluvial tract formed by the.',
          hint: 'Review the fluvial landforms node (c9_geo_ch1_8) for erosion/deposition mechanics, and.',
          misconception: 'Students often believe the Northern Plains are a *single uniform layer* of alluvium deposited by one river system.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous',
                  options: ['The Northern Plains of India are a vast, flat alluvial tract formed by the continuous', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are divided into three major river basin systems: the Indus'],
                  hint: 'Review the fluvial landforms node (c9_geo_ch1_8) for erosion/deposition mechanics, and the.',
                  misconception: 'Students often believe the Northern Plains are a *single uniform layer* of alluvium deposited by one river system.' }
          ],
            remediations: { 'the-northern-plains-are-a': { steps: ['Use a physical map of India to trace the courses of the Indus, Ganga, and Brahmaputra from their Himalayan sources.', 'Mark the Bhabar (8-16 km wide), Terai (15-30 km), Bhangar, and Khaddar zones along a transect from Haridwar to Kolkata.', 'Compare sediment size and land use in each zone using soil maps.', 'Explain how each river system built its own megafan, and how they coalesced.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_004', difficulty: 'standard',
          question: 'The Northern Plains of India are divided into three major river basin systems.',
          hint: 'If stuck, revisit the alluvial fan and floodplain formation processes.',
          misconception: 'Students often treat the "Punjab Plain" as a separate major division of the Northern Plains, parallel to the Ganga and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Northern Plains of India are divided into three major river basin systems: the Indus',
                  options: ['The Northern Plains of India are divided into three major river basin systems: the Indus', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'If stuck, revisit the alluvial fan and floodplain formation processes in c11_geo_cbse_09_003 and.',
                  misconception: 'Students often treat the "Punjab Plain" as a separate major division of the Northern Plains, parallel to the Ganga and Brahmaputra Plains.' }
          ],
            remediations: { 'students-often-treat-the-punjab': { steps: ['Draw a hierarchy chart: Northern Plains → (1) Indus Plain → [Punjab Plain, Haryana Plain, Sindh Plain]; (2) Ganga Plain.', 'On a physical map, shade the Indus Plain in one colour and label its sub-plains.', 'Compare the area: Indus Plain (~3.5 lakh km²) vs Ganga Plain (~3.7 lakh km²) vs Brahmaputra Plain (~0.6 lakh km²).', 'Practice writing the hierarchical classification in 30 words: "The Northern Plains comprise three divisions: Indus.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_005', difficulty: 'standard',
          question: 'The Peninsular Plateau is India\'s oldest and most stable landmass, composed.',
          hint: 'If stuck, revisit **c9_geo_ch1_2 (Plate Tectonics)** for rift valley mechanism and.',
          misconception: 'Students treat the Peninsular Plateau as a **single flat tableland** of uniform basalt, ignoring that: (1) Only the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Peninsular Plateau is India\'s oldest and most stable landmass, composed of',
                  options: ['The Peninsular Plateau is India\'s oldest and most stable landmass, composed of', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'If stuck, revisit **c9_geo_ch1_2 (Plate Tectonics)** for rift valley mechanism and.',
                  misconception: 'Students treat the Peninsular Plateau as a **single flat tableland** of uniform basalt, ignoring that: (1) Only the **western Deccan.' }
          ],
            remediations: { 'students-treat-the-peninsular-plateau': { steps: ['** Take a geological map of India (GSI 1:2M) and colour-code: Archaean cratons (pink), Proterozoic mobile belts.', '** Overlay major mineral deposits (Fe, Mn, Cu, Pb-Zn, Au, coal, bauxite) — observe clustering on mobile belt/craton.', '** Trace the Narmada-Son line — note it cuts across structural trends, offsetting the Vindhyan basin and separating the.', '** Re-draw the plateau subdivisions as **tectono-stratigraphic provinces**, not physiographic units.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_006', difficulty: 'standard',
          question: 'The Indian Desert (Thar Desert) is an arid physiographic region in northwestern.',
          hint: 'Review Class 9 "Erosion and Deposition by Wind" (c9_geo_ch1_9) for dune formation.',
          misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).',
          parts: [
                { id: 'a', prompt: 'State the approximate longitudinal extent of the Indian Desert and name the hill range that forms its eastern boundary.', answer: 'The Indian Desert extends approximately from 70°E to 75°E longitude',
                  options: ['The Indian Desert extends approximately from 70°E to 75°E longitude', 'desert', 'Sahara-style sand sea', 'the Vindhyas or Satpuras'],
                  hint: 'Review Class 9 "Erosion and Deposition by Wind" (c9_geo_ch1_9) for dune formation mechanics and.',
                  misconception: 'Students believe the Thar Desert is entirely covered by shifting sand dunes (erg).' }
          ],
            remediations: { 'the-thar-desert-is-entirely': { steps: ['Show a Landsat false-colour composite of the Thar — identify dark rocky outcrops (hamada), bright salt pans (playas).', 'Overlay the Luni River\'s course — trace its inland drainage to the Rann, noting it never reaches the sea.', 'Compare with a climate graph for Jaisalmer (rainfall <150 mm, high variability) to explain why perennial flow.', 'Have the student sketch a cross-section from Aravali foothills to Pakistan border showing the transition: pediment →.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
