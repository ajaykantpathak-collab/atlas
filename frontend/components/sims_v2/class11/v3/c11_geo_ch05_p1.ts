import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch05_p1: SimDef = {
    id: 'v3_c11_geo_ch05_p1',
    title: 'Minerals and Rocks · Part 1/2',
    subtitle: 'Tell a mineral from a rock, then name one from a handful of tests.',
    classLevel: 11, subject: 'geography', topic: 'Minerals and Rocks · Part 1/2',
    chapters: ['c11_geo_ch05'],
    nodeIds: ['c11_geo_cbse_05_001', 'c11_geo_cbse_05_002', 'c11_geo_cbse_05_003', 'c11_geo_cbse_05_004', 'c11_geo_cbse_05_005', 'c11_geo_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field geologist with a streak plate and a steel file', intro: 'A glassy fragment scratches your phone screen but leaves a white streak — run the checklist before you name it.', goal: 'Apply the five-part mineral definition and the diagnostic properties used in field identification.' },
    discovery: {
        question: 'Granite: natural, hard, shiny, dug straight from the earth. Is it a mineral?',
        options: ['No — it\'s a rock, an aggregate of quartz, feldspar and mica; a mineral is a single crystalline phase with fixed composition', 'Yes — every hard natural solid qualifies', 'Yes — it\'s even harder than quartz', 'No — because minerals must be translucent'],
        answer: 'No — it\'s a rock, an aggregate of quartz, feldspar and mica; a mineral is a single crystalline phase with fixed composition',
        hook: 'A mineral has one recipe; a rock is the baked dish — granite fails the mineral test the moment you see three ingredients in it.',
    },
    teaching: [
        { title: 'Minerals: Definition and Diagnostic Characteristics', text: 'A mineral is a naturally occurring, inorganic solid substance with a definite chemical composition and an ordered internal atomic structure (crystalline), formed through geological processes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a field identification — lustre, streak, hardness, cleavage — on an unknown sample, then argue why \'calcite is sedimentary\' is a lazy rule.',
        labels: ['Minerals: Definition and Diagnostic', 'Formation of Minerals: Igneous,', 'Major Mineral Groups: Silicates,', 'Rocks: Classification and', 'Igneous Rocks: Intrusive (Plutonic)', 'Igneous Rocks: Granite, Basalt,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_05_001', title: 'Minerals: Definition and Diagnostic Characteristics',
          scaffold: { problem: 'A mineral sample weighs 24.5 g in air and 14.7 g when immersed in water at 4°C.',
            steps: [
            { text: 'Identify the formula for specific gravity using Archimedes\' principle: SG = Weight in air / (Weight in air - Weight.' },
            { text: 'Substitute the given values: Weight in air = 24.5 g, Weight in water = 14.7 g.' },
            { text: 'Calculate loss of weight = 24.5 - 14.7 = 9.8 g. This equals the weight of water displaced, so volume of sample = 9.8.' },
            { text: 'Compute SG = 24.5 / 9.8 = 2.50. Alternatively, density = mass/volume = 24.5 g / 9.8 cm³ = 2.50 g/cm³; SG = 2.50 / 1.00.' },
            { text: 'Compare with known SG values of common minerals: quartz (2.65), feldspars (2.55-2.76), calcite (2.71), gypsum (2.32).', faded: true, blankAnswer: 'Specific Gravity = 2.50. Likely candidates: plagioclase.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_002', title: 'Formation of Minerals: Igneous, Sedimentary, Metamorphic Modes',
          caseStudy: { intro: 'Imagine you are trekking in the Western Ghats and see a sparkling pegmatite vein cutting through dark basalt – that is an igneous mineral forming right before.',
            decisions: [{ prompt: 'Name the three modes of mineral formation and give one Indian example of a mineral formed by each mode.', options: [
                { text: 'The three modes are: (1) Igneous – e.g., magnetite in the Kudremukh iron ore deposits', outcome: 'The three modes are: (1) Igneous – e.g., magnetite in the Kudremukh iron ore deposits (Karnataka).' },
                { text: 'calcite only forms in sedimentary rocks', outcome: 'Not quite — Students often believe that a mineral\'s chemical formula uniquely determines its formation mode.', reveals: 'a-mineral-s-chemical-formula' },
                { text: 'all minerals originate from cooling magma', outcome: 'Not quite — Students often believe that a mineral\'s chemical formula uniquely determines its formation mode.', reveals: 'a-mineral-s-chemical-formula' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_003', title: 'Major Mineral Groups: Silicates, Carbonates, Oxides, Sulphides',
          caseStudy: { intro: 'Look at the granite countertop in your kitchen or the limestone tiles in your school corridor – both are rocks but their constituent minerals belong.',
            decisions: [{ prompt: 'Name the anionic complex that defines the silicate mineral group and give its chemical formula.', options: [
                { text: 'The silicate group is defined by the SiO₄⁴⁻ tetrahedron', outcome: 'The silicate group is defined by the SiO₄⁴⁻ tetrahedron. Nesosilicate example: olivine (Mg,Fe)₂SiO₄.' },
                { text: 'silicate', outcome: 'Not quite — Students often believe that "silicate" and "silica" are synonymous and that all silicate minerals.', reveals: 'silicate-and-silica-are-synonymous' },
                { text: 'silica', outcome: 'Not quite — Students often believe that "silicate" and "silica" are synonymous and that all silicate minerals.', reveals: 'silicate-and-silica-are-synonymous' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_004', title: 'Rocks: Classification and the Rock Cycle',
          caseStudy: { intro: 'Begin by asking students to examine three common building stones in their neighbourhood: a polished granite kitchen countertop, a red sandstone boundary wall.',
            decisions: [{ prompt: 'Name the three major classes of rocks based on their mode of formation and give one typical Indian example for each.', options: [
                { text: 'The three classes are igneous (e.g., basalt of the Deccan Traps), sedimentary (e.g.,', outcome: 'The three classes are igneous (e.g., basalt of the Deccan Traps), sedimentary (e.g., sandstone.' },
                { text: 'granite, basalt, marble', outcome: 'Not quite — Students often believe that the rock cycle moves in one fixed direction (igneous → sedimentary →.', reveals: 'the-rock-cycle-moves-in' },
                { text: '“granite, basalt, marble” as the three classes', outcome: 'Not quite — Students often believe that the rock cycle moves in one fixed direction (igneous → sedimentary →.', reveals: 'the-rock-cycle-moves-in' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_005', title: 'Igneous Rocks: Intrusive (Plutonic) vs Extrusive (Volcanic) Forms',
          caseStudy: { intro: 'Observe a kitchen countertop made of granite and a road metal stone from a local quarry (likely basalt).',
            decisions: [{ prompt: 'Define intrusive and extrusive igneous rocks and state the primary factor that distinguishes their textures.', options: [
                { text: 'Intrusive rocks form from magma cooling slowly beneath the surface (coarse-grained)', outcome: 'Intrusive rocks form from magma cooling slowly beneath the surface (coarse-grained); extrusive.' },
                { text: 'intrusive rocks are always darker', outcome: 'Not quite — Students believe **"Intrusive = Granite" and "Extrusive = Basalt"** as fixed equivalences.', reveals: 'intrusive-granite-and-extrusive-basalt' },
                { text: 'Intrusive = Granite', outcome: 'Not quite — Students believe **"Intrusive = Granite" and "Extrusive = Basalt"** as fixed equivalences.', reveals: 'intrusive-granite-and-extrusive-basalt' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_006', title: 'Igneous Rocks: Granite, Basalt, Gabbro and Their Textures',
          caseStudy: { intro: 'Start with a kitchen analogy: imagine cooling molten chocolate — slow cooling in a bowl makes large crystals (granite), rapid quenching on a cold plate makes.',
            decisions: [{ prompt: 'A student finds a dark-coloured, heavy rock with visible interlocking crystals of pyroxene and plagioclase feldspar (each 3–5 mm) in a road.', options: [
                { text: 'The rock is gabbro', outcome: 'The rock is gabbro — intrusive, coarse-grained (phaneritic), mafic.' },
                { text: 'basalt', outcome: 'Not quite — Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They.', reveals: 'granite-any-light-coloured-coarse' },
                { text: 'granite = any light-coloured coarse rock', outcome: 'Not quite — Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They.', reveals: 'granite-any-light-coloured-coarse' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field trip a classmate pockets a shiny granite chunk saying \'nice mineral\', then argues: \'Calcite is a sedimentary mineral — its formula CaCO₃ proves it can only form in limestone.\'',
            decisions: [{ prompt: 'What two corrections does mineralogy demand?', options: [
                { text: 'First, granite is a rock — an aggregate of quartz, feldspar and mica — while a mineral is a single crystalline phase with definite composition (test it: streak, hardness, cleavage). Second, chemistry doesn\'t fix formation mode: calcite crystallises from carbonatite magma (igneous), precipitates in caves and evaporating water (sedimentary), and recrystallises into marble (metamorphic) — P-T conditions decide, not the formula.', outcome: 'Both errors corrected: rock ≠ mineral, and a formula names the substance while the geological setting explains how it formed.' },
                { text: 'Let \'granite is a mineral\' pass — it\'s hard, shiny, and natural, so it qualifies.', outcome: 'Hard and natural isn\'t enough: a mineral needs a single ordered crystalline structure and definite composition; granite is a mixture of three minerals.', reveals: 'rocks-and-minerals-same' },
                { text: 'Agree on calcite — CaCO₃ is the formula in limestone, so it\'s purely sedimentary.', outcome: 'Same formula, three modes: igneous carbonatites, sedimentary stalactites, metamorphic marble — formation depends on pressure-temperature-composition space, not formula alone.', reveals: 'formula-fixes-formation-mode' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Calcite grows in magma, drips into caves and recrystallises as marble — the formula is fixed, but the mode of birth can be any of three.',
            decisions: [{ prompt: 'What comes next? Minerals and Rocks · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Minerals and Rocks · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_001', difficulty: 'standard',
          question: 'A mineral is a naturally occurring, inorganic solid substance with a definite.',
          hint: 'Revisit Class 10 "Minerals: Definition, Types and Mode of Occurrence".',
          misconception: 'Students believe "rocks and minerals are the same thing" or "any solid natural material is a mineral." They classify.',
          parts: [
                { id: 'a', prompt: 'A student finds a shiny, gold-colored metallic mineral in a stream bed.', answer: 'Color is unreliable',
                  options: ['Color is unreliable', 'rocks and minerals are the same thing', 'any solid natural material is a mineral'],
                  hint: 'Revisit Class 10 "Minerals: Definition, Types and Mode of Occurrence" (c10_geo_cbse_05_001) for the.',
                  misconception: 'Students believe "rocks and minerals are the same thing" or "any solid natural material is a mineral." They classify granite, sandstone,.' }
          ],
            remediations: { 'rocks-and-minerals-are-the': { steps: ['Place three samples on the table—a quartz crystal, a piece of granite, and a piece of coal.', 'Ask the student to apply the five-part mineral definition to each.', 'Guide them to see quartz passes all five; granite fails "definite composition" and "single crystalline structure" (it\'s.', 'Have them write the definition in their own words with these three counter-examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "rocks and minerals are the same thing" or "any solid natural material is a mineral." They classify.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A mineral\'s hardness is the single most useful diagnostic property for field identification." Justify your position with examples.', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'most useful', 'rocks and minerals are the same thing', 'any solid natural material is a mineral'],
                  hint: 'Revisit Class 10 "Minerals: Definition, Types and Mode of Occurrence" (c10_geo_cbse_05_001) for the.',
                  misconception: 'Students believe "rocks and minerals are the same thing" or "any solid natural material is a mineral." They classify granite, sandstone,.' },
                { id: 'b', prompt: 'Design a one-page mineral identification flowchart for a Class 11 field kit that uses only: streak plate, copper coin, steel nail, glass plate, dilute HCl.', answer: 'A good flowchart starts with luster (metallic vs',
                  options: ['A good flowchart starts with luster (metallic vs', 'rocks and minerals are the same thing', 'any solid natural material is a mineral'],
                  hint: 'Revisit Class 10 "Minerals: Definition, Types and Mode of Occurrence" (c10_geo_cbse_05_001) for the.',
                  misconception: 'Students believe "rocks and minerals are the same thing" or "any solid natural material is a mineral." They classify granite, sandstone,.' }
          ],
            remediations: { 'rocks-and-minerals-are-the': { steps: ['Place three samples on the table—a quartz crystal, a piece of granite, and a piece of coal.', 'Ask the student to apply the five-part mineral definition to each.', 'Guide them to see quartz passes all five; granite fails "definite composition" and "single crystalline structure" (it\'s.', 'Have them write the definition in their own words with these three counter-examples.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_002', difficulty: 'standard',
          question: 'Mineral formation refers to the geological processes by which naturally.',
          hint: 'Review the definition of a mineral and the concept of magma, sediment, and metamorphism.',
          misconception: 'Students often believe that a mineral\'s chemical formula uniquely determines its formation mode (e.g., "calcite only.',
          parts: [
                { id: 'a', prompt: 'Compare the conditions of mineral formation in the Deccan Traps (basalt) versus the Vindhyan sedimentary basin.', answer: 'Deccan Traps: rapid cooling of mafic lava at surface (extrusive igneous) yields',
                  options: ['Deccan Traps: rapid cooling of mafic lava at surface (extrusive igneous) yields', 'calcite only forms in sedimentary rocks', 'lists similar minerals for both ignores the role of magma composition vs', 'a mineral\'s chemical formula uniquely determines its formation mode (e'],
                  hint: 'Review the definition of a mineral and the concept of magma, sediment, and metamorphism from Class.',
                  misconception: 'Students often believe that a mineral\'s chemical formula uniquely determines its formation mode (e.g., "calcite only forms in sedimentary.' }
          ],
            remediations: { 'a-mineral-s-chemical-formula': { steps: ['Create a three-column table (Igneous, Sedimentary, Metamorphic) and list the same mineral (calcite, quartz, garnet).', 'Use a P-T diagram (schematic) to plot the stability fields of these minerals, showing overlapping fields.', 'Visit a local museum or geological survey office to handle hand specimens from each mode; focus on texture differences.', 'Re-attempt Diagnostic Question 2 with this framework.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_003', difficulty: 'standard',
          question: 'Major mineral groups are classifications of minerals based on their anionic.',
          hint: 'If stuck, revisit Class 10 Chemistry (chemical formulas, valency) and c11_geo_cbse_05_001.',
          misconception: 'Students often believe that "silicate" and "silica" are synonymous and that all silicate minerals contain quartz.',
          parts: [
                { id: 'a', prompt: 'Name the anionic complex that defines the silicate mineral group and give its chemical formula.', answer: 'The silicate group is defined by the SiO₄⁴⁻ tetrahedron',
                  options: ['The silicate group is defined by the SiO₄⁴⁻ tetrahedron', 'silicate', 'silica', 'CO₃²⁻ defines silicates'],
                  hint: 'If stuck, revisit Class 10 Chemistry (chemical formulas, valency) and c11_geo_cbse_05_001 (mineral.',
                  misconception: 'Students often believe that "silicate" and "silica" are synonymous and that all silicate minerals contain quartz.' },
                { id: 'b', prompt: 'Given the mineral formulas below, classify each into its major mineral group and name one Indian location where it is economically mined: (a) Fe₂O₃ (b) ZnS (c).', answer: 'Fe₂O₃ (',
                  options: ['Fe₂O₃ (', 'silicate', 'silica'],
                  hint: 'If stuck, revisit Class 10 Chemistry (chemical formulas, valency) and c11_geo_cbse_05_001 (mineral.',
                  misconception: 'Students often believe that "silicate" and "silica" are synonymous and that all silicate minerals contain quartz.' }
          ],
            remediations: { 'silicate-and-silica-are-synonymous': { steps: ['Write the anion formula for each group on a flashcard: Silicate=SiO₄⁴⁻, Carbonate=CO₃²⁻, Oxide=O²⁻, Sulphide=S²⁻.', 'Take 10 common Indian minerals (quartz, feldspar, mica, calcite, dolomite, hematite, magnetite, bauxite minerals.', 'Use the geological map of India (NCERT Fig 5.3) to mark one deposit per group.', 'Explain aloud why magnetite is an oxide (contains O²⁻, no S) while galena is a sulphide (contains S²⁻).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_004', difficulty: 'standard',
          question: 'Rocks are naturally occurring solid aggregates of one or more minerals.',
          hint: 'If stuck, review the mineral definition and diagnostic properties in c11_geo_cbse_05_001.',
          misconception: 'Students often believe that the rock cycle moves in one fixed direction (igneous → sedimentary → metamorphic → melt).',
          parts: [
                { id: 'a', prompt: 'A student collects a rock sample from the Chotanagpur Plateau that shows alternating light and dark bands and is hard enough to scratch glass.', answer: 'Step 1: Banded texture (gneissic foliation) indicates metamorphic origin',
                  options: ['Step 1: Banded texture (gneissic foliation) indicates metamorphic origin', 'sedimentary because it has layers'],
                  hint: 'If stuck, review the mineral definition and diagnostic properties in c11_geo_cbse_05_001 and the.',
                  misconception: 'Students often believe that the rock cycle moves in one fixed direction (igneous → sedimentary → metamorphic → melt) and that each rock.' }
          ],
            remediations: { 'the-rock-cycle-moves-in': { steps: ['Draw a two-column table on the board—“Sedimentary Bedding” vs.', 'Hand out three unlabelled samples (sandstone, schist, gneiss); ask students to scratch, break, and describe each, then.', 'Use a simplified rock-cycle diagram with arrows colour-coded by energy source (red = internal heat, yellow.', 'Have students trace two different pathways for a basalt pebble from the Deccan Traps to become a new igneous rock.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_005', difficulty: 'standard',
          question: 'Igneous rocks are formed by the solidification of molten magma.',
          hint: 'Revisit "Formation of Minerals: Igneous process" (c11_geo_cbse_05_002) and "Rock Cycle".',
          misconception: 'Students believe **"Intrusive = Granite" and "Extrusive = Basalt"** as fixed equivalences.',
          parts: [
                { id: 'a', prompt: 'A student collects a rock sample from a road cutting near Pune (Deccan Traps).', answer: '**Rock:** Vesicular Basalt (Extrusive)',
                  options: ['**Rock:** Vesicular Basalt (Extrusive)', 'intrusive', 'gabbro', 'Intrusive = Granite'],
                  hint: 'Revisit "Formation of Minerals: Igneous process" (c11_geo_cbse_05_002) and "Rock Cycle".',
                  misconception: 'Students believe **"Intrusive = Granite" and "Extrusive = Basalt"** as fixed equivalences.' }
          ],
            remediations: { 'intrusive-granite-and-extrusive-basalt': { steps: ['**Conceptual Reset:** Draw a cross-section diagram showing a magma chamber feeding a volcano.', 'Label: Batholith (deep, slow cool → granite), Dyke/Sill (shallow, medium cool → dolerite), Lava Flow (surface, fast.', 'Emphasise the *vertical continuum* of cooling rates.', '**Texture Kit Exercise:** Provide 4 samples: Granite, Gabbro, Rhyolite, Basalt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_006', difficulty: 'standard',
          question: 'Igneous rocks are rocks formed from the cooling and solidification of molten.',
          hint: 'If stuck, revisit c11_geo_cbse_05_001 (mineral identification) and c11_geo_cbse_05_003.',
          misconception: 'Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They miss that.',
          parts: [
                { id: 'a', prompt: 'A student finds a dark-coloured, heavy rock with visible interlocking crystals of pyroxene and plagioclase feldspar (each 3–5 mm) in a road cut in the Deccan.', answer: 'The rock is gabbro',
                  options: ['The rock is gabbro', 'basalt', 'granite = any light-coloured coarse rock', 'basalt = any dark fine rock'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_001 (mineral identification) and c11_geo_cbse_05_003 (silicate.',
                  misconception: 'Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They miss that granodiorite, tonalite, and.' },
                { id: 'b', prompt: 'Two rocks have identical mineral composition (50% plagioclase, 40% pyroxene, 10% olivine). Rock A has 1 mm crystals; Rock B has 5 mm crystals.', answer: 'Both rocks crystallised from the same mafic magma',
                  options: ['Both rocks crystallised from the same mafic magma', 'different magma', 'granite = any light-coloured coarse rock', 'basalt = any dark fine rock'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_001 (mineral identification) and c11_geo_cbse_05_003 (silicate.',
                  misconception: 'Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They miss that granodiorite, tonalite, and.' },
                { id: 'c', prompt: 'A hand specimen shows large, euhedral feldspar phenocrysts (1 cm) set in a fine-grained groundmass. The rock is light-coloured and contains quartz.', answer: 'Texture: porphyritic (bimodal grain size)',
                  options: ['Texture: porphyritic (bimodal grain size)', 'granite = any light-coloured coarse rock', 'basalt = any dark fine rock', '"granite = any light-coloured coarse rock" and "basalt = any dark fine rock'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_001 (mineral identification) and c11_geo_cbse_05_003 (silicate.',
                  misconception: 'Students believe "granite = any light-coloured coarse rock" and "basalt = any dark fine rock." They miss that granodiorite, tonalite, and.' }
          ],
            remediations: { 'granite-any-light-coloured-coarse': { steps: ['Remediation: (1) Give three labelled hand specimens (granite, gabbro, dolerite).', '(2) Have students measure average grain size with a ruler and estimate % dark minerals using a visual chart.', '(3) Plot each on a simplified QAPF triangle (quartz-alkali feldspar-plagioclase).', '(4) Ask: "Which two have similar composition but different texture?" → basalt vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
