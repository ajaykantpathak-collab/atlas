import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch03_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch03_p2: SimDef = {
    id: 'v3_c11_geo_ch03_p2',
    title: 'Interior of the Earth · Part 2/2',
    subtitle: 'Probe a planet you cannot dig into — with earthquakes as the stethoscope.',
    classLevel: 11, subject: 'geography', topic: 'Interior of the Earth · Part 2/2',
    chapters: ['c11_geo_ch03'],
    nodeIds: ['c11_geo_cbse_03_007', 'c11_geo_cbse_03_008', 'c11_geo_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geophysicist reading quakes for structure', intro: 'Humanity\'s deepest scratch is 0.2% of the way down — yet we claim to know the core. Here\'s the evidence trail.', goal: 'Distinguish direct from indirect sources and explain what seismic waves reveal about Earth\'s layers.' },
    discovery: {
        question: 'The Kola borehole reached 12.2 km — headlines called it a tunnel into the mantle. Did it get there?',
        options: ['No — continental crust runs 30-50 km thick; the hole never left the crust, barely 0.2% of Earth\'s radius', 'Yes — 12 km easily passes the crust', 'Yes — but only into the upper mantle', 'No — because the drill melted at the crust-mantle boundary'],
        answer: 'No — continental crust runs 30-50 km thick; the hole never left the crust, barely 0.2% of Earth\'s radius',
        hook: 'We can\'t reach the deep Earth, so we listen to it — earthquakes are the ultrasound, and S-waves vanishing in the outer core is how we know it\'s liquid.',
    },
    teaching: [
        { title: 'The Core: Outer Core (Liquid) and Inner Core (Solid)', text: 'The Earth\'s core is the innermost layer, divided into a liquid **outer core** (2,900–5,100 km depth) composed primarily of molten iron-nickel alloy with lighter elements (sulfur, oxygen), and a solid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match direct sources (mines, drills, volcanoes) against indirect ones (seismic waves, meteorites), then use P-S arrival gaps to locate an epicentre.',
        labels: ['The Core: Outer Core', 'Temperature Inside the Earth', 'Volcanism as Evidence'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_007', title: 'The Core: Outer Core (Liquid) and Inner Core (Solid)',
          caseStudy: { intro: 'Hold a compass and observe the needle pointing north — this invisible force originates 2,900 km beneath your feet.',
            decisions: [{ prompt: 'State the approximate depth range of the outer core and inner core, and name the seismic discontinuity that separates the mantle from the.', options: [
                { text: 'Outer core: 2,900–5,100 km', outcome: 'Outer core: 2,900–5,100 km; Inner core: 5,100–6,371 km. The Gutenberg discontinuity (core-mantle.' },
                { text: 'it\'s hotter at the center', outcome: 'Not quite — Students believe the inner core is liquid because "it\'s hotter at the center", ignoring that.', reveals: 'the-inner-core-is-liquid' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_008', title: 'Temperature Inside the Earth: Geothermal Gradient',
          scaffold: { problem: 'The Main Central Thrust zone in the Himachal Himalaya has a measured surface heat flow of 85 mW/m².',
            steps: [
            { text: 'Identify given values — heat flow q = 85 mW/m² = 0.085 W/m², thermal conductivity k = 3.2 W/m·K, surface temperature T₀.' },
            { text: 'Apply Fourier\'s Law in 1D steady state: q = k × G, so G = q / k = 0.085 / 3.2 = 0.02656 K/m = 26.6°C/km.' },
            { text: 'Calculate expected conductive temperature at 2 km: T(z) = T₀ + G × z = 12°C + (26.6°C/km × 2 km) = 12 + 53.2 = 65.2°C.' },
            { text: 'Compare with measured temperature (95°C) — discrepancy = 95 - 65.2 = 29.8°C higher than conductive prediction.' },
            { text: 'Interpret discrepancy — the measured temperature is significantly higher, indicating advective heat transfer.' },
            { text: 'Relate to tectonic setting — the Main Central Thrust is a major crustal-scale shear zone; frictional heating during.', faded: true, blankAnswer: 'Near-surface conductive gradient = 26.6°C/km. Expected.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_009', title: 'Volcanism as Evidence of Earth\'s Interior Composition',
          scaffold: { problem: 'A basalt from the Mid-Atlantic Ridge has 0.15 ppm Nb and 0.8 ppm La. The primitive mantle values are Nb = 0.71 ppm, La = 0.68 ppm.',
            steps: [
            { text: 'Identify the batch melting equation: Cₗ/C₀ = 1 / [D + F(1-D)] → rearrange for F = [(C₀/Cₗ) - D] / (1-D)' },
            { text: 'Calculate F using Nb: C₀/Cₗ = 0.71/0.15 = 4.73; F_Nb = (4.73 - 0.015) / (1 - 0.015) = 4.715 / 0.985 ≈ 0.0479 or 4.8%' },
            { text: 'Calculate F using La: C₀/Cₗ = 0.68/0.8 = 0.85; F_La = (0.85 - 0.005) / (1 - 0.005) = 0.845 / 0.995 ≈ 0.849 or 84.9%' },
            { text: 'Recognize F_La = 85% is geologically impossible for MORB (typical F = 5-20%).' },
            { text: 'Conclude F ≈ 5% from Nb is reliable; Nb is less incompatible, less prone to source heterogeneity effects, and gives.', faded: true, blankAnswer: 'Degree of partial melting F ≈ 5% (from Nb). La gives.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A news clip claims a proposed \'super-deep drill\' will soon \'tap Earth\'s core for clean energy\', and a volcano segment says eruptions \'bring up material from the core.\' Your classmates take both at face value.',
            decisions: [{ prompt: 'What does the science of Earth\'s interior actually allow?', options: [
                { text: 'Correct the scale: the deepest borehole ever (Kola, 12.2 km) reached only ~0.2% of Earth\'s radius and never left the continental crust; volcanoes tap at most the upper mantle. So we know the interior mainly through indirect geophysical proxies — seismic waves refracting at layer boundaries, gravity and magnetic anomalies, meteorites as chemical analogues. P-waves cross the liquid outer core because compressional waves propagate in fluids; S-waves can\'t because fluids have zero shear modulus.', outcome: 'Both claims collapse: drilling can never reach the core, and our layered model of Earth\'s interior comes from waves and fields, not samples.' },
                { text: 'Accept the drill claim — if Kola reached 12 km, a bigger project can plausibly reach the mantle and then the core.', outcome: 'Even the mantle start (~35 km under continents) is nearly 3× deeper than Kola; core is ~2,900 km down — direct access is physically out of reach, which is why indirect sources dominate.', reveals: 'drilling-can-reach-core' },
                { text: 'Correct it differently — P-waves pass through the liquid core simply because they\'re the fastest waves.', outcome: 'Speed isn\'t the reason: penetration depends on wave type. Compressional waves need only bulk modulus; shear waves need shear modulus, which liquids lack — that\'s what kills S-waves.', reveals: 'speed-determines-penetration' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_03_009', title: 'You made it',
          caseStudy: { intro: 'Every picture of Earth\'s layers was drawn by waves, not by eyes — the interior is the least visited place we map.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_007', difficulty: 'standard',
          question: 'The Earth\'s core is the innermost layer, divided into a liquid **outer core**.',
          hint: 'Review seismic wave shadow zones (node 002) and the definition of Gutenberg/Lehmann.',
          misconception: 'Students believe the inner core is liquid because "it\'s hotter at the center", ignoring that pressure raises the.',
          parts: [
                { id: 'a', prompt: 'State the approximate depth range of the outer core and inner core, and name the seismic discontinuity that separates the mantle from the outer core.', answer: 'Outer core: 2,900–5,100 km',
                  options: ['Outer core: 2,900–5,100 km', 'it\'s hotter at the center'],
                  hint: 'Review seismic wave shadow zones (node 002) and the definition of Gutenberg/Lehmann discontinuities.',
                  misconception: 'Students believe the inner core is liquid because "it\'s hotter at the center", ignoring that pressure raises the melting point of iron more.' },
                { id: 'b', prompt: 'Explain why S-waves cannot travel through the outer core, and describe what the S-wave shadow zone (103°–180° epicentral distance) tells us about the outer.', answer: 'S-waves are shear waves requiring material rigidity (shear modulus > 0)',
                  options: ['S-waves are shear waves requiring material rigidity (shear modulus > 0)', 'S-waves are absorbed', 'S-waves travel slower in liquids', 'it\'s hotter at the center'],
                  hint: 'Review seismic wave shadow zones (node 002) and the definition of Gutenberg/Lehmann discontinuities.',
                  misconception: 'Students believe the inner core is liquid because "it\'s hotter at the center", ignoring that pressure raises the melting point of iron more.' },
                { id: 'c', prompt: 'The inner core temperature (~5,700 K) exceeds the outer core temperature (~4,500–5,000 K), yet the inner core is solid while the outer core is liquid.', answer: 'The melting point of iron increases with pressure (positive Clapeyron slope)',
                  options: ['The melting point of iron increases with pressure (positive Clapeyron slope)', 'higher pressure', 'it\'s hotter at the center'],
                  hint: 'Review seismic wave shadow zones (node 002) and the definition of Gutenberg/Lehmann discontinuities.',
                  misconception: 'Students believe the inner core is liquid because "it\'s hotter at the center", ignoring that pressure raises the melting point of iron more.' }
          ],
            remediations: { 'the-inner-core-is-liquid': { steps: ['** Revisit node 002 (Seismic Waves) — physically demonstrate with a slinky: P-wave (push-pull) travels through water.', '** Use a phase diagram of iron (pressure vs. temperature) — plot the geotherm and melting curve; show they cross at the.', '** Simulate geodynamo with a rotating tank of convecting fluid (or watch NASA\'s "Earth\'s Magnetic Field" visualization).', '** Calculate Curie temperature vs. core temperature: 1,043 K vs. 4,500+ K — prove permanent magnetism is impossible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_008', difficulty: 'standard',
          question: 'The geothermal gradient is the rate of increase in temperature with depth.',
          hint: 'If stuck, revisit Class 11 Physics Chapter 11 (Thermal Properties of Matter) for.',
          misconception: 'Students often believe the geothermal gradient is constant everywhere (~25–30°C/km) and that temperature increases.',
          parts: [
                { id: 'a', prompt: 'Explain why the geothermal gradient is steeper in the upper crust than in the lower crust and mantle, even though temperature increases continuously with depth.', answer: 'The gradient is steeper in the upper crust',
                  options: ['The gradient is steeper in the upper crust', 'higher temperature', 'pressure'],
                  hint: 'If stuck, revisit Class 11 Physics Chapter 11 (Thermal Properties of Matter) for Fourier\'s law and.',
                  misconception: 'Students often believe the geothermal gradient is constant everywhere (~25–30°C/km) and that temperature increases linearly all the way.' }
          ],
            remediations: { 'the-geothermal-gradient-is-constant': { steps: ['Plot a temperature-depth profile for three real boreholes — Kolar (craton), Puga (geothermal), and a sedimentary basin.', 'Calculate gradients for each 500 m interval and observe how they change with depth and location.', 'Overlay the lithosphere-asthenosphere boundary depth (from seismic node c11_geo_cbse_03_004) and mark where the.', 'Re-read the section on heat transfer mechanisms (conduction, advection, radiation) in the textbook and label each.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_009', difficulty: 'standard',
          question: 'Volcanism is the process by which molten rock (magma), gases, and solid.',
          hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
          misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.',
          parts: [
                { id: 'a', prompt: 'A basalt sample from the Deccan Traps has 48% SiO₂, 12% MgO, and 0.2% K₂O. A sample from Mount St. Helens (Cascade arc) has 62% SiO₂, 3% MgO, and 1.5% K₂O.', answer: 'The Deccan basalt (48% SiO₂, 12% MgO) is closer to a primary mantle melt',
                  options: ['The Deccan basalt (48% SiO₂, 12% MgO) is closer to a primary mantle melt', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' },
                { id: 'b', prompt: 'Compare the volatile content (H₂O, CO₂, S) of magmas at mid-ocean ridges, hotspots, and subduction zones.', answer: 'MORB: low volatiles (0.1-0.3% H₂O)',
                  options: ['MORB: low volatiles (0.1-0.3% H₂O)', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' }
          ],
            remediations: { 'volcanoes-erupt-mantle-material-directly': { steps: ['Use a melting diagram (pressure vs. temperature) to show how peridotite partial melting produces basalt, leaving.', 'Demonstrate with a simple analogy — melting chocolate chips in cookie dough: the melt (chocolate-rich) differs from the.', 'Plot real data — MgO vs. SiO₂ for MORB, OIB, and arc basalts — to show systematic offsets from primitive mantle.', 'Introduce the concept of "primitive magma" (Mg# > 0.7, Ni > 250 ppm) as the closest approximation to primary melt, and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Volcanic gases directly represent the composition of Earth\'s primordial atmosphere." Consider degassing history, mantle.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' },
                { id: 'b', prompt: 'Design a field investigation plan to determine whether a newly discovered volcanic rock suite in the Andaman Islands represents a subduction-related arc magma.', answer: 'A strong plan includes: (1) **K₂O vs',
                  options: ['A strong plan includes: (1) **K₂O vs', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' }
          ],
            remediations: { 'volcanoes-erupt-mantle-material-directly': { steps: ['Use a melting diagram (pressure vs. temperature) to show how peridotite partial melting produces basalt, leaving.', 'Demonstrate with a simple analogy — melting chocolate chips in cookie dough: the melt (chocolate-rich) differs from the.', 'Plot real data — MgO vs. SiO₂ for MORB, OIB, and arc basalts — to show systematic offsets from primitive mantle.', 'Introduce the concept of "primitive magma" (Mg# > 0.7, Ni > 250 ppm) as the closest approximation to primary melt, and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
