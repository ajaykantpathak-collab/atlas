import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch03_p1: SimDef = {
    id: 'v3_c11_geo_ch03_p1',
    title: 'Interior of the Earth · Part 1/2',
    subtitle: 'Probe a planet you cannot dig into — with earthquakes as the stethoscope.',
    classLevel: 11, subject: 'geography', topic: 'Interior of the Earth · Part 1/2',
    chapters: ['c11_geo_ch03'],
    nodeIds: ['c11_geo_cbse_03_001', 'c11_geo_cbse_03_002', 'c11_geo_cbse_03_003', 'c11_geo_cbse_03_004', 'c11_geo_cbse_03_005', 'c11_geo_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geophysicist reading quakes for structure', intro: 'Humanity\'s deepest scratch is 0.2% of the way down — yet we claim to know the core. Here\'s the evidence trail.', goal: 'Distinguish direct from indirect sources and explain what seismic waves reveal about Earth\'s layers.' },
    discovery: {
        question: 'The Kola borehole reached 12.2 km — headlines called it a tunnel into the mantle. Did it get there?',
        options: ['No — continental crust runs 30-50 km thick; the hole never left the crust, barely 0.2% of Earth\'s radius', 'Yes — 12 km easily passes the crust', 'Yes — but only into the upper mantle', 'No — because the drill melted at the crust-mantle boundary'],
        answer: 'No — continental crust runs 30-50 km thick; the hole never left the crust, barely 0.2% of Earth\'s radius',
        hook: 'We can\'t reach the deep Earth, so we listen to it — earthquakes are the ultrasound, and S-waves vanishing in the outer core is how we know it\'s liquid.',
    },
    teaching: [
        { title: 'Sources of Information about Earth\'s Interior: Direct and Indirect', text: 'Direct sources of information about Earth\'s interior are materials physically obtained from the crust and upper mantle through mining, deep drilling, and volcanic eruptions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match direct sources (mines, drills, volcanoes) against indirect ones (seismic waves, meteorites), then use P-S arrival gaps to locate an epicentre.',
        labels: ['Sources of Information about', 'Seismic Waves: P-waves, S-waves', 'Structure of Earth\'s Interior', 'Major Discontinuities: Mohorovic, Gutenberg,', 'Composition of the Crust', 'The Mantle: Asthenosphere'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_001', title: 'Sources of Information about Earth\'s Interior: Direct and Indirect',
          caseStudy: { intro: 'Imagine standing at the Kolar Gold Fields in Karnataka, where mines once reached 3.2 km deep—yet Earth\'s radius is 6,371 km.',
            decisions: [{ prompt: 'Name two direct sources of information about Earth\'s interior and state the maximum depth they have reached as a percentage of Earth\'s.', options: [
                { text: 'Direct sources: deep drilling (Kola Superdeep Borehole, 12.2 km ≈ 0.19% of Earth\'s', outcome: 'Direct sources: deep drilling (Kola Superdeep Borehole, 12.2 km ≈ 0.19% of Earth\'s radius) and.' },
                { text: 'mining reaching the mantle', outcome: 'Not quite — Students often believe that volcanic eruptions bring material from the core, or that the deepest.', reveals: 'volcanic-eruptions-bring-material-from' },
                { text: 'drilling reaching the core', outcome: 'Not quite — Students often believe that volcanic eruptions bring material from the core, or that the deepest.', reveals: 'volcanic-eruptions-bring-material-from' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_002', title: 'Seismic Waves: P-waves, S-waves and Surface Waves',
          scaffold: { problem: 'An earthquake occurs in the Hindu Kush region (Afghanistan). A seismograph station in New Delhi records the P-wave at 04:32:15 UTC and the.',
            steps: [
            { text: 'Calculate P-S time interval = 04:36:45 - 04:32:15 = 4 minutes 30 seconds = 270 seconds.' },
            { text: 'Apply empirical formula: Distance = Δt × 8 = 270 × 8 = 2160 km.' },
            { text: 'Recognize this assumes average crustal velocities (Vp=6, Vs=3.5 km/s) and straight ray paths in homogeneous medium.' },
            { text: 'Actual path traverses heterogeneous crust, mantle; velocities increase with depth causing ray bending (refraction).' },
            { text: 'Real distance requires travel-time tables (Jeffreys-Bullen) accounting for layered Earth model; for Hindu Kush-Delhi.', faded: true, blankAnswer: 'Approximate distance = 2160 km using simple formula; actual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_003', title: 'Structure of Earth\'s Interior: Crust, Mantle and Core',
          scaffold: { problem: 'A seismic station at Delhi records a P-wave arrival from an earthquake at the Hindu Kush region (focus depth 200 km).',
            steps: [
            { text: 'Identify the velocity contrast at the Moho: v₁ = 6.5 km/s (crust), v₂ = 8.0 km/s (mantle).' },
            { text: 'Apply Snell\'s law for critical angle: sin i_c = v₁ / v₂ = 6.5 / 8.0 = 0.8125.' },
            { text: 'Compute i_c = sin⁻¹(0.8125) ≈ 54.3°.' },
            { text: 'For a flat layer, the ray travels down to Moho at critical angle, reflects, and returns symmetrically.' },
            { text: 'Total epicentral distance for PmP = 2x ≈ 111.4 km. This is the minimum distance; closer than this, the ray refracts.', faded: true, blankAnswer: 'Critical angle = 54.3°; Minimum epicentral distance for PmP.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_004', title: 'Major Discontinuities: Mohorovic, Gutenberg, Lehmann',
          caseStudy: { intro: 'Imagine you feel a slight tremor and later see a seismogram on a news report showing jagged lines arriving at different times.',
            decisions: [{ prompt: 'Name the three major discontinuities in Earth\'s interior in order from shallowest to deepest, and state the approximate depth of each.', options: [
                { text: 'The three major discontinuities from shallowest to deepest are: (1) Mohorovičić', outcome: 'The three major discontinuities from shallowest to deepest are: (1) Mohorovičić discontinuity.' },
                { text: 'the Mohorovičić discontinuity is a single, fixed depth globally (e', outcome: 'Not quite — Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30.', reveals: 'the-mohorovi-i-discontinuity-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_006', title: 'The Mantle: Asthenosphere and Mesosphere',
          scaffold: { problem: 'A seismic station records a P-wave arrival from a deep-focus earthquake (depth 500 km) at an epicentral distance of 30°.',
            steps: [
            { text: 'Identify the layers the ray traverses. At 30° epicentral distance (~3,330 km great-circle arc), the ray turns in the.' },
            { text: 'Calculate vertical travel time through each layer segment. Source at 500 km → 410 km (90 km in transition zone, Vp=9.9.' },
            { text: 'The remaining travel time (385 – 60.8 ≈ 324 s) is spent on the horizontal/downgoing legs.' },
            { text: 'Confirm by checking maximum distance for upper-mantle turning ray: critical angle at 410 km, i_c = arcsin(8.1/9.9) ≈.' },
            { text: 'Conclude: Yes, the ray samples the mesosphere. The 500 km deep source is in the transition zone; the ray goes.', faded: true, blankAnswer: 'Yes, the ray path penetrates the mesosphere (lower mantle).' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A news clip claims a proposed \'super-deep drill\' will soon \'tap Earth\'s core for clean energy\', and a volcano segment says eruptions \'bring up material from the core.\' Your classmates take both at face value.',
            decisions: [{ prompt: 'What does the science of Earth\'s interior actually allow?', options: [
                { text: 'Correct the scale: the deepest borehole ever (Kola, 12.2 km) reached only ~0.2% of Earth\'s radius and never left the continental crust; volcanoes tap at most the upper mantle. So we know the interior mainly through indirect geophysical proxies — seismic waves refracting at layer boundaries, gravity and magnetic anomalies, meteorites as chemical analogues. P-waves cross the liquid outer core because compressional waves propagate in fluids; S-waves can\'t because fluids have zero shear modulus.', outcome: 'Both claims collapse: drilling can never reach the core, and our layered model of Earth\'s interior comes from waves and fields, not samples.' },
                { text: 'Accept the drill claim — if Kola reached 12 km, a bigger project can plausibly reach the mantle and then the core.', outcome: 'Even the mantle start (~35 km under continents) is nearly 3× deeper than Kola; core is ~2,900 km down — direct access is physically out of reach, which is why indirect sources dominate.', reveals: 'drilling-can-reach-core' },
                { text: 'Correct it differently — P-waves pass through the liquid core simply because they\'re the fastest waves.', outcome: 'Speed isn\'t the reason: penetration depends on wave type. Compressional waves need only bulk modulus; shear waves need shear modulus, which liquids lack — that\'s what kills S-waves.', reveals: 'speed-determines-penetration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every picture of Earth\'s layers was drawn by waves, not by eyes — the interior is the least visited place we map.',
            decisions: [{ prompt: 'What comes next? Interior of the Earth · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Interior of the Earth · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_001', difficulty: 'standard',
          question: 'Direct sources of information about Earth\'s interior are materials physically.',
          hint: 'Review Class 9 Geography Chapter 1: "Earth\'s Layers: Crust, Mantle and Core" and.',
          misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we rely solely on direct sources to understand Earth\'s core, and what fundamental physical property of seismic waves makes them the most powerful.', answer: 'Direct sources are limited to the crust and uppermost mantle',
                  options: ['Direct sources are limited to the crust and uppermost mantle', 'seismic waves tell us about earthquakes'],
                  hint: 'Review Class 9 Geography Chapter 1: "Earth\'s Layers: Crust, Mantle and Core" and "Earthquakes.',
                  misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have reached the mantle.' },
                { id: 'b', prompt: 'Compare the information provided by gravity anomalies and magnetic surveys about Earth\'s interior. Which reveals sharp boundaries better, and why?', answer: 'Gravity anomalies reflect lateral density variations and are smoothed by the',
                  options: ['Gravity anomalies reflect lateral density variations and are smoothed by the', 'clear layer boundaries'],
                  hint: 'Review Class 9 Geography Chapter 1: "Earth\'s Layers: Crust, Mantle and Core" and "Earthquakes.',
                  misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have reached the mantle.' }
          ],
            remediations: { 'volcanic-eruptions-bring-material-from': { steps: ['Draw a to-scale cross-section: Earth radius 6,371 cm on paper = 63.71 m; mark 12.2 cm for deepest borehole.', 'Show a volcano diagram with magma chamber at 50–100 km depth, far above the core-mantle boundary (2,900 km).', 'Have students calculate percentages: 12.2/6371 × 100 = 0.19%.', 'Emphasize that all direct samples come from the thin "skin" of the crust.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_002', difficulty: 'standard',
          question: 'Seismic waves are elastic waves of energy generated by earthquakes.',
          hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for.',
          misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids.',
          parts: [
                { id: 'a', prompt: 'A seismograph station records a P-wave arrival at 10:00:00 UTC and an S-wave arrival at 10:04:00 UTC. Calculate the epicenter distance from the station.', answer: 'Step 1: Time difference = 4 minutes = 240 seconds',
                  options: ['Step 1: Time difference = 4 minutes = 240 seconds', 'P-waves travel through liquids'],
                  hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for focus/epicenter.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' },
                { id: 'b', prompt: 'Compare the particle motion of P-waves, S-waves, and Rayleigh waves.', answer: 'P-waves: particle motion parallel to propagation (push-pull) → causes vertical',
                  options: ['P-waves: particle motion parallel to propagation (push-pull) → causes vertical', 'P-waves travel through liquids'],
                  hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for focus/epicenter.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' }
          ],
            remediations: { 'p-waves-travel-through-liquids': { steps: ['Use a slinky demo - push-pull creates compressions (P-wave), side-flick creates shear (S-wave).', 'Submerge slinky in water - push-pull still works (sound waves travel in water), side-flick dies immediately (no shear.', 'Connect to Earth: outer core is liquid iron (like water for shear waves), so S-waves stop at 2900 km depth creating.', 'Have student draw ray paths showing P-wave refraction at core-mantle boundary vs S-wave termination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The P-wave shadow zone (103°-142°) is smaller than the S-wave shadow zone (103°-180°) because P-waves travel faster." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'P-waves travel through liquids'],
                  hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for focus/epicenter.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' },
                { id: 'b', prompt: 'Design a simple experiment using a slinky and a rope to demonstrate the difference between P-wave and S-wave particle motion to a Class 9 student.', answer: 'Stretch a slinky on a smooth floor',
                  options: ['Stretch a slinky on a smooth floor', 'P-waves travel through liquids'],
                  hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for focus/epicenter.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' }
          ],
            remediations: { 'p-waves-travel-through-liquids': { steps: ['Use a slinky demo - push-pull creates compressions (P-wave), side-flick creates shear (S-wave).', 'Submerge slinky in water - push-pull still works (sound waves travel in water), side-flick dies immediately (no shear.', 'Connect to Earth: outer core is liquid iron (like water for shear waves), so S-waves stop at 2900 km depth creating.', 'Have student draw ray paths showing P-wave refraction at core-mantle boundary vs S-wave termination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_003', difficulty: 'standard',
          question: 'The Earth\'s interior is concentrically layered into three principal.',
          hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section.',
          misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the.',
          parts: [
                { id: 'a', prompt: 'State the approximate thickness range of the continental crust and the oceanic crust, and name the dominant rock type in each.', answer: 'Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks',
                  options: ['Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks', 'both are 30 km', 'oceanic crust is granitic', 'the mantle is molten magma'],
                  hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section — practice.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' },
                { id: 'b', prompt: 'Explain why S-waves cannot travel through the outer core, and what this tells us about its physical state.', answer: 'S-waves are shear waves requiring material rigidity (shear modulus > 0)',
                  options: ['S-waves are shear waves requiring material rigidity (shear modulus > 0)', 'S-waves are absorbed by heat', 'the mantle is molten magma', 'magma comes from the mantle'],
                  hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section — practice.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' },
                { id: 'c', prompt: 'A P-wave travels vertically downward from the surface. At the Mohorovičić discontinuity (depth 35 km), its velocity jumps from 6.8 km/s to 8.1 km/s.', answer: 'Step 1: Identify v1 = 6.8 km/s (crust), v2 = 8.1 km/s (mantle)',
                  options: ['Step 1: Identify v1 = 6.8 km/s (crust), v2 = 8.1 km/s (mantle)', 'the mantle is molten magma', 'magma comes from the mantle', '**"the mantle is molten magma"**'],
                  hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section — practice.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' },
                { id: 'd', prompt: 'Compare the Gutenberg discontinuity (core-mantle boundary) and the Lehmann discontinuity (inner-outer core boundary) in terms of: (a) depth, (b) seismic wave.', answer: 'depth, (',
                  options: ['depth, (', 'the mantle is molten magma', 'magma comes from the mantle', '**"the mantle is molten magma"**'],
                  hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section — practice.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' }
          ],
            remediations: { 'the-mantle-is-molten-magma': { steps: ['Show a **seismic velocity vs depth graph** (PREM model) — point out S-wave velocities are non-zero throughout the.', 'Use the **"chocolate bar" analogy**: a solid chocolate bar flows over months under weight (solid-state creep) but.', 'Have students calculate mantle viscosity from post-glacial rebound data (e.g., Fennoscandia uplift ~10 mm/yr →.', 'Re-read c11_geo_cbse_03_006 (Asthenosphere) focusing on "partial melt ≠ fully molten."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_004', difficulty: 'standard',
          question: 'Major discontinuities are sharp boundaries within Earth\'s interior where.',
          hint: 'If stuck, revisit c11_geo_cbse_03_002 (Seismic Waves) to review how P and S waves behave.',
          misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse.',
          parts: [
                { id: 'a', prompt: 'Name the three major discontinuities in Earth\'s interior in order from shallowest to deepest, and state the approximate depth of each.', answer: 'The three major discontinuities from shallowest to deepest are: (1) Mohorovičić',
                  options: ['The three major discontinuities from shallowest to deepest are: (1) Mohorovičić', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_03_002 (Seismic Waves) to review how P and S waves behave.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' },
                { id: 'b', prompt: 'Explain why S-waves cannot pass through the Gutenberg discontinuity while P-waves can, and what this tells us about the physical state of the outer core.', answer: 'S-waves are shear waves that require a rigid medium to propagate',
                  options: ['S-waves are shear waves that require a rigid medium to propagate', 'both waves stop, or that S-waves slow down but continue', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_03_002 (Seismic Waves) to review how P and S waves behave.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' },
                { id: 'c', prompt: 'Compare the Mohorovičić and Gutenberg discontinuities in terms of: (a) the layers they separate, (b) the nature of the velocity change (increase or decrease).', answer: 'the layers they separate, (',
                  options: ['the layers they separate, (', 'both show velocity increases, or confusing', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'If stuck, revisit c11_geo_cbse_03_002 (Seismic Waves) to review how P and S waves behave.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' }
          ],
            remediations: { 'the-mohorovi-i-discontinuity-is': { steps: ['Draw a side-by-side cross-section of oceanic and continental crust to scale, labeling Moho depth in each (e.g., 7.', 'Use the concept of isostasy (from c11_geo_cbse_03_003) to explain why thicker crust has a deeper Moho (like icebergs).', 'Show a table of typical P-wave velocities above and below Moho for both settings, emphasizing the velocity jump.', 'Practice a board-style question: "Explain why the Moho is deeper under the Himalayas than under the Indian Ocean."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_005', difficulty: 'standard',
          question: 'Continental crust is the thicker (30-50 km), less dense (~2.7 g/cm³), granitic.',
          hint: 'If stuck, revisit the Moho and seismic wave velocities (c11_geo_cbse_03_004) and the.',
          misconception: 'Students often think the oceanic crust is thicker because the ocean is "deep", conflating water depth with crustal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Continental crust is the thicker (30-50 km), less dense (~2.7 g/cm³), granitic (sial:',
                  options: ['Continental crust is the thicker (30-50 km), less dense (~2.7 g/cm³), granitic (sial:', 'Direct sources of information about Earth\'s interior are materials physically obtained', 'Seismic waves are elastic waves of energy generated by earthquakes or explosions that', 'The Earth\'s interior is concentrically layered into three principal compositional zones:'],
                  hint: 'If stuck, revisit the Moho and seismic wave velocities (c11_geo_cbse_03_004) and the concept.',
                  misconception: 'Students often think the oceanic crust is thicker because the ocean is "deep", conflating water depth with crustal thickness.' }
          ],
            remediations: { 'the-oceanic-crust-is-thicker': { steps: ['Draw a to-scale cross-section on graph paper: 1 cm = 10 km.', 'Plot continental crust (3.5 cm thick, label 2.7 g/cm³), mantle (density 3.3 g/cm³), then oceanic crust (0.7 cm thick.', 'Shade the "water" column above oceanic crust to show 4-5 km water depth.', 'Ask the student to explain why the continental crust surface is higher despite both crusts resting on the same mantle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_006', difficulty: 'standard',
          question: 'The mantle is the thickest layer of Earth\'s interior (≈2,900 km), bounded above.',
          hint: 'Revisit node 002 (Seismic Waves) and practice drawing/annotating the PREM velocity.',
          misconception: 'Students often think the asthenosphere is a **liquid layer** ("magma ocean") because textbooks say it "flows" and has.',
          parts: [
                { id: 'a', prompt: 'A seismic tomography cross-section shows a low-velocity anomaly at 150 km depth beneath a mid-ocean ridge extending laterally 200 km.', answer: 'Step 1: ΔVs = 4.2 – 4.6 = –0.4 km/s',
                  options: ['Step 1: ΔVs = 4.2 – 4.6 = –0.4 km/s', 'magma ocean', 'and has'],
                  hint: 'Revisit node 002 (Seismic Waves) and practice drawing/annotating the PREM velocity profile for the.',
                  misconception: 'Students often think the asthenosphere is a **liquid layer** ("magma ocean") because textbooks say it "flows" and has "partial melt.".' }
          ],
            remediations: { 'the-asthenosphere-is-a-liquid': { steps: ['Show a stress–strain rate diagram for olivine: plot dislocation creep (asthenosphere) vs.', 'diffusion creep (mesosphere) fields.', 'Use a spring-dashpot analogy: asthenosphere = low-viscosity dashpot; mesosphere = high-viscosity dashpot in series with.', 'Have students calculate melt fraction from Vs reduction (as in DQ3) to internalize that 2% melt → ~5% Vs drop, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
