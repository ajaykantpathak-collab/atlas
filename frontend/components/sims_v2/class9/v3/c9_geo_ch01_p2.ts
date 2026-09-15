import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch01_p2: SimDef = {
    id: 'v3_c9_geo_ch01_p2',
    title: 'Landforms and Earth\'s Surface · Part 2/2',
    subtitle: 'Seismic waves are Earth\'s ultrasound',
    classLevel: 9, subject: 'geography', topic: 'Landforms and Earth\'s Surface · Part 2/2',
    chapters: ['c9_geo_ch01'],
    nodeIds: ['c9_geo_ch1_4', 'c9_geo_ch1_5', 'c9_geo_ch1_6', 'c9_geo_ch1_7', 'c9_geo_ch1_8', 'c9_geo_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a seismologist imaging the deep Earth', intro: 'The deepest hole ever dug barely scratches Earth\'s skin — yet we know there\'s a liquid metal ocean down there. Learn how earthquakes whisper the planet\'s secrets.', goal: 'Understand Earth\'s layered interior — crust, mantle, liquid outer core and solid inner core — and how seismic wave behaviour (S-wave shadow, P-wave refraction) reveals it.' },
    discovery: {
        question: 'Nobody has ever drilled past 12 km into a planet 6,371 km deep — so how do we KNOW the outer core is liquid?',
        options: ['Earthquake S-waves can\'t travel through liquid — they vanish beyond ~103° from an epicentre, drawing a shadow where the liquid outer core sits', 'Scientists guessed from volcano lava', 'We saw it on satellite images', 'Deep mines reached it long ago'],
        answer: 'Earthquake S-waves can\'t travel through liquid — they vanish beyond ~103° from an epicentre, drawing a shadow where the liquid outer core sits',
        hook: 'The mantle is NOT a sea of magma — it\'s solid rock that creeps like a glacier over millennia. And the inner core is solid not because it\'s cooler (it\'s the hottest part!) but because 3.6 million atmospheres of pressure refuse to let iron melt.',
    },
    teaching: [
        { title: 'Landforms Formed by Plate Movement: Fold Mountains', text: 'Fold mountains are elevated landforms created when two continental tectonic plates converge, causing the sedimentary rock layers accumulated at the plate margins to crumple, buckle, and fold upwards.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch1_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Earth like an X-ray: use P-waves and the S-wave shadow zone to map crust (5–70 km), mantle (~2,900 km) and core — then explain why continents float higher than ocean floors like icebergs in rock.',
        labels: ['Landforms Formed by Plate', 'Volcanoes: Formation, Types', 'Earthquakes: Causes, Measurement', 'Weathering: Physical, Chemical', 'Erosion and Deposition by'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_geo_ch1_4', title: 'Landforms Formed by Plate Movement: Fold Mountains',
          caseStudy: { intro: 'Begin by asking students to observe a physical map of India and trace the Himalayan arc from Jammu & Kashmir to Arunachal Pradesh.',
            decisions: [{ prompt: 'Define "fold mountain" and name the specific type of plate boundary responsible for its formation.', options: [
                { text: '**Correct Answer:** A fold mountain is a mountain range formed by the folding of crustal', outcome: '**Correct Answer:** A fold mountain is a mountain range formed by the folding of crustal rocks due.' },
                { text: 'divergent boundary', outcome: 'Not quite — Students often believe that **all high mountain ranges are fold mountains formed by the same.', reveals: 'all-high-mountain-ranges-are' },
                { text: 'transform boundary', outcome: 'Not quite — Students often believe that **all high mountain ranges are fold mountains formed by the same.', reveals: 'all-high-mountain-ranges-are' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_5', title: 'Volcanoes: Formation, Types and Distribution',
          caseStudy: { intro: 'Imagine standing near Barren Island in the Andaman Sea — India\'s only active volcano — and watching steam rise from its crater; this real-world observation.',
            decisions: [{ prompt: 'Define a volcano and state the primary geological process that causes magma to rise to the surface at a convergent plate boundary.', options: [
                { text: 'A volcano is a vent in Earth\'s crust through which magma, ash, and gases erupt; at', outcome: 'A volcano is a vent in Earth\'s crust through which magma, ash, and gases erupt; at convergent.' },
                { text: 'magma rises because of convection currents alone', outcome: 'Not quite — Students often believe all volcanoes are steep, explosive mountains like Mt.', reveals: 'all-volcanoes-are-steep' },
                { text: 'volcanoes form only at divergent boundaries', outcome: 'Not quite — Students often believe all volcanoes are steep, explosive mountains like Mt.', reveals: 'all-volcanoes-are-steep' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch1_6', title: 'Earthquakes: Causes, Measurement and Effects',
          scaffold: { problem: 'The 2001 Bhuj earthquake (Gujarat) had a magnitude of 7.7 on the Richter scale.',
            steps: [
            { text: 'Identify the formula for energy ratio: Energy ratio = 10^(1.5 × (M2 - M1)).' },
            { text: 'Substitute M2 = 7.7 (Bhuj), M1 = 6.2 (Latur): Difference = 1.5.' },
            { text: 'Calculate exponent: 1.5 × 1.5 = 2.25.' },
            { text: 'Compute 10^2.25 = 10^2 × 10^0.25 ≈ 100 × 1.78 = 178. So Bhuj released ~178 times more energy.' },
            { text: 'Interpret: Despite 178× more energy, Bhuj\'s death toll was only ~2× Latur\'s because: (a) Bhuj epicenter was in sparsely.', faded: true, blankAnswer: 'Bhuj released approximately 178 times more energy than.' }
            ] } },
        { type: 'case', nodeId: 'c9_geo_ch1_7', title: 'Weathering: Physical, Chemical and Biological',
          caseStudy: { intro: 'Imagine you are standing on a hillside near Bengaluru in the Deccan Plateau and notice large, curved sheets of granite peeling off like onion layers from.',
            decisions: [{ prompt: 'Define weathering and state how it differs from erosion in terms of material movement.', options: [
                { text: 'Weathering is the in-situ breakdown of rocks without significant movement of the', outcome: 'Weathering is the in-situ breakdown of rocks without significant movement of the fragments, while.' },
                { text: 'weathering moves rocks downhill', outcome: 'Not quite — Students often believe that physical weathering (like block disintegration) only occurs in hot.', reveals: 'physical-weathering-like-block-disintegration' },
                { text: 'conflates the two (e', outcome: 'Not quite — Students often believe that physical weathering (like block disintegration) only occurs in hot.', reveals: 'physical-weathering-like-block-disintegration' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_8', title: 'Erosion and Deposition by Rivers: Landforms',
          caseStudy: { intro: 'Observe a river near your home or in photographs — notice how it cuts deep into hills in the mountains (like the Bhagirathi in Uttarakhand), winds like a snake.',
            decisions: [{ prompt: 'Define the four processes of river erosion (hydraulic action, abrasion, attrition, solution) and state which process is primarily.', options: [
                { text: 'Hydraulic action is the force of water hitting banks and forcing air into cracks', outcome: 'Hydraulic action is the force of water hitting banks and forcing air into cracks; abrasion is the.' },
                { text: 'curvy rivers', outcome: 'Not quite — Students believe meanders form only in the lower course because they associate "curvy rivers" with.', reveals: 'meanders-form-only-in-the' },
                { text: 'deltas form at every river mouth', outcome: 'Not quite — Students believe meanders form only in the lower course because they associate "curvy rivers" with.', reveals: 'meanders-form-only-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_9', title: 'Erosion and Deposition by Sea Waves and Wind: Landforms',
          caseStudy: { intro: 'Stand on Marina Beach in Chennai during high tide and watch waves crash against the seawall, then imagine the same coast without the wall — the cliffs would.',
            decisions: [{ prompt: 'Name the landform that forms when a sea arch collapses due to continued wave erosion at its base.', options: [
                { text: 'A **sea stack** (or stack) forms when the roof of a sea arch collapses, leaving an', outcome: 'A **sea stack** (or stack) forms when the roof of a sea arch collapses, leaving an isolated pillar.' },
                { text: 'sea cave', outcome: 'Not quite — Students think **sea waves only erode cliffs vertically** and **wind only creates sand dunes**.', reveals: 'sea-waves-only-erode-cliffs' },
                { text: 'blowhole', outcome: 'Not quite — Students think **sea waves only erode cliffs vertically** and **wind only creates sand dunes**.', reveals: 'sea-waves-only-erode-cliffs' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a cutaway of Earth for the science room, a student colours the whole mantle bright orange and captions it \'a 2,900 km ocean of liquid magma — that\'s where lava comes from.\'',
            decisions: [{ prompt: 'Is the caption right about the mantle?', options: [
                { text: 'No — the mantle is solid rock that creeps viscously over geological time; only the outer core is liquid, proven by S-waves vanishing beyond ~103° since they cannot cross liquid. Magma forms by partial melting of solid mantle at plate boundaries — the mantle is not a magma sea.', outcome: 'This applies the seismic evidence and separates \'ductile solid\' from \'liquid\' — the diagram\'s colour fooled him.' },
                { text: 'The caption is right — volcanoes erupt molten rock, so the layer below must be molten too.', outcome: 'Eruptions need only local partial melting; S-waves cross the mantle fine but die at the outer core, locating the liquid layer deeper down.', reveals: 'mantle-is-magma' },
                { text: 'The mantle is liquid AND the inner core is liquid too, since deeper always means hotter and more melted.', outcome: 'The inner core is hotter yet solid — immense pressure raises its melting point above its temperature; depth does not simply mean liquid.', reveals: 'hotter-means-liquid' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_9', title: 'You made it',
          caseStudy: { intro: 'Three layers — thin crust, solid-but-flowing mantle, liquid outer core wrapped around a pressure-frozen inner core — and we mapped all of it without ever digging past the skin, just by listening to earthquakes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_4', difficulty: 'standard',
          question: 'Fold mountains are elevated landforms created when two continental tectonic.',
          hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and practice classifying 5 global.',
          misconception: 'Students often believe that **all high mountain ranges are fold mountains formed by the same process**.',
          parts: [
                { id: 'a', prompt: 'Explain why the Himalayas are classified as "young fold mountains" while the Aravallis are "old fold mountains", linking your answer to the geological time.', answer: '**Correct Answer:** The Himalayas are "young"',
                  options: ['**Correct Answer:** The Himalayas are "young"', 'Himalayas are tall, Aravallis are short', 'fold mountain', '**all high mountain ranges are fold mountains formed by the same process**'],
                  hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and practice classifying 5 global convergent.',
                  misconception: 'Students often believe that **all high mountain ranges are fold mountains formed by the same process**.' }
          ],
            remediations: { 'all-high-mountain-ranges-are': { steps: ['** Use a physical world map and plate boundary map side-by-side. Trace the Himalayas, Alps, Urals, Andes, Rockies.', '** Build a clay model: Layer 3 colours of clay (sediments). Place two rigid blocks (continents) on ends. Push slowly.', '** Compare cross-section diagrams of Himalayas (collisional) vs Andes (subduction).', '** Re-attempt Diagnostic Question 3 and 4. This concrete mapping + modelling + comparison sequence breaks the "all high.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_5', difficulty: 'standard',
          question: 'A volcano is a vent or fissure in the Earth\'s crust through which molten rock.',
          hint: 'Revisit c9_geo_ch1_3 (Types of Plate Movements) and practice identifying boundary types.',
          misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A volcano is a vent or fissure in the Earth\'s crust through',
                  options: ['A volcano is a vent or fissure in the Earth\'s crust through', 'Earth\'s interior is divided into three concentric layers based on chemical composition', 'Plains are extensive low-relief areas formed primarily by depositional processes of', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,'],
                  hint: 'Revisit c9_geo_ch1_3 (Types of Plate Movements) and practice identifying boundary types on.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' }
          ],
            remediations: { 'all-volcanoes-are-steep': { steps: ['Use a physical world map with plate boundaries overlaid; have the student trace the Pacific Plate boundary and mark.', 'Compare two volcano cross-section diagrams (shield vs. composite) side-by-side; ask the student to label magma.', 'Show a 30-second video of Kilauea\'s effusive lava vs. Mt. St. Helens\' explosive eruption; ask them to predict which.', 'Have them locate Barren Island (India\'s active volcano) on the map and identify its setting (subduction of Indian Plate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "Volcanic eruptions are purely destructive natural hazards with no long-term benefits to human societies." Provide geographical reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'all volcanoes are steep, explosive mountains like Mt'],
                  hint: 'Revisit c9_geo_ch1_3 (Types of Plate Movements) and practice identifying boundary types on.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' },
                { id: 'b', prompt: 'Design a simple annotated sketch map for a Class 9 student showing the three main global volcanic zones, labeling one example volcano in each zone, and.', answer: 'A good sketch shows: (1) Pacific Ring of Fire',
                  options: ['A good sketch shows: (1) Pacific Ring of Fire', 'all volcanoes are steep, explosive mountains like Mt'],
                  hint: 'Revisit c9_geo_ch1_3 (Types of Plate Movements) and practice identifying boundary types on.',
                  misconception: 'Students often believe all volcanoes are steep, explosive mountains like Mt. Fuji, and that lava flows are the main hazard everywhere.' }
          ],
            remediations: { 'all-volcanoes-are-steep': { steps: ['Use a physical world map with plate boundaries overlaid; have the student trace the Pacific Plate boundary and mark.', 'Compare two volcano cross-section diagrams (shield vs. composite) side-by-side; ask the student to label magma.', 'Show a 30-second video of Kilauea\'s effusive lava vs. Mt. St. Helens\' explosive eruption; ask them to predict which.', 'Have them locate Barren Island (India\'s active volcano) on the map and identify its setting (subduction of Indian Plate.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_6', difficulty: 'standard',
          question: 'An earthquake is a sudden release of accumulated strain energy in the Earth\'s.',
          hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and draw cross-sections showing stress.',
          misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g.',
          parts: [
                { id: 'a', prompt: 'Explain why the Richter scale is logarithmic and what it means when an earthquake of magnitude 6 releases approximately 32 times more energy than a magnitude 5.', answer: 'The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)',
                  options: ['The Richter scale is logarithmic (base 10 for amplitude, ~32 for energy)', 'magnitude 6 is just 1 unit bigger than 5', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and draw cross-sections showing stress build-up and.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' },
                { id: 'b', prompt: 'A seismograph station records P-waves arriving at 10:00:00 and S-waves at 10:02:30.', answer: 'Step 1: Time difference = 150 seconds',
                  options: ['Step 1: Time difference = 150 seconds', 'a magnitude 7 earthquake always causes more destruction than magnitude 6'],
                  hint: 'Revisit c9_geo_ch1_3 "Types of Plate Movements" and draw cross-sections showing stress build-up and.',
                  misconception: 'Students believe that the magnitude of an earthquake (Richter number) directly determines the damage everywhere — e.g., "a magnitude 7.' }
          ],
            remediations: { 'the-magnitude-of-an-earthquake': { steps: ['Use a shake-table demo or video showing identical model houses on rock vs.', 'Plot isoseismal lines for a real Indian quake (e.g., 2011 Sikkim M6.9) on a map — note how intensity drops irregularly.', 'Calculate energy difference between M6 and M7 (32×) but then compare death tolls: 1993 Latur M6.2 (~10,000 deaths) vs.', 'Have students write a one-paragraph explanation using terms: focus depth, alluvial amplification, building.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_7', difficulty: 'standard',
          question: 'Weathering is the in-situ breakdown and decomposition of rocks and minerals.',
          hint: 'Revise the rock cycle (c9_geo_ch1_1) and India\'s climate regions (c7_geo_ch03_006.',
          misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily.',
          parts: [
                { id: 'a', prompt: 'Define weathering and state how it differs from erosion in terms of material movement.', answer: 'Weathering is the in-situ breakdown of rocks without significant movement of the',
                  options: ['Weathering is the in-situ breakdown of rocks without significant movement of the', 'weathering moves rocks downhill', 'conflates the two (e'],
                  hint: 'Revise the rock cycle (c9_geo_ch1_1) and India\'s climate regions (c7_geo_ch03_006, c7_geo_ch03_007).',
                  misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily temperature extremes.' },
                { id: 'b', prompt: 'A sandstone cliff in the Vindhya Range shows honeycomb-like cavities (tafoni).', answer: 'The dominant process is physical weathering by salt crystallization (haloclasty)',
                  options: ['The dominant process is physical weathering by salt crystallization (haloclasty)', 'wind erosion'],
                  hint: 'Revise the rock cycle (c9_geo_ch1_1) and India\'s climate regions (c7_geo_ch03_006, c7_geo_ch03_007).',
                  misconception: 'Students often believe that physical weathering (like block disintegration) only occurs in hot deserts due to daily temperature extremes.' }
          ],
            remediations: { 'physical-weathering-like-block-disintegration': { steps: ['Show a topographic map of the Himalayas (c9_geo_ch1_4 region) highlighting elevations >3000 m.', 'Use temperature data from Leh (Class 7 weather diary skills) to plot daily min/max in winter, counting freeze-thaw days.', 'Compare photos of Ladakh scree slopes (frost-shattered angular debris) with Thar Desert sandstone blocks (thermal.', 'Have students mark "frost weathering zone" and "thermal weathering zone" on an outline map of India, reinforcing that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_8', difficulty: 'standard',
          question: 'Erosion and deposition by rivers are fluvial geomorphological processes where.',
          hint: 'If stuck, revisit c9_geo_ch1_7 (weathering processes) and c7_geo_ch01_009 (Indian river.',
          misconception: 'Students believe meanders form only in the lower course because they associate "curvy rivers" with flat plains, and.',
          parts: [
                { id: 'a', prompt: 'Define the four processes of river erosion (hydraulic action, abrasion, attrition, solution) and state which process is primarily responsible for the formation.', answer: 'Hydraulic action is the force of water hitting banks and forcing air into cracks',
                  options: ['Hydraulic action is the force of water hitting banks and forcing air into cracks', 'curvy rivers', 'deltas form at every river mouth'],
                  hint: 'If stuck, revisit c9_geo_ch1_7 (weathering processes) and c7_geo_ch01_009 (Indian river systems).',
                  misconception: 'Students believe meanders form only in the lower course because they associate "curvy rivers" with flat plains, and they think deltas form.' }
          ],
            remediations: { 'meanders-form-only-in-the': { steps: ['Draw a longitudinal profile of a generic river on graph paper (gradient on y-axis, distance on x-axis).', 'Mark three zones with gradient ranges: upper (>5 m/km), middle (0.5–5 m/km), lower (<0.5 m/km).', 'Using the Ganga and Narmada as contrasting case studies, annotate where meanders and deltas actually form.', 'Explain why the Narmada lacks a delta (rift valley, high tidal range, hard rock) while the Ganga has the world\'s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_9', difficulty: 'standard',
          question: 'Sea wave and wind erosion and deposition are exogenic geomorphic processes.',
          hint: 'Revisit c9_geo_ch1_7 "Weathering: Physical, Chemical and Biological" — specifically salt.',
          misconception: 'Students think **sea waves only erode cliffs vertically** and **wind only creates sand dunes**.',
          parts: [
                { id: 'a', prompt: 'Why do barchan dunes form only in areas with limited sand supply and unidirectional wind, whereas transverse dunes require abundant sand?', answer: 'Barchans are crescent-shaped',
                  options: ['Barchans are crescent-shaped', 'wind speed', '**sea waves only erode cliffs vertically** and **wind only creates sand dunes**'],
                  hint: 'Revisit c9_geo_ch1_7 "Weathering: Physical, Chemical and Biological" — specifically salt weathering.',
                  misconception: 'Students think **sea waves only erode cliffs vertically** and **wind only creates sand dunes**.' },
                { id: 'b', prompt: 'On a topographical map of the Konkan coast, you see a series of parallel ridges separated by lagoons running parallel to the shoreline.', answer: 'The landform is a **barrier island chain with lagoons**',
                  options: ['The landform is a **barrier island chain with lagoons**', '**sea waves only erode cliffs vertically** and **wind only creates sand dunes**'],
                  hint: 'Revisit c9_geo_ch1_7 "Weathering: Physical, Chemical and Biological" — specifically salt weathering.',
                  misconception: 'Students think **sea waves only erode cliffs vertically** and **wind only creates sand dunes**.' }
          ],
            remediations: { 'sea-waves-only-erode-cliffs': { steps: ['Show a 30-second video of a wave-cut platform forming at low tide (e.g., Mahabalipuram shore).', 'Use a sand tray + hair dryer: blow sand over a clay "rock" to form a mushroom rock, then increase sand supply to form.', 'Have students label a diagram of a sediment cell: source (cliff) → transport (longshore drift) → sink (spit).', 'Ask: "If we build a groyne here, what happens 5 km down the coast?" Forces system thinking.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
