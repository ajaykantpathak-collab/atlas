import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch14_p1: SimDef = {
    id: 'v3_c11_geo_ch14_p1',
    title: 'Natural Vegetation · Part 1/2',
    subtitle: 'Read India\'s forests as a rainfall-and-temperature map come alive.',
    classLevel: 11, subject: 'geography', topic: 'Natural Vegetation · Part 1/2',
    chapters: ['c11_geo_ch14'],
    nodeIds: ['c11_geo_cbse_14_001', 'c11_geo_cbse_14_002', 'c11_geo_cbse_14_003', 'c11_geo_cbse_14_004', 'c11_geo_cbse_14_005', 'c11_geo_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a botanist keying out forests from climate data', intro: 'The Western Ghats drip in dimness while Pune bakes a hundred kilometres east — the mountains decide who gets the monsoon.', goal: 'Classify India\'s natural vegetation types by climatic thresholds and explain the rain-shadow effect.' },
    discovery: {
        question: 'Mahabaleshwar and Pune sit 100 km apart at the same latitude — one wrapped in evergreen forest, the other in thorn scrub. What separates them?',
        options: ['The Western Ghats\' rain shadow — the windward crest takes over 200 cm while leeward Pune gets about 70', 'Latitude — Pune is marginally farther north', 'Soil — Pune\'s ground can\'t hold roots', 'History — Pune\'s forests were all cleared'],
        answer: 'The Western Ghats\' rain shadow — the windward crest takes over 200 cm while leeward Pune gets about 70',
        hook: 'Evergreen needs >200 cm with no dry month — same latitude means nothing when a mountain range stands between you and the monsoon.',
    },
    teaching: [
        { title: 'Natural Vegetation: Definition and Types in India', text: 'Natural vegetation refers to plant communities that have grown naturally without human intervention and have been left undisturbed by humans for a long time, adapting fully to the local climate.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify three stations by rainfall total and driest-month values, then defend semi-evergreen forest as a climax community, not a degraded one.',
        labels: ['Natural Vegetation: Definition', 'Tropical Evergreen and Semi-Evergreen', 'Tropical Deciduous Forests: Moist', 'Tropical Thorn Forests', 'Montane Forests: Altitudinal Variation', 'Mangrove Forests (Tidal Forests)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_001', title: 'Natural Vegetation: Definition and Types in India',
          caseStudy: { intro: 'Begin by observing the view from your classroom window or a nearby park: notice how the trees change from the roadside banyan to the scrubby bushes on the.',
            decisions: [{ prompt: 'Define natural vegetation and state the three primary environmental controls that determine its type in India.', options: [
                { text: 'Natural vegetation is plant cover that grows without human aid and remains undisturbed', outcome: 'Natural vegetation is plant cover that grows without human aid and remains undisturbed long enough.' },
                { text: 'undisturbed by humans', outcome: 'Not quite — Students often believe that "natural vegetation" includes any green cover they see, such.', reveals: 'natural-vegetation-includes-any-green' },
                { text: 'natural vegetation', outcome: 'Not quite — Students often believe that "natural vegetation" includes any green cover they see, such.', reveals: 'natural-vegetation-includes-any-green' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_002', title: 'Tropical Evergreen and Semi-Evergreen Forests: Characteristics and Distribution',
          caseStudy: { intro: 'Imagine standing in the Western Ghats during monsoon — the air is thick with moisture, water drips from leaves even without rain, and the forest floor is dim.',
            decisions: [{ prompt: 'State the minimum annual rainfall (in cm) and the maximum dry season duration (in months) required for Tropical Evergreen Forests.', options: [
                { text: 'Correct answer: Minimum 200 cm annual rainfall', outcome: 'Correct answer: Minimum 200 cm annual rainfall; maximum 0-1 dry months (no month with <6.' },
                { text: '150 cm', outcome: 'Not quite — Students believe Tropical Evergreen Forests exist all along the Western Ghats from Gujarat.', reveals: 'tropical-evergreen-forests-exist-all' },
                { text: 'indicates confusion with deciduous forests', outcome: 'Not quite — Students believe Tropical Evergreen Forests exist all along the Western Ghats from Gujarat.', reveals: 'tropical-evergreen-forests-exist-all' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_003', title: 'Tropical Deciduous Forests: Moist and Dry Types',
          caseStudy: { intro: 'Observe the teak furniture in your home or the sal trees lining a highway in Jharkhand — both come from forests that stand leafless in April, yet one grows.',
            decisions: [{ prompt: 'State the exact annual rainfall range (in cm) that separates Tropical Moist Deciduous Forests from Tropical Dry Deciduous Forests in India.', options: [
                { text: 'Correct answer: The boundary is 100 cm annual rainfall', outcome: 'Correct answer: The boundary is 100 cm annual rainfall. Moist Deciduous: 100–200 cm, dominant.' },
                { text: 'all deciduous forests shed leaves in winter', outcome: 'Not quite — Students believe **"all deciduous forests shed leaves in winter"** because they transfer the.', reveals: 'all-deciduous-forests-shed-leaves' },
                { text: 'trees shed leaves in autumn', outcome: 'Not quite — Students believe **"all deciduous forests shed leaves in winter"** because they transfer the.', reveals: 'all-deciduous-forests-shed-leaves' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_004', title: 'Tropical Thorn Forests and Scrubs: Characteristics',
          caseStudy: { intro: 'Imagine driving from Jaipur to Jaisalmer in May: the lush *teak* and *sal* of the Aravalli foothills vanish, replaced by scattered *babul* trees with umbrella.',
            decisions: [{ prompt: 'State the exact annual rainfall range (in cm) and mean annual temperature condition (in °C) that define the Tropical Thorn Forest and Scrub.', options: [
                { text: '**Correct Answer:** Annual rainfall **< 70 cm** and mean annual temperature **> 25°C**', outcome: '**Correct Answer:** Annual rainfall **< 70 cm** and mean annual temperature **> 25°C**.' },
                { text: '50-100 cm', outcome: 'Not quite — **"Tropical Thorn Forests are just \'degraded Dry Deciduous Forests\' caused by excessive grazing and.', reveals: 'tropical-thorn-forests-are-just' },
                { text: '25-30°C', outcome: 'Not quite — **"Tropical Thorn Forests are just \'degraded Dry Deciduous Forests\' caused by excessive grazing and.', reveals: 'tropical-thorn-forests-are-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_14_005', title: 'Montane Forests: Altitudinal Variation (Wet Temperate to Alpine)',
          scaffold: { problem: 'The mean July temperature at Dehradun (640 m, 30.3°N) is 29.5°C.',
            steps: [
            { text: 'Identify known values – T₁ = 29.5°C at h₁ = 640 m; target h₂ = 2005 m.' },
            { text: 'Compute altitude difference – Δh = 2005 – 640 = 1365 m.' },
            { text: 'Apply lapse rate formula – ΔT = 6.5 × (1365 / 1000) = 6.5 × 1.365 = 8.87°C.' },
            { text: 'Calculate T₂ – T₂ = 29.5 – 8.87 = 20.63°C ≈ 20.6°C.' },
            { text: 'Match to CBSE forest belt – 20–25°C at 1500–2500 m in western Himalaya = Wet Temperate Forest (broadleaf: Quercus.' },
            { text: 'Verify – Actual Mussoorie vegetation: Banj oak (Q. leucotrichophora) dominant with rhododendron understorey; matches.', faded: true, blankAnswer: 'Estimated July temperature at Mussoorie = 20.6°C; Dominant.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_006', title: 'Mangrove Forests (Tidal Forests): Sundarbans and Adaptation',
          caseStudy: { intro: 'Begin with a satellite image of the Sundarbans delta — ask students what they notice about the land-water interface (maze of creeks, dense green canopy, sharp.',
            decisions: [{ prompt: 'Name the four major mangrove species found in the Indian Sundarbans and state the local name for *Heritiera fomes*.', options: [
                { text: 'Correct answer: *Heritiera fomes* (Sundari), *Excoecaria agallocha* (Gewa), *Ceriops', outcome: 'Correct answer: *Heritiera fomes* (Sundari), *Excoecaria agallocha* (Gewa), *Ceriops decandra*.' },
                { text: 'mangrove apple', outcome: 'Not quite — Students believe mangroves are "sea forests" growing in seawater, and that the Sundarbans is.', reveals: 'mangroves-are-sea-forests-growing' },
                { text: 'red mangrove', outcome: 'Not quite — Students believe mangroves are "sea forests" growing in seawater, and that the Sundarbans is.', reveals: 'mangroves-are-sea-forests-growing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a \'Western Ghats transect\' poster, a student draws tropical evergreen forest across the entire range from Gujarat to Kerala, reasoning: \'The Ghats get heavy rain, and rain decides the forest type.\'',
            decisions: [{ prompt: 'What\'s missing from that vegetation logic?', options: [
                { text: 'Add the other controls: vegetation responds to moisture, temperature AND relief together. Rain shadow splits the Ghats — windward Mahabaleshwar gets 600+ cm and evergreen forest while leeward Pune, 100 km away at the same latitude, gets ~70 cm and thorn scrub. And temperature matters too: Himalayan foothills with high rainfall carry subtropical moist deciduous sal, not evergreen, because winters drop to 5–10°C.', outcome: 'The poster gets redrawn as a mosaic: forests sit in climatic envelopes defined by rainfall, temperature and substrate — not on a rainfall axis alone.' },
                { text: 'Keep the evergreen band — >200 cm rainfall means evergreen, and the Ghats qualify.', outcome: 'Only the windward side qualifies: the leeward rain shadow drops below 100 cm, and drought-deciduousness appears wherever a moisture deficit exists.', reveals: 'rainfall-alone-decides-forest' },
                { text: 'Widen the rule instead — any lush green cover, including city parks and orchards, counts as natural vegetation.', outcome: 'Natural vegetation means self-grown, long-undisturbed communities adapted to the site; planted parks and orchards are neither natural nor climax vegetation.', reveals: 'green-cover-is-natural-vegetation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Vegetation is climate made visible — give a place 200 rain-free centimetres and it will tell you which biome it is.',
            decisions: [{ prompt: 'What comes next? Natural Vegetation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Natural Vegetation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_001', difficulty: 'standard',
          question: 'Natural vegetation refers to plant communities that have grown naturally.',
          hint: 'If stuck, review the monsoon onset/withdrawal dates (c9_geo_ch2_7) and the normal lapse.',
          misconception: 'Students often believe that "natural vegetation" includes any green cover they see, such as roadside plantations.',
          parts: [
                { id: 'a', prompt: 'Given a station at 12°N latitude, 800 m altitude, with annual rainfall 150 cm and a dry season of 4 months, identify the natural vegetation type and justify.', answer: 'Step 1: Note rainfall 150 cm → falls in 100-200 cm range (deciduous zone)',
                  options: ['Step 1: Note rainfall 150 cm → falls in 100-200 cm range (deciduous zone)', 'Evergreen', 'misreads the rainfall threshold'],
                  hint: 'If stuck, review the monsoon onset/withdrawal dates (c9_geo_ch2_7) and the normal lapse rate.',
                  misconception: 'Students often believe that "natural vegetation" includes any green cover they see, such as roadside plantations, orchards, or city parks.' },
                { id: 'b', prompt: 'Compare the climatic envelopes of Tropical Dry Deciduous and Tropical Thorn forests.', answer: 'Tropical Dry Deciduous: 75-100 cm rainfall, dry season 5-6 months',
                  options: ['Tropical Dry Deciduous: 75-100 cm rainfall, dry season 5-6 months', 'natural vegetation'],
                  hint: 'If stuck, review the monsoon onset/withdrawal dates (c9_geo_ch2_7) and the normal lapse rate.',
                  misconception: 'Students often believe that "natural vegetation" includes any green cover they see, such as roadside plantations, orchards, or city parks.' }
          ],
            remediations: { 'natural-vegetation-includes-any-green': { steps: ['Revisit Class 9 climate nodes (c9_geo_ch2_7, c9_geo_ch2_6) to reconstruct the monsoon rainfall gradient and.', 'Draw a simple scatter plot: x-axis = annual rainfall, y-axis = mean annual temperature; plot the five forest types.', 'Use the lapse rate (6.5°C/1000m) to calculate temperature at different altitudes for a given latitude, then match.', 'Practice with three map-based exercises: identify forest type from climate data table, from latitude/altitude/rainfall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "natural vegetation" includes any green cover they see, such as roadside plantations.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Montane forests in the Himalayas are simply cooler versions of tropical forests found at lower altitudes." Provide two specific.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'natural vegetation'],
                  hint: 'If stuck, review the monsoon onset/withdrawal dates (c9_geo_ch2_7) and the normal lapse rate.',
                  misconception: 'Students often believe that "natural vegetation" includes any green cover they see, such as roadside plantations, orchards, or city parks.' }
          ],
            remediations: { 'natural-vegetation-includes-any-green': { steps: ['Revisit Class 9 climate nodes (c9_geo_ch2_7, c9_geo_ch2_6) to reconstruct the monsoon rainfall gradient and.', 'Draw a simple scatter plot: x-axis = annual rainfall, y-axis = mean annual temperature; plot the five forest types.', 'Use the lapse rate (6.5°C/1000m) to calculate temperature at different altitudes for a given latitude, then match.', 'Practice with three map-based exercises: identify forest type from climate data table, from latitude/altitude/rainfall.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_002', difficulty: 'standard',
          question: 'Tropical Evergreen Forests are dense, multi-layered forests occurring.',
          hint: 'Revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) — focus.',
          misconception: 'Students believe Tropical Evergreen Forests exist all along the Western Ghats from Gujarat to Kerala.',
          parts: [
                { id: 'a', prompt: 'State the minimum annual rainfall (in cm) and the maximum dry season duration (in months) required for Tropical Evergreen Forests to develop, and name one tree.', answer: 'Correct answer: Minimum 200 cm annual rainfall',
                  options: ['Correct answer: Minimum 200 cm annual rainfall', '150 cm', 'indicates confusion with deciduous forests'],
                  hint: 'Revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) — focus on the.',
                  misconception: 'Students believe Tropical Evergreen Forests exist all along the Western Ghats from Gujarat to Kerala.' }
          ],
            remediations: { 'tropical-evergreen-forests-exist-all': { steps: ['Plot the 200 cm isohyet on a Western Ghats cross-section map (use IMD rainfall atlas).', 'Mark windward/leeward sides relative to SW monsoon direction (June-Sept).', 'Overlay forest type map from FSI (Forest Survey of India) — observe exact alignment of evergreen boundary with 200.', 'Compare Mahabaleshwar vs Pune climate data tables — calculate dry months for each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_003', difficulty: 'standard',
          question: 'Tropical Deciduous Forests are the most widespread forest type in India.',
          hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism".',
          misconception: 'Students believe **"all deciduous forests shed leaves in winter"** because they transfer the temperate pattern (Class.',
          parts: [
                { id: 'a', prompt: 'State the exact annual rainfall range (in cm) that separates Tropical Moist Deciduous Forests from Tropical Dry Deciduous Forests in India, and name one.', answer: 'Correct answer: The boundary is 100 cm annual rainfall',
                  options: ['Correct answer: The boundary is 100 cm annual rainfall', 'all deciduous forests shed leaves in winter', 'trees shed leaves in autumn'],
                  hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) and draw.',
                  misconception: 'Students believe **"all deciduous forests shed leaves in winter"** because they transfer the temperate pattern (Class 9: "trees shed leaves.' },
                { id: 'b', prompt: 'On an outline map of India, the 100 cm isohyet runs roughly from Gujarat–Maharashtra border eastward through the Chotanagpur plateau to Odisha.', answer: 'Step 1: Identify coordinates',
                  options: ['Step 1: Identify coordinates', 'all deciduous forests shed leaves in winter', 'trees shed leaves in autumn'],
                  hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) and draw.',
                  misconception: 'Students believe **"all deciduous forests shed leaves in winter"** because they transfer the temperate pattern (Class 9: "trees shed leaves.' },
                { id: 'c', prompt: 'Compare the species composition of Moist Deciduous forests in the Chotanagpur plateau (Jharkhand) with Dry Deciduous forests in the central Deccan plateau.', answer: 'Common (wide ecological amplitude): **Teak (Tectona grandis)**',
                  options: ['Common (wide ecological amplitude): **Teak (Tectona grandis)**', 'all deciduous forests shed leaves in winter', 'trees shed leaves in autumn'],
                  hint: 'If stuck, revisit Class 9 "Indian Monsoon: Onset, Withdrawal and Mechanism" (c9_geo_ch2_7) and draw.',
                  misconception: 'Students believe **"all deciduous forests shed leaves in winter"** because they transfer the temperate pattern (Class 9: "trees shed leaves.' }
          ],
            remediations: { 'all-deciduous-forests-shed-leaves': { steps: ['**Plot a phenology calendar**: On graph paper, mark months Oct–May on X-axis; draw two bars — soil moisture (high.', '**Contrast with temperate**: Overlay a Shimla oak bar (leaf-fall Nov–Mar) to visualise opposite drivers.', '**Field/Video evidence**: Watch a 2-min time-lapse of Kanha (Moist Deciduous) and Bandhavgarh (Dry Deciduous) in April.', '**Reinforce**: "Leaf-shedding follows the **dry season**, not the cold season.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_004', difficulty: 'standard',
          question: 'Tropical Thorn Forests and Scrubs are a vegetation type characterized by open.',
          hint: 'If stuck, revisit **c9_geo_ch2_7 (Indian Monsoon Mechanism)** to understand the.',
          misconception: '**"Tropical Thorn Forests are just \'degraded Dry Deciduous Forests\' caused by excessive grazing and cutting."** This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tropical Thorn Forests and Scrubs are a vegetation type characterized by open,',
                  options: ['Tropical Thorn Forests and Scrubs are a vegetation type characterized by open,', 'Natural vegetation refers to plant communities that have grown naturally without human', 'Tropical Evergreen Forests are dense, multi-layered forests occurring in regions', 'Tropical Deciduous Forests are the most widespread forest type in India, occurring in'],
                  hint: 'If stuck, revisit **c9_geo_ch2_7 (Indian Monsoon Mechanism)** to understand the rain-shadow effect.',
                  misconception: '**"Tropical Thorn Forests are just \'degraded Dry Deciduous Forests\' caused by excessive grazing and cutting."** This is the most pervasive.' }
          ],
            remediations: { 'tropical-thorn-forests-are-just': { steps: ['**Step-by-Step Remediation:** 1.', '**Map Exercise:** Give the student a blank outline map of India.', 'Ask them to draw the **70 cm isohyet** (using IMD data: it runs roughly Porbandar → Udaipur → Delhi → Hissar).', 'Shade the area **west** of it in the plains — this is the Thorn Forest zone *by climate alone*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_005', difficulty: 'standard',
          question: 'Montane forests are vertically stratified forest ecosystems in mountainous.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Atmosphere" – specifically the "Factors.',
          misconception: 'Students believe "montane forest zones are fixed altitude belts (e.g., deodar always at 1500–2500 m)" and apply these.',
          parts: [
                { id: 'a', prompt: 'Using the normal lapse rate of 6.5°C per 1000 m, calculate the expected temperature at 2500 m if the temperature at 500 m (foothill station) is 30°C.', answer: 'Step 1: Altitude difference = 2500 – 500 = 2000 m',
                  options: ['Step 1: Altitude difference = 2500 – 500 = 2000 m', 'and apply these numbers rigidly across the entire Himalaya', '"montane forest zones are fixed altitude belts (e'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Atmosphere" – specifically the "Factors Controlling.',
                  misconception: 'Students believe "montane forest zones are fixed altitude belts (e.g., deodar always at 1500–2500 m)" and apply these numbers rigidly.' },
                { id: 'b', prompt: 'A cross-section from Pathankot (330 m) to Leh (3500 m) shows: Pathankot – Shorea robusta (sal); 1200 m – Quercus leucotrichophora (banj oak); 2200 m – Cedrus.', answer: 'Missing zone: Temperate coniferous forest (Pinus roxburghii – chir pine) between',
                  options: ['Missing zone: Temperate coniferous forest (Pinus roxburghii – chir pine) between', 'and apply these numbers rigidly across the entire Himalaya', '"montane forest zones are fixed altitude belts (e'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Atmosphere" – specifically the "Factors Controlling.',
                  misconception: 'Students believe "montane forest zones are fixed altitude belts (e.g., deodar always at 1500–2500 m)" and apply these numbers rigidly.' }
          ],
            remediations: { 'montane-forest-zones-are-fixed': { steps: ['Draw a 2×2 table: rows = Western vs Eastern Himalaya, columns = South-facing vs North-facing slope.', 'For each cell, write the altitude range for deodar using: base altitude ± aspect correction (south +300 m, north –300.', 'Visit IMD climate data for Srinagar (34°N, 75°E, 1600 m) and Darjeeling (27°N, 88°E, 2100 m); compare January mean.', 'Re-read NCERT Class 11 India: Physical Environment p. 48–49 "Montane Forests" noting the explicit "varies with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_14_006', difficulty: 'standard',
          question: 'Mangrove forests are salt-tolerant, halophytic plant communities occupying the.',
          hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) for delta formation and.',
          misconception: 'Students believe mangroves are "sea forests" growing in seawater, and that the Sundarbans is a single uniform forest.',
          parts: [
                { id: 'a', prompt: 'A mangrove sapling of *Avicennia marina* is planted at mean sea level (MSL) in the Sundarbans.', answer: '(1) Tidal period =',
                  options: ['(1) Tidal period =', 'sea forests'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) for delta formation and c10_geo_cbse_07_005.',
                  misconception: 'Students believe mangroves are "sea forests" growing in seawater, and that the Sundarbans is a single uniform forest of Sundari trees.' },
                { id: 'b', prompt: 'Compare the drivers of mangrove degradation in the Sundarbans versus the Gulf of Kutch.', answer: 'Correct answer: Sundarbans',
                  options: ['Correct answer: Sundarbans', 'human activities', 'analyze', 'sea forests'],
                  hint: 'Revisit c9_geo_ch1_8 (Erosion and Deposition by Rivers) for delta formation and c10_geo_cbse_07_005.',
                  misconception: 'Students believe mangroves are "sea forests" growing in seawater, and that the Sundarbans is a single uniform forest of Sundari trees.' }
          ],
            remediations: { 'mangroves-are-sea-forests-growing': { steps: ['Remediation steps: (1) Open ISRO Bhuvan portal → "Mangrove Mapping" layer → toggle salinity gradient (Chlorophyll-a.', '(2) Use Google Earth: trace a transect from Raimangal River (freshwater) to Bay of Bengal (sea); note canopy.', '(3) Complete a table: Zone | Salinity (ppt) | Dominant Species | Key Adaptation | Freshwater Dependence.', '(4) Solve a board-style question: "Explain why Farakka Barrage operation threatens *Heritiera fomes* more than.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
