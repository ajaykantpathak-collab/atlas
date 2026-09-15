import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch04_p1: SimDef = {
    id: 'v3_c11_geo_ch04_p1',
    title: 'Distribution of Oceans and Continents · Part 1/2',
    subtitle: 'See why continents drift as passengers on plates, not rafts ploughing through ocean floor.',
    classLevel: 11, subject: 'geography', topic: 'Distribution of Oceans and Continents · Part 1/2',
    chapters: ['c11_geo_ch04'],
    nodeIds: ['c11_geo_cbse_04_001', 'c11_geo_cbse_04_002', 'c11_geo_cbse_04_003', 'c11_geo_cbse_04_004', 'c11_geo_cbse_04_005', 'c11_geo_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a palaeogeographer reassembling Pangaea', intro: 'South America\'s coast slots into Africa\'s — coincidence, or the scar of a supercontinent torn apart?', goal: 'Evaluate drift theory\'s evidence versus its missing mechanism and reconstruct Pangaea and Panthalassa.' },
    discovery: {
        question: 'Wegener\'s continental drift was laughed out of the 1920s — a case of weak evidence?',
        options: ['No — the evidence was strong (coastline fit, matching fossils, glacial deposits); it was rejected for lacking a mechanism', 'Yes — his fossil data was fabricated', 'Yes — the continents don\'t actually fit together', 'No — it was rejected purely out of jealousy'],
        answer: 'No — the evidence was strong (coastline fit, matching fossils, glacial deposits); it was rejected for lacking a mechanism',
        hook: 'Mesosaurus fossils on both sides of the Atlantic made the case — but \'polflucht\' was ten-thousand times too weak to push a continent, and that gap sank the theory for forty years.',
    },
    teaching: [
        { title: 'Continental Drift Theory: Wegener\'s Hypothesis', text: 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day continents were once joined together in a single supercontinent called Pangaea, surrounded by a global ocean.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Plot fossil and tillite evidence on a Pangaea reconstruction, then trace the Tethys Sea to the mountain belts its closure raised.',
        labels: ['Continental Drift Theory: Wegener\'s', 'Continental Drift: Pangaea', 'Evidence for Continental Drift', 'Post-Drift Studies: Convectional Current', 'Ocean Floor Mapping'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_001', title: 'Continental Drift Theory: Wegener\'s Hypothesis',
          caseStudy: { intro: 'Look at a physical world map and notice how the eastern coastline of South America fits remarkably well into the western coastline of Africa — like pieces of.',
            decisions: [{ prompt: 'State the name of the supercontinent and the global ocean in Wegener\'s theory, and give the approximate geological time when Pangaea began.', options: [
                { text: 'Pangaea (supercontinent) and Panthalassa (global ocean)', outcome: 'Pangaea (supercontinent) and Panthalassa (global ocean); breakup began around 200 million years ago.' },
                { text: 'Gondwana and Laurasia', outcome: 'Not quite — Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic.', reveals: 'continents-drift-like-rafts-on' },
                { text: '100 million years', outcome: 'Not quite — Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic.', reveals: 'continents-drift-like-rafts-on' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_002', title: 'Continental Drift: Pangaea and Panthalassa',
          caseStudy: { intro: 'Begin by asking the student to look at a modern political world map and trace the Atlantic coastlines of South America and Africa with a finger – they notice.',
            decisions: [{ prompt: 'Name the two major sub-supercontinents that comprised Pangaea and state the paleo-ocean that separated them before final amalgamation.', options: [
                { text: 'Pangaea consisted of **Laurasia** (northern component: Laurentia, Baltica, Siberia, North', outcome: 'Pangaea consisted of **Laurasia** (northern component: Laurentia, Baltica, Siberia, North China.' },
                { text: 'India and Australia', outcome: 'Not quite — Students often think **Pangaea was the *only* supercontinent in Earth history** and that.', reveals: 'pangaea-was-the-only-supercontinent' },
                { text: 'Atlantic Ocean', outcome: 'Not quite — Students often think **Pangaea was the *only* supercontinent in Earth history** and that.', reveals: 'pangaea-was-the-only-supercontinent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_003', title: 'Evidence for Continental Drift: Jig-saw Fit of Coastlines',
          caseStudy: { intro: 'Start by asking students to observe a world map and notice how the east coast of South America seems to fit into the west coast of Africa like puzzle pieces.',
            decisions: [{ prompt: 'What is the primary reason geologists use the continental shelf break (1000 m isobath) rather than the present coastline for the jigsaw fit.', options: [
                { text: 'The present coastline is a temporary feature shaped by sea-level changes, wave erosion,', outcome: 'The present coastline is a temporary feature shaped by sea-level changes, wave erosion, and.' },
                { text: 'because it looks better on a map', outcome: 'Not quite — Students often think the jigsaw fit is based on the present-day coastlines (the land-water boundary.', reveals: 'the-jigsaw-fit-is-based' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_004', title: 'Evidence for Continental Drift: Fossils and Rock Ages',
          caseStudy: { intro: 'Imagine finding the same distinctive *Glossopteris* leaf fossil in a coal mine in Jharkhand, India, and then seeing an identical fossil in a museum display.',
            decisions: [{ prompt: 'Name the four key fossil genera used as evidence for continental drift and specify which modern continents each is found on.', options: [
                { text: 'The four key fossil genera are: (1) *Mesosaurus*', outcome: 'The four key fossil genera are: (1) *Mesosaurus* — found in Brazil (South America) and South Africa.' },
                { text: 'ferns disperse by spores', outcome: 'Not quite — Students believe that *Glossopteris* seeds could have been wind-dispersed across oceans because.', reveals: 'glossopteris-seeds-could-have-been' },
                { text: 'fern-like foliage', outcome: 'Not quite — Students believe that *Glossopteris* seeds could have been wind-dispersed across oceans because.', reveals: 'glossopteris-seeds-could-have-been' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_005', title: 'Post-Drift Studies: Convectional Current Theory (Arthur Holmes)',
          caseStudy: { intro: 'Begin by recalling Wegener\'s inability to explain *what force* moves continents (tidal force and polar flight force were rejected).',
            decisions: [{ prompt: 'What is the primary heat source Arthur Holmes identified for generating mantle convection currents?', options: [
                { text: 'Radioactive decay of elements (uranium, thorium, potassium) in the mantle generates the', outcome: 'Radioactive decay of elements (uranium, thorium, potassium) in the mantle generates the thermal.' },
                { text: 'solar heating', outcome: 'Not quite — Students often think Holmes proposed convection currents in the *liquid outer core*.', reveals: 'holmes-proposed-convection-currents-in' },
                { text: 'core cooling only', outcome: 'Not quite — Students often think Holmes proposed convection currents in the *liquid outer core*.', reveals: 'holmes-proposed-convection-currents-in' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_04_006', title: 'Ocean Floor Mapping and the Mid-Oceanic Ridges',
          scaffold: { problem: 'Using the depth-age formula, estimate the age of oceanic crust at a depth of 5000 m on the flank of the Mid-Atlantic Ridge, given ridge.',
            steps: [
            { text: 'Identify the given values: d = 5000 m, d₀ = 2500 m, k = 350 m/√Myr.' },
            { text: 'Write the depth-age formula: d = d₀ + k√t.' },
            { text: 'Subtract d₀ from both sides: d - d₀ = k√t → 5000 - 2500 = 2500 = 350√t.' },
            { text: 'Solve for √t: √t = 2500 / 350 ≈ 7.14.' },
            { text: 'Square both sides: t ≈ (7.14)² ≈ 51 Myr.', faded: true, blankAnswer: 'The crust is approximately 51 million years old.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a quiz bowl, the question flashes: \'Name the ocean that surrounded Pangaea.\' Your teammate buzzes \'Pacific!\' Later, reviewing continental drift, she says: \'Anyway, Wegener proved continents plough through the ocean floor like ships.\'',
            decisions: [{ prompt: 'What corrections are needed on both counts?', options: [
                { text: 'The ocean was Panthalassa — a distinct superocean whose floor was almost entirely subducted; the modern Pacific formed after Pangaea broke up. And the mechanism is wrong: modern plate tectonics has continents as passengers on lithospheric plates (continental + oceanic crust together) driven by mantle convection — India moves with the Indian Ocean floor as one plate, not through it.', outcome: 'Two fixes in one: Panthalassa ≠ Pacific, and drifting continents aren\'t ships ploughing through crust — they ride on the plate.' },
                { text: 'Pacific is fine — it\'s the oldest ocean, so it must be the one that surrounded Pangaea.', outcome: 'Panthalassa\'s floor was subducted away; the Pacific basin postdates Pangaea\'s breakup — confusing them swaps a destroyed paleo-ocean for a modern one.', reveals: 'panthalassa-is-pacific' },
                { text: 'Defend Wegener\'s mechanism — continents do move through oceanic crust, that\'s what \'drift\' means.', outcome: 'Wegener proposed ploughing through sima and it was his theory\'s weakness; the accepted picture is continents carried as part of whole plates.', reveals: 'continents-plough-through-crust' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'The jigsaw fit was real; Wegener just couldn\'t say what pushed the pieces — plate tectonics supplied the engine he lacked.',
            decisions: [{ prompt: 'What comes next? Distribution of Oceans and Continents · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Distribution of Oceans and Continents · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_001', difficulty: 'standard',
          question: 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all.',
          hint: 'Revisit Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries).',
          misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.',
          parts: [
                { id: 'a', prompt: 'State the name of the supercontinent and the global ocean in Wegener\'s theory, and give the approximate geological time when Pangaea began to break apart.', answer: 'Pangaea (supercontinent) and Panthalassa (global ocean)',
                  options: ['Pangaea (supercontinent) and Panthalassa (global ocean)', 'Gondwana and Laurasia', '100 million years'],
                  hint: 'Revisit Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) to review plate.',
                  misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.' }
          ],
            remediations: { 'continents-drift-like-rafts-on': { steps: ['Use a "Pangaea puzzle" (cardboard cutouts of continents with continental shelves) — assemble on a sphere.', 'Overlay a transparent sheet showing modern plate boundaries (from c9_geo_ch1_2) — notice continents + adjacent ocean.', 'Watch a 30-second mantle convection animation (cross-section) — see plates dragged by circulating mantle, not plowing.', 'Redraw the India-Asia collision showing the *entire Indo-Australian Plate* subducting, not just the continent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Wegener\'s theory was rejected because his evidence was weak." Support your judgment with three specific historical criticisms raised.', answer: 'The statement is false',
                  options: ['The statement is false', 'weak evidence'],
                  hint: 'Revisit Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) to review plate.',
                  misconception: 'Students believe continents "drift" like rafts on a liquid mantle, plowing through the oceanic crust.' }
          ],
            remediations: { 'continents-drift-like-rafts-on': { steps: ['Use a "Pangaea puzzle" (cardboard cutouts of continents with continental shelves) — assemble on a sphere.', 'Overlay a transparent sheet showing modern plate boundaries (from c9_geo_ch1_2) — notice continents + adjacent ocean.', 'Watch a 30-second mantle convection animation (cross-section) — see plates dragged by circulating mantle, not plowing.', 'Redraw the India-Asia collision showing the *entire Indo-Australian Plate* subducting, not just the continent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_002', difficulty: 'standard',
          question: 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c.',
          hint: 'If stuck, revisit **c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries)**.',
          misconception: 'Students often think **Pangaea was the *only* supercontinent in Earth history** and that Panthalassa is simply “the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c',
                  options: ['Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between', 'Fossil and rock age evidence for continental drift refers to the correlation of identical'],
                  hint: 'If stuck, revisit **c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries)** – specifically.',
                  misconception: 'Students often think **Pangaea was the *only* supercontinent in Earth history** and that Panthalassa is simply “the ancient Pacific Ocean”.' }
          ],
            remediations: { 'pangaea-was-the-only-supercontinent': { steps: ['Show the student an animated paleogeographic reconstruction (e.g., Scotese PALEOMAP or GPlates) stepping from 300 Ma →.', 'Pause at 250 Ma and ask: “Where is the Pacific Ocean?” – they will see only Panthalassa.', 'Have them trace the *same* continental fragments (India, Australia, Antarctica) across the animation to grasp that.', 'Assign a 5-minute writing task: “Distinguish Panthalassa from the Pacific Ocean in three bullet points.”'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_003', difficulty: 'standard',
          question: 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity.',
          hint: 'Review the structure of the Earth\'s crust (continental vs. oceanic) and the concept.',
          misconception: 'Students often think the jigsaw fit is based on the present-day coastlines (the land-water boundary seen on political.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between',
                  options: ['The jigsaw fit of coastlines refers to the remarkable geometric complementarity between', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'Fossil and rock age evidence for continental drift refers to the correlation of identical'],
                  hint: 'Review the structure of the Earth\'s crust (continental vs. oceanic) and the concept of the.',
                  misconception: 'Students often think the jigsaw fit is based on the present-day coastlines (the land-water boundary seen on political maps) and that the.' }
          ],
            remediations: { 'the-jigsaw-fit-is-based': { steps: ['If a student holds this misconception, have them: 1) Compare a standard political map with a bathymetric map showing.', '2) Trace the continental shelf edges on tracing paper and attempt the fit.', '3) Identify and explain the gaps/overlaps (e.g., Niger Delta sediment, Walvis Ridge volcanism).', '4) Conclude that the fit is geological (continental crust) not geographical (shoreline).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_004', difficulty: 'standard',
          question: 'Fossil and rock age evidence for continental drift refers to the correlation.',
          hint: 'Review the Gondwana reconstruction in c11_geo_cbse_04_002 and the continental shelf-edge.',
          misconception: 'Students believe that *Glossopteris* seeds could have been wind-dispersed across oceans because "ferns disperse.',
          parts: [
                { id: 'a', prompt: 'Name the four key fossil genera used as evidence for continental drift and specify which modern continents each is found on.', answer: 'The four key fossil genera are: (1) *Mesosaurus*',
                  options: ['The four key fossil genera are: (1) *Mesosaurus*', 'ferns disperse by spores', 'fern-like foliage', 'fern reproductive biology'],
                  hint: 'Review the Gondwana reconstruction in c11_geo_cbse_04_002 and the continental shelf-edge fit.',
                  misconception: 'Students believe that *Glossopteris* seeds could have been wind-dispersed across oceans because "ferns disperse by spores." In reality.' }
          ],
            remediations: { 'glossopteris-seeds-could-have-been': { steps: ['Show a magnified image of a *Glossopteris* seed (e.g., *Dictyopteridium*) — note its size and lack of dispersal.', 'Compare with a modern wind-dispersed seed (e.g., *Acer* samara) and a water-dispersed seed (e.g., coconut).', 'Calculate maximum plausible wind dispersal distance for a 1 cm dense seed using Stokes\' law (terminal velocity ~2 m/s.', 'Conclude that transoceanic dispersal is physically impossible — the fossils *must* indicate former land connection.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_005', difficulty: 'standard',
          question: 'Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal.',
          hint: 'Revisit node c11_geo_cbse_04_001 section "Why Wegener\'s Forces Were Rejected" and Class 9.',
          misconception: 'Students often think Holmes proposed convection currents in the *liquid outer core* or *asthenosphere* (modern plate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal convection',
                  options: ['Arthur Holmes\' Convectional Current Theory (1928-1930) proposes that thermal convection', 'Continental Drift Theory, proposed by Alfred Wegener in 1912, states that all present-day', 'Pangaea was the late Paleozoic–early Mesozoic supercontinent (c', 'The jigsaw fit of coastlines refers to the remarkable geometric complementarity between'],
                  hint: 'Revisit node c11_geo_cbse_04_001 section "Why Wegener\'s Forces Were Rejected" and Class 9 Science.',
                  misconception: 'Students often think Holmes proposed convection currents in the *liquid outer core* or *asthenosphere* (modern plate tectonics view).' }
          ],
            remediations: { 'holmes-proposed-convection-currents-in': { steps: ['Re-read the "force problem" in Wegener\'s theory (node c11_geo_cbse_04_001).', 'Draw a simple boiling water analogy: heat source at bottom → rising bubbles → surface flow → sinking cooled water.', 'Contrast with modern plate tectonics (node c11_geo_cbse_04_008) using a T-chart: Holmes (whole-mantle cells, continents.', 'Explain to a peer why Holmes\' theory was rejected for 30 years (no seafloor data, mantle rigidity objection).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_04_006', difficulty: 'standard',
          question: 'Ocean floor mapping is the scientific process of charting the topography of the.',
          hint: 'Review Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) and.',
          misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system.',
          parts: [
                { id: 'a', prompt: 'What is the primary modern technology used to create high-resolution maps of the ocean floor, and what physical principle does it rely on?', answer: 'Multibeam echo sounding (sonar) is the primary ship-based technology',
                  options: ['Multibeam echo sounding (sonar) is the primary ship-based technology', 'satellite photography'],
                  hint: 'Review Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) and c9_geo_ch1_4.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' },
                { id: 'b', prompt: 'Why are mid-oceanic ridges elevated compared to the surrounding abyssal plains, and what does this elevation indicate about the underlying mantle?', answer: 'Ridges stand 2–3 km above abyssal plains',
                  options: ['Ridges stand 2–3 km above abyssal plains', 'ridges are piles of sediment'],
                  hint: 'Review Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) and c9_geo_ch1_4.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' },
                { id: 'c', prompt: 'Compare the morphology of the Mid-Atlantic Ridge (slow-spreading) and the East Pacific Rise (fast-spreading). How do their axial valley vs.', answer: 'Slow-spreading ridges (MAR) have a deep axial rift valley (1–2 km deep)',
                  options: ['Slow-spreading ridges (MAR) have a deep axial rift valley (1–2 km deep)', 'both have rift valleys'],
                  hint: 'Review Class 9 node c9_geo_ch1_2 (Plate Tectonics: Theory and Plate Boundaries) and c9_geo_ch1_4.',
                  misconception: 'Students often think mid-ocean ridges are single, continuous volcanoes like the Andes, rather than a segmented system of spreading centers.' }
          ],
            remediations: { 'mid-ocean-ridges-are-single': { steps: ['Have the student trace the Mid-Atlantic Ridge on a bathymetric map (e.g., GEBCO) from 60°N to 60°S, marking every major.', 'Then use a plate motion calculator (e.g., GPlates) to verify that the offsets match the predicted small circles.', 'This visual-tactile exercise replaces the "single line" mental model with a segmented, faulted system.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
