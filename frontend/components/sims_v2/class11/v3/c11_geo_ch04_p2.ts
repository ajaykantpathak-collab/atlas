import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch04_p2: SimDef = {
    id: 'v3_c11_geo_ch04_p2',
    title: 'Distribution of Oceans and Continents · Part 2/2',
    subtitle: 'See why continents drift as passengers on plates, not rafts ploughing through ocean floor.',
    classLevel: 11, subject: 'geography', topic: 'Distribution of Oceans and Continents · Part 2/2',
    chapters: ['c11_geo_ch04'],
    nodeIds: ['c11_geo_cbse_04_007', 'c11_geo_cbse_04_008', 'c11_geo_cbse_04_009', 'c11_geo_cbse_04_010', 'c11_geo_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a palaeogeographer reassembling Pangaea', intro: 'South America\'s coast slots into Africa\'s — coincidence, or the scar of a supercontinent torn apart?', goal: 'Evaluate drift theory\'s evidence versus its missing mechanism and reconstruct Pangaea and Panthalassa.' },
    discovery: {
        question: 'Wegener\'s continental drift was laughed out of the 1920s — a case of weak evidence?',
        options: ['No — the evidence was strong (coastline fit, matching fossils, glacial deposits); it was rejected for lacking a mechanism', 'Yes — his fossil data was fabricated', 'Yes — the continents don\'t actually fit together', 'No — it was rejected purely out of jealousy'],
        answer: 'No — the evidence was strong (coastline fit, matching fossils, glacial deposits); it was rejected for lacking a mechanism',
        hook: 'Mesosaurus fossils on both sides of the Atlantic made the case — but \'polflucht\' was ten-thousand times too weak to push a continent, and that gap sank the theory for forty years.',
    },
    teaching: [
        { title: 'Sea Floor Spreading: Evidence from Magnetic Stripes', text: 'Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean ridges through volcanic activity and gradually moves outward symmetrically on both sides; magnetic stripes are.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plot fossil and tillite evidence on a Pangaea reconstruction, then trace the Tethys Sea to the mountain belts its closure raised.',
        labels: ['Sea Floor Spreading: Evidence', 'Plate Tectonics: Lithospheric Plates', 'Types of Plate Boundaries', 'Plate Tectonics: Distribution', 'Wilson Cycle and Continental'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_007', title: 'Sea Floor Spreading: Evidence from Magnetic Stripes',
          scaffold: { problem: 'A research vessel crosses the Juan de Fuca Ridge (northeast Pacific) and records a magnetic anomaly profile.',
            steps: [
            { text: 'Identify the known quantities — the Brunhes chron duration is 0.78 Ma (780,000 years) from the GPTS; the stripe width.' },
            { text: 'Convert the stripe width to centimetres: 6.2 km × 100,000 cm/km = 620,000 cm.' },
            { text: 'Convert the chron duration to years: 0.78 Ma × 1,000,000 yr/Ma = 780,000 yr.' },
            { text: 'Apply the half-spreading rate formula: v = w / t = 620,000 cm / 780,000 yr = 0.795 cm/yr ≈ 0.8 cm/yr.' },
            { text: 'Classify the spreading rate: half-rate < 2.5 cm/yr is slow spreading (full rate < 5 cm/yr).', faded: true, blankAnswer: 'Half-spreading rate = 0.8 cm/yr; classified as.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_008', title: 'Plate Tectonics: Lithospheric Plates and Their Movement',
          scaffold: { problem: 'Using the magnetic anomaly pattern on the Pacific Plate, anomaly 3A (6 Ma) is 180 km from the ridge axis on the Pacific side.',
            steps: [
            { text: 'Identify the given data: distance from ridge to anomaly 3A = 180 km; age of anomaly 3A = 6 million years (Ma).' },
            { text: 'Recall that the distance from ridge to anomaly represents half the total crust created in that time (one plate\'s.' },
            { text: 'Calculate half-spreading rate = distance / age = 180 km / 6 Myr = 30 km/Myr.' },
            { text: 'Convert to standard units: 30 km/Myr = 3 cm/yr (since 1 km/Myr = 0.1 cm/yr).' },
            { text: 'Full spreading rate = 2 × half-spreading rate = 6 cm/yr.', faded: true, blankAnswer: 'Half-spreading rate = 3 cm/yr; full spreading rate = 6.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_009', title: 'Types of Plate Boundaries: Divergent, Convergent, Transform',
          caseStudy: { intro: 'Observe a world map showing earthquake epicenters and volcanoes — they cluster in distinct belts rather than scattering randomly.',
            decisions: [{ prompt: 'Name the three types of plate boundaries and state the crustal process (creation, destruction, or conservation) associated with each.', options: [
                { text: 'Divergent boundaries involve crustal creation (new lithosphere forms from upwelling magma)', outcome: 'Divergent boundaries involve crustal creation (new lithosphere forms from upwelling magma).' },
                { text: 'convergent boundary = subduction zone', outcome: 'Not quite — Students often think "convergent boundary = subduction zone" and assume all convergent boundaries.', reveals: 'convergent-boundary-subduction-zone-and' },
                { text: 'convergent boundaries create crust', outcome: 'Not quite — Students often think "convergent boundary = subduction zone" and assume all convergent boundaries.', reveals: 'convergent-boundary-subduction-zone-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_010', title: 'Plate Tectonics: Distribution of Earthquakes and Volcanoes',
          caseStudy: { intro: 'Open any recent newspaper and you will find reports of an earthquake in Turkey, a volcanic eruption in Iceland, or tremors in the Himalayan foothills — these.',
            decisions: [{ prompt: 'Name the three major global seismic-volcanic belts and state the dominant plate boundary type associated with each belt.', options: [
                { text: 'Correct answer: (1) Circum-Pacific Belt (Ring of Fire)', outcome: 'Correct answer: (1) Circum-Pacific Belt (Ring of Fire) — predominantly convergent boundaries.' },
                { text: 'Pacific Ring of Fire, Mediterranean Belt, and Mid-Atlantic Ridge', outcome: 'Not quite — Students believe the "Ring of Fire" is a single continuous plate boundary — they fail to recognize.', reveals: 'the-ring-of-fire-is' },
                { text: 'Ring of Fire', outcome: 'Not quite — Students believe the "Ring of Fire" is a single continuous plate boundary — they fail to recognize.', reveals: 'the-ring-of-fire-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_011', title: 'Wilson Cycle and Continental Movement',
          scaffold: { problem: 'Calculate the approximate Wilson Cycle duration for the Atlantic Ocean given: current Atlantic width at equator = 4,800 km; full spreading.',
            steps: [
            { text: 'Identify current stage — Atlantic is in mature stage (wide ocean, passive margins, active spreading ridge).' },
            { text: 'Convert spreading rate to km/Myr: 2.5 cm/yr = 2.5 × 10⁻⁵ km/yr = 25 km/Myr (since 1 Myr = 10⁶ yr, 2.5 cm/yr × 10⁶ = 25.' },
            { text: 'Calculate time to reach current width: T_open = L_ocean / v_spread = 4,800 km / 25 km/Myr = 192 Myr.' },
            { text: 'Estimate future closure time — requires subduction initiation.' },
            { text: 'T_close = L_ocean / v_subduct = 4,800 km / 75 km/Myr (avg) = 64 Myr.' },
            { text: 'Total T_cycle ≈ T_open + T_mature + T_close. Mature stage duration uncertain; Atlantic has been mature for ~100 Myr.', faded: true, blankAnswer: 'Atlantic Wilson Cycle duration ≈ 350-400 Myr total (192 Myr.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a quiz bowl, the question flashes: \'Name the ocean that surrounded Pangaea.\' Your teammate buzzes \'Pacific!\' Later, reviewing continental drift, she says: \'Anyway, Wegener proved continents plough through the ocean floor like ships.\'',
            decisions: [{ prompt: 'What corrections are needed on both counts?', options: [
                { text: 'The ocean was Panthalassa — a distinct superocean whose floor was almost entirely subducted; the modern Pacific formed after Pangaea broke up. And the mechanism is wrong: modern plate tectonics has continents as passengers on lithospheric plates (continental + oceanic crust together) driven by mantle convection — India moves with the Indian Ocean floor as one plate, not through it.', outcome: 'Two fixes in one: Panthalassa ≠ Pacific, and drifting continents aren\'t ships ploughing through crust — they ride on the plate.' },
                { text: 'Pacific is fine — it\'s the oldest ocean, so it must be the one that surrounded Pangaea.', outcome: 'Panthalassa\'s floor was subducted away; the Pacific basin postdates Pangaea\'s breakup — confusing them swaps a destroyed paleo-ocean for a modern one.', reveals: 'panthalassa-is-pacific' },
                { text: 'Defend Wegener\'s mechanism — continents do move through oceanic crust, that\'s what \'drift\' means.', outcome: 'Wegener proposed ploughing through sima and it was his theory\'s weakness; the accepted picture is continents carried as part of whole plates.', reveals: 'continents-plough-through-crust' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'The jigsaw fit was real; Wegener just couldn\'t say what pushed the pieces — plate tectonics supplied the engine he lacked.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_007', difficulty: 'standard',
          question: 'Sea floor spreading is the geological process where new oceanic crust forms.',
          hint: 'Revisit the concept of thermoremanent magnetisation (TRM) in igneous rocks and the.',
          misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean',
                  options: ['Sea floor spreading is the geological process where new oceanic crust forms at mid-ocean', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between'],
                  hint: 'Revisit the concept of thermoremanent magnetisation (TRM) in igneous rocks and the Geomagnetic.',
                  misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the underlying mantle,.' }
          ],
            remediations: { 'magnetic-stripes-are-caused-by': { steps: ['If a student confuses the origin of magnetic stripes, use a physical analogy: heat a nail (magnetite grain) above its.', 'Flip the external field, repeat with a new nail — now you have two nails with opposite magnetisation.', 'Lay them side by side on a conveyor belt (spreading ridge) — you get alternating magnetic stripes.', 'Have the student sketch this process step-by-step on paper: (1) ridge axis, (2) lava eruption, (3) cooling through.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the.',
          parts: [
                { id: 'a', prompt: 'Design a simple magnetic survey plan to determine the spreading history of a previously unmapped mid-ocean ridge segment.', answer: 'ship track orientation relative to the ridge, (',
                  options: ['ship track orientation relative to the ridge, (', 'recording'],
                  hint: 'Revisit the concept of thermoremanent magnetisation (TRM) in igneous rocks and the Geomagnetic.',
                  misconception: 'Students often believe that magnetic stripes are caused by the oceanic crust "recording" the magnetic field of the underlying mantle,.' }
          ],
            remediations: { 'magnetic-stripes-are-caused-by': { steps: ['If a student confuses the origin of magnetic stripes, use a physical analogy: heat a nail (magnetite grain) above its.', 'Flip the external field, repeat with a new nail — now you have two nails with opposite magnetisation.', 'Lay them side by side on a conveyor belt (spreading ridge) — you get alternating magnetic stripes.', 'Have the student sketch this process step-by-step on paper: (1) ridge axis, (2) lava eruption, (3) cooling through.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_008', difficulty: 'standard',
          question: 'Lithospheric plates are rigid segments of the Earth\'s lithosphere (crust and.',
          hint: 'Review the magnetic stripe symmetry exercise from c11_geo_cbse_04_007 and practice.',
          misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving.',
          parts: [
                { id: 'a', prompt: 'Given a map showing the Mid-Atlantic Ridge and the Mariana Trench, identify the type of plate boundary at each location and the direction of relative plate.', answer: 'Step 1: Locate the Mid-Atlantic Ridge',
                  options: ['Step 1: Locate the Mid-Atlantic Ridge', 'Indian Plate', 'Australian Plate'],
                  hint: 'Review the magnetic stripe symmetry exercise from c11_geo_cbse_04_007 and practice calculating.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' },
                { id: 'b', prompt: 'Compare the Himalayan collision zone and the Andes mountain range in terms of plate boundary type, crust involved, and resulting landforms.', answer: 'The Himalayas form at a continent-continent convergent boundary (Indian Plate vs',
                  options: ['The Himalayas form at a continent-continent convergent boundary (Indian Plate vs', 'convergent boundaries', 'Indian Plate', 'Australian Plate'],
                  hint: 'Review the magnetic stripe symmetry exercise from c11_geo_cbse_04_007 and practice calculating.',
                  misconception: 'Students often think the "Indian Plate" and "Australian Plate" are a single rigid Indo-Australian Plate moving uniformly.' }
          ],
            remediations: { 'the-indian-plate-and-australian': { steps: ['Show a GPS velocity map of the Indian Ocean region (available from IGS or UNAVCO) highlighting different vectors for.', 'Trace the diffuse boundary zone (Central Indian Ocean Deformation Zone) on a blank map.', 'Relate this to the 2012 Indian Ocean earthquakes (strike-slip events far from plate boundaries).', 'Have the student explain why a single "Indo-Australian Plate" label is misleading for seismic hazard assessment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_009', difficulty: 'standard',
          question: 'Plate boundaries are the narrow zones along the edges of lithospheric plates.',
          hint: 'Review "Plate Tectonics: Lithospheric Plates and Their Movements" (c11_geo_cbse_04_008).',
          misconception: 'Students often think "convergent boundary = subduction zone" and assume all convergent boundaries have deep trenches.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plate boundaries are the narrow zones along the edges of lithospheric plates where they',
                  options: ['Plate boundaries are the narrow zones along the edges of lithospheric plates where they', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between'],
                  hint: 'Review "Plate Tectonics: Lithospheric Plates and Their Movements" (c11_geo_cbse_04_008) and "Sea.',
                  misconception: 'Students often think "convergent boundary = subduction zone" and assume all convergent boundaries have deep trenches and volcanic arcs.' }
          ],
            remediations: { 'convergent-boundary-subduction-zone-and': { steps: ['Draw two side-by-side cross-sections — one for oceanic-continental convergence (Andes) showing trench, subducting slab.', 'Use a density argument: oceanic crust (3.0 g/cm³) subducts; continental crust (2.7 g/cm³) resists.', 'Map the India-Eurasia collision — mark the suture zone (Indus-Tsangpo), thrust faults (Main Central Thrust), and note.', 'Contrast with the Sunda Arc (Java) where oceanic Indo-Australian Plate subducts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_010', difficulty: 'standard',
          question: 'The distribution of earthquakes and volcanoes refers to the non-random, zonal.',
          hint: 'Revisit c11_geo_cbse_04_009 (Types of Plate Boundaries) and draw annotated cross-sections.',
          misconception: 'Students believe the "Ring of Fire" is a single continuous plate boundary — they fail to recognize it comprises.',
          parts: [
                { id: 'a', prompt: 'Name the three major global seismic-volcanic belts and state the dominant plate boundary type associated with each belt.', answer: 'Correct answer: (1) Circum-Pacific Belt (Ring of Fire)',
                  options: ['Correct answer: (1) Circum-Pacific Belt (Ring of Fire)', 'Pacific Ring of Fire, Mediterranean Belt, and Mid-Atlantic Ridge', 'Ring of Fire'],
                  hint: 'Revisit c11_geo_cbse_04_009 (Types of Plate Boundaries) and draw annotated cross-sections for.',
                  misconception: 'Students believe the "Ring of Fire" is a single continuous plate boundary — they fail to recognize it comprises multiple distinct.' },
                { id: 'b', prompt: 'Given a world map showing earthquake epicenters color-coded by depth (shallow: 0–70 km, intermediate: 70–300 km, deep: >300 km), identify the plate boundary.', answer: 'Correct working: (a) 10°S, 110°E',
                  options: ['Correct working: (a) 10°S, 110°E', 'Ring of Fire'],
                  hint: 'Revisit c11_geo_cbse_04_009 (Types of Plate Boundaries) and draw annotated cross-sections for.',
                  misconception: 'Students believe the "Ring of Fire" is a single continuous plate boundary — they fail to recognize it comprises multiple distinct.' }
          ],
            remediations: { 'the-ring-of-fire-is': { steps: ['Print a blank world map with plate boundaries marked.', 'Using USGS "Earthquake Catalog" (last 30 days, M4+), plot 50 epicenters with depth color-coding.', 'Overlay Smithsonian "Volcanoes of the World" active vents.', 'Trace three belts with different colored pencils — label each segment by boundary type (e.g., "Chile.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_011', difficulty: 'standard',
          question: 'The Wilson Cycle is a geodynamic model describing the cyclic opening and.',
          hint: 'If stuck, revisit c11_geo_cbse_04_007 (Sea Floor Spreading) for spreading rate.',
          misconception: 'Students believe the Wilson Cycle is a rigid, clockwork cycle with fixed duration (~200 Myr) where every ocean basin.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Wilson Cycle is a geodynamic model describing the cyclic opening and closing of ocean',
                  options: ['The Wilson Cycle is a geodynamic model describing the cyclic opening and closing of ocean', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between'],
                  hint: 'If stuck, revisit c11_geo_cbse_04_007 (Sea Floor Spreading) for spreading rate calculations and.',
                  misconception: 'Students believe the Wilson Cycle is a rigid, clockwork cycle with fixed duration (~200 Myr) where every ocean basin follows identical.' }
          ],
            remediations: { 'the-wilson-cycle-is-a': { steps: ['Revisit c11_geo_cbse_04_007 (Sea Floor Spreading) and 008 (Plate Tectonics) — verify understanding that ridge push and.', 'Use GPlates software (free) to animate India\'s motion from 150 Ma to present — observe how Indian Plate had a spreading.', 'Map failed rifts (Benue Trough, West African Rift) on a Gondwana reconstruction — identify which embryonic stage.', 'Re-draw Wilson Cycle diagram as a branching flowchart, not a circle, showing decision points: "Rift succeeds?" →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
