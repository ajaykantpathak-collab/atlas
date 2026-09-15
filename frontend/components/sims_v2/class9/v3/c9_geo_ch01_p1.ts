import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch01_p1: SimDef = {
    id: 'v3_c9_geo_ch01_p1',
    title: 'Landforms and Earth\'s Surface · Part 1/2',
    subtitle: 'Seismic waves are Earth\'s ultrasound',
    classLevel: 9, subject: 'geography', topic: 'Landforms and Earth\'s Surface · Part 1/2',
    chapters: ['c9_geo_ch01'],
    nodeIds: ['c9_geo_ch1_1', 'c9_geo_ch1_10', 'c9_geo_ch1_11', 'c9_geo_ch1_12', 'c9_geo_ch1_2', 'c9_geo_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a seismologist imaging the deep Earth', intro: 'The deepest hole ever dug barely scratches Earth\'s skin — yet we know there\'s a liquid metal ocean down there. Learn how earthquakes whisper the planet\'s secrets.', goal: 'Understand Earth\'s layered interior — crust, mantle, liquid outer core and solid inner core — and how seismic wave behaviour (S-wave shadow, P-wave refraction) reveals it.' },
    discovery: {
        question: 'Nobody has ever drilled past 12 km into a planet 6,371 km deep — so how do we KNOW the outer core is liquid?',
        options: ['Earthquake S-waves can\'t travel through liquid — they vanish beyond ~103° from an epicentre, drawing a shadow where the liquid outer core sits', 'Scientists guessed from volcano lava', 'We saw it on satellite images', 'Deep mines reached it long ago'],
        answer: 'Earthquake S-waves can\'t travel through liquid — they vanish beyond ~103° from an epicentre, drawing a shadow where the liquid outer core sits',
        hook: 'The mantle is NOT a sea of magma — it\'s solid rock that creeps like a glacier over millennia. And the inner core is solid not because it\'s cooler (it\'s the hottest part!) but because 3.6 million atmospheres of pressure refuse to let iron melt.',
    },
    teaching: [
        { title: 'Earth\'s Layers: Crust, Mantle and Core', text: 'Earth\'s interior is divided into three concentric layers based on chemical composition and physical properties: the crust (thin, solid outer shell of silicate rocks, 5-70 km thick), the mantle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Read Earth like an X-ray: use P-waves and the S-wave shadow zone to map crust (5–70 km), mantle (~2,900 km) and core — then explain why continents float higher than ocean floors like icebergs in rock.',
        labels: ['Earth\'s Layers: Crust, Mantle', 'Plains, Plateaus and Valleys', 'Coastal Landforms and Human-Landform', 'Natural Hazards: Landslides, Floods', 'Plate Tectonics: Theory', 'Types of Plate Movements'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_geo_ch1_1', title: 'Earth\'s Layers: Crust, Mantle and Core',
          caseStudy: { intro: 'Imagine standing on the Deccan Plateau basalt rocks — the solid ground you feel is just the top few kilometres of a 6,371 km radius planet.',
            decisions: [{ prompt: 'Name the three main chemical layers of Earth\'s interior in order from surface to centre, and state the approximate thickness of each.', options: [
                { text: 'Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius)', outcome: 'Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius).' },
                { text: 'lithosphere, asthenosphere, mesosphere', outcome: 'Not quite — Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.', reveals: 'the-mantle-is-molten-liquid' },
                { text: 'ductile solid', outcome: 'Not quite — Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.', reveals: 'the-mantle-is-molten-liquid' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_10', title: 'Plains, Plateaus and Valleys: Formation and Characteristics',
          caseStudy: { intro: 'Look at the flat farmland around your village or city - notice how the soil is deep, stone-free, and the land stretches evenly to the horizon.',
            decisions: [{ prompt: 'Name the three main types of plains based on their formation process and give one Indian example for each type.', options: [
                { text: 'The three types are: (1) Depositional plains - formed by sediment deposition, e.g.,', outcome: 'The three types are: (1) Depositional plains - formed by sediment deposition, e.g., Northern Plains.' },
                { text: 'old, eroded mountains', outcome: 'Not quite — Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands.".', reveals: 'all-plateaus-are-old' },
                { text: 'young, flat lands', outcome: 'Not quite — Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands.".', reveals: 'all-plateaus-are-old' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_11', title: 'Coastal Landforms and Human-Landform Relationships',
          caseStudy: { intro: 'Stand on Marina Beach in Chennai at low tide and observe the wide sandy beach, then walk to the rocky headlands near Mahabalipuram where waves crash against.',
            decisions: [{ prompt: 'Define a wave-cut platform and state the specific coastal process responsible for its formation.', options: [
                { text: 'A wave-cut platform is a flat, gently sloping rocky surface at the base of a sea cliff,', outcome: 'A wave-cut platform is a flat, gently sloping rocky surface at the base of a sea cliff, formed.' },
                { text: 'formed by deposition of sand', outcome: 'Not quite — Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe.', reveals: 'all-coastal-erosion-is-bad' },
                { text: 'created by wind', outcome: 'Not quite — Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe.', reveals: 'all-coastal-erosion-is-bad' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_2', title: 'Plate Tectonics: Theory and Plate Boundaries',
          caseStudy: { intro: 'Begin by showing students a physical map of India and asking them to observe the Himalayas in the north and the Indian Ocean ridges in the south.',
            decisions: [{ prompt: 'Name the three types of plate boundaries based on the relative movement of plates.', options: [
                { text: 'The three types are divergent (plates move apart), convergent (plates move towards each', outcome: 'The three types are divergent (plates move apart), convergent (plates move towards each other), and.' },
                { text: 'subduction', outcome: 'Not quite — Students often think "plate boundary" and "plate margin" are different terms, or that the Indian.', reveals: 'plate-boundary-and-plate-margin' },
                { text: 'rift valley', outcome: 'Not quite — Students often think "plate boundary" and "plate margin" are different terms, or that the Indian.', reveals: 'plate-boundary-and-plate-margin' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_3', title: 'Types of Plate Movements: Convergent, Divergent, Transform',
          caseStudy: { intro: 'Observe the Himalayan mountains rising near your region — they grow about 5 mm every year because the Indian plate pushes into the Eurasian plate.',
            decisions: [{ prompt: 'What are the three types of plate movements and the primary geological feature formed at each boundary type?', options: [
                { text: 'Correct answer: Convergent (plates move toward each other) forms', outcome: 'Correct answer: Convergent (plates move toward each other) forms mountains/trenches/volcanic arcs.' },
                { text: 'divergent boundaries form mountains', outcome: 'Not quite — Students think "convergent boundaries always involve subduction" and "divergent boundaries only.', reveals: 'convergent-boundaries-always-involve-subduction' },
                { text: 'convergent boundaries always involve subduction', outcome: 'Not quite — Students think "convergent boundaries always involve subduction" and "divergent boundaries only.', reveals: 'convergent-boundaries-always-involve-subduction' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Labelling a cutaway of Earth for the science room, a student colours the whole mantle bright orange and captions it \'a 2,900 km ocean of liquid magma — that\'s where lava comes from.\'',
            decisions: [{ prompt: 'Is the caption right about the mantle?', options: [
                { text: 'No — the mantle is solid rock that creeps viscously over geological time; only the outer core is liquid, proven by S-waves vanishing beyond ~103° since they cannot cross liquid. Magma forms by partial melting of solid mantle at plate boundaries — the mantle is not a magma sea.', outcome: 'This applies the seismic evidence and separates \'ductile solid\' from \'liquid\' — the diagram\'s colour fooled him.' },
                { text: 'The caption is right — volcanoes erupt molten rock, so the layer below must be molten too.', outcome: 'Eruptions need only local partial melting; S-waves cross the mantle fine but die at the outer core, locating the liquid layer deeper down.', reveals: 'mantle-is-magma' },
                { text: 'The mantle is liquid AND the inner core is liquid too, since deeper always means hotter and more melted.', outcome: 'The inner core is hotter yet solid — immense pressure raises its melting point above its temperature; depth does not simply mean liquid.', reveals: 'hotter-means-liquid' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'Three layers — thin crust, solid-but-flowing mantle, liquid outer core wrapped around a pressure-frozen inner core — and we mapped all of it without ever digging past the skin, just by listening to earthquakes.',
            decisions: [{ prompt: 'What comes next? Landforms and Earth\'s Surface · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Landforms and Earth\'s Surface · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch1_1', difficulty: 'standard',
          question: 'Earth\'s interior is divided into three concentric layers based on chemical.',
          hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then.',
          misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.',
          parts: [
                { id: 'a', prompt: 'Name the three main chemical layers of Earth\'s interior in order from surface to centre, and state the approximate thickness of each.', answer: 'Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius)',
                  options: ['Crust (5-70 km), Mantle (~2,900 km thick), Core (~3,470 km radius)', 'lithosphere, asthenosphere, mesosphere', 'ductile solid', 'liquid'],
                  hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then watch.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' },
                { id: 'b', prompt: 'Explain why the continental crust is thicker but less dense than oceanic crust, and how this relates to the principle of isostasy.', answer: 'Continental crust (avg',
                  options: ['Continental crust (avg', 'ductile solid', 'liquid', 'the mantle is molten liquid (magma)'],
                  hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then watch.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' },
                { id: 'c', prompt: 'An earthquake occurs at 20°N, 80°E. A seismometer at 40°N, 80°E (same longitude, 2,200 km away) records both P and S waves.', answer: 'Step 1: S-waves cannot travel through liquids',
                  options: ['Step 1: S-waves cannot travel through liquids', 'mantle = magma', 'ductile solid', 'liquid'],
                  hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then watch.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' },
                { id: 'd', prompt: 'Compare the temperature gradient in the crust (approx. 25-30°C/km) with the mantle (approx. 0.5-1°C/km).', answer: 'Crust transfers heat primarily by conduction (slow, steep gradient)',
                  options: ['Crust transfers heat primarily by conduction (slow, steep gradient)', 'mantle is closer to core', 'ductile solid', 'liquid'],
                  hint: 'Revisit c8_geo_ch2_1 for Earth dimensions and c7_geo_ch02_002 for layering logic — then watch.',
                  misconception: 'Students believe the mantle is molten liquid (magma) because volcanoes erupt molten rock.' }
          ],
            remediations: { 'the-mantle-is-molten-liquid': { steps: ['Show seismic wave animation — S-waves travel through mantle (proving solid) but stop at outer core.', 'Demonstrate "solid but ductile" with silly putty: hit it (brittle fracture like crust), pull slowly (ductile flow like.', 'Use phase diagram of iron — show how pressure keeps inner core solid despite higher temperature.', 'Assign: "Explain why mantle xenoliths in basalt are solid rocks, not melt."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_10', difficulty: 'standard',
          question: 'Plains are extensive low-relief areas formed primarily by depositional.',
          hint: 'Revisit c9_geo_ch1_2 (Plate Tectonics) for structural controls and c9_geo_ch1_8 (River.',
          misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Plains are extensive low-relief areas formed primarily by depositional processes of',
                  options: ['Plains are extensive low-relief areas formed primarily by depositional processes of', 'Earth\'s interior is divided into three concentric layers based on chemical composition', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,', 'Natural hazards are extreme geophysical or hydrometeorological events'],
                  hint: 'Revisit c9_geo_ch1_2 (Plate Tectonics) for structural controls and c9_geo_ch1_8 (River.',
                  misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically think the Peninsular.' }
          ],
            remediations: { 'all-plateaus-are-old': { steps: ['Use a physical map of India - trace the Northern Plains boundary against the Himalayas (thrust fault) and Peninsular.', 'Draw a cross-section from Delhi to Chennai showing crustal structure: foreland basin (plains) vs.', 'Compare rock ages - plateau has Archaean basement (3.5 Ga), plains have Quaternary alluvium (<2 Ma).', 'Explain that plateau flatness is structural (horizontal lava flows), not erosional; plain flatness is depositional INTO.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Indo-Gangetic Plain is entirely a depositional landform with no structural control." Provide evidence from its northern and.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'old, eroded mountains', 'young, flat lands', 'all plateaus are "old, eroded mountains" and all plains are "young, flat lands'],
                  hint: 'Revisit c9_geo_ch1_2 (Plate Tectonics) for structural controls and c9_geo_ch1_8 (River.',
                  misconception: 'Students believe all plateaus are "old, eroded mountains" and all plains are "young, flat lands." They specifically think the Peninsular.' }
          ],
            remediations: { 'all-plateaus-are-old': { steps: ['Use a physical map of India - trace the Northern Plains boundary against the Himalayas (thrust fault) and Peninsular.', 'Draw a cross-section from Delhi to Chennai showing crustal structure: foreland basin (plains) vs.', 'Compare rock ages - plateau has Archaean basement (3.5 Ga), plains have Quaternary alluvium (<2 Ma).', 'Explain that plateau flatness is structural (horizontal lava flows), not erosional; plain flatness is depositional INTO.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_11', difficulty: 'standard',
          question: 'Coastal landforms are natural features shaped by the dynamic interaction of sea.',
          hint: 'Revisit c9_geo_ch1_9 "Erosion and Deposition by Sea Waves and Wind" - specifically the.',
          misconception: 'Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe sea walls should.',
          parts: [
                { id: 'a', prompt: 'On an outline map of India, mark and label: (a) a major erosional coastal landform on the Western Coast, (b) a major depositional landform on the Eastern.', answer: 'a major erosional coastal landform on the Western Coast, (',
                  options: ['a major erosional coastal landform on the Western Coast, (', 'sea walls should be built everywhere to stop erosion'],
                  hint: 'Revisit c9_geo_ch1_9 "Erosion and Deposition by Sea Waves and Wind" - specifically the longshore.',
                  misconception: 'Students think all coastal erosion is "bad" and all deposition is "good," leading them to believe sea walls should be built everywhere.' }
          ],
            remediations: { 'all-coastal-erosion-is-bad': { steps: ['Use a tray of wet sand and a paddle to simulate waves - create a headland and bay, generate waves, and observe where.', 'Place a "sea wall" (ruler) at the headland base and repeat - observe increased scour at the wall base and reduced.', 'Compare with Google Earth images of Varkala (cliffs) and Kovalam (beach) 15 km apart - trace the longshore drift.', 'Draw the sediment cell concept: source (cliffs) → transport (longshore drift) → sink (beaches/spits) to visualize why.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_12', difficulty: 'standard',
          question: 'Natural hazards are extreme geophysical or hydrometeorological events — such.',
          hint: 'Revisit c9_geo_ch1_8 (floodplain formation) and c9_geo_ch1_7 (weathering and slope.',
          misconception: 'Students believe landslides are caused only by heavy rain, ignoring that rain is the trigger, not the cause — the real.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Natural hazards are extreme geophysical or hydrometeorological events',
                  options: ['Natural hazards are extreme geophysical or hydrometeorological events', 'Earth\'s interior is divided into three concentric layers based on chemical composition', 'Plains are extensive low-relief areas formed primarily by depositional processes of', 'Coastal landforms are natural features shaped by the dynamic interaction of sea waves,'],
                  hint: 'Revisit c9_geo_ch1_8 (floodplain formation) and c9_geo_ch1_7 (weathering and slope stability).',
                  misconception: 'Students believe landslides are caused only by heavy rain, ignoring that rain is the trigger, not the cause — the real cause.' }
          ],
            remediations: { 'landslides-are-caused-only-by': { steps: ['Show a cross-section of a Himalayan slope — label bedrock, regolith, water table, vegetation roots.', 'Demonstrate with a tray of sand at 30°: dry = stable; add water → fails; add \'roots\' (mesh) → holds.', 'Map Malin landslide site on Google Earth — measure slope, check land cover change (1990 vs 2014), trace river bend.', 'Ask student to rewrite the cause as a chain: "Tectonic uplift → steep slope + weak rock → deforestation → loss of root.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_2', difficulty: 'standard',
          question: 'Plate tectonics is the scientific theory explaining that Earth\'s lithosphere.',
          hint: 'If stuck, review c9_geo_ch1_1 (Earth\'s Layers) to recall lithosphere/asthenosphere.',
          misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with.',
          parts: [
                { id: 'a', prompt: 'Explain why convection currents in the mantle cause tectonic plates to move.', answer: 'Heat from the core creates rising hot magma and sinking cooler magma in the',
                  options: ['Heat from the core creates rising hot magma and sinking cooler magma in the', 'plates move because the Earth is spinning', 'plates float like boats on water', 'plate boundary'],
                  hint: 'If stuck, review c9_geo_ch1_1 (Earth\'s Layers) to recall lithosphere/asthenosphere distinction and.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate.' },
                { id: 'b', prompt: 'On a world map, the Mid-Atlantic Ridge runs down the center of the Atlantic Ocean.', answer: 'Step 1: Recognize Mid-Atlantic Ridge as an underwater mountain chain',
                  options: ['Step 1: Recognize Mid-Atlantic Ridge as an underwater mountain chain', 'plate boundary', 'plate margin'],
                  hint: 'If stuck, review c9_geo_ch1_1 (Earth\'s Layers) to recall lithosphere/asthenosphere distinction and.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate.' },
                { id: 'c', prompt: 'Compare the geological activity at the Himalayan boundary (Indian Plate vs Eurasian Plate) with the Andes boundary (Nazca Plate vs South American Plate).', answer: 'Similarity: Both are convergent boundaries where plates collide',
                  options: ['Similarity: Both are convergent boundaries where plates collide', 'plate boundary', 'plate margin', 'both have volcanoes'],
                  hint: 'If stuck, review c9_geo_ch1_1 (Earth\'s Layers) to recall lithosphere/asthenosphere distinction and.',
                  misconception: 'Students often think "plate boundary" and "plate margin" are different terms, or that the Indian Plate boundary with the Eurasian Plate.' }
          ],
            remediations: { 'plate-boundary-and-plate-margin': { steps: ['Use a tectonic map of South Asia (from NCERT Atlas) and trace the Indian Plate boundary with three colored pencils: red.', 'Label each segment with the plate names and movement arrows.', 'Explain that a single plate can have all three boundary types simultaneously.', 'Practice with a blank map until the student can draw and label the Indian Plate boundaries from memory.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch1_3', difficulty: 'standard',
          question: 'Plate movements are the relative motions of lithospheric plates driven.',
          hint: 'Revisit c9_geo_ch1_2 to match boundary names (constructive/destructive/conservative) with.',
          misconception: 'Students think "convergent boundaries always involve subduction" and "divergent boundaries only occur in oceans.".',
          parts: [
                { id: 'a', prompt: 'What are the three types of plate movements and the primary geological feature formed at each boundary type?', answer: 'Correct answer: Convergent (plates move toward each other) forms',
                  options: ['Correct answer: Convergent (plates move toward each other) forms', 'divergent boundaries form mountains', 'convergent boundaries always involve subduction', 'divergent boundaries only occur in oceans'],
                  hint: 'Revisit c9_geo_ch1_2 to match boundary names (constructive/destructive/conservative) with movement.',
                  misconception: 'Students think "convergent boundaries always involve subduction" and "divergent boundaries only occur in oceans." In reality.' }
          ],
            remediations: { 'convergent-boundaries-always-involve-subduction': { steps: ['Use a physical model — two foam sheets (plates) on honey (asthenosphere).', 'Pull apart: foam tears, honey rises (mid-ocean ridge/rift valley).', 'Slide sideways: sheets grind, no up/down motion (transform).', 'Map each model outcome to Indian Plate boundaries using a tectonic map — label Himalayas (buckling), Central Indian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
